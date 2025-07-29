import { FC } from "react";
import { getBlogPostBySlug } from "@/app/posts/actions";
import PostForm from "@/components/post-form";
import Link from "next/link";

interface PostEditPageProps {
  params: {
    slug: string;
  };
}

const PostEditPage: FC<PostEditPageProps> = async ({ params }) => {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  if (!post) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-4xl font-bold mb-4">Post not found</h1>
        <Link href="/posts" className="text-teal-500 hover:underline">
          Return to posts
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-center text-white">
        Edit Post
      </h1>
      <PostForm initialPost={post} />
    </div>
  );
};

export default PostEditPage;
