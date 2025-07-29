"use client";

import { useState } from "react";
import { CreateBlogPost } from "@/lib/definitions";
import { createBlogPost } from "@/app/posts/actions";
import { createClient } from "@/lib/supabase/client";
import { uploadImage, getImageUrl } from "@/lib/supabase/storage";
import Image from "next/image";

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
  const [uploading, setUploading] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(
    initialPost?.imageUrl || null
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
      setSlug(post.title.toLowerCase().replaceAll(/[^a-zA-Z0-9]/g, "-"));
    }
  };

  const handleTagsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTagsInput(e.target.value);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploading(true);
      setPreviewImage(URL.createObjectURL(file));
      const imagePath = await uploadImage(file, "post_images");
      if (imagePath) {
        const imageUrl = await getImageUrl(imagePath);
        setPost((prevPost) => ({
          ...prevPost,
          imageUrl,
        }));
      }
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const supabase = createClient();
    const userRes = await supabase.auth.getUser();
    const authUser = userRes.data.user;

    const tags = tagsInput.split(",").map((tag) => tag.trim());

    if (authUser) {
      post.tags = tags;
      post.slug = slug;
      post.userId = authUser.id;
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
          htmlFor="image"
          className="block text-sm font-medium text-zinc-300"
        >
          Post Image
        </label>
        <div className="mt-1 flex items-center space-x-4">
          {previewImage && (
            <Image
              src={previewImage}
              alt="Image preview"
              width={80}
              height={80}
              className="rounded-md"
            />
          )}
          <input
            type="file"
            name="image"
            id="image"
            onChange={handleImageUpload}
            accept="image/*"
            className="block w-full text-sm text-zinc-400 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-teal-600/20 file:text-teal-300 hover:file:bg-teal-600/30"
          />
        </div>
        {uploading && (
          <p className="text-sm text-zinc-400 mt-2">Uploading...</p>
        )}
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
          disabled={uploading}
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 disabled:opacity-50"
        >
          {uploading ? "Saving..." : "Save Post"}
        </button>
      </div>
    </form>
  );
};

export default PostForm;
