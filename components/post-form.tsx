"use client";

import { useState } from "react";
import { BlogPost } from "@/lib/definitions";

interface PostFormProps {
  onSubmit: (post: Omit<BlogPost, "id" | "createdAt">) => void;
  initialPost?: Omit<BlogPost, "id" | "createdAt">;
}

const PostForm = async ({ onSubmit, initialPost }: PostFormProps) => {
  const [post, setPost] = useState(
    initialPost || {
      title: "",
      content: "",
      imageUrl: "",
      slug: "",
      tags: [],
      userId: 0,
    }
  );
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
  };

  const handleTagsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTagsInput(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const tags = tagsInput
      .split(",")
      .map((tag) => tag.trim())
      .filter((tag) => tag);

    const slug = post.title
      .toLowerCase()
      .replaceAll(".", "")
      .replaceAll(/[ -]/g, "-");

    onSubmit({ ...post, tags, slug, userId: "" });
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
