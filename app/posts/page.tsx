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
  const authUser = await userRes.data.user;
  return (
    <>
      <Navbar authUser={authUser} />
      {authUser && (
        <div>
          <Link
            href={"/posts/create"}
            className="top-28 rounded px-5 py-2 my-24 bg-indigo-700 hover:bg-indigo-500 hover:text-[#212121] text-balance"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="icon icon-tabler icons-tabler-outline icon-tabler-hexagon-plus"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M19.875 6.27c.7 .398 1.13 1.143 1.125 1.948v7.284c0 .809 -.443 1.555 -1.158 1.948l-6.75 4.27a2.269 2.269 0 0 1 -2.184 0l-6.75 -4.27a2.225 2.225 0 0 1 -1.158 -1.948v-7.285c0 -.809 .443 -1.554 1.158 -1.947l6.75 -3.98a2.33 2.33 0 0 1 2.25 0l6.75 3.98h-.033z" />
              <path d="M9 12h6" />
              <path d="M12 9v6" />
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
