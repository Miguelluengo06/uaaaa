import fs from "fs"
import path from "path"
import { v4 as uuidv4 } from "uuid"
import { slugify } from "@/lib/utils"

// Directorio donde se almacenarán los posts
const postsDirectory = path.join(process.cwd(), "data/posts")

// Asegurarse de que el directorio existe
if (!fs.existsSync(postsDirectory)) {
  fs.mkdirSync(postsDirectory, { recursive: true })
}

export interface Post {
  id: string
  title: string
  slug: string
  date: string
  excerpt: string
  content: string
  tags?: string[]
}

export async function getPosts(): Promise<Post[]> {
  // Asegurarse de que el directorio existe
  if (!fs.existsSync(postsDirectory)) {
    return []
  }

  const fileNames = fs.readdirSync(postsDirectory)
  const posts = fileNames
    .filter((fileName) => fileName.endsWith(".json"))
    .map((fileName) => {
      const fullPath = path.join(postsDirectory, fileName)
      const fileContents = fs.readFileSync(fullPath, "utf8")
      const post = JSON.parse(fileContents) as Post

      return post
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  return posts
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  // Asegurarse de que el directorio existe
  if (!fs.existsSync(postsDirectory)) {
    return null
  }

  const fileNames = fs.readdirSync(postsDirectory)
  const fileName = fileNames.find((file) => file.startsWith(`${slug}.`))

  if (!fileName) {
    return null
  }

  const fullPath = path.join(postsDirectory, fileName)
  const fileContents = fs.readFileSync(fullPath, "utf8")
  const post = JSON.parse(fileContents) as Post

  return post
}

interface PostInput {
  title: string
  excerpt?: string
  content: string
  tags?: string[]
}

export async function createPostApi(postData: PostInput): Promise<string> {
  const id = uuidv4()
  const date = new Date().toISOString()
  const slug = slugify(postData.title)

  const post: Post = {
    id,
    title: postData.title,
    slug,
    date,
    excerpt: postData.excerpt || "",
    content: postData.content,
    tags: postData.tags || [],
  }

  // Asegurarse de que el directorio existe
  if (!fs.existsSync(postsDirectory)) {
    fs.mkdirSync(postsDirectory, { recursive: true })
  }

  const fullPath = path.join(postsDirectory, `${slug}.json`)
  fs.writeFileSync(fullPath, JSON.stringify(post, null, 2))

  return slug
}

export async function updatePostApi(slug: string, postData: PostInput): Promise<boolean> {
  const existingPost = await getPostBySlug(slug)

  if (!existingPost) {
    return false
  }

  const updatedPost: Post = {
    ...existingPost,
    title: postData.title,
    excerpt: postData.excerpt || existingPost.excerpt,
    content: postData.content,
    tags: postData.tags || existingPost.tags,
  }

  const fullPath = path.join(postsDirectory, `${slug}.json`)
  fs.writeFileSync(fullPath, JSON.stringify(updatedPost, null, 2))

  return true
}

export async function deletePostApi(slug: string): Promise<boolean> {
  const fullPath = path.join(postsDirectory, `${slug}.json`)

  if (!fs.existsSync(fullPath)) {
    return false
  }

  fs.unlinkSync(fullPath)
  return true
}

