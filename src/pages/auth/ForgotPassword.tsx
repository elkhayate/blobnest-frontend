import { useState } from "react"
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
})

function ForgotPassword() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema)
  })

  const onSubmit = async (data: any) => {
    setLoading(true);
    setError("");
    setSuccess(false);
  
    try {
      const { error: resetError } = await supabase.auth.resetPasswordForEmail(data.email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });
  
      if (resetError) {
        setError(resetError.message);
        return;
      }
  
      setSuccess(true);
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
            <CardTitle>Reset Password</CardTitle>
            <CardDescription>Enter your email to receive a password reset link</CardDescription>
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

              {error && <p className="text-sm text-destructive">{error}</p>}
              {success && (
                <p className="text-sm text-green-600">
                  Password reset link has been sent to your email.
                </p>
              )}
              
              <Button type="submit" disabled={loading}>
                {loading ? "Sending..." : "Send Reset Link"}
              </Button>
            </form>

            <div className="mt-4 text-center text-sm">
              <span className="text-muted-foreground">Remember your password? </span>
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

export default ForgotPassword; 