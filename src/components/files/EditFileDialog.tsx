import { useEffect, useState } from "react";
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
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus, X } from "lucide-react";
import type { FileMetadata } from "@/types/file";

const formSchema = z.object({
  metadata: z.array(
    z.object({
      key: z.string().min(1, "Key is required"),
      value: z.string().min(1, "Value is required"),
    })
  ),
});

type FormValues = z.infer<typeof formSchema>;

interface EditFileDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: { metadata: Record<string, string>, contentType?: string }) => Promise<void>;
  file: FileMetadata | null;
}

export function EditFileDialog({
  open,
  onClose,
  onSubmit,
  file,
}: EditFileDialogProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      metadata: Object.entries(file?.rawMetadata || {}).map(([key, value]) => ({
        key,
        value,
      })),
    },
  });

  useEffect(() => {
    form.reset({
      metadata: Object.entries(file?.rawMetadata || {}).map(([key, value]) => ({
        key,
        value,
      })),
    });
  }, [file]);

  const handleSubmit = async (values: FormValues) => {
    try {
      setIsSubmitting(true);
      const metadata = values.metadata.reduce(
        (acc, { key, value }) => ({ ...acc, [key]: value }),
        {}
      );
      await onSubmit({ metadata, contentType: file?.contentType });
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
          <DialogTitle>Edit File</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
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
                {isSubmitting ? "Saving..." : "Save"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
} 