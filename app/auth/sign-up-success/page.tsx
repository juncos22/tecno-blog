export default function Page() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <div className="flex flex-col gap-6">
          <div>
            <div>
              <h1 className="text-2xl">Gracias por registrarte!</h1>
              <p>Hecha un vistazo a tu correo para continuar.</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">
                Fuiste registrado/a exitosamente. Revisa tu correo para
                completar el registro.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
