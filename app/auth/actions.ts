"use server";

import { createClient } from "@/lib/supabase/server";
import { z } from "zod";
import { redirect } from "next/navigation";

const passwordSchema = z
  .string()
  .min(6, { message: "La contraseña debe tener al menos 6 caracteres" });

const signUpSchema = z
  .object({
    email: z.email({ message: "Correo electrónico inválido" }),
    password: passwordSchema,
    confirmPassword: passwordSchema,
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Las contraseñas no coinciden",
    path: ["confirmPassword"],
  });

const loginSchema = z.object({
  email: z.email({ message: "Correo electrónico inválido" }),
  password: z
    .string()
    .min(1, { message: "La contraseña no puede estar vacía" }),
});

export async function updatePassword(prevState: any, formData: FormData) {
  const supabase = await createClient();
  const password = formData.get("password") as string;
  const confirmPassword = formData.get("confirmPassword") as string;

  if (password !== confirmPassword) {
    return {
      ...prevState,
      error: "Las contraseñas no coinciden",
    };
  }

  const validatedPassword = passwordSchema.safeParse(password);

  if (!validatedPassword.success) {
    return {
      ...prevState,
      error: validatedPassword.error.message,
    };
  }

  const { error } = await supabase.auth.updateUser({
    password: validatedPassword.data,
  });

  if (error) {
    return {
      ...prevState,
      error: error.message,
    };
  }

  return {
    ...prevState,
    error: null,
    message: "Contraseña actualizada correctamente",
  };
}

export async function login(prevState: any, formData: FormData) {
  const supabase = await createClient();
  const validatedFields = loginSchema.safeParse(
    Object.fromEntries(formData.entries())
  );

  if (!validatedFields.success) {
    return {
      ...prevState,
      errors: validatedFields.error.issues,
      message: "Error de validación",
    };
  }

  const { email, password } = validatedFields.data;

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return {
      ...prevState,
      error: error.message,
    };
  }

  redirect("/posts");
}

export async function signUp(prevState: any, formData: FormData) {
  const supabase = await createClient();
  const validatedFields = signUpSchema.safeParse(
    Object.fromEntries(formData.entries())
  );

  if (!validatedFields.success) {
    return {
      ...prevState,
      errors: validatedFields.error.issues,
      message: "Error de validación",
    };
  }

  const { email, password } = validatedFields.data;

  const { error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) {
    return {
      ...prevState,
      error: error.message,
    };
  }
  redirect("/posts");
}
