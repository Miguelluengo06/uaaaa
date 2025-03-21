import { NextResponse } from "next/server"
import { getPostBySlug, updatePostApi, deletePostApi } from "@/lib/posts"

interface RouteParams {
  params: {
    slug: string
  }
}

export async function GET(request: Request, { params }: RouteParams) {
  try {
    const post = await getPostBySlug(params.slug)

    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 })
    }

    return NextResponse.json(post)
  } catch (error) {
    return NextResponse.json({ error: "Error fetching post" }, { status: 500 })
  }
}

export async function PUT(request: Request, { params }: RouteParams) {
  try {
    const body = await request.json()
    const { title, excerpt, content, tags } = body

    if (!title || !content) {
      return NextResponse.json({ error: "Title and content are required" }, { status: 400 })
    }

    const updated = await updatePostApi(params.slug, { title, excerpt, content, tags })

    if (!updated) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: "Error updating post" }, { status: 500 })
  }
}

export async function DELETE(request: Request, { params }: RouteParams) {
  try {
    const deleted = await deletePostApi(params.slug)

    if (!deleted) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: "Error deleting post" }, { status: 500 })
  }
}

