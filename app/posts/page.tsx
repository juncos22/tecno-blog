import FeaturedPostCard from "@/components/featured-post-card";
import Navbar from "@/components/navbar";
import PostCard from "@/components/post-card";
import { createClient } from "@/lib/supabase/server";
import { samplePosts } from "@/mockData/samplePosts";
import Link from "next/link";
import React from "react";

export default async function Page() {
  const [featuredPost, ...restPosts] = samplePosts;
  const supabase = await createClient();
  const user = await supabase.auth.getUser();
  return (
    <>
      <Navbar userResponse={user} />
      <div id="posts" className="container mx-auto px-4 py-8">
        {user.data.user && (
          <Link
            href={"/posts/create"}
            className="rounded-md px-5 py-2 my-14 bg-indigo-700 hover:bg-indigo-500 hover:text-[#212121] text-balance"
          >
            Nuevo Post
          </Link>
        )}
        <FeaturedPostCard post={featuredPost} />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
          {restPosts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      </div>
    </>
  );
}
