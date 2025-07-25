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
  id: number;
  title: string;
  content: string;
  createdAt: string;
  imageUrl: string;
  slug: string;
  userId: string;
  tags: string[];
}

export type BlogPostFromDB = {
  id: number;
  created_at: string;
  title: string;
  content: string;
  image_url: string;
  slug: string;
  user_id: string;
  tags: string[] | null;
};
