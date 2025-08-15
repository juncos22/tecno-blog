import Navbar from "@/components/navbar";
import { createClient } from "@/lib/supabase/server";
import React from "react";

type PostLayoutProps = {
  children: React.ReactNode;
};
export default async function PostLayout({ children }: PostLayoutProps) {
  const supabase = await createClient();
  const userRes = await supabase.auth.getUser();
  const authUser = userRes.data.user;
  return (
    <div>
      <Navbar authUser={authUser} />
      <div id="posts" className="container mx-auto px-4 py-8">
        {children}
      </div>
    </div>
  );
}
