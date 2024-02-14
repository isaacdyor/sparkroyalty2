"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";

import { Textarea } from "@/components/ui/textarea";

import { investorSchema } from "@/lib/validators/investorSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import type { z } from "zod";

import { TrashIcon } from "@heroicons/react/24/outline";
import { applicationSchema } from "@/lib/validators/applicationSchema";
import { api } from "@/trpc/react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export type ApplicationInput = z.infer<typeof applicationSchema>;

export const VentureApplication: React.FC<{ id: string }> = ({ id }) => {
  const router = useRouter();
  const form = useForm<ApplicationInput>({
    resolver: zodResolver(applicationSchema),
    defaultValues: {
      projectInterest: "",
      projectSkills: "",
    },
  });

  const { mutate } = api.applications.create.useMutation({
    onSuccess: (data) => {
      router.push(`/application/${data.id}`);
      toast.success("Application submitted!");
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
      ventureId: id,
    });
  };

  return (
    <div className="flex w-screen justify-center p-8">
      <Card className="w-full max-w-2xl border border-border">
        <CardHeader>
          <CardTitle>Apply to Venture</CardTitle>
        </CardHeader>
        <CardContent>
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
        </CardContent>
      </Card>
    </div>
  );
};
