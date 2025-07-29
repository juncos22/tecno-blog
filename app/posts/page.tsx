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
  const userRes = await supabase.auth.getUser();
  const authUser = userRes.data.user;
  return (
    <>
      <Navbar authUser={authUser} />
      {authUser && (
        <div className="fixed top-130 right-10 w-fit z-30">
          <Link href={"/posts/create"} className="">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="rounded-full flex items-center size-15  bg-indigo-700 hover:bg-indigo-500 icon icon-tabler icons-tabler-outline icon-tabler-plus"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M12 5l0 14" />
              <path d="M5 12l14 0" />
            </svg>
          </Link>
        </div>
      )}
      <div id="posts" className="container mx-auto px-4 py-8">
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
