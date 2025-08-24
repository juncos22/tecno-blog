import { SignUpForm } from "@/components/sign-up-form";
import Link from "next/link";
import SocialButtons from "@/components/social-buttons";

// export const runtime = "edge";

export default function Page() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-950">
      <div className="max-w-md w-full space-y-8 bg-zinc-900/50 border border-zinc-800/50 rounded-xl p-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
            Registre su cuenta
          </h2>
        </div>
        <SignUpForm />
        <SocialButtons />
        <div className="text-sm text-center">
          <p className="text-zinc-400">
            Ya posee una cuenta?{" "}
            <Link
              href="/auth/login"
              className="font-medium text-teal-500 hover:text-teal-400"
            >
              Ingrese
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
