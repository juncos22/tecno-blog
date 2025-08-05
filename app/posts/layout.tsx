import Navbar from "@/components/navbar";
import {createClient} from "@/lib/supabase/server";
import React from "react";

type PostLayoutProps = {
    children: React.ReactNode;
};
export default async function PostLayout({children}: PostLayoutProps) {
    const supabase = await createClient();
    const userRes = await supabase.auth.getUser();
    const {data: {session}}=await supabase.auth.getSession();
    const authUser = userRes.data.user;
    const {data} = await supabase.auth.getClaims();

    console.log("Logged user:", authUser);
    console.log("Session:", session);
    console.log("Data Claims:", data);
    return (
        <div>
            <Navbar authUser={authUser}/>
            <div id="posts" className="container mx-auto px-4 py-8">
                {children}
            </div>
        </div>
    );
}
