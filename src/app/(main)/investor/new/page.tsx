"use client";

import { api } from "@/trpc/react";

import {
  InvestorForm,
  type NewInvestorInput,
} from "@/components/investor/form";
import { redirect, useRouter } from "next/navigation";
import { toast } from "sonner";

export default function NewInvestorForm() {
  const router = useRouter();

  const { data: user, isLoading } = api.users.getCurrent.useQuery();

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
  if (isLoading) return <p>Loading...</p>;
  if (!user) redirect("/new-user");

  if (user?.investor) return <p>You already have an investor profile</p>;

  const onSubmit = async (data: NewInvestorInput) => {
    mutate(data);
  };

  return <InvestorForm onSubmit={onSubmit} />;
}
