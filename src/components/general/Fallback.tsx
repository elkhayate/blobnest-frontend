import { Spinner } from "@/components/ui/spinner"

const FallbackComponent = () => {
  return (
    <div className="flex min-h-screen items-center justify-center flex-col gap-4">
      <div className="flex items-center justify-center gap-3 font-medium">
        <span className="text-2xl font-bold">BloBNest</span>
      </div>
      <Spinner size="lg" className="text-primary" />
    </div>
  )
}

export default FallbackComponent