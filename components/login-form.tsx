"use client";

import { createClient } from "@/lib/supabase/client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const supabase = createClient();
    setIsLoading(true);
    setError(null);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) {
        setError(error.message);
        return;
      }
      // Update this route to redirect to an authenticated route. The user already has an active session.
      router.push("/posts");
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <div className="rounded-md shadow-sm flex flex-col gap-y-3">
        <div>
          <label htmlFor="email-address" className="sr-only">
            Correo electronico
          </label>
          <input
            id="email-address"
            name="email"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
            required
            className="appearance-none rounded-md relative block w-full px-3 py-2 border border-zinc-700 bg-zinc-800/50 placeholder-zinc-400 text-white  focus:outline-none focus:ring-teal-500 focus:border-teal-500 focus:z-10 sm:text-sm"
            placeholder="Ingrese su correo"
          />
        </div>
        <div>
          <label htmlFor="password" className="sr-only">
            Contraseña
          </label>
          <input
            id="password"
            name="password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
            required
            className="appearance-none rounded-md relative block w-full px-3 py-2 border border-zinc-700 bg-zinc-800/50 placeholder-zinc-400 text-white focus:outline-none focus:ring-teal-500 focus:border-teal-500 focus:z-10 sm:text-sm"
            placeholder="Ingrese su contraseña"
          />
        </div>
        <div>
          <button
            type="submit"
            aria-disabled={isLoading}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 disabled:opacity-50"
            disabled={isLoading}
          >
            {isLoading ? "Ingresando..." : "Ingresar"}
          </button>
        </div>
      </div>
      {error && <p className="text-sm text-red-500">{error}</p>}
    </form>
  );
}
