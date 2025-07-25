import Link from "next/link";

const Hero = () => (
  <div className="text-center py-16">
    <h1 className="text-5xl font-bold mb-4">
      Bienvenido/a a TecnoBlog (nueva versión del Blog del Informático)
    </h1>
    <p className="text-xl text-gray-600 mb-8">
      Noticias, tutoriales y recursos sobre desarrollo web y tecnología.
    </p>
    <Link
      href={"/posts"}
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
    >
      Explorar Posts
    </Link>
  </div>
);

export default Hero;
