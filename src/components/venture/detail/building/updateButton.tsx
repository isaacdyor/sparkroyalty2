"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
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

import { buildingUpdateSchema } from "@/lib/validators/buildingUpdateSchema";
import { api } from "@/trpc/react";
import type { Venture } from "@prisma/client";
import { useState } from "react";
import { toast } from "sonner";
import type { z } from "zod";

export type BuildingUpdateInput = z.infer<typeof buildingUpdateSchema>;

export const UpdateButton: React.FC<{ venture: Venture }> = ({ venture }) => {
  const [showDialog, setShowDialog] = useState(false);
  const { mutate } = api.buildingUpdates.create.useMutation({
    onSuccess: () => {
      toast.success("Update submitted!");
      setShowDialog(false);
    },
    onError: (e) => {
      const errorMessage = e.data?.zodError?.fieldErrors.content;
      console.error("Error submitting update:", errorMessage);
      toast.error("Error submitting update");
    },
  });

  const onSubmit = async (data: BuildingUpdateInput) => {
    console.log("bang");
    mutate({
      update: data,
      ventureId: venture.id,
    });
  };

  const form = useForm<BuildingUpdateInput>({
    resolver: zodResolver(buildingUpdateSchema),
    defaultValues: {
      progress: "",
    },
  });

  return (
    <Dialog open={showDialog} onOpenChange={setShowDialog}>
      <DialogTrigger asChild>
        <Button className="w-full">Send Update</Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update for {venture.title}</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex w-full flex-1 flex-col justify-center gap-6 text-muted-foreground"
          >
            <FormField
              control={form.control}
              name="progress"
              render={({ field }) => (
                <FormItem>
                  <FormLabel mandatory>Progress</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Provide the founder with an update on your progress"
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
