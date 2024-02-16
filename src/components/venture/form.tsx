"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";

import { Textarea } from "@/components/ui/textarea";

import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import type { z } from "zod";

import { TrashIcon } from "@heroicons/react/24/outline";

import { ventureSchema } from "@/lib/validators/ventureSchema";
import type { Venture } from "@prisma/client";

export type NewVentureInput = z.infer<typeof ventureSchema>;

type VentureFormProps = {
  venture?: Venture;
  onSubmit: (data: NewVentureInput) => Promise<void>;
};

export function VentureForm({ venture, onSubmit }: VentureFormProps) {
  const form = useForm<NewVentureInput>({
    resolver: zodResolver(ventureSchema),
    defaultValues: {
      title: venture?.title ?? "",
      description: venture?.description ?? "",
      role: venture?.role ?? undefined,
      workDescription: venture?.workDescription ?? "",
      skills: venture?.skills.map((skill) => ({ name: skill })) ?? [
        { name: "" },
      ],
      percent: venture?.percent ?? 0,
      totalPayout: venture?.totalPayout ?? 0,
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "skills",
  });

  const watchSkills = form.watch("skills");

  return (
    <div className="flex w-screen justify-center p-8">
      <Card className="w-full max-w-2xl border border-border">
        <CardHeader>
          {venture ? (
            <CardTitle>Edit Venture</CardTitle>
          ) : (
            <CardTitle>Create New Venture</CardTitle>
          )}
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex w-full flex-1 flex-col justify-center gap-6 text-muted-foreground"
            >
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel mandatory>Title</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="The title of your venture"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel mandatory>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Tell us a little bit about your venture"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel mandatory>Role</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select the role you need filled" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="FRONTEND">
                          Frontend Engineer
                        </SelectItem>
                        <SelectItem value="BACKEND">
                          Backend Engineer
                        </SelectItem>
                        <SelectItem value="FULLSTACK">
                          Fullstack Engineer
                        </SelectItem>
                        <SelectItem value="DESIGN">Designer</SelectItem>
                        <SelectItem value="MARKETING">Marketer</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="workDescription"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel mandatory>Work Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Go into a little more detail about what you need done"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="skills"
                render={() => (
                  <FormItem>
                    <FormLabel mandatory>Skills</FormLabel>
                    <div className="grid grid-cols-2 gap-2">
                      {fields.map((field, index) => (
                        <div key={field.name}>
                          <div className="group relative flex items-center">
                            <FormControl>
                              <Input
                                placeholder="Your skill"
                                className="group-hover:pr-8"
                                {...form.register(
                                  `skills.${index}.name` as const,
                                )}
                              />
                            </FormControl>
                            {fields.length > 1 && (
                              <TrashIcon
                                className="invisible absolute right-1 h-6 w-6 text-muted-foreground/40 hover:cursor-pointer hover:text-muted-foreground/30 group-hover:visible"
                                onClick={() => remove(index)}
                              />
                            )}
                          </div>

                          {form.formState.errors.skills?.[index]?.name && (
                            <p className="text-sm font-medium text-destructive">
                              This can&apos;t be empty
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                    <Button
                      type="button"
                      disabled={watchSkills.some((field) => !field.name)}
                      onClick={() => append({ name: "" })}
                      className="max-w-min"
                    >
                      Add Skill
                    </Button>
                  </FormItem>
                )}
              />
              <div className="flex flex-row gap-4">
                <FormField
                  control={form.control}
                  name="percent"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel mandatory>Percent (%)</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="What percent of revenue will you pay"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Percent of revenue will you pay out
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="totalPayout"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel mandatory>Total Payout ($)</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="Total amount to be paid out"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Total money to be paid out
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              {venture ? (
                <Button variant="default" className="my-4 w-full" type="submit">
                  Save
                </Button>
              ) : (
                <Button variant="default" className="my-4 w-full" type="submit">
                  Submit
                </Button>
              )}
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
