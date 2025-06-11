import { useState, useEffect } from "react"
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useNavigate } from "react-router-dom"
import { supabase } from "../../services/supabase"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { AuthLayout } from "@/components/auth/AuthLayout"

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
})

function Login() {
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
        navigate("/dashboard")
      }
    });
  }, [])

  const toggleVisibility = () => setIsVisible(!isVisible)

  const onSubmit = async (data: any) => {
    setLoading(true);
    setError("");
  
    try {
      const { data: sessionData, error: signInError } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password
      });
  
      if (signInError) {
        setError(signInError.message);
        return;
      }
  
      if (sessionData?.session) {
        navigate("/dashboard");
      }
    } catch (err) {
      setError("Unexpected error occurred.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      <div className="flex min-h-screen items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Welcome Back</CardTitle>
            <CardDescription>Sign in to your BlobNest Storage account</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
              <div className="space-y-2">
                <Input
                  {...register("email")}
                  type="email"
                  placeholder="Enter your email"
                  className={cn(errors.email && "border-destructive")}
                />
                {errors.email && <p className="text-sm text-destructive">{errors.email.message as string}</p>}
              </div>
              
              <div className="space-y-2">
                <div className="relative">
                  <Input
                    {...register("password")}
                    type={isVisible ? "text" : "password"}
                    placeholder="Enter your password"
                    className={cn("pr-10", errors.password && "border-destructive")}
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

              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => navigate("/forgot-password")}
                  className="text-sm text-primary hover:underline"
                >
                  Forgot password?
                </button>
              </div>

              {error && <p className="text-sm text-destructive">{error}</p>}
              
              <Button type="submit" disabled={loading}>
                {loading ? "Signing in..." : "Sign In"}
              </Button>
            </form>

            <div className="mt-4 text-center text-sm">
              <span className="text-muted-foreground">Don't have an account? </span>
              <button
                onClick={() => navigate("/signup")}
                className="text-primary hover:underline"
              >
                Sign up
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </AuthLayout>
  )
}

export default Login;