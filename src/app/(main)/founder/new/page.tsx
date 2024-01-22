"use client";

import { FounderForm, type NewFounderInput } from "@/components/founder/form";
import { capitalizeFirstLetter } from "@/lib/utils";
import { api } from "@/trpc/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function NewFounderForm() {
  const router = useRouter();

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

  const onSubmit = async (data: NewFounderInput) => {
    mutate({
      firstName: capitalizeFirstLetter(data.firstName),
      lastName: capitalizeFirstLetter(data.lastName),
      bio: data.bio,
      country: data.country,
      educationAndExperience: data.educationAndExperience,
    });
  };

  return <FounderForm onSubmit={onSubmit} />;
}
