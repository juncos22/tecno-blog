import { createClient } from "@/lib/supabase/server";
import ProfileForm from "@/components/profile-form";
import PostCard from "@/components/post-card";
import { getPostsByUserId } from "./actions";
import { redirect } from "next/navigation";

export default async function ProfilePage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth/login");
  }

  const posts = await getPostsByUserId();

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-1">
          <ProfileForm user={user} />
        </div>
        <div className="lg:col-span-2">
          <h2 className="text-3xl font-bold text-white mb-8">
            Mis Publicaciones
          </h2>
          {posts && posts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {posts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          ) : (
            <div className="text-center text-zinc-400 bg-zinc-900/50 p-8 rounded-lg border border-zinc-800/50">
              <h3 className="text-xl font-semibold text-white">No posts yet</h3>
              <p className="mt-2">
                No tenés ninguna publicación creada aun, empezá creando una
                ahora!
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
