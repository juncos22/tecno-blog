import Image from "next/image";
import Link from "next/link";
import { ProfileMenu } from "@/components/profile-menu/profile-menu";
import { type User } from "@supabase/supabase-js";

type NavbarProps = {
  authUser: User | null;
};
const Navbar = ({ authUser }: NavbarProps) => {
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
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
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
              {!authUser ? (
                <Link
                  href="/auth/login"
                  className="text-zinc-300 hover:bg-zinc-800/50 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  Iniciar Sesion
                </Link>
              ) : (
                <ProfileMenu user={authUser} />
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
