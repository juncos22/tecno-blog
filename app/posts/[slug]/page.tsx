import { FC } from "react";
import Image from "next/image";
import Link from "next/link";
import { getBlogPostBySlug } from "../actions";
import DeletePostButton from "@/components/delete-post-button";
import { createClient } from "@/lib/supabase/server";

interface PostDetailPageProps {
  params: {
    slug: string;
  };
}

const PostDetailPage: FC<PostDetailPageProps> = async ({ params }) => {
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
        <div className="mb-8">
          <Image
            src={post.imageUrl}
            alt={post.title}
            width={800}
            height={400}
            className="rounded-lg object-cover"
          />
        </div>
        <p className="text-gray-600 mb-4">
          Publicado el{" "}
          {new Date(post.createdAt).toLocaleDateString("es-AR", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}{" "}
          a las{" "}
          {new Date(post.createdAt).toLocaleTimeString("es-AR", {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </p>
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
          <Link
            href={`/posts/edit/${post.slug}`}
            className="text-yellow-500 hover:underline"
          >
            Editar Post
          </Link>
          {authUser &&
            post.userId === authUser.id && ( // Replace with actual user ID check
              <DeletePostButton postId={post.id} />
            )}
        </div>
      </div>
    </div>
  );
};

export default PostDetailPage;
