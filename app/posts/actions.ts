"use server";

import { createClient } from "@/lib/supabase/server";
import { BlogPostFromDB, CreateBlogPost } from "@/lib/definitions";
import { parseBlogPost, parseBlogPosts, parseDbPost } from "@/lib/helpers";
import { redirect } from "next/navigation";

export async function getBlogPosts(query?: string) {
  const supabase = await createClient();
  let supabaseQuery = supabase
    .from("blog_post")
    .select<"*", BlogPostFromDB>("*,user:users(*)")
    .eq("is_active", true)
    .order("created_at", { ascending: false });

  if (query) {
    supabaseQuery = supabaseQuery.or(
      `title.ilike.%${query}%,content.ilike.%${query}%`
    );
  }

  const { data, error } = await supabaseQuery;
  if (error) {
    console.error("Error fetching blog posts:", error);
    throw new Error(error.message);
  }
  return parseBlogPosts(data);
}

export async function getBlogPostBySlug(slug: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("blog_post")
    .select("*,user:users(*)")
    .eq("slug", slug)
    .single<BlogPostFromDB>();
  if (error) {
    console.error("Error fetching blog post by slug:", error);
    throw new Error(error.message);
  }
  return parseBlogPost(data);
}

export async function createBlogPost(post: CreateBlogPost) {
  const supabase = await createClient();
  const userRes = await supabase.auth.getUser();
  const authUser = userRes.data.user;

  // console.log("Creating blog post with data:", post);

  if (!authUser) {
    redirect("/auth/login");
  }
  const dbPost = parseDbPost(post);
  const { error } = await supabase.from("blog_post").insert([dbPost]);
  if (error) {
    console.error("Error creating blog post:", error);
    throw new Error(error.message);
  }
  return true; // Indicate success
}

export async function updateBlogPost(id: string, post: CreateBlogPost) {
  const supabase = await createClient();

  let dbPost = parseDbPost(post);
  console.log("Updating blog post with data:", dbPost);

  if (dbPost) {
    const { error } = await supabase
      .from("blog_post")
      .update({ ...dbPost, updated_at: new Date().toUTCString() })
      .eq("id", id);

    if (error) {
      console.error("Error updating blog post:", error);
      throw new Error(error.message);
    }
  }
  return true; // Indicate success
}

export async function deleteBlogPost(id: string) {
  const supabase = await createClient();
  const { error } = await supabase
    .from("blog_post")
    .update({ is_active: false })
    .eq("id", id);
  if (error) {
    console.error("Error deleting blog post:", error);
    throw new Error(error.message);
  }
  return true;
}
