"use client";

import { useState } from "react";
import { BlogPost, CreateBlogPost } from "@/lib/definitions";
import { createBlogPost, updateBlogPost } from "@/app/posts/actions";
import Alert, { AlertData } from "@/components/alert";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

interface PostFormProps {
  initialPost?: BlogPost;
}

const PostForm = ({ initialPost }: PostFormProps) => {
  const router = useRouter();
  const [post, setPost] = useState<Partial<BlogPost>>(
    initialPost || {
      title: "",
      content: "",
      imageUrl: "",
      slug: "",
      tags: [],
    }
  );
  const [slug, setSlug] = useState(initialPost?.slug || "");
  const [tagsInput, setTagsInput] = useState(
    initialPost?.tags.join(", ") || ""
  );
  // const [uploading, setUploading] = useState(false);
  // const [previewImage, setPreviewImage] = useState<string | null>(
  //   initialPost?.imageUrl || null
  // );
  const [alertData, setAlertData] = useState<AlertData | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setPost((prevPost) => ({
      ...prevPost,
      [name]: value,
    }));
    if (name === "title" && !initialPost) {
      setSlug(value.toLowerCase().replaceAll(/[^a-zA-Z0-9]/g, "-"));
    }
  };

  const handleTagsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTagsInput(e.target.value);
  };

  // const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const file = e.target.files?.[0];
  //   if (file) {
  //     setUploading(true);
  //     setPreviewImage(URL.createObjectURL(file));
  //     const imagePath = await uploadImage(file, "post_images");
  //     if (imagePath) {
  //       const imageUrl = await getImageUrl(imagePath);
  //       setPost((prevPost) => ({
  //         ...prevPost,
  //         imageUrl,
  //       }));
  //     }
  //     setUploading(false);
  //   }
  // };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    const tags = tagsInput.split(",").map((tag) => tag.trim());
    const finalPost = { ...post, tags, slug, userId: user?.id };
    // console.log(finalPost);

    try {
      if (initialPost?.id) {
        const result = await updateBlogPost(
          initialPost.id,
          finalPost as CreateBlogPost
        );
        setAlertData({
          type: result ? "success" : "error",
          message: "Publicación actualizada con exito!",
        });
      } else {
        const result = await createBlogPost(finalPost as CreateBlogPost);
        setAlertData({
          type: result ? "success" : "error",
          message: "Publicación creada con exito!",
        });
      }
      setTimeout(() => {
        setAlertData(null);
        router.push("/posts");
      }, 3000);
    } catch (error: unknown) {
      setAlertData({
        type: "error",
        message: error instanceof Error ? error.message : "An error occurred",
      });
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
          Titulo
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

      {/* <div>
        <label
          htmlFor="image"
          className="block text-sm font-medium text-zinc-300"
        >
          Portada de la publicación
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
          <p className="text-sm text-zinc-400 mt-2">Subiendo imagen...</p>
        )}
      </div> */}

      <div>
        <label
          htmlFor="content"
          className="block text-sm font-medium text-zinc-300"
        >
          Contenido
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
          Tags (separados por coma)
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
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 disabled:opacity-50"
        >
          {initialPost ? "Actualizar Publicación" : "Guardar Publicación"}
        </button>
      </div>
      {alertData && (
        <Alert
          type={alertData.type}
          message={alertData.message}
          onClose={() => setAlertData(null)}
        />
      )}
    </form>
  );
};

export default PostForm;
