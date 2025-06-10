import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, X } from "lucide-react";
import type { CreateFileFormData } from "@/types/file";
import { useGetContainers } from "@/api/containers/queries";
import type { Container } from "@/types/container";

const formSchema = z.object({
  containerName: z.string().min(1, "Container is required"),
  file: z.instanceof(File, { message: "File is required" }),
  metadata: z.array(
    z.object({
      key: z.string().min(1, "Key is required"),
      value: z.string().min(1, "Value is required"),
    })
  ),
});

type FormValues = z.infer<typeof formSchema>;

interface CreateFileDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: CreateFileFormData) => Promise<void>;
}

export function CreateFileDialog({
  open,
  onClose,
  onSubmit,
}: CreateFileDialogProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { data: containers } = useGetContainers({ search: "", page: 1, rowsPerPage: 100 });

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      containerName: "",
      metadata: [],
    },
  });

  const handleSubmit = async (values: FormValues) => {
    try {
      setIsSubmitting(true);
      const metadata = values.metadata.reduce(
        (acc, { key, value }) => ({ ...acc, [key]: value }),
        {}
      );
      await onSubmit({
        containerName: values.containerName,
        file: values.file,
        metadata,
      });
      form.reset();
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const addMetadataField = () => {
    const currentFields = form.getValues("metadata");
    form.setValue("metadata", [...currentFields, { key: "", value: "" }]);
  };

  const removeMetadataField = (index: number) => {
    const currentFields = form.getValues("metadata");
    form.setValue(
      "metadata",
      currentFields.filter((_, i) => i !== index)
    );
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Upload File</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="containerName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Container</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a container" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {containers?.containers.map((container: Container) => (
                        <SelectItem key={container.accountName} value={container.accountName}>
                          {container.accountName}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="file"
              render={({ field: { value, onChange, ...field } }) => (
                <FormItem>
                  <FormLabel>File</FormLabel>
                  <FormControl>
                    <Input
                      type="file"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          onChange(file);
                        }
                      }}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="space-y-4">
              {form.watch("metadata").map((_, index) => (
                <div key={index} className="flex gap-2">
                  <FormField
                    control={form.control}
                    name={`metadata.${index}.key`}
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormControl>
                          <Input placeholder="Key" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`metadata.${index}.value`}
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormControl>
                          <Input placeholder="Value" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => removeMetadataField(index)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>

            <Button
              type="button"
              variant="outline"
              onClick={addMetadataField}
              className="w-full"
            >
              <Plus className="mr-2 h-4 w-4" />
              Add Metadata
            </Button>

            <div className="flex justify-end gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Uploading..." : "Upload"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
} 