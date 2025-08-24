"use server";

import { createClient } from "@/lib/supabase/server";
import { BlogPostFromDB } from "@/lib/definitions";
import { parseBlogPosts } from "@/lib/helpers";
import { redirect } from "next/navigation";

import { signOut } from "@/app/auth/actions";
import { deleteUserPosts } from "@/app/posts/actions";

export async function getPostsByUserId() {
  const supabase = await createClient();
  const userRes = await supabase.auth.getUser();
  const authUser = userRes.data.user;

  if (!authUser) {
    redirect("/auth/login");
  }

  const { data, error } = await supabase
    .from("blog_post")
    .select<"*", BlogPostFromDB>("*")
    .eq("user_id", authUser.id)
    .eq("is_active", true)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching blog posts:", error);
    throw new Error(error.message);
  }
  return parseBlogPosts(data);
}

export async function deleteUser() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth/login");
  }

  const { error } = await supabase.auth.updateUser({
    data: { is_active: false },
  });

  if (error) {
    console.error("Error logically deleting user:", error);
    throw new Error(error.message);
  }

  const result = await deleteUserPosts();
  if (result) {
    await signOut();
  }
}
