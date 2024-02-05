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
import { toast } from "sonner";

import { welcomeSchema } from "@/lib/validators/welcomeSchema";
import { api } from "@/trpc/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import type { z } from "zod";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import PfpInpt from "./pfpInpt";

export type WelcomeInput = z.infer<typeof welcomeSchema>;

export const WelcomeForm: React.FC = () => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const form = useForm<WelcomeInput>({
    resolver: zodResolver(welcomeSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      country: "",
      image: "",
    },
  });

  const router = useRouter();

  const { mutate } = api.users.create.useMutation({
    onSuccess: () => {
      router.push("new-profile");
      toast.success("Founder profile created!");
    },
    onError: (e) => {
      const errorMessage = e.data?.zodError?.fieldErrors.content;
      console.error("Error creating user profile:", errorMessage);
      toast.error("Error creating user profile");
    },
  });

  const onSubmit = async (data: WelcomeInput) => {
    mutate({
      firstName: data.firstName,
      lastName: data.lastName,
      country: data.country,
      image: imageUrl!,
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
