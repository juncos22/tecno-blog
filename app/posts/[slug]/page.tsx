import { FC } from "react";
// import { samplePosts } from "@/mockData/samplePosts";
import Image from "next/image";
import Link from "next/link";
import { getBlogPostBySlug } from "../actions";

interface PostDetailPageProps {
  params: {
    slug: string;
  };
}

const PostDetailPage: FC<PostDetailPageProps> = async ({ params }) => {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

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
        <div dangerouslySetInnerHTML={{ __html: post.content }} />
      </article>
      <div className="mt-8">
        <Link href={"/posts"} className="text-blue-500 hover:underline">
          &larr; Volver al inicio
        </Link>
      </div>
    </div>
  );
};

export default PostDetailPage;
