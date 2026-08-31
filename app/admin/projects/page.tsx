import { createClient } from "@/lib/supabase/server"
import type { Project } from "@/lib/types"
import { ProjectsManager } from "@/components/admin/projects-manager"

export const dynamic = "force-dynamic"

export default async function AdminProjectsPage() {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .order("created_at", { ascending: false })

  if (error) {
    console.error("infini/admin: failed to load projects list", error)
  }
  console.log(`infini/admin: loaded ${data?.length ?? 0} projects`)

  const projects = (data ?? []) as Project[]

  return (
    <div className="mx-auto w-full max-w-6xl px-5 md:px-8">
      <div className="flex flex-col gap-4 border-b border-black pb-8 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-[11px] font-medium uppercase tracking-[0.3em] text-muted-foreground">
            Portfolio
          </p>
          <h1 className="mt-2 text-4xl font-semibold tracking-tight md:text-5xl">
            Projects
          </h1>
          <p className="mt-3 max-w-xl text-base text-muted-foreground">
            Portfolio items shown in the public “Our Work” section.
          </p>
        </div>
      </div>

      <ProjectsManager initialProjects={projects} />
    </div>
  )
}