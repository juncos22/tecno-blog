"use client";

import { createClient } from "@/lib/supabase/client";
import { type User } from "@supabase/supabase-js";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";

type ProfileMenuProps = {
  user: User;
};

export const ProfileMenu = ({ user }: ProfileMenuProps) => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const logout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/auth/login");
  };

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuRef]);

  const userAvatarUrl = user?.user_metadata?.avatar_url || "/favicon.png";
  const userName = user?.user_metadata?.full_name || user?.email;

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 focus:outline-none cursor-pointer"
      >
        <img
          src={userAvatarUrl}
          alt="User avatar"
          width={40}
          height={40}
          className="rounded-full border-2 border-zinc-700 hover:border-pink-500 transition-colors"
        />
      </button>

      <div
        className={`absolute right-0 mt-2 w-56 origin-top-right rounded-md bg-zinc-900 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none transition-all duration-200 ease-out ${
          isOpen
            ? "transform opacity-100 scale-100"
            : "transform opacity-0 scale-95 pointer-events-none"
        }`}
        role="menu"
        aria-orientation="vertical"
        aria-labelledby="menu-button"
      >
        <div className="py-1" role="none">
          <div className="px-4 py-2 border-b border-zinc-700">
            <p className="text-sm text-zinc-400">Ingreso como </p>
            <p className="text-sm font-medium text-white truncate">
              {userName}
            </p>
          </div>
          <Link
            href="/profile"
            className="text-zinc-300 block px-4 py-2 text-sm hover:bg-zinc-800 transition-colors"
            role="menuitem"
            onClick={() => setIsOpen(false)}
          >
            Mi Perfil
          </Link>
          <Link
            href="/posts/create"
            className="text-zinc-300 block px-4 py-2 text-sm hover:bg-zinc-800 transition-colors"
            role="menuitem"
            onClick={() => setIsOpen(false)}
          >
            Crear Publicación
          </Link>
          <button
            onClick={logout}
            className="w-full text-left text-zinc-300 block px-4 py-2 text-sm hover:bg-zinc-800 transition-colors cursor-pointer"
            role="menuitem"
          >
            Cerrar Sesión
          </button>
        </div>
      </div>
    </div>
  );
};
