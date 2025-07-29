"use client";

import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function UpdatePasswordForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    const supabase = createClient();
    setIsLoading(true);
    setError(null);

    try {
      const { error } = await supabase.auth.updateUser({ password });
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
    <div className="flex flex-col gap-6" {...props}>
      <div>
        <div>
          <h1 className="text-2xl">Resetea tu Contraseña</h1>
          <p>Por favor ingrese su contraseña abajo.</p>
        </div>
        <div>
          <form onSubmit={handleForgotPassword}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <label htmlFor="password">Nueva Contraseña</label>
                <input
                  id="password"
                  type="password"
                  placeholder="Nueva Contraseña"
                  required
                  value={password}
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-zinc-700 bg-zinc-800/50 placeholder-zinc-400 text-white rounded-t-md focus:outline-none focus:ring-teal-500 focus:border-teal-500 focus:z-10 sm:text-sm"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              {error && <p className="text-sm text-red-500">{error}</p>}
              <button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Guardando..." : "Guardar contraseña nueva"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
