"use client";

import { api } from "@/trpc/react";
import { ActiveType, User } from "@prisma/client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "../ui/button";

export const SwitchActiveButton: React.FC<{
  user: User;
  setMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ user, setMenuOpen }) => {
  const router = useRouter();

  const { mutate } = api.users.switchActive.useMutation({
    onError: (e) => {
      const errorMessage = e.data?.zodError?.fieldErrors.content;
      console.error("Error switching active status:", errorMessage);
      toast.error("Error switching active status");
    },
    onSuccess: async () => {
      // router.push("/profile");
      router.refresh();
    },
  });

  if (!user) return null;

  const active: ActiveType = user.active === "FOUNDER" ? "INVESTOR" : "FOUNDER";

  const switchActive = async () => {
    setMenuOpen(false);
    mutate({ active });
  };

  const text = user?.active === "FOUNDER" ? "Investor" : "Founder";

  return (
    <Button variant="default" onClick={switchActive}>
      Switch to {text}
    </Button>
  );
};
