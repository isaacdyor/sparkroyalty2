"use client";

import { VentureForm, type NewVentureInput } from "@/components/venture/form";
import { api } from "@/trpc/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function NewVentureForm() {
  const router = useRouter();

  const { mutate } = api.ventures.create.useMutation({
    onSuccess: (data) => {
      router.push(`/venture/${data.id}`);
      toast.success("Venture created!");
    },
    onError: (e) => {
      const errorMessage = e.data?.zodError?.fieldErrors.content;
      console.error("Error creating venture:", errorMessage);
      toast.error("Error creating venture");
    },
  });

  const onSubmit = async (data: NewVentureInput) => {
    mutate(data);
  };

  return <VentureForm onSubmit={onSubmit} />;
}
