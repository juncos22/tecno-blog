const Footer = () => {
  return (
    <footer className="bg-zinc-950/50 border-t border-zinc-800/50 mt-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center items-center h-16">
          <p className="text-zinc-400 text-sm">
            © {new Date().getFullYear()} TecnoBlog. Todos los derechos
            reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
