import {
  BlogPost,
  BlogPostFromDB,
  CreateBlogPost,
  CreateBlogPostFromDB,
} from "@/lib/definitions";

/**
 * Parses raw data from the 'blog_post' table into an array of BlogPost objects.
 *
 * @param data - The raw data array from the Supabase query.
 * @returns An array of BlogPost objects, or an empty array if the input is invalid.
 */
export const parseBlogPosts = (data: BlogPostFromDB[] | null): BlogPost[] => {
  if (!data) {
    return [];
  }

  return data.map((post) => ({
    id: post.id,
    title: post.title,
    content: post.content,
    createdAt: post.created_at,
    imageUrl: post.image_url,
    slug: post.slug,
    userId: post.user_id,
    tags: post.tags || [], // Ensure tags is always an array
  }));
};

export const parseBlogPost = (data: BlogPostFromDB | null): BlogPost | null => {
  if (!data) {
    return null;
  }

  return {
    id: data.id,
    title: data.title,
    content: data.content,
    createdAt: data.created_at,
    updatedAt: data.updated_at || undefined, // Handle optional updated_at
    imageUrl: data.image_url,
    slug: data.slug,
    userId: data.user_id,
    tags: data.tags || [], // Ensure tags is always an array
  };
};

export const parseDbPost = (
  data: CreateBlogPost | null
): CreateBlogPostFromDB | null => {
  if (!data) {
    return null;
  }
  // Convert the CreateBlogPost to CreateBlogPostFromDB format
  return {
    title: data.title,
    content: data.content,
    image_url: data.imageUrl,
    slug: data.slug,
    user_id: data.userId,
    tags: data.tags || [], // Ensure tags is always an array,
    created_at: data.createdAt ?? new Date().toUTCString(),
    updated_at: data.updatedAt,
  };
};
