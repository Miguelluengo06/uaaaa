import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <div className="container flex flex-col items-center justify-center min-h-[70vh] py-8 md:py-12">
      <div className="mx-auto flex max-w-[800px] flex-col items-center justify-center text-center">
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">404</h1>
        <p className="mt-4 text-xl text-muted-foreground">La página que estás buscando no existe o ha sido movida.</p>
        <div className="mt-8">
          <Button asChild>
            <Link href="/">Volver al inicio</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

