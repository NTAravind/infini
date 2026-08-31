import Image from "next/image"
import Link from "next/link"

import { createClient } from "@/lib/supabase/server"
import type { Project } from "@/lib/types"
import { SectionHeading } from "@/components/section-heading"
import { Reveal } from "@/components/reveal"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

async function getPublishedProjects(): Promise<Project[]> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  if (!url) return []

  try {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .eq("published", true)
      .order("created_at", { ascending: false })

    if (error) return []
    return (data ?? []) as Project[]
  } catch {
    return []
  }
}

async function ProjectsGrid({ projects }: { projects: Project[] }) {
  if (projects.length === 0) {
    return (
      <div className="grid gap-px border border-black bg-black md:grid-cols-2 lg:grid-cols-3">
        {[0, 1, 2].map((i) => (
          <div key={i} className="bg-background">
            <div className="flex aspect-[4/3] items-center justify-center border-b border-black bg-white p-3">
              {/* PROJECT IMAGE PLACEHOLDER */}
              <div className="flex size-full items-center justify-center">
                <p className="text-center text-[11px] uppercase tracking-[0.3em] text-muted-foreground">
                  Project image coming soon
                </p>
              </div>
            </div>
            <div className="space-y-3 border-b border-black p-6">
              <div className="h-4 w-32 bg-muted" />
              <div className="h-10 w-full bg-muted" />
            </div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="grid gap-px border border-black bg-black md:grid-cols-2 lg:grid-cols-3">
      {projects.map((project) => (
        <article key={project.id} className="group flex flex-col bg-background">
          <Link
            href={`/work/${project.id}`}
            className="relative block aspect-[4/3] overflow-hidden border-b border-black bg-white p-3"
            aria-label={`View ${project.title} details`}
          >
            {project.preview_image_url ? (
              <Image
                src={project.preview_image_url}
                alt={project.title}
                fill
                sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                className="object-contain transition-transform duration-300 group-hover:scale-[1.02]"
              />
            ) : (
              <div className="flex size-full items-center justify-center">
                <p className="text-[11px] uppercase tracking-[0.3em] text-muted-foreground">
                  Image pending
                </p>
              </div>
            )}
          </Link>

          <div className="flex flex-1 items-center justify-between gap-4 p-6 pb-4">
            <h3 className="text-xl font-semibold tracking-tight">
              {project.title}
            </h3>
            <Badge
              variant="outline"
              className="shrink-0 rounded-none border-black text-[11px] font-medium uppercase tracking-[0.15em]"
            >
              {project.category}
            </Badge>
          </div>

          <div className="px-6 pb-6">
            <Button
              asChild
              className="flex h-11 w-full items-center justify-between rounded-none bg-black px-5 text-base font-medium text-white hover:bg-black/80"
            >
              <Link href={`/work/${project.id}`}>
                View Project
                <span aria-hidden="true">→</span>
              </Link>
            </Button>
          </div>
        </article>
      ))}
    </div>
  )
}

export async function Work() {
  const projects = await getPublishedProjects()

  return (
    <section id="work" className="scroll-mt-20 border-t border-black py-24 md:py-32">
      <div className="mx-auto w-full max-w-6xl px-5 md:px-8">
        <Reveal>
          <SectionHeading
            eyebrow="Selected work"
            title="Our Work"
            subtitle="Websites and AI systems we've shipped for real businesses."
            index="02 / work"
          />
        </Reveal>

        <Reveal delay={100} className="mt-16 md:mt-20">
          <ProjectsGrid projects={projects} />
        </Reveal>

        <Reveal delay={150}>
          <p className="mt-10 text-sm uppercase tracking-[0.2em] text-muted-foreground">
            More work is being shipped every month — see yours here next.
          </p>
        </Reveal>
      </div>
    </section>
  )
}