import FeaturedPostCard from "@/components/featured-post-card";
import Navbar from "@/components/navbar";
import PostCard from "@/components/post-card";
import { createClient } from "@/lib/supabase/server";
import { samplePosts } from "@/mockData/samplePosts";
import Link from "next/link";
import React from "react";
import { getBlogPosts } from "./actions";

export default async function Page() {
  const posts = await getBlogPosts();
  if (posts && posts.length > 0) {
    const [featuredPost, ...restPosts] = posts;
    return (
      <>
        <FeaturedPostCard post={featuredPost} />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
          {restPosts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      </>
    );
  }
  return (
    <div className="text-center text-zinc-400 bg-zinc-900/50 p-8 rounded-lg border border-zinc-800/50">
      <h3 className="text-xl font-semibold text-white">Sin publicaciones</h3>
      <p className="mt-2">
        No hay publicaciones disponibles en este momento. Volvé más tarde o creá
        una nueva publicación.
      </p>
      <Link
        href="/posts/create"
        className="mt-4 inline-block bg-teal-500 text-white px-4 py-2 rounded-lg hover:bg-teal-600 transition-colors"
      >
        Crear Publicación
      </Link>
    </div>
  );
}
