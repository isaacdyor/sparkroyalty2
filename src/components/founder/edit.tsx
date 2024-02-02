"use client";

import { api } from "@/trpc/react";
import { FounderForm, type NewFounderInput } from "./form";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { ActiveType } from "@prisma/client";

export function EditFounder() {
  const { data: founder } = api.founders.getCurrent.useQuery();
  const router = useRouter();

  const { mutate } = api.founders.update.useMutation({
    onSuccess: async () => {
      router.push("/profile");
      toast.success("Founder profile edited!");
    },
    onError: (e) => {
      const errorMessage = e.data?.zodError?.fieldErrors.content;
      console.error("Error editing founder profile:", errorMessage);
      toast.error("Error editing founder profile");
    },
  });

  if (!founder || founder.user.active !== ActiveType.FOUNDER) return null;
  const onSubmit = async (data: NewFounderInput) => {
    mutate({
      bio: data.bio,
      educationAndExperience: data.educationAndExperience,
    });
  };

  return <FounderForm founder={founder} onSubmit={onSubmit} />;
}
