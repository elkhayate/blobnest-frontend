import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, X } from "lucide-react";
import type { Container, UpdateContainerFormData } from "@/types/container";

const updateContainerSchema = z.object({
  publicAccess: z.enum(["blob", "container"]).optional(),
  metadata: z.record(z.string()).optional(),
});

interface EditContainerDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: UpdateContainerFormData) => Promise<void>;
  container: Container | null;
}

export function EditContainerDialog({
  open,
  onClose,
  onSubmit,
  container,
}: EditContainerDialogProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [metadataEntries, setMetadataEntries] = useState<{ key: string; value: string }[]>(
    container ? Object.entries(container.metadata).map(([key, value]) => ({ key, value })) : []
  );

  const form = useForm<UpdateContainerFormData>({
    resolver: zodResolver(updateContainerSchema),
    defaultValues: {
      publicAccess: container?.publicAccess || undefined,
      metadata: container?.metadata || {},
    },
  });

  useEffect(() => {
    form.reset({
      publicAccess: container?.publicAccess || undefined,
      metadata: container?.metadata || {},
    });
    // Update metadata entries when container changes
    setMetadataEntries(
      container ? Object.entries(container.metadata).map(([key, value]) => ({ key, value })) : []
    );
  }, [container]);

  const handleSubmit = async (data: UpdateContainerFormData) => {
    try {
      setIsSubmitting(true);
      // Convert metadata entries to object
      const metadata = metadataEntries.reduce((acc, { key, value }) => {
        if (key && value) {
          acc[key] = value;
        }
        return acc;
      }, {} as Record<string, string>);

      await onSubmit({ ...data, metadata });
      form.reset();
    } catch (error) {
      console.error("Error updating container:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const addMetadataEntry = () => {
    setMetadataEntries([...metadataEntries, { key: "", value: "" }]);
  };

  const removeMetadataEntry = (index: number) => {
    setMetadataEntries(metadataEntries.filter((_, i) => i !== index));
  };

  const updateMetadataEntry = (index: number, field: "key" | "value", value: string) => {
    const newEntries = [...metadataEntries];
    newEntries[index] = { ...newEntries[index], [field]: value };
    setMetadataEntries(newEntries);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Container</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="publicAccess"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Public Access</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select public access" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="blob">Blob</SelectItem>
                      <SelectItem value="container">Container</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <FormLabel>Metadata</FormLabel>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={addMetadataEntry}
                >
                  <Plus className="h-4 w-4 mr-1" />
                  Add Metadata
                </Button>
              </div>
              <div className="space-y-2">
                {metadataEntries.map((entry, index) => (
                  <div key={index} className="flex gap-2">
                    <Input
                      placeholder="Key"
                      value={entry.key}
                      onChange={(e) => updateMetadataEntry(index, "key", e.target.value)}
                    />
                    <Input
                      placeholder="Value"
                      value={entry.value}
                      onChange={(e) => updateMetadataEntry(index, "value", e.target.value)}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => removeMetadataEntry(index)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-end gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Updating..." : "Update Container"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
} 