"use server";
import { createClient } from "@/lib/supabase/server";
import { nanoid } from "nanoid";

export async function uploadImage(file: File, folderName: string) {
  const supabase = await createClient();
  const filename = `${nanoid()}.${file.type.split("/")[1]}`; //TODO: Cambiar por el id de la publicación o el usuario para mayor facilidad de acceso y modificación.

  const { data, error } = await supabase.storage
    .from("tecno-blog-bucket")
    .upload(`${folderName}/${filename}`, file, {
      cacheControl: "3600",
      upsert: false,
    });

  if (error) {
    console.error("Error uploading image:", error);
    return null;
  }

  return data.path;
}

export async function getImageUrl(path: string) {
  const supabase = await createClient();
  const { data } = supabase.storage
    .from("tecno-blog-bucket")
    .getPublicUrl(path);

  return data.publicUrl;
}
