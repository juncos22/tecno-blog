import { getBlogPostBySlug } from "@/app/posts/actions";
import PostForm from "@/components/post-form";
import Link from "next/link";

// export const runtime = "edge";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export default async function PostEditPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  if (!post) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-4xl font-bold mb-4">Publicacion no encontrada</h1>
        <Link href="/posts" className="text-teal-500 hover:underline">
          Volver atrás
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-center text-white">
        Modificar Publicación
      </h1>
      <PostForm initialPost={post} />
    </div>
  );
}
