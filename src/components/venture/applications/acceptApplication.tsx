import { Button } from "@/components/ui/button";
import type { ApplicationVenture } from "@/server/api/routers/types";
import React, { useState } from "react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { api } from "@/trpc/react";
import { CheckIcon } from "@heroicons/react/24/solid";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

export const AcceptApplicationButton: React.FC<{
  application: ApplicationVenture;
}> = ({ application }) => {
  const [showDialog, setShowDialog] = useState(false);
  const [isHireLoading, setIsHireLoading] = useState(false);

  const { mutate } = api.applications.acceptApplication.useMutation({
    onSuccess: () => {
      setIsHireLoading(false);
      setShowDialog(false);
      toast.success("Accepted application!");
    },
    onError: (e) => {
      const errorMessage = e.data?.zodError?.fieldErrors.content;
      console.error("Error accepting application:", errorMessage);
      setIsHireLoading(false);
      setShowDialog(false);
      toast.error("Error accepting application");
    },
  });

  const onClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    e.preventDefault();
    setShowDialog(true);
  };

  const acceptApplication = async (
    applicationId: string,
    ventureId: string,
    investorId: string,
  ) => {
    mutate({ applicationId, ventureId, investorId });
  };

  const user = application?.investor.user;
  return (
    <>
      <Button onClick={onClick} className="w-full px-6">
        Hire
      </Button>
      <AlertDialog open={showDialog} onOpenChange={setShowDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Are you sure you want to hire {user?.firstName} {user?.lastName}?
            </AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={async (event) => {
                event.preventDefault();
                setIsHireLoading(true);
                console.log(application.investorId);
                await acceptApplication(
                  application.id,
                  application.ventureId,
                  application.investorId,
                );
              }}
              className="bg-primary hover:bg-primary/70"
            >
              {isHireLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <CheckIcon className="mr-2 h-4 w-4" />
              )}
              <span>Confirm</span>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};
