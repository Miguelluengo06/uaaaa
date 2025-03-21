"use server"

import { revalidatePath } from "next/cache"
import { createPostApi, updatePostApi, deletePostApi } from "@/lib/posts"

interface PostInput {
  title: string
  excerpt?: string
  content: string
  tags?: string[]
}

export async function createPost(postData: PostInput): Promise<string> {
  const slug = await createPostApi(postData)
  revalidatePath("/")
  revalidatePath(`/posts/${slug}`)
  return slug
}

export async function updatePost(slug: string, postData: PostInput): Promise<boolean> {
  const success = await updatePostApi(slug, postData)
  revalidatePath("/")
  revalidatePath(`/posts/${slug}`)
  return success
}

export async function deletePost(slug: string): Promise<boolean> {
  const success = await deletePostApi(slug)
  revalidatePath("/")
  return success
}

interface ContactFormData {
  name: string
  email: string
  message: string
}

export async function sendContactForm(data: ContactFormData): Promise<void> {
  // En un entorno real, aquí enviarías el email
  // Por ejemplo, usando un servicio como SendGrid, Mailgun, etc.
  console.log("Contact form submission:", data)

  // Simular un retraso para dar sensación de procesamiento
  await new Promise((resolve) => setTimeout(resolve, 1000))
}

