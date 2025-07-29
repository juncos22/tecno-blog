"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { type User } from "@supabase/supabase-js";
import Image from "next/image";

export default function ProfileForm({ user }: { user: User }) {
  const [fullName, setFullName] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (user) {
      setFullName(user.user_metadata.full_name || "");
      setAvatarUrl(user.user_metadata.avatar_url || "");
    }
  }, [user]);

  const handleUpdateProfile = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setError("");

    const supabase = createClient();
    const { data, error } = await supabase.auth.updateUser({
      data: { full_name: fullName, avatar_url: avatarUrl },
    });

    if (error) {
      setError("Error updating profile: " + error.message);
    } else {
      setMessage("Profile updated successfully!");
    }
    setLoading(false);
  };

  return (
    <div className="max-w-lg mx-auto bg-zinc-900/50 p-8 rounded-lg shadow-lg border border-zinc-800/50">
      <div className="flex flex-col items-center mb-6">
        <Image
          src={avatarUrl || "/profile.jpg"}
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
            htmlFor="avatarUrl"
            className="block text-sm font-medium text-zinc-300"
          >
            Avatar URL
          </label>
          <input
            id="avatarUrl"
            type="text"
            value={avatarUrl}
            onChange={(e) => setAvatarUrl(e.target.value)}
            className="mt-1 block w-full bg-zinc-800 border border-zinc-700 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <button
            type="submit"
            disabled={loading}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 cursor-pointer"
          >
            {loading ? "Guardando Datos..." : "Actualizar Perfil"}
          </button>
        </div>
      </form>
      {message && <p className="mt-4 text-center text-green-400">{message}</p>}
      {error && <p className="mt-4 text-center text-red-400">{error}</p>}
    </div>
  );
}
