import { Button } from "@/components/ui/button";
import { supabase } from "@/services/supabase"
import { useNavigate } from "react-router-dom"
import { useGetUserAndCompany } from "@/api/users/queries"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { useEffect } from "react"
import { useUpdateUserSettings } from "@/api/users/mutations"
import { useUpdateCompanySettings } from "@/api/users/mutations"
import { toast } from "sonner";

const userFormSchema = z.object({
  display_name: z.string().min(2, "Display name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
});

const companyFormSchema = z.object({
  storage_account_name: z.string().min(2, "Storage account name must be at least 2 characters"),
  sas_token: z.string().min(1, "SAS token is required"),
});

export default function Settings() {
  const navigate = useNavigate()
  const { data: userAndCompanyInfo } = useGetUserAndCompany()
  const isAdmin = userAndCompanyInfo?.user?.role === "admin"
  const { mutateAsync: updateUserSettings } = useUpdateUserSettings()
  const { mutateAsync: updateCompanySettings } = useUpdateCompanySettings()
  const userForm = useForm<z.infer<typeof userFormSchema>>({
    resolver: zodResolver(userFormSchema),
    defaultValues: {
      display_name: userAndCompanyInfo?.user?.display_name || "",
      email: userAndCompanyInfo?.user?.email || "",
    },
  });

  const companyForm = useForm<z.infer<typeof companyFormSchema>>({
    resolver: zodResolver(companyFormSchema),
    defaultValues: {
      storage_account_name: userAndCompanyInfo?.company?.storage_account_name || "",
      sas_token: userAndCompanyInfo?.company?.sas_token || "",
    },
  });

  useEffect(() => {
    userForm.reset({
      display_name: userAndCompanyInfo?.user?.display_name || "",
      email: userAndCompanyInfo?.user?.email || "",
    })
  }, [userAndCompanyInfo])

  useEffect(() => {
    companyForm.reset({
      storage_account_name: userAndCompanyInfo?.company?.storage_account_name || "",
      sas_token: userAndCompanyInfo?.company?.sas_token || "",
    })
  }, [userAndCompanyInfo])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    navigate("/login")
  }

  const onUserSubmit = async (values: z.infer<typeof userFormSchema>) => {
    await updateUserSettings(values, {
      onSuccess: () => {
        toast.success("User settings updated successfully")
      }
    })
  }

  const onCompanySubmit = async (values: z.infer<typeof companyFormSchema>) => {
    await updateCompanySettings(values, {
      onSuccess: () => {
        toast.success("Company settings updated successfully")
      }
    })  
  }

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case "admin":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
      case "uploader":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200";
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Settings</h1>
        <Button onClick={handleLogout}>Logout</Button>
      </div>

      <Tabs defaultValue="user" className="w-full">
        <TabsList>
          <TabsTrigger value="user">User</TabsTrigger>
          {isAdmin && <TabsTrigger value="company">Company</TabsTrigger>}
        </TabsList>

        <TabsContent value="user">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>User Profile</CardTitle>
              <Badge variant="secondary" className={`text-xs px-2 py-1 rounded-full capitalize ${getRoleBadgeColor(userAndCompanyInfo?.user?.role || 'viewer')}`}>
                  {userAndCompanyInfo?.user?.role || 'viewer'}
                </Badge>
            </CardHeader>
            <CardContent>
               

              <Form {...userForm}>
                <form onSubmit={userForm.handleSubmit(onUserSubmit)} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={userForm.control}
                      name="display_name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Display Name</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={userForm.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input {...field} type="email" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <Button type="submit">Save</Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </TabsContent>

        {isAdmin && (
          <TabsContent value="company">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Company</CardTitle>
                <div className="mb-4">
                  <p className="text-sm text-muted-foreground">{userAndCompanyInfo?.company?.company_name}</p>
                </div>
              </CardHeader>
              <CardContent>
             

                <Form {...companyForm}>
                  <form onSubmit={companyForm.handleSubmit(onCompanySubmit)} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={companyForm.control}
                        name="storage_account_name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Storage Account Name</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={companyForm.control}
                        name="sas_token"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>SAS Token</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <Button type="submit">Save</Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </TabsContent>
        )}
      </Tabs>
    </div>
  );
}
  