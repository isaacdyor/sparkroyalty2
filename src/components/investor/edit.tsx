"use client";

import { api } from "@/trpc/react";
import { InvestorForm, type NewInvestorInput } from "./form";
import { toast } from "sonner";
import { ActiveType } from "@prisma/client";
import { useRouter } from "next/navigation";

export function EditInvestor() {
  const router = useRouter();
  const { data: investor, error } = api.investors.getCurrent.useQuery();

  const { mutate } = api.investors.update.useMutation({
    onSuccess: async () => {
      router.push("/profile");
      toast.success("Investor profile edited!");
    },
    onError: (e) => {
      const errorMessage = e.data?.zodError?.fieldErrors.content;
      console.error("Error editing investor profile:", errorMessage);
      toast.error("Error editing investor profile");
    },
  });

  if (!investor || investor.user.active !== ActiveType.INVESTOR) return null;

  const onSubmit = async (data: NewInvestorInput) => {
    mutate({
      bio: data.bio,
      skills: data.skills,
      educationAndExperience: data.educationAndExperience,
      github: data.github,
      linkedin: data.linkedin,
      website: data.website,
    });
    // router.push("/profile");
  };

  return <InvestorForm investor={investor} onSubmit={onSubmit} />;
}
