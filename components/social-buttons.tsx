"use client"
import Google from "@/components/icons/google";
import LinkedIn from "@/components/icons/linkedin";
import GitHub from "@/components/icons/github";
import {createClient} from "@/lib/supabase/client";
import {useState} from "react";
import Alert, {AlertData} from "@/components/alert";

const SocialButtons = () => {
    const [alertData, setAlertData] = useState<AlertData | null>(null);

    const handleGoogleLogin = async () => {
        try {
            const supabase = createClient();
            const {data, error} = await supabase.auth.signInWithOAuth({
                provider: 'google',
                options: {
                    redirectTo: `${window.location.origin}/posts`,
                }
            })
            if (error) {
                setAlertData({type: 'error', message: 'Error al intentar iniciar sesión'});
                return;
            }
            console.log("Google Login:", data);
        } catch (error: any) {
            console.log(error);
            setAlertData({type: 'error', message: error.message});
        }
    }
    const handleGithubLogin = async () => {
        try {
            const supabase = createClient();
            const {data, error} = await supabase.auth.signInWithOAuth({
                provider: 'github',
                options: {
                    redirectTo: `${window.location.origin}/posts`,
                }
            })
            if (error) {
                setAlertData({type: 'error', message: 'Error al intentar iniciar sesión'});
                return;
            }
            console.log("Github Login:", data);
        } catch (error: any) {
            console.log(error);
            setAlertData({type: 'error', message: error.message});
        }
    }
    return (
        <div className={'flex flex-col items-center justify-center gap-y-2'}>
            <div className={'flex items-center justify-center gap-x-2 my-2'}>
                <button
                    onClick={handleGoogleLogin}
                    className="p-5 rounded-full backdrop-blur-lg border border-white/10 bg-gradient-to-tr
                from-black/60 to-black/40 shadow-lg hover:shadow-2xl hover:shadow-white/20
                 hover:scale-110 hover:rotate-3 active:scale-95 active:rotate-0 transition-all
                 duration-300 ease-out cursor-pointer hover:border-white/30 hover:bg-gradient-to-tr
                 hover:from-white/10 hover:to-black/40 group relative overflow-hidden"
                >
                    <div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent
                    -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out"
                    ></div>
                    <div className="relative z-10">
                        <Google/>
                    </div>
                </button>

                <button
                    onClick={() => {
                        console.log('clicked linkedin');
                    }}
                    className="p-5 rounded-full backdrop-blur-lg border border-green-500/20 bg-gradient-to-tr
                from-black/60 to-black/40 shadow-lg hover:shadow-2xl hover:shadow-green-500/30 hover:scale-110
                hover:rotate-2 active:scale-95 active:rotate-0 transition-all duration-300 ease-out cursor-pointer
                hover:border-green-500/50 hover:bg-gradient-to-tr hover:from-green-500/10 hover:to-black/40
                group relative overflow-hidden"
                >
                    <div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-green-400/20 to-transparent
                    -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out"
                    ></div>
                    <div className="relative z-10">
                        <LinkedIn/>
                    </div>
                </button>

                <button
                    onClick={handleGithubLogin}
                    className="p-5 rounded-full backdrop-blur-lg border border-indigo-500/20 bg-gradient-to-tr
                from-black/60 to-black/40 shadow-lg hover:shadow-2xl hover:shadow-indigo-500/30 hover:scale-110
                hover:-rotate-2 active:scale-95 active:rotate-0 transition-all duration-300 ease-out cursor-pointer
                hover:border-indigo-500/50 hover:bg-gradient-to-tr hover:from-indigo-500/10 hover:to-black/40
                group relative overflow-hidden"
                >
                    <div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-indigo-400/20 to-transparent
                    -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out"
                    ></div>
                    <div className="relative z-10">
                        <GitHub/>
                    </div>
                </button>
            </div>
            {alertData && <Alert type={alertData.type} message={alertData.message}/>}
        </div>
    )
}
export default SocialButtons;