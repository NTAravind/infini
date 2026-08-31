import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"

import { createClient } from "@/lib/supabase/server"
import type { Project } from "@/lib/types"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

export const dynamic = "force-dynamic"

const UUID_RE =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i

async function getProject(id: string): Promise<Project | null> {
  if (!UUID_RE.test(id)) return null

  try {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .eq("id", id)
      .eq("published", true)
      .maybeSingle()

    if (error || !data) return null
    return data as Project
  } catch {
    return null
  }
}

export default async function WorkDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const project = await getProject(id)

  if (!project) {
    notFound()
  }

  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1 border-t border-black">
        <div className="mx-auto w-full max-w-4xl px-5 py-16 md:px-8 md:py-24">
          <Link
            href="/#work"
            className="text-sm text-muted-foreground underline underline-offset-4 transition-colors hover:text-foreground"
          >
            ← Back to Our Work
          </Link>

          <div className="mt-10 flex flex-col gap-6 border-b border-black pb-10 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-[11px] font-medium uppercase tracking-[0.3em] text-muted-foreground">
                Project
              </p>
              <h1 className="mt-3 text-4xl font-semibold tracking-tight md:text-6xl">
                {project.title}
              </h1>
            </div>
            <Badge
              variant="outline"
              className="w-fit rounded-none border-black text-[11px] font-medium uppercase tracking-[0.15em]"
            >
              {project.category}
            </Badge>
          </div>

          <div className="mt-12 border border-black bg-white p-3">
            <div className="relative aspect-[16/10] w-full overflow-hidden md:aspect-[16/9]">
              {project.preview_image_url ? (
                <Image
                  src={project.preview_image_url}
                  alt={project.title}
                  fill
                  priority
                  sizes="(min-width: 768px) 896px, 100vw"
                  className="object-contain"
                />
              ) : (
                <div className="flex size-full items-center justify-center">
                  <p className="text-[11px] uppercase tracking-[0.3em] text-muted-foreground">
                    Image pending
                  </p>
                </div>
              )}
            </div>
          </div>

          <div className="mt-12 space-y-6 border-b border-black pb-12">
            {project.description.split(/\n{2,}/).map((paragraph, i) => (
              <p
                key={i}
                className="whitespace-pre-wrap text-lg leading-relaxed text-foreground md:text-xl"
              >
                {paragraph}
              </p>
            ))}

            {project.testimonial_text ? (
              <blockquote className="border-l-2 border-black pl-6 text-sm italic leading-relaxed text-muted-foreground md:text-base">
                “{project.testimonial_text}”
                {project.testimonial_author ? (
                  <footer className="mt-2 not-italic text-foreground">
                    — {project.testimonial_author}
                  </footer>
                ) : null}
              </blockquote>
            ) : null}

            <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground">
              {project.category} · Built by infini.io
            </p>
          </div>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            {project.project_url ? (
              <Button asChild className="h-12 rounded-none px-8 text-base font-medium">
                <a
                  href={project.project_url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View Live Site
                </a>
              </Button>
            ) : null}
            <Button
              asChild
              variant="outline"
              className="h-12 rounded-none px-8 text-base font-medium"
            >
              <Link href="/#consult">Start a Similar Project</Link>
            </Button>
          </div>
        </div>
      </main>
    </div>
  )
}