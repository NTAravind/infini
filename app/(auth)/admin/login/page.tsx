import { LoginForm } from "@/components/admin/login-form"

export default function AdminLoginPage() {
  return (
    <div className="flex min-h-screen flex-col bg-black text-white">
      <div className="flex items-center justify-between border-b border-white/15 px-5 py-5 md:px-8">
        <p className="text-lg font-bold lowercase tracking-tight">infini.io</p>
        <p className="text-xs uppercase tracking-[0.3em] text-white/40">
          Admin
        </p>
      </div>

      <main className="flex flex-1 flex-col items-center justify-center px-5 py-16">
        <div className="mb-10 w-full max-w-sm">
          <p className="text-[11px] font-medium uppercase tracking-[0.3em] text-white/50">
            Restricted access
          </p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight md:text-5xl">
            Sign in
          </h1>
        </div>
        <LoginForm />
      </main>
    </div>
  )
}