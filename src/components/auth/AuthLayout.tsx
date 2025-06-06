import { ModeToggle } from "@/components/mode-toggle"

interface AuthLayoutProps {
  children: React.ReactNode
}

export function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="relative min-h-screen">
      <div className="absolute right-4 top-4">
        <ModeToggle />
      </div>
      {children}
    </div>
  )
} 