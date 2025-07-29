"use client";
import Image from "next/image";
import Link from "next/link";
import { ProfileMenu } from "@/components/profile-menu";
import { type User } from "@supabase/supabase-js";
import { useState } from "react";

type NavbarProps = {
  authUser: User | null;
};
const Navbar = ({ authUser }: NavbarProps) => {
  const [isClicked, setIsClicked] = useState(false);
  const toggleMenu = () => setIsClicked(!isClicked);

  return (
    <nav className="bg-zinc-950/50 backdrop-blur-lg sticky top-0 z-50 border-b border-zinc-800/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <Link
              href="/"
              className="text-2xl font-bold text-white hover:text-zinc-300 transition-colors"
            >
              <Image
                src={"/favicon.png"}
                priority
                width={180}
                height={180}
                alt="logo"
              />
            </Link>
          </div>
          <div className="hidden ml-10 md:flex items-baseline space-x-4">
            <Link
              href="/"
              className="text-zinc-300 hover:bg-zinc-800/50 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors"
            >
              Inicio
            </Link>
            <Link
              href="/about"
              className="text-zinc-300 hover:bg-zinc-800/50 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors"
            >
              Acerca de
            </Link>
            <Link
              href="/contact"
              className="text-zinc-300 hover:bg-zinc-800/50 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors"
            >
              Contacto
            </Link>
            {!authUser && (
              <Link
                href="/auth/login"
                className="text-zinc-300 hover:bg-zinc-800/50 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Iniciar Sesion
              </Link>
            )}
          </div>
          <div className="md:hidden flex items-center">
            <label className="flex flex-col gap-2 w-8">
              <input
                className="peer hidden"
                type="checkbox"
                onChange={(_) => toggleMenu()}
              />
              <div className="rounded-2xl h-[3px] w-1/2 bg-white duration-500 peer-checked:rotate-[225deg] origin-right peer-checked:-translate-x-[12px] peer-checked:-translate-y-[1px]"></div>
              <div className="rounded-2xl h-[3px] w-full bg-white duration-500 peer-checked:-rotate-45"></div>
              <div className="rounded-2xl h-[3px] w-1/2 bg-white duration-500 place-self-end peer-checked:rotate-[225deg] origin-left peer-checked:translate-x-[12px] peer-checked:translate-y-[1px]"></div>
            </label>
          </div>
        </div>
      </div>
      {isClicked && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              href="/"
              className="text-zinc-300 block hover:bg-zinc-800/50 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors"
            >
              Inicio
            </Link>
            <Link
              href="/about"
              className="text-zinc-300 block hover:bg-zinc-800/50 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors"
            >
              Acerca de
            </Link>
            <Link
              href="/contact"
              className="text-zinc-300 block hover:bg-zinc-800/50 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors"
            >
              Contacto
            </Link>
            {!authUser && (
              <Link
                href="/auth/login"
                className="text-zinc-300 block hover:bg-zinc-800/50 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Iniciar Sesion
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
