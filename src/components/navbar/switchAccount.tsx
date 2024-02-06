"use client";

import { api } from "@/trpc/react";
import { ActiveType } from "@prisma/client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "../ui/button";

export const SwitchActiveButton = () => {
  const router = useRouter();

  const { data: user } = api.users.getCurrent.useQuery();

  const active: ActiveType =
    user?.active === "FOUNDER" ? "INVESTOR" : "FOUNDER";

  const { mutate } = api.users.switchActive.useMutation({
    onError: (e) => {
      const errorMessage = e.data?.zodError?.fieldErrors.content;
      console.error("Error switching active status:", errorMessage);
      toast.error("Error switching active status");
    },
    onSuccess: () => {
      router.push("/profile");
    },
  });

  const switchActive = async () => {
    mutate({ active });
  };

  const text = user?.active === "FOUNDER" ? "Investor" : "Founder";

  return <Button onClick={switchActive}>Switch to {text}</Button>;
};
