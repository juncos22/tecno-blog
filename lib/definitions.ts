/**
 * Database Schema for blog_post
 * id: int8,
 * created_at: timestamptz,
 * title: varchar,
 * content: text,
 * image_url: text,
 * slug: text,
 * tags: json,
 */
export interface BlogPost {
  id: string;
  title: string;
  content: string;
  imageUrl: string;
  slug: string;
  userId: string;
  tags: string[];
  createdAt: string;
  updatedAt?: string; // Optional field for future updates
  user: User;
}

export type CreateBlogPost = Omit<BlogPost, "id">;

export type User = {
  id: string;
  name: string;
  user_name?: string;
  avatar_url: string;
};

export type BlogPostFromDB = {
  id: string;
  title: string;
  content: string;
  image_url: string;
  slug: string;
  user_id: string;
  tags: string[] | null;
  created_at: string;
  updated_at?: string | null; // Optional field for future updates
  user: User;
};

export type CreateBlogPostFromDB = Omit<BlogPostFromDB, "id" | "user">;
