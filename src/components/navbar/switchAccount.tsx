"use client";

import { api } from "@/trpc/react";
import { useActiveContext } from "@/utils/activeContext";
import type { ActiveType } from "@prisma/client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "../ui/button";

export const SwitchActiveButton: React.FC<{
  setMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ setMenuOpen }) => {
  const router = useRouter();

  const { active, setActive } = useActiveContext();

  const oldActive = active!;

  const { mutate } = api.users.switchActive.useMutation({
    onError: (e) => {
      const errorMessage = e.data?.zodError?.fieldErrors.content;
      console.error("Error switching active status:", errorMessage);
      toast.error("Error switching active status");
      setActive(oldActive);
    },
    onSuccess: async () => {
      // router.push("/profile");
      router.refresh();
    },
  });

  const newActive: ActiveType = active === "FOUNDER" ? "INVESTOR" : "FOUNDER";

  const switchActive = async () => {
    setActive(newActive);
    setMenuOpen(false);
    mutate({ active: newActive });
  };

  const text = active === "FOUNDER" ? "Investor" : "Founder";

  return (
    <Button variant="default" onClick={switchActive}>
      Switch to {text}
    </Button>
  );
};
