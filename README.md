# TecnoBlog (nueva versión) - Un Blog Minimalista y Moderno

¡Bienvenido a TecnoBlog (lo que era el blog del informático) totalmente remasterizado! Un proyecto de blog personal (creado inicialmente con Spring Boot y ahora migrado a Next.js 15) con las últimas tecnologías web, diseñado para ser rápido, funcional y estéticamente agradable.

![Landing Page](./public/placeholder.jpg)

---

## Tecnologías y Características Principales

Este proyecto fue construido utilizando un stack de tecnologías moderno, enfocado en el rendimiento y la experiencia de desarrollo.

- **Framework:** [Next.js 15](https://nextjs.org/) (con App Router)
- **Lenguaje:** [TypeScript](https://www.typescriptlang.org/)
- **Backend y Base de Datos:** [Supabase](https://supabase.io/)
- **Estilos:** [Tailwind CSS](https://tailwindcss.com/)
- **Linting:** [ESLint](https://eslint.org/)

### Funcionalidades Clave

- **Diseño Responsivo:** Interfaz adaptable a cualquier tamaño de pantalla.
- **Gestión de Posts:** Funcionalidades CRUD (Crear, Leer, Actualizar, Borrar) para los artículos del blog, conectadas a Supabase.
- **Páginas Estáticas y Dinámicas:** Uso del App Router de Next.js para una navegación fluida y optimizada.
- **Componentes Reutilizables:** Una arquitectura basada en componentes para mantener el código limpio y escalable.
- **Server Actions:** Lógica de backend implementada de forma segura y eficiente del lado del servidor.

---

## Primeros Pasos

Para levantar el proyecto en tu entorno local, seguí estos simples pasos.

### Pre-requisitos

Asegurate de tener instalado [Node.js](https://nodejs.org/) (versión 18 o superior) y [npm](https://www.npmjs.com/).

### Instalación

1.  **Cloná el repositorio:**

    ```bash
    git clone https://github.com/juncos22/tecno-blog.git
    cd it-blog
    ```

2.  **Instalá las dependencias:**
    ```bash
    npm install
    ```

### Variables de Entorno

Para que la aplicación se conecte con Supabase, necesitás configurar tus credenciales.

1.  Creá un archivo `.env.local` en la raíz del proyecto.
2.  Añadí las siguientes variables con tus claves de Supabase:

    ```env
    NEXT_PUBLIC_SUPABASE_URL=TU_SUPABASE_URL
    NEXT_PUBLIC_SUPABASE_ANON_KEY=TU_SUPABASE_ANON_KEY
    ```

    Podés encontrar estas claves en el dashboard de tu proyecto de Supabase, en la sección `Project Settings > API`.

---

## Ejecutar la Aplicación

Una vez configurado, podés iniciar el servidor de desarrollo:

```bash
npm run dev
```

Abrí [http://localhost:3000](http://localhost:3000) en tu navegador para ver el resultado.

---

## Funcionalidades Implementadas

El proyecto cuenta con una base sólida que incluye:

- **`app/actions/index.ts`**: Contiene las `Server Actions` para interactuar con la tabla `blog_post` en Supabase.
  - `getBlogPosts()`: Obtiene todos los artículos.
  - `getBlogPostBySlug(slug)`: Obtiene un artículo específico por su `slug`.
  - `createBlogPost(post)`: Crea un nuevo artículo.
  - `updateBlogPost(id, post)`: Actualiza un artículo existente.
  - `deleteBlogPost(id)`: Elimina un artículo.
- **Componentes Principales:**
  - `Navbar`: Barra de navegación superior.
  - `Footer`: Pie de página.
  - `LandingPage`: La página de inicio que da la bienvenida a los visitantes.
  - `PostCard` y `FeaturedPostCard`: Tarjetas para mostrar los artículos del blog.
  - `ProfileCard`: Una tarjeta de presentación personal.
- **Estructura de Rutas:**
  - `/`: Página de inicio.
  - `/about`: Página de información sobre el autor o el blog.
  - `/contact`: Página de contacto.
  - `/posts/[slug]`: Ruta dinámica para mostrar el contenido de cada artículo.

---

## Estructura del Proyecto

El proyecto sigue la estructura recomendada por Next.js 15, utilizando el `App Router`.

```
tecno-blog/
├── app/
│   ├── posts/           # Rutas dinámicas para los artículos
│   ├── about/           # Página "Sobre mí"
│   ├── contact/         # Página de contacto
|   ├── layout.tsx       # Layout principal
│   └── page.tsx         # Página de inicio
├── components/      # Componentes reutilizables de React
├── lib/             # Funciones de utilidad, definiciones de tipos y cliente de Supabase
├── public/              # Archivos estáticos (imágenes, etc.)
├── .env.local           # (Necesita ser creado) Variables de entorno
├── next.config.ts       # Configuración de Next.js
└── package.json         # Dependencias y scripts del proyecto
```
