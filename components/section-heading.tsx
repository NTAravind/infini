import { cn } from "@/lib/utils"

type SectionHeadingProps = {
  eyebrow?: string
  title: string
  subtitle?: string
  index?: string
  tone?: "light" | "dark"
  className?: string
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  index,
  tone = "light",
  className,
}: SectionHeadingProps) {
  const dark = tone === "dark"

  return (
    <header className={cn("flex flex-col gap-6 md:flex-row md:items-end md:justify-between", className)}>
      <div className="flex flex-col gap-4">
        {eyebrow ? (
          <p
            className={cn(
              "text-[11px] font-medium uppercase tracking-[0.3em]",
              dark ? "text-white/50" : "text-muted-foreground"
            )}
          >
            {eyebrow}
          </p>
        ) : null}
        <h2
          className={cn(
            "max-w-2xl text-4xl font-semibold tracking-tight leading-none md:text-6xl",
            dark ? "text-white" : "text-foreground"
          )}
        >
          {title}
        </h2>
        {subtitle ? (
          <p
            className={cn(
              "max-w-xl text-base leading-relaxed md:text-lg",
              dark ? "text-white/60" : "text-muted-foreground"
            )}
          >
            {subtitle}
          </p>
        ) : null}
      </div>
      {index ? (
        <p
          className={cn(
            "text-sm tabular-nums",
            dark ? "text-white/40" : "text-muted-foreground"
          )}
        >
          {index}
        </p>
      ) : null}
    </header>
  )
}