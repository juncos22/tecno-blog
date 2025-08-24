"use client";

import { useState, useTransition } from "react";
import { deleteBlogPost } from "@/app/posts/actions";
import { useRouter } from "next/navigation";

interface DeletePostButtonProps {
  postId: string;
}

const DeletePostButton = ({ postId }: DeletePostButtonProps) => {
  const [showConfirm, setShowConfirm] = useState(false);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleDelete = async () => {
    startTransition(async () => {
      try {
        const result = await deleteBlogPost(postId);
        if (result) {
          setShowConfirm(false);
          router.push("/posts");
        }
      } catch (error) {
        console.log(error);
      }
    });
  };

  return (
    <>
      <button
        onClick={() => setShowConfirm(true)}
        className="text-red-500 hover:underline cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={isPending}
      >
        Eliminar Post
      </button>

      {showConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50">
          <div className="bg-zinc-900 rounded-xl p-8 shadow-2xl border border-zinc-800/50 max-w-sm mx-auto">
            <h2 className="text-xl font-bold text-white mb-4">
              Confirmar Eliminación
            </h2>
            <p className="text-zinc-300 mb-6">
              ¿Estás seguro de que quieres eliminar este post? Esta acción no se
              puede deshacer.
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setShowConfirm(false)}
                className="py-2 px-4 rounded-md text-white bg-zinc-700 hover:bg-zinc-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-zinc-500 focus:ring-offset-zinc-900"
                disabled={isPending}
              >
                Cancelar
              </button>
              <button
                onClick={handleDelete}
                className="py-2 px-4 rounded-md text-white bg-red-600 hover:bg-red-700 disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 focus:ring-offset-zinc-900"
                disabled={isPending}
              >
                {isPending ? "Eliminando..." : "Eliminar"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DeletePostButton;
