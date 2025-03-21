"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { updatePost, deletePost } from "@/lib/actions"
import { Editor } from "@/components/editor"
import { Trash2 } from "lucide-react"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

interface EditPostPageProps {
  params: {
    slug: string
  }
}

export default function EditPostPage({ params }: EditPostPageProps) {
  const router = useRouter()
  const [post, setPost] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [content, setContent] = useState("")

  useEffect(() => {
    async function fetchPost() {
      try {
        const response = await fetch(`/api/posts/${params.slug}`)
        if (!response.ok) throw new Error("Failed to fetch post")
        const data = await response.json()
        setPost(data)
        setContent(data.content)
        setIsLoading(false)
      } catch (error) {
        console.error("Error fetching post:", error)
        router.push("/")
      }
    }

    fetchPost()
  }, [params.slug, router])

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsSubmitting(true)

    const formData = new FormData(event.currentTarget)
    const title = formData.get("title") as string
    const excerpt = formData.get("excerpt") as string
    const tags = formData.get("tags") as string

    try {
      await updatePost(params.slug, {
        title,
        excerpt,
        content,
        tags: tags
          .split(",")
          .map((tag) => tag.trim())
          .filter(Boolean),
      })

      router.push(`/posts/${params.slug}`)
    } catch (error) {
      console.error("Error updating post:", error)
      setIsSubmitting(false)
    }
  }

  async function handleDelete() {
    try {
      await deletePost(params.slug)
      router.push("/")
    } catch (error) {
      console.error("Error deleting post:", error)
    }
  }

  if (isLoading) {
    return (
      <div className="container py-8 md:py-12">
        <div className="mx-auto max-w-3xl">
          <p>Cargando...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container py-8 md:py-12">
      <div className="mx-auto max-w-3xl">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold tracking-tight">Editar Post</h1>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive">
                <Trash2 className="w-4 h-4 mr-2" />
                Eliminar
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
                <AlertDialogDescription>
                  Esta acción no se puede deshacer. El post será eliminado permanentemente.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                <AlertDialogAction onClick={handleDelete}>Eliminar</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title">Título</Label>
            <Input id="title" name="title" defaultValue={post.title} required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="excerpt">Extracto</Label>
            <Textarea id="excerpt" name="excerpt" defaultValue={post.excerpt} required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="tags">Etiquetas (separadas por comas)</Label>
            <Input
              id="tags"
              name="tags"
              defaultValue={post.tags?.join(", ")}
              placeholder="tecnología, programación, etc."
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="content">Contenido</Label>
            <Editor value={content} onChange={setContent} />
          </div>

          <Button type="submit" disabled={isSubmitting} className="w-full">
            {isSubmitting ? "Guardando..." : "Actualizar Post"}
          </Button>
        </form>
      </div>
    </div>
  )
}

