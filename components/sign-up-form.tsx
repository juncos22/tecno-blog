"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { signUp } from "@/app/auth/actions";

const initialState = {
  errors: {},
  message: null,
};

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 disabled:opacity-50"
      disabled={pending}
    >
      {pending ? "Creando su cuenta..." : "Registrarme"}
    </button>
  );
}

export function SignUpForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const [state, formAction] = useActionState(signUp, initialState);

  return (
    <form action={formAction}>
      <div className="rounded-md shadow-sm flex flex-col gap-y-3">
        <div className="grid gap-2">
          <label htmlFor="email">Correo Electronico</label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="m@example.com"
            required
            className="appearance-none rounded-md relative block w-full px-3 py-2 border border-zinc-700 bg-zinc-800/50 placeholder-zinc-400 text-white focus:outline-none focus:ring-teal-500 focus:border-teal-500 focus:z-10 sm:text-sm"
          />
        </div>
        <div className="grid gap-2">
          <label htmlFor="password">Contraseña</label>
          <input
            id="password"
            name="password"
            type="password"
            required
            className="appearance-none rounded-md relative block w-full px-3 py-2 border border-zinc-700 bg-zinc-800/50 placeholder-zinc-400 text-white focus:outline-none focus:ring-teal-500 focus:border-teal-500 focus:z-10 sm:text-sm"
          />
        </div>
        <div className="grid gap-2">
          <label htmlFor="confirmPassword">Confirmar Contraseña</label>
          <input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            required
            className="appearance-none rounded-md relative block w-full px-3 py-2 border border-zinc-700 bg-zinc-800/50 placeholder-zinc-400 text-white focus:outline-none focus:ring-teal-500 focus:border-teal-500 focus:z-10 sm:text-sm"
          />
        </div>
        {state.errors &&
          Array.isArray(state.errors) &&
          state.errors.map((err: any, i: number) => (
            <p key={i} className="text-sm text-red-500">
              {err.message}
            </p>
          ))}
        {state.error && <p className="text-sm text-red-500">{state.error}</p>}
        <SubmitButton />
      </div>
    </form>
  );
}
