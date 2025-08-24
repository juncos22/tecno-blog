import React from "react";

// export const runtime = "edge";

const ContactPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-4">Contacta conmigo</h1>
      <p className="text-lg mb-4">
        Si tiene alguna pregunta, sugerencia o desea ponerse en contacto con
        nosotros, no dude en contactarnos.
      </p>
      <form>
        <div className="mb-4">
          <label htmlFor="name" className="block text-lg font-medium mb-2">
            Nombre
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-lg font-medium mb-2">
            Correo
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="message" className="block text-lg font-medium mb-2">
            Mensaje
          </label>
          <textarea
            id="message"
            name="message"
            rows={4}
            className="w-full p-2 border rounded"
          ></textarea>
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Enviar Mensaje
        </button>
      </form>
    </div>
  );
};

export default ContactPage;
