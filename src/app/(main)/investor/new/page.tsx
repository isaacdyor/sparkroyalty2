"use client";

import { api } from "@/trpc/react";

import {
  InvestorForm,
  type NewInvestorInput,
} from "@/components/investor/form";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function NewInvestorForm() {
  const router = useRouter();

  const { mutate } = api.investors.create.useMutation({
    onSuccess: async () => {
      router.push("/profile");
      toast.success("Investor profile created!");
    },
    onError: (e) => {
      const errorMessage = e.data?.zodError?.fieldErrors.content;
      console.error("Error creating investor profile:", errorMessage);
      toast.error("Error creating investor profile");
    },
  });

  const onSubmit = async (data: NewInvestorInput) => {
    mutate({
      bio: data.bio,
      skills: data.skills,
      country: data.country,
      educationAndExperience: data.educationAndExperience,
      github: data.github,
      linkedin: data.linkedin,
      website: data.website,
    });
  };

  return <InvestorForm onSubmit={onSubmit} />;
}
