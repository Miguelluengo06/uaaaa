import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Acerca de",
  description: "Información sobre este blog y su autor",
}

export default function AboutPage() {
  return (
    <div className="container py-8 md:py-12">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-3xl font-bold tracking-tight mb-6">Acerca de</h1>

        <div className="prose dark:prose-invert max-w-none">
          <p>
            ¡Hola! Bienvenido a mi blog personal. Este espacio está dedicado a compartir mis pensamientos, experiencias
            y conocimientos sobre tecnología, desarrollo web y otros temas que me apasionan.
          </p>

          <h2>¿Quién soy?</h2>
          <p>
            Soy un desarrollador web apasionado por crear experiencias digitales útiles y atractivas. Me especializo en
            tecnologías modernas como React, Next.js y Node.js, y disfruto compartiendo lo que aprendo en este camino.
          </p>

          <h2>Sobre este blog</h2>
          <p>
            Este blog fue creado con Next.js, un framework de React que permite crear aplicaciones web rápidas y
            optimizadas. Utiliza Tailwind CSS para el diseño y está desplegado en Netlify.
          </p>

          <h2>Contacto</h2>
          <p>
            Si quieres ponerte en contacto conmigo, puedes hacerlo a través del
            <a href="/contact"> formulario de contacto</a> o seguirme en mis redes sociales.
          </p>
        </div>
      </div>
    </div>
  )
}

