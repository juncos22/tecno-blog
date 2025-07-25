"use client";
import { createClient } from "@/lib/supabase/client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function SignUpForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    const supabase = createClient();
    setIsLoading(true);
    setError(null);

    if (password !== repeatPassword) {
      setError("Passwords do not match");
      setIsLoading(false);
      return;
    }

    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/protected`,
        },
      });
      if (error) throw error;
      router.push("/auth/sign-up-success");
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSignUp}>
      <div className="rounded-md shadow-sm flex flex-col gap-y-3">
        <div className="grid gap-2">
          <label htmlFor="email">Correo Electronico</label>
          <input
            id="email"
            type="email"
            placeholder="m@example.com"
            required
            value={email}
            className="appearance-none rounded-md relative block w-full px-3 py-2 border border-zinc-700 bg-zinc-800/50 placeholder-zinc-400 text-white focus:outline-none focus:ring-teal-500 focus:border-teal-500 focus:z-10 sm:text-sm"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="grid gap-2">
          <label htmlFor="password">Contraseña</label>
          <input
            id="password"
            type="password"
            required
            value={password}
            className="appearance-none rounded-md relative block w-full px-3 py-2 border border-zinc-700 bg-zinc-800/50 placeholder-zinc-400 text-white focus:outline-none focus:ring-teal-500 focus:border-teal-500 focus:z-10 sm:text-sm"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="grid gap-2">
          <label htmlFor="repeat-password">Confirmar Contraseña</label>
          <input
            id="repeat-password"
            type="password"
            required
            value={repeatPassword}
            className="appearance-none rounded-md relative block w-full px-3 py-2 border border-zinc-700 bg-zinc-800/50 placeholder-zinc-400 text-white focus:outline-none focus:ring-teal-500 focus:border-teal-500 focus:z-10 sm:text-sm"
            onChange={(e) => setRepeatPassword(e.target.value)}
          />
        </div>
        {error && <p className="text-sm text-red-500">{error}</p>}
        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 disabled:opacity-50"
          disabled={isLoading}
        >
          {isLoading ? "Creando su cuenta..." : "Registrarme"}
        </button>
      </div>
    </form>
  );
}
