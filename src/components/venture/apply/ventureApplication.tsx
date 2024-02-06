"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import PfpInpt from "@/components/welcome/pfpInpt";
import { applicationSchema } from "@/lib/validators/applicationSchema";
import { Input } from "postcss";
import { Form, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { api } from "@/trpc/react";
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

  const { mutate } = api.users.create.useMutation({
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
      firstName: formData.firstName,
      lastName: formData.lastName,
      country: formData.country,
      image: otherData.publicUrl,
    });
  };

  return (
    <div className="flex w-screen justify-center p-8">
      <Card className="w-full max-w-2xl border border-border">
        <CardHeader>
          <CardTitle>Welcome to Spark Royalty</CardTitle>
          <CardDescription>Yabba dabba doo</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex w-full flex-1 flex-col justify-center gap-6 text-muted-foreground"
            >
              <div className="flex flex-row gap-4">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel mandatory>First name</FormLabel>
                      <FormControl>
                        <Input placeholder="Your first name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel mandatory>Last name</FormLabel>
                      <FormControl>
                        <Input placeholder="Your last name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="country"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel mandatory>Country</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="The country in which you reside"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <PfpInpt
                form={form}
                imageUrl={imageUrl}
                setImageUrl={setImageUrl}
                submitted={submitted}
                setFile={setFile}
                loading={loading}
              />

              <Button
                variant="default"
                className="my-4 w-full"
                type="submit"
                disabled={loading}
              >
                Submit
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};
