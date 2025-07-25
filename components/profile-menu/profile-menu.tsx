"use client";
import { createClient } from "@/lib/supabase/client";
import { type User } from "@supabase/supabase-js";
import Link from "next/link";
import { useRouter } from "next/navigation";

type ProfileMenuProps = {
  user: User;
};
export const ProfileMenu = ({ user }: ProfileMenuProps) => {
  const router = useRouter();
  const logout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/auth/login");
  };
  /**
   * Icon classname
   *   className="group-hover:rounded-lg p-3 bg-transparent hover:bg-[#cc39a4] backdrop-blur-md group-hover:shadow-xl rounded-tl-lg flex justify-center items-center w-full h-full text-[#cc39a4] hover:text-white duration-200"
   */
  return (
    <div className="group grid grid-cols-3 gap-0 cursor-pointer hover:gap-2 duration-500 shadow-sm  relative top-5">
      <h1 className="absolute z-10 duration-200 top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          height={24}
          width={24}
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          className="w-7 h-7 text-white"
        >
          <path
            d="M5 7h14M5 12h14M5 17h14"
            strokeWidth={2}
            strokeLinecap="round"
            stroke="currentColor"
          />
        </svg>
      </h1>
      <a href="#">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="icon icon-tabler icons-tabler-outline icon-tabler-user-circle group-hover:rounded-lg p-3 bg-transparent hover:bg-[#cc39a4] backdrop-blur-md group-hover:shadow-xl rounded-tl-lg flex justify-center items-center w-full h-full text-[#cc39a4] hover:text-white duration-200"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
          <path d="M12 10m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
          <path d="M6.168 18.849a4 4 0 0 1 3.832 -2.849h4a4 4 0 0 1 3.834 2.855" />
        </svg>
      </a>
    </div>
  );
};
