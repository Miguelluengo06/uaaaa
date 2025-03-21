import { NextResponse } from "next/server"
import { getPosts, createPostApi } from "@/lib/posts"

export async function GET() {
  try {
    const posts = await getPosts()
    return NextResponse.json(posts)
  } catch (error) {
    return NextResponse.json({ error: "Error fetching posts" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { title, excerpt, content, tags } = body

    if (!title || !content) {
      return NextResponse.json({ error: "Title and content are required" }, { status: 400 })
    }

    const slug = await createPostApi({ title, excerpt, content, tags })

    return NextResponse.json({ slug }, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Error creating post" }, { status: 500 })
  }
}

