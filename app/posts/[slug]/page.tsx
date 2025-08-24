import Link from "next/link";
import Image from "next/image";
import { getBlogPostBySlug } from "../actions";
import DeletePostButton from "@/components/delete-post-button";
import { createClient } from "@/lib/supabase/server";
// export const runtime = "edge";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export default async function PostDetailPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);
  const userResponse = await (await createClient()).auth.getUser();
  const authUser = userResponse.data.user;

  if (!post) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-4xl font-bold mb-4">Post no encontrado</h1>
        <Link href={"/posts"} className="text-blue-500 hover:underline">
          Volver al inicio
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <article className="prose lg:prose-xl max-w-none">
        <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
        <div className="flex items-center gap-x-2">
          {post.user?.avatar_url && (
            <Image
              className="rounded-full"
              src={post.user.avatar_url}
              alt={post.user.user_name ?? "avatar"}
              width={40}
              height={40}
            />
          )}
          <p className="text-gray-600 mb-4">
            por {post.user?.user_name ?? post.user?.name}
          </p>
        </div>{" "}
        a las{" "}
        {new Date(post.createdAt).toLocaleTimeString("es-AR", {
          hour: "2-digit",
          minute: "2-digit",
        })}{" "}
        {post.updatedAt && (
          <p className="text-gray-600 mb-4">
            Actualizado el{" "}
            {new Date(post.updatedAt).toLocaleDateString("es-AR", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}{" "}
            a las{" "}
            {new Date(post.updatedAt).toLocaleTimeString("es-AR", {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>
        )}
        <div dangerouslySetInnerHTML={{ __html: post.content }} />
      </article>
      <div className="mt-8 flex justify-between items-center">
        <Link href={"/posts"} className="text-blue-500 hover:underline">
          &larr; Volver al inicio
        </Link>
        <div className="flex items-center space-x-4">
          {authUser &&
            post.userId === authUser.id && ( // Replace with actual user ID check
              <>
                <Link
                  href={`/posts/edit/${post.slug}`}
                  className="text-yellow-500 hover:underline"
                >
                  Editar Post
                </Link>
                <DeletePostButton postId={post.id} />
              </>
            )}
        </div>
      </div>
    </div>
  );
}
