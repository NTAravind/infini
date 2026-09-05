"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { toast } from "sonner"

import { createClient } from "@/lib/supabase/client"
import { BUDGET_OPTIONS, SERVICE_OPTIONS } from "@/lib/types"
import { Button } from "@/components/ui/button"
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
import { cn } from "@/lib/utils"

const consultSchema = z.object({
  name: z.string().min(1, "Please tell us your name."),
  phone: z
    .string()
    .regex(/^[+]?[\d\s().-]{7,20}$/, "Please enter a valid phone number."),
  service: z.string().min(1, "Please choose a service."),
  budget: z.string().min(1, "Please choose a budget range."),
  message: z.string().optional(),
})

type ConsultValues = z.infer<typeof consultSchema>

const DEFAULT_VALUES: ConsultValues = {
  name: "",
  phone: "",
  service: "",
  budget: "",
  message: "",
}

export function ConsultForm() {
  const [submitting, setSubmitting] = useState(false)

  const form = useForm<ConsultValues>({
    resolver: zodResolver(consultSchema),
    defaultValues: DEFAULT_VALUES,
  })

  async function onSubmit(values: ConsultValues) {
    setSubmitting(true)
    const supabase = createClient()
    const { error } = await supabase.from("consult_requests").insert({
      name: values.name.trim(),
      phone: values.phone.trim(),
      service: values.service,
      budget: values.budget,
      message: values.message?.trim() || null,
    })
    setSubmitting(false)

    if (error) {
      toast.error("Something went wrong — please try again.")
      return
    }

    toast("Thanks — we'll be in touch within 24 hours.")
    form.reset(DEFAULT_VALUES)
  }

  const selectClass = cn(
    "h-12 w-full rounded-none border-white/30 bg-black/80 px-4 text-sm text-white",
    "placeholder:text-white/40 focus-visible:border-white aria-invalid:border-red-400 [&_svg]:text-white/70"
  )

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid gap-6 md:grid-cols-2"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-medium text-white/80">
                Your Name
              </FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="Jane Doe"
                  autoComplete="name"
                  className="h-12 rounded-none border-white/30 bg-black/80 px-4 text-white placeholder:text-white/40 focus-visible:border-white aria-invalid:border-red-400"
                />
              </FormControl>
              <FormMessage className="text-red-400" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-medium text-white/80">
                Phone
              </FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="tel"
                  placeholder="+91 98765 43210"
                  autoComplete="tel"
                  className="h-12 rounded-none border-white/30 bg-black/80 px-4 text-white placeholder:text-white/40 focus-visible:border-white aria-invalid:border-red-400"
                />
              </FormControl>
              <FormMessage className="text-red-400" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="service"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-medium text-white/80">
                What service do you need?
              </FormLabel>
              <Select
                value={field.value || undefined}
                onValueChange={field.onChange}
              >
                <FormControl>
                  <SelectTrigger className={selectClass}>
                    <SelectValue
                      placeholder="Select a service"
                      data-placeholder
                    />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className="rounded-none border-white/30 bg-black text-white">
                  {SERVICE_OPTIONS.map((option) => (
                    <SelectItem key={option} value={option} className="focus:bg-white/15 focus:text-white">
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage className="text-red-400" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="budget"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-medium text-white/80">
                What&apos;s your budget?
              </FormLabel>
              <Select
                value={field.value || undefined}
                onValueChange={field.onChange}
              >
                <FormControl>
                  <SelectTrigger className={selectClass}>
                    <SelectValue placeholder="Select a range" data-placeholder />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className="rounded-none border-white/30 bg-black text-white">
                  {BUDGET_OPTIONS.map((option) => (
                    <SelectItem key={option} value={option} className="focus:bg-white/15 focus:text-white">
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage className="text-red-400" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem className="md:col-span-2">
              <FormLabel className="text-sm font-medium text-white/80">
                Anything else we should know?
                <span className="ml-1 font-normal text-white/40">
                  (optional)
                </span>
              </FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  rows={5}
                  placeholder="Tell us about your business, timelines, or anything else."
                  className="min-h-28 rounded-none border-white/30 bg-black/80 px-4 py-3 text-white placeholder:text-white/40 focus-visible:border-white aria-invalid:border-red-400"
                />
              </FormControl>
              <FormMessage className="text-red-400" />
            </FormItem>
          )}
        />

        <div className="md:col-span-2">
          <Button
            type="submit"
            disabled={submitting}
            className="h-14 w-full rounded-none bg-white text-xs font-bold uppercase tracking-widest text-black hover:bg-white/85 sm:w-auto sm:px-14"
          >
            {submitting ? "Sending…" : "Send Enquiry"}
          </Button>
        </div>
      </form>
    </Form>
  )
}