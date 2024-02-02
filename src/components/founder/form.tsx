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

import { founderSchema } from "@/lib/validators/founderSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import type { z } from "zod";

import type { Founder } from "@prisma/client";

export type NewFounderInput = z.infer<typeof founderSchema>;

type FounderFormProps = {
  founder?: Founder;
  onSubmit: (data: NewFounderInput) => Promise<void>;
};

export function FounderForm({ founder, onSubmit }: FounderFormProps) {
  const defaultValues = founder
    ? {
        bio: founder.bio,
        educationAndExperience: founder.educationAndExperience,
      }
    : {
        bio: "",
        educationAndExperience: "",
      };

  const form = useForm<NewFounderInput>({
    resolver: zodResolver(founderSchema),
    defaultValues,
  });

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
