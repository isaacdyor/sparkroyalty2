"use client";

import { FounderForm, type NewFounderInput } from "@/components/founder/form";
import { api } from "@/trpc/react";
import { redirect, useRouter } from "next/navigation";
import { toast } from "sonner";

export default function NewFounderForm() {
  const router = useRouter();

  const { data: user, isLoading } = api.users.getCurrent.useQuery();

  const { mutate } = api.founders.create.useMutation({
    onSuccess: () => {
      router.push("/profile");
      toast.success("Founder profile created!");
    },
    onError: (e) => {
      const errorMessage = e.data?.zodError?.fieldErrors.content;
      console.error("Error creating founder profile:", errorMessage);
      toast.error("Error creating founder profile");
    },
  });
  if (isLoading) return <p>Loading...</p>;
  if (!user) redirect("/new-user");
  if (user.founder) return <p>You already have a founder profile</p>;

  const onSubmit = async (data: NewFounderInput) => {
    mutate({
      bio: data.bio,

      educationAndExperience: data.educationAndExperience,
    });
  };

  return <FounderForm onSubmit={onSubmit} />;
}
