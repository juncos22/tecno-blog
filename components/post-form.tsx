"use client";

import { useState } from "react";
import { CreateBlogPost } from "@/lib/definitions";
import { createBlogPost } from "@/app/posts/actions";
import { createClient } from "@/lib/supabase/client";

interface PostFormProps {
  initialPost?: CreateBlogPost;
}

const PostForm = ({ initialPost }: PostFormProps) => {
  const [post, setPost] = useState<CreateBlogPost>(
    initialPost || {
      title: "",
      content: "",
      imageUrl: "",
      slug: "",
      tags: [],
      userId: "",
    }
  );
  const [slug, setSlug] = useState("");

  const [tagsInput, setTagsInput] = useState(
    initialPost?.tags.join(", ") || ""
  );

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setPost((prevPost) => ({
      ...prevPost,
      [name]: value,
    }));
    if (name === "title" && post.title.length > 0) {
      setSlug((_prev) =>
        post.title.toLowerCase().replaceAll(/[^a-zA-Z0-9]/g, "-")
      );
    }
  };

  const handleTagsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTagsInput(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const supabase = createClient();
    const userRes = await supabase.auth.getUser();
    const authUser = userRes.data.user;

    const tags = tagsInput.split(",").map((tag) => tag.trim());

    if (authUser) {
      post.tags.push(...tags);
      post.slug = slug;
      post.userId = authUser.id;
      console.log(`Submitting post created by ${authUser?.email}:`, post);
      // Here you would typically call an API to save the post
      await createBlogPost(post);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 bg-zinc-900/50 border border-zinc-800/50 rounded-xl p-8"
    >
      <div>
        <label
          htmlFor="title"
          className="block text-sm font-medium text-zinc-300"
        >
          Title
        </label>
        <input
          type="text"
          name="title"
          id="title"
          value={post.title}
          onChange={handleChange}
          required
          className="mt-1 block w-full bg-zinc-800/50 border border-zinc-700/60 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
        />
      </div>

      <div>
        <label
          htmlFor="imageUrl"
          className="block text-sm font-medium text-zinc-300"
        >
          Image URL
        </label>
        <input
          type="text"
          name="imageUrl"
          id="imageUrl"
          value={post.imageUrl}
          onChange={handleChange}
          required
          className="mt-1 block w-full bg-zinc-800/50 border border-zinc-700/60 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
        />
      </div>
      <div>
        <label
          htmlFor="content"
          className="block text-sm font-medium text-zinc-300"
        >
          Content
        </label>
        <textarea
          name="content"
          id="content"
          rows={10}
          value={post.content}
          onChange={handleChange}
          required
          className="mt-1 block w-full bg-zinc-800/50 border border-zinc-700/60 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
        ></textarea>
      </div>
      <div>
        <label
          htmlFor="tags"
          className="block text-sm font-medium text-zinc-300"
        >
          Tags (comma-separated)
        </label>
        <input
          type="text"
          name="tags"
          id="tags"
          value={tagsInput}
          onChange={handleTagsChange}
          className="mt-1 block w-full bg-zinc-800/50 border border-zinc-700/60 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
        />
      </div>
      <div>
        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
        >
          Save Post
        </button>
      </div>
    </form>
  );
};

export default PostForm;
