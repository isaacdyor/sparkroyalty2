"use client";

import { Button } from "@/components/ui/button";
import { api } from "@/trpc/react";

export const DeleteVentureButton: React.FC<{ id: string }> = ({ id }) => {
  const { mutate } = api.ventures.delete.useMutation();
  const deleteVenture = async () => {
    mutate({ id });
  };
  return (
    <Button variant="outline" onClick={deleteVenture}>
      Delete
    </Button>
  );
};
