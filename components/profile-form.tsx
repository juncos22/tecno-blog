"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { createClient } from "@/lib/supabase/client";
import { type User } from "@supabase/supabase-js";
import { uploadImage, getImageUrl } from "@/lib/supabase/storage";
import { useRouter } from "next/navigation";
import DeleteProfileButton from "./delete-profile-button";

export default function ProfileForm({ user }: { user: User }) {
  const [fullName, setFullName] = useState("");
  const [bio, setBio] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const router = useRouter();
  useEffect(() => {
    if (user) {
      setFullName(user.user_metadata.full_name || "");
      setAvatarUrl(user.user_metadata.avatar_url || "");
      setPreviewImage(user.user_metadata.avatar_url || null);
      setBio(user.user_metadata.bio || "");
    }
  }, [user]);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploading(true);
      setPreviewImage(URL.createObjectURL(file));
      const imagePath = await uploadImage(file, "profile_avatars");

      if (imagePath) {
        console.log("Image uploaded to path:", imagePath);
        const newAvatarUrl = await getImageUrl(imagePath);
        setAvatarUrl(newAvatarUrl);
      }
      setUploading(false);
    }
  };

  const handleUpdateProfile = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setError("");

    const supabase = createClient();
    const { error } = await supabase.auth.updateUser({
      data: { full_name: fullName, avatar_url: avatarUrl, bio: bio },
    });

    if (error) {
      setError("Error actualizando su perfil: " + error.message);
    } else {
      setMessage("Perfil actualizado con exito!");
    }
    setLoading(false);
    setTimeout(() => {
      setMessage("");
      router.refresh();
    }, 3000);
  };

  return (
    <div className="max-w-lg mx-auto bg-zinc-900/50 p-8 rounded-lg shadow-lg border border-zinc-800/50">
      <div className="flex flex-col items-center mb-6">
        <Image
          src={previewImage || "/favicon.png"}
          alt="User avatar"
          width={120}
          height={120}
          className="rounded-full border-4 border-zinc-700 mb-4"
        />
        <h2 className="text-2xl font-bold text-white">
          {user?.user_metadata.full_name || user?.email}
        </h2>
        <p className="text-zinc-400">{user?.email}</p>
      </div>
      <form onSubmit={handleUpdateProfile} className="space-y-6">
        <div>
          <label
            htmlFor="fullName"
            className="block text-sm font-medium text-zinc-300"
          >
            Nombre Completo
          </label>
          <input
            id="fullName"
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="mt-1 block w-full bg-zinc-800 border border-zinc-700 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label
            htmlFor="bio"
            className="block text-sm font-medium text-zinc-300"
          >
            Bio
          </label>
          <textarea
            id="bio"
            rows={4}
            value={bio}
            maxLength={50}
            onChange={(e) => setBio(e.target.value)}
            className="mt-1 block w-full bg-zinc-800 border border-zinc-700 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label
            htmlFor="avatar"
            className="block text-sm font-medium text-zinc-300"
          >
            Avatar
          </label>
          <input
            id="avatar"
            type="file"
            onChange={handleImageUpload}
            accept="image/*"
            className="mt-1 block w-full text-sm text-zinc-400 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-indigo-600/20 file:text-pink-300 hover:file:bg-indigo-600/30"
          />
          {uploading && (
            <p className="text-sm text-zinc-400 mt-2">Uploading...</p>
          )}
        </div>
        <div>
          <button
            type="submit"
            disabled={loading || uploading}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
          >
            {loading ? "Actualizando perfil..." : "Actualizar Perfil"}
          </button>
          <DeleteProfileButton />
        </div>
      </form>
      {message && <p className="mt-4 text-center text-green-400">{message}</p>}
      {error && <p className="mt-4 text-center text-red-400">{error}</p>}
    </div>
  );
}
