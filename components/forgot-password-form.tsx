"use client";

import { createClient } from "@/lib/supabase/client";
import Link from "next/link";
import { useState } from "react";

export function ForgotPasswordForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    const supabase = createClient();
    setIsLoading(true);
    setError(null);

    try {
      // The url which will be included in the email. This URL needs to be configured in your redirect URLs in the Supabase dashboard at https://supabase.com/dashboard/project/_/auth/url-configuration
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/update-password`,
        captchaToken: "",
      });
      if (error) throw error;
      setSuccess(true);
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`flex flex-col gap-6 ${className}`} {...props}>
      {success ? (
        <div>
          <div>
            <h1 className="text-2xl">Revista tu correo</h1>
            <p>Instrucciones para el reseteo de contraseña enviadas.</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">
              If you registered using your email and password, you will receive
              a password reset email.
            </p>
          </div>
        </div>
      ) : (
        <div>
          <div>
            <h1 className="text-2xl">Resetear tu Contraseña</h1>
            <p>
              Ingresa tu correo y contraseña para enviarte la solicitud de
              reseteo.
            </p>
          </div>
          <div>
            <form onSubmit={handleForgotPassword}>
              <div className="flex flex-col gap-6">
                <div className="grid gap-2">
                  <label htmlFor="email">Email</label>
                  <input
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    required
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-zinc-700 bg-zinc-800/50 placeholder-zinc-400 text-white rounded-b-md focus:outline-none focus:ring-teal-500 focus:border-teal-500 focus:z-10 sm:text-sm"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                {error && <p className="text-sm text-red-500">{error}</p>}
                <button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Sending..." : "Send reset email"}
                </button>
              </div>
              <div className="mt-4 text-center text-sm">
                Ya posee cuenta?{" "}
                <Link
                  href="/auth/login"
                  className="underline underline-offset-4"
                >
                  Ingrese
                </Link>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
