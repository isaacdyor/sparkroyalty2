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

import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Textarea } from "@/components/ui/textarea";

import { useFieldArray, useForm } from "react-hook-form";
import type { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { founderSchema } from "@/lib/validators/founderSchema";

import { useRouter } from "next/navigation";
import { api } from "@/trpc/react";
import { capitalizeFirstLetter } from "@/lib/utils";

export type NewFounderInput = z.infer<typeof founderSchema>;

export default function NewInvestorForm() {
  const form = useForm<NewFounderInput>({
    resolver: zodResolver(founderSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      bio: "",
      country: "",
      educationAndExperience: "",
    },
  });

  const router = useRouter();

  const { mutate } = api.founders.create.useMutation({
    onSuccess: () => {
      router.push("/profile");
    },
    onError: (e) => {
      const errorMessage = e.data?.zodError?.fieldErrors.content;
      console.error("Error creating investor profile:", errorMessage);
    },
  });

  const onSubmit = async (data: NewFounderInput) => {
    mutate({
      firstName: capitalizeFirstLetter(data.firstName),
      lastName: capitalizeFirstLetter(data.lastName),
      bio: data.bio,
      country: data.country,
      educationAndExperience: data.educationAndExperience,
    });
  };

  return (
    <div className="flex w-screen justify-center p-8">
      <Card className="w-full max-w-2xl border border-border">
        <CardHeader>
          <CardTitle>Create Founder Profile</CardTitle>
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
                      <FormLabel className="">First name</FormLabel>
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
                      <FormLabel className="">Last name</FormLabel>
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
                name="bio"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Bio</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Tell us a little bit about yourself"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="country"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Country</FormLabel>
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
              <FormField
                control={form.control}
                name="educationAndExperience"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Education and Experience</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Tell us about your education and experience"
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
}
