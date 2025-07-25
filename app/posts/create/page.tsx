import PostForm from "@/components/post-form";
import { BlogPost } from "@/lib/definitions";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { createBlogPost } from "@/app/posts/actions";

const CreatePostPage = async () => {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.getClaims();
  if (error || !data?.claims) {
    redirect("/auth/login");
  }
  const handleSubmit = async (post: Omit<BlogPost, "id" | "createdAt">) => {
    console.log(`Submitting post created by ${data.claims}:`, post);
    // Here you would typically call an API to save the post
    // await createBlogPost(post);
  };

  return (
    <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="text-center">
        <h1 className="text-4xl font-extrabold text-white sm:text-5xl sm:tracking-tight lg:text-6xl">
          Create a New Post
        </h1>
        <p className="mt-5 max-w-xl mx-auto text-xl text-zinc-400">
          Fill out the form below to publish a new article on the blog.
        </p>
      </div>
      <div className="mt-12">
        <PostForm onSubmit={handleSubmit} />
      </div>
    </div>
  );
};

export default CreatePostPage;
