import { Application, Venture } from "@prisma/client";
import React from "react";
import { ApplicationInput } from "../venture/detail/pending/applyButton";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { applicationSchema } from "@/lib/validators/applicationSchema";
import { Textarea } from "../ui/textarea";
import { api } from "@/trpc/react";
import { toast } from "sonner";

type ApplicationDialogProps = {
  showDialog: boolean;
  setShowDialog: React.Dispatch<React.SetStateAction<boolean>>;
  application: Application;
};

export const ApplicationDialog: React.FC<ApplicationDialogProps> = ({
  showDialog,
  setShowDialog,
  application,
}) => {
  const form = useForm<ApplicationInput>({
    resolver: zodResolver(applicationSchema),
    defaultValues: {
      projectInterest: application.projectInterest,
      projectSkills: application.projectSkills,
    },
  });
  const { mutate } = api.applications.update.useMutation({
    onSuccess: () => {
      toast.success("Application updated!");
      setShowDialog(false);
    },
    onError: (e) => {
      const errorMessage = e.data?.zodError?.fieldErrors.content;
      console.error("Error updating application:", errorMessage);
      toast.error("Error updating application");
    },
  });

  const onSubmit = async (data: ApplicationInput) => {
    mutate({
      application: data,
      id: application.id,
    });
  };
  return (
    <Dialog open={showDialog} onOpenChange={setShowDialog}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit application</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex w-full flex-1 flex-col justify-center gap-6 text-muted-foreground"
          >
            <FormField
              control={form.control}
              name="projectInterest"
              render={({ field }) => (
                <FormItem>
                  <FormLabel mandatory>Project Interest</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Tell us why you are interested in this project"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="projectSkills"
              render={({ field }) => (
                <FormItem>
                  <FormLabel mandatory>Project Skills</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="What skills do you have that would be beneficial to this project?"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button variant="default" className="my-4 w-full" type="submit">
              Save
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
