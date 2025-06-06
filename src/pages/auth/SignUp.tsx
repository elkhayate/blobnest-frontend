import { useEffect, useState } from "react"
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useNavigate } from "react-router-dom"
import { supabase } from "../../services/supabase"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { AuthLayout } from "@/components/auth/AuthLayout"

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  displayName: z.string().min(2, "Display name must be at least 2 characters"),
  companyName: z.string().min(2, "Company name must be at least 2 characters"),
})

function SignUp() {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema)
  })

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session?.user) {
        navigate("/")
      }
    });
  }, [])    

  const toggleVisibility = () => setIsVisible(!isVisible)

  const generateCompanyId = (companyName: string) => {
    const normalized = companyName.toLowerCase().replace(/[^a-z0-9]/g, '')
    const randomId = Math.random().toString(36).substring(2, 7)
    return `${normalized}-${randomId}`
  }

  const onSubmit = async (data: any) => {
    setLoading(true)
    setError("")

    const companyId = generateCompanyId(data.companyName)

    try {
      const { data: sessionData, error: signUpError } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          data: {
            display_name: data.displayName,
            company_name: data.companyName,
            company_id: companyId
          }
        }
      });

      if (signUpError) {
        setError(signUpError.message);
        return;
      }

      if (Object.keys(sessionData.user?.user_metadata!).length > 0 && !sessionData.user?.user_metadata.email_verified) {
        navigate("/confirmation");
        return;
      }

      const { data: loginData } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password,
      });

      if (loginData?.session) {
        toast.success("Account already exists, logged in successfully");
        navigate("/");
      }
    } catch (err) {
      setError("Unexpected error occurred.");
      console.error(err);
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthLayout>
      <div className="flex min-h-screen items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Create Account</CardTitle>
            <CardDescription>Sign up for BlobNest Storage access</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
              <div className="space-y-2">
                <Input
                  {...register("displayName")}
                  type="text"
                  placeholder="Display name"
                  className={cn(errors.displayName && "border-destructive")}
                />
                {errors.displayName && <p className="text-sm text-destructive">{errors.displayName.message as string}</p>}
              </div>

              <div className="space-y-2">
                <Input
                  {...register("companyName")}
                  type="text"
                  placeholder="Company name"
                  className={cn(errors.companyName && "border-destructive")}
                />
                {errors.companyName && <p className="text-sm text-destructive">{errors.companyName.message as string}</p>}
              </div>

              <div className="space-y-2">
                <Input
                  {...register("email")}
                  type="email"
                  placeholder="Email"
                  className={cn(errors.email && "border-destructive")}
                />
                {errors.email && <p className="text-sm text-destructive">{errors.email.message as string}</p>}
              </div>
              
              <div className="space-y-2">
                <div className="relative">
                  <Input
                    {...register("password")}
                    type={isVisible ? "text" : "password"}
                    placeholder="Password"
                    className={cn(errors.password && "border-destructive")}
                  />
                  <button
                    type="button"
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    onClick={toggleVisibility}
                  >
                    {isVisible ? (
                      <EyeSlashIcon className="h-5 w-5" />
                    ) : (
                      <EyeIcon className="h-5 w-5" />
                    )}
                  </button>
                </div>
                {errors.password && <p className="text-sm text-destructive">{errors.password.message as string}</p>}
              </div>

              {error && <p className="text-sm text-destructive">{error}</p>}
              
              <Button type="submit" disabled={loading}>
                {loading ? "Signing up..." : "Sign Up"}
              </Button>
            </form>

            <div className="mt-4 text-center text-sm">
              <span className="text-muted-foreground">Already have an account? </span>
              <button
                onClick={() => navigate("/login")}
                className="text-primary hover:underline"
              >
                Sign in
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </AuthLayout>
  )
}

export default SignUp;