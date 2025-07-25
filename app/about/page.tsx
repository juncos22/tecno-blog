import React from "react";
import ProfileCard from "@/components/profile-card";

const AboutPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-4">¿De que se trata el sitio?</h1>
      <p className="text-lg">
        Se trata de un sitio donde podés compartir tus conocimientos sobre
        informática en cualquier ámbito del rubro, ¡sin importar tu nivel de
        experiencia y aptitudes!.
      </p>
      <h1 className="text-4xl font-bold mb-4 mt-15">Sobre mí</h1>
      <ProfileCard />
    </div>
  );
};
export default AboutPage;
