"use client";

import { VentureForm, type NewVentureInput } from "@/components/venture/form";
import { api } from "@/trpc/react";
import { ActiveType } from "@prisma/client";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";

export default function NewVentureForm() {
  const router = useRouter();
  const params = useParams<{ id: string }>();

  const { data: venture } = api.ventures.getOne.useQuery({ id: params.id });

  const { mutate } = api.ventures.update.useMutation({
    onSuccess: (data) => {
      router.push(`/venture/${data.id}`);
      toast.success("Venture updated!");
    },
    onError: (e) => {
      const errorMessage = e.data?.zodError?.fieldErrors.content;
      console.error("Error updating venture:", errorMessage);
      toast.error("Error updating venture");
    },
  });

  if (!venture || venture.founder.user.active !== ActiveType.FOUNDER)
    return null;

  const onSubmit = async (data: NewVentureInput) => {
    mutate({
      id: params.id,
      venture: data,
    });
  };

  return <VentureForm venture={venture} onSubmit={onSubmit} />;
}
