import FeaturedPostCard from "@/components/featured-post-card";
import PostCard from "@/components/post-card";
import SearchBox from "@/components/searchbox";
import Link from "next/link";
import React from "react";
import { getBlogPosts } from "./actions";
import { PageProps } from "@/.next/types/app/page";

// export const runtime = "edge";

export default async function Page({ searchParams }: PageProps) {
  const params = await searchParams;
  const query = (params && params.q) || "";

  const posts = await getBlogPosts(query);
  if (posts && posts !== null && posts.length > 0) {
    const [featuredPost, ...restPosts] = posts;
    return (
      <>
        <div className="flex justify-end mb-4">
          <SearchBox placeholder="Busca publicaciones..." />
        </div>
        <FeaturedPostCard post={featuredPost} />
        <div className="flex flex-col gap-8 mt-8">
          {restPosts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      </>
    );
  }

  return (
    <div className="text-center text-zinc-400 bg-zinc-900/50 p-8 rounded-lg border border-zinc-800/50">
      <div className="flex justify-end mb-4">
        <SearchBox />
      </div>
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
