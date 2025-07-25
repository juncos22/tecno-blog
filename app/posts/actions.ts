"use server";

import { createClient } from "@/lib/supabase/server";
import { BlogPost, BlogPostFromDB } from "@/lib/definitions";
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

export async function createBlogPost(post: Omit<BlogPost, "id" | "createdAt">) {
  const supabase = await createClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();
  if (!session) {
    redirect("/auth/login");
  }
  const dbPost = parseDbPost({
    id: 0,
    createdAt: new Date().toDateString(),
    ...post,
    userId: session.user.id,
  });
  const { data, error } = await supabase.from("blog_post").insert([dbPost]);
  if (error) {
    console.error("Error creating blog post:", error);
    return null;
  }
  revalidatePath("/posts");
  return data;
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
