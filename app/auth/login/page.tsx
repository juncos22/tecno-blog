import { LoginForm } from "@/components/login-form";
import Link from "next/link";

export default function Page() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-950">
      <div className="max-w-md w-full space-y-8 bg-zinc-900/50 border border-zinc-800/50 rounded-xl p-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
            Ingresa con tu Cuenta
          </h2>
        </div>
        <LoginForm />
        <div className="text-sm text-center">
          <p className="text-zinc-400">
            No posee una cuenta?{" "}
            <Link
              href="/auth/sign-up"
              className="font-medium text-teal-500 hover:text-teal-400"
            >
              Registrese
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
