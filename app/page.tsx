import Link from "next/link"
import { getPosts } from "@/lib/posts"
import { formatDate } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"

export default async function Home() {
  const posts = await getPosts()

  return (
    <div className="container py-8 md:py-12">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold tracking-tight md:text-4xl">Blog</h1>
        <Link href="/admin/new">
          <Button>
            <PlusCircle className="w-4 h-4 mr-2" />
            Nuevo Post
          </Button>
        </Link>
      </div>

      {posts.length === 0 ? (
        <div className="text-center py-12">
          <h2 className="text-xl font-medium text-muted-foreground">No hay posts todavía</h2>
          <p className="mt-2 text-muted-foreground">Crea tu primer post para comenzar</p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <Link key={post.slug} href={`/posts/${post.slug}`}>
              <div className="group relative overflow-hidden rounded-lg border bg-background p-5 transition-all hover:border-primary">
                <div className="flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <h2 className="text-xl font-medium">{post.title}</h2>
                    <p className="text-muted-foreground line-clamp-2">{post.excerpt}</p>
                  </div>
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
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}

