"use client";

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

import { Textarea } from "@/components/ui/textarea";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { applicationSchema } from "@/lib/validators/applicationSchema";
import { api } from "@/trpc/react";
import { Venture } from "@prisma/client";
import { toast } from "sonner";
import { z } from "zod";
import { ApplicationDialog } from "@/components/applications/applicationDialog";
import { useState } from "react";

export type ApplicationInput = z.infer<typeof applicationSchema>;

export const ApplyButton: React.FC<{ venture: Venture }> = ({ venture }) => {
  const [showDialog, setShowDialog] = useState(false);
  const { mutate } = api.applications.create.useMutation({
    onSuccess: () => {
      toast.success("Application submitted!");
      setShowDialog(false);
    },
    onError: (e) => {
      const errorMessage = e.data?.zodError?.fieldErrors.content;
      console.error("Error submitting application:", errorMessage);
      toast.error("Error submitting application");
    },
  });

  const onSubmit = async (data: ApplicationInput) => {
    mutate({
      application: data,
      ventureId: venture.id,
    });
  };

  const form = useForm<ApplicationInput>({
    resolver: zodResolver(applicationSchema),
    defaultValues: {
      projectInterest: "",
      projectSkills: "",
    },
  });

  return (
    <Dialog open={showDialog} onOpenChange={setShowDialog}>
      <DialogTrigger asChild>
        <Button className="w-full">Apply</Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Apply to {venture.title}</DialogTitle>
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
              Submit
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
