import PostForm from "@/components/post-form";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

const CreatePostPage = async () => {
  const supabase = await createClient();

  const userRes = await supabase.auth.getUser();
  const authUser = userRes.data.user;
  if (!authUser) {
    redirect("/auth/login");
  }
  return (
    <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="text-center">
        <h1 className="text-4xl font-extrabold text-white sm:text-5xl sm:tracking-tight lg:text-6xl">
          Crea un Nuevo Post
        </h1>
        <p className="mt-5 max-w-xl mx-auto text-xl text-zinc-400">
          Completa todos los datos de tu post.
        </p>
      </div>
      <div className="mt-12">
        <PostForm />
      </div>
    </div>
  );
};

export default CreatePostPage;
