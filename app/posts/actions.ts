"use server";

import { createClient } from "@/lib/supabase/server";
import { BlogPost, BlogPostFromDB, CreateBlogPost } from "@/lib/definitions";
import { revalidatePath } from "next/cache";
import { parseBlogPost, parseBlogPosts, parseDbPost } from "@/lib/helpers";
import { redirect } from "next/navigation";

export async function getBlogPosts() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("blog_post")
    .select<"*", BlogPostFromDB>("*");
  if (error) {
    console.error("Error fetching blog posts:", error);
    return null;
  }
  return parseBlogPosts(data);
}

export async function getBlogPostBySlug(slug: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("blog_post")
    .select("*")
    .eq("slug", slug)
    .single<BlogPostFromDB>();
  if (error) {
    console.error("Error fetching blog post by slug:", error);
    return null;
  }
  return parseBlogPost(data);
}

export async function createBlogPost(post: CreateBlogPost) {
  const supabase = await createClient();
  const userRes = await supabase.auth.getUser();
  const authUser = userRes.data.user;

  console.log("Creating blog post with data:", post);

  if (!authUser) {
    redirect("/auth/login");
  }
  const dbPost = parseDbPost(post);
  const { data, error } = await supabase.from("blog_post").insert([dbPost]);
  if (error) {
    console.error("Error creating blog post:", error);
    throw new Error(error.message);
  }
  redirect("/posts");
}

export async function updateBlogPost(id: number, post: Partial<BlogPost>) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("blog_post")
    .update(post)
    .eq("id", id);
  if (error) {
    console.error("Error updating blog post:", error);
    return null;
  }
  revalidatePath("/posts");
  revalidatePath(`/posts/${post.slug}`);
  return data;
}

export async function deleteBlogPost(id: number) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("blog_post")
    .delete()
    .eq("id", id);
  if (error) {
    console.error("Error deleting blog post:", error);
    return null;
  }
  revalidatePath("/posts");
  return data;
}
