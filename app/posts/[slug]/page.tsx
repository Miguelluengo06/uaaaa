import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { getPostBySlug, getPosts } from "@/lib/posts"
import { formatDate } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ChevronLeft, Edit } from "lucide-react"

interface PostPageProps {
  params: {
    slug: string
  }
}

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  const post = await getPostBySlug(params.slug)

  if (!post) {
    return {
      title: "Post no encontrado",
    }
  }

  return {
    title: post.title,
    description: post.excerpt,
  }
}

export async function generateStaticParams() {
  const posts = await getPosts()

  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export default async function PostPage({ params }: PostPageProps) {
  const post = await getPostBySlug(params.slug)

  if (!post) {
    notFound()
  }

  return (
    <div className="container py-8 md:py-12">
      <div className="mx-auto max-w-3xl">
        <div className="flex items-center justify-between mb-8">
          <Link href="/">
            <Button variant="ghost">
              <ChevronLeft className="w-4 h-4 mr-2" />
              Volver
            </Button>
          </Link>
          <Link href={`/admin/edit/${params.slug}`}>
            <Button variant="outline">
              <Edit className="w-4 h-4 mr-2" />
              Editar
            </Button>
          </Link>
        </div>

        <article className="prose dark:prose-invert max-w-none">
          <h1>{post.title}</h1>
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">{formatDate(post.date)}</p>
            <div className="flex items-center gap-2">
              {post.tags?.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
          <div dangerouslySetInnerHTML={{ __html: post.content }} />
        </article>
      </div>
    </div>
  )
}

