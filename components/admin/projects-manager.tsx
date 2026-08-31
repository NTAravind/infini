"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { toast } from "sonner"

import { createClient } from "@/lib/supabase/client"
import { PROJECT_CATEGORIES, type Project } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const projectSchema = z.object({
  title: z.string().min(1, "Title is required."),
  category: z.string().min(1, "Choose a category."),
  description: z.string().min(1, "Description is required."),
  testimonial_text: z.string().optional(),
  testimonial_author: z.string().optional(),
  project_url: z
    .string()
    .url("Enter a valid URL, or leave blank.")
    .optional()
    .or(z.literal("")),
  published: z.boolean(),
})

function newId(): string {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID()
  }
  const bytes =
    typeof crypto !== "undefined" && typeof crypto.getRandomValues === "function"
      ? crypto.getRandomValues(new Uint8Array(16))
      : null
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (ch) => {
    const r = bytes ? bytes[Math.floor(Math.random() * 16)] % 16 : Math.floor(Math.random() * 16)
    const v = ch === "x" ? r : (r & 0x3) | 0x8
    return v.toString(16)
  })
}

function describeError(err: unknown): string {
  if (typeof err === "object" && err !== null) {
    const e = err as Record<string, unknown>
    const code = typeof e.code === "string" ? e.code : null
    const message = typeof e.message === "string" ? e.message : null
    const details = typeof e.details === "string" ? e.details : null
    const hint = typeof e.hint === "string" ? e.hint : null
    const status = typeof e.statusCode === "number" ? e.statusCode : typeof e.status === "number" ? (e.status as number) : null
    const parts = [message, details, hint].filter(Boolean)
    const suffix = code || status ? ` (${[code, status].filter(Boolean).join(" · ")})` : ""
    return parts.length ? parts.join(" — ") + suffix : (err as Error).name || "Unknown error"
  }
  return err instanceof Error ? err.message : String(err)
}

type ProjectValues = z.infer<typeof projectSchema>

type ProjectsManagerProps = {
  initialProjects: Project[]
}

export function ProjectsManager({ initialProjects }: ProjectsManagerProps) {
  const router = useRouter()
  const [projects, setProjects] = useState(initialProjects)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editing, setEditing] = useState<Project | null>(null)
  const [file, setFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [saving, setSaving] = useState(false)

  const form = useForm<ProjectValues>({
    resolver: zodResolver(projectSchema),
    defaultValues: emptyValues(),
  })

  function emptyValues(): ProjectValues {
    return {
      title: "",
      category: "",
      description: "",
      testimonial_text: "",
      testimonial_author: "",
      project_url: "",
      published: true,
    }
  }

  function openCreate() {
    setEditing(null)
    setFile(null)
    setPreviewUrl(null)
    form.reset(emptyValues())
    setDialogOpen(true)
  }

  function openEdit(project: Project) {
    setEditing(project)
    setFile(null)
    setPreviewUrl(project.preview_image_url)
    form.reset({
      title: project.title,
      category: project.category,
      description: project.description,
      testimonial_text: project.testimonial_text ?? "",
      testimonial_author: project.testimonial_author ?? "",
      project_url: project.project_url ?? "",
      published: project.published,
    })
    setDialogOpen(true)
  }

  async function uploadImage(path: string): Promise<string | null> {
    if (!file) return null
    const supabase = createClient()
    const { error } = await supabase.storage
      .from("project-images")
      .upload(path, file, { upsert: true })

    if (error) {
      console.error("infini/admin: image upload failed", { path, size: file.size, name: file.name, error })
      throw error
    }

    const { data } = supabase.storage
      .from("project-images")
      .getPublicUrl(path)
    return data.publicUrl
  }

  async function onSubmit(values: ProjectValues) {
    setSaving(true)
    let step = "before-start"

    try {
      const supabase = createClient()
      const {
        data: { session },
      } = await supabase.auth.getSession()
      console.log("infini/admin: save project — signed in as", session?.user?.email ?? "NO SESSION")

      step = "build-payload"
      let imageUrl = editing?.preview_image_url ?? null
      const payload = {
        title: values.title.trim(),
        category: values.category,
        description: values.description.trim(),
        preview_image_url: imageUrl,
        testimonial_text: values.testimonial_text?.trim() || null,
        testimonial_author: values.testimonial_author?.trim() || null,
        project_url: values.project_url?.trim() || null,
        published: values.published,
      }
      console.log("infini/admin: payload", { mode: editing ? "update" : "create", payload })

      if (file) {
        step = "upload-image"
        const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, "-")
        const path = editing
          ? `projects/${editing.id}/${newId()}-${safeName}`
          : `projects/${newId()}-${safeName}`
        imageUrl = await uploadImage(path)
        payload.preview_image_url = imageUrl
        console.log("infini/admin: image uploaded ->", imageUrl)
      }

      step = editing ? "update-row" : "insert-row"
      if (editing) {
        const { error } = await supabase
          .from("projects")
          .update(payload)
          .eq("id", editing.id)
        if (error) throw error
        toast("Project updated.")
      } else {
        const { error } = await supabase.from("projects").insert(payload)
        if (error) throw error
        toast("Project created.")
      }

      setDialogOpen(false)
      router.refresh()
    } catch (err) {
      console.error("infini/admin: save project FAILED at step:", step, err)
      toast.error(`Could not save — ${describeError(err)}`)
    } finally {
      setSaving(false)
    }
  }

  async function onDelete(project: Project) {
    if (!window.confirm(`Delete “${project.title}”? This cannot be undone.`)) {
      return
    }

    const supabase = createClient()
    const { error } = await supabase.from("projects").delete().eq("id", project.id)
    if (error) {
      console.error("infini/admin: delete project FAILED", { id: project.id, error })
      toast.error(`Could not delete — ${describeError(error)}`)
      return
    }

    setProjects(projects.filter((p) => p.id !== project.id))
    toast("Project deleted.")
  }

  function onPickFile(e: React.ChangeEvent<HTMLInputElement>) {
    const next = e.target.files?.[0] ?? null
    setFile(next)
    if (next) {
      const objectUrl = URL.createObjectURL(next)
      setPreviewUrl(objectUrl)
    }
  }

  return (
    <div className="pt-10">
      <div className="flex justify-end">
        <Button onClick={openCreate} className="h-10 rounded-none">
          + New Project
        </Button>
      </div>

      <div className="mt-6 overflow-x-auto border border-black">
        <Table>
          <TableHeader>
            <TableRow className="border-black bg-muted">
              <TableHead className="w-16">Preview</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {projects.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="py-10 text-center text-muted-foreground">
                  No projects yet — click “New Project” to add your first one.
                </TableCell>
              </TableRow>
            ) : (
              projects.map((project) => (
                <TableRow key={project.id} className="border-black">
                  <TableCell>
                    {project.preview_image_url ? (
                      <div className="relative size-12 border border-black">
                        <Image
                          src={project.preview_image_url}
                          alt=""
                          fill
                          sizes="48px"
                          className="object-cover"
                        />
                      </div>
                    ) : (
                      <div className="flex size-12 items-center justify-center border border-black text-[10px] uppercase tracking-widest text-muted-foreground">
                        No img
                      </div>
                    )}
                  </TableCell>
                  <TableCell className="font-medium">{project.title}</TableCell>
                  <TableCell>{project.category}</TableCell>
                  <TableCell>
                    {project.published ? "Published" : "Hidden"}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-8 rounded-none"
                        onClick={() => openEdit(project)}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-8 rounded-none text-destructive"
                        onClick={() => onDelete(project)}
                      >
                        Delete
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-h-[90vh] max-w-2xl overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editing ? "Edit Project" : "New Project"}
            </DialogTitle>
          </DialogHeader>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Acme Store" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {PROJECT_CATEGORIES.map((c) => (
                            <SelectItem key={c} value={c}>
                              {c}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        rows={3}
                        placeholder="What is this project?"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div>
                <FormLabel>Preview Image</FormLabel>
                <div className="mt-2 flex items-center gap-4">
                  {previewUrl ? (
                    <div className="relative size-20 shrink-0 border border-black">
                      <Image
                        src={previewUrl}
                        alt="Preview"
                        fill
                        sizes="80px"
                        className="object-cover"
                      />
                    </div>
                  ) : (
                    <div className="flex size-20 shrink-0 items-center justify-center border border-black text-center text-[10px] uppercase tracking-widest text-muted-foreground">
                      No image
                    </div>
                  )}
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={onPickFile}
                    className="h-9 rounded-none border border-black file:mr-3 file:border-0 file:bg-black file:px-3 file:py-1.5 file:text-sm file:text-white"
                  />
                </div>
                <p className="mt-2 text-xs text-muted-foreground">
                  Uploads to the public <code>project-images</code> storage bucket.
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <FormField
                  control={form.control}
                  name="testimonial_text"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Testimonial <span className="font-normal text-muted-foreground">(optional)</span>
                      </FormLabel>
                      <FormControl>
                        <Textarea {...field} rows={3} placeholder="What did the client say?" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="testimonial_author"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Testimonial author <span className="font-normal text-muted-foreground">(optional)</span>
                      </FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Client name / company" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="project_url"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Live project URL <span className="font-normal text-muted-foreground">(optional)</span>
                    </FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="https://…" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="published"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center gap-3">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormLabel className="font-normal">
                      Published on the public site
                    </FormLabel>
                  </FormItem>
                )}
              />

              <div className="flex justify-end gap-3 border-t border-border pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={saving}>
                  {saving ? "Saving…" : editing ? "Save Changes" : "Create Project"}
                </Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  )
}