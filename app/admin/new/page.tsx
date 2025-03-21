"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { createPost } from "@/lib/actions"
import { Editor } from "@/components/editor"

export default function NewPostPage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [content, setContent] = useState("")

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsSubmitting(true)

    const formData = new FormData(event.currentTarget)
    const title = formData.get("title") as string
    const excerpt = formData.get("excerpt") as string
    const tags = formData.get("tags") as string

    try {
      const slug = await createPost({
        title,
        excerpt,
        content,
        tags: tags
          .split(",")
          .map((tag) => tag.trim())
          .filter(Boolean),
      })

      router.push(`/posts/${slug}`)
    } catch (error) {
      console.error("Error creating post:", error)
      setIsSubmitting(false)
    }
  }

  return (
    <div className="container py-8 md:py-12">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-3xl font-bold tracking-tight mb-8">Crear Nuevo Post</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title">Título</Label>
            <Input id="title" name="title" required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="excerpt">Extracto</Label>
            <Textarea id="excerpt" name="excerpt" required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="tags">Etiquetas (separadas por comas)</Label>
            <Input id="tags" name="tags" placeholder="tecnología, programación, etc." />
          </div>

          <div className="space-y-2">
            <Label htmlFor="content">Contenido</Label>
            <Editor value={content} onChange={setContent} />
          </div>

          <Button type="submit" disabled={isSubmitting} className="w-full">
            {isSubmitting ? "Guardando..." : "Guardar Post"}
          </Button>
        </form>
      </div>
    </div>
  )
}

