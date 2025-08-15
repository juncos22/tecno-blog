"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { updatePassword } from "@/app/auth/actions";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const initialState = {
  error: null,
  message: null,
};

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      className="w-full bg-indigo-500 rounded-md py-3 text-[#212121] cursor-pointer hover:bg-indigo-900 hover:text-[#f5f5f5] transition-colors"
      disabled={pending}
    >
      {pending ? "Guardando..." : "Guardar contraseña nueva"}
    </button>
  );
}

export function UpdatePasswordForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const [state, formAction] = useActionState(updatePassword, initialState);
  const router = useRouter();

  useEffect(() => {
    if (state.message) {
      router.push("/posts");
    }
  }, [state.message, router]);

  return (
    <div className="flex flex-col gap-6" {...props}>
      <div>
        <div>
          <h1 className="text-2xl">Resetea tu Contraseña</h1>
          <p>Por favor ingrese su contraseña abajo.</p>
        </div>
        <div>
          <form action={formAction}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <label htmlFor="password">Nueva Contraseña</label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Nueva Contraseña"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-zinc-700 bg-zinc-800/50 placeholder-zinc-400 text-white rounded-t-md focus:outline-none focus:ring-teal-500 focus:border-teal-500 focus:z-10 sm:text-sm"
                />
              </div>
              <div className="grid gap-2">
                <label htmlFor="confirmPassword">
                  Confirmar Nueva Contraseña
                </label>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  placeholder="Confirmar Nueva Contraseña"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-zinc-700 bg-zinc-800/50 placeholder-zinc-400 text-white rounded-t-md focus:outline-none focus:ring-teal-500 focus:border-teal-500 focus:z-10 sm:text-sm"
                />
              </div>
              {state.error && (
                <p className="text-sm text-red-500">{state.error}</p>
              )}
              <SubmitButton />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
