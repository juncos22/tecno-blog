export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ error: string }>;
}) {
  const params = await searchParams;

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <div className="flex flex-col gap-6">
          <div>
            <div>
              <h1 className="text-2xl">Ups! Algo salió mal 😅</h1>
            </div>
            <div>
              {params?.error ? (
                <p className="text-sm text-muted-foreground">
                  Código de error: {params.error}
                </p>
              ) : (
                <p className="text-sm text-muted-foreground">
                  Ocurrió un error no especificado.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
