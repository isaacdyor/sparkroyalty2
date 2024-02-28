"use client";
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { api } from "@/trpc/react";
import { TrashIcon } from "@heroicons/react/24/outline";
import { EllipsisHorizontalIcon } from "@heroicons/react/24/solid";
import type { Application, Venture } from "@prisma/client";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { ApplicationDialog } from "./applicationDialog";

export const ApplicationActions: React.FC<{
  application: Application;
  venture: Venture;
}> = ({ application }) => {
  const router = useRouter();
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const [isDeleteLoading, setIsDeleteLoading] = useState(false);
  const [showApplication, setShowApplication] = useState(false);

  const { mutate: deleteApplication } = api.applications.delete.useMutation({
    onSuccess: async () => {
      toast.success("Application succesfully deleted!");
      setIsDeleteLoading(false);
      setShowDeleteAlert(false);
      router.refresh();
    },
    onError: (e) => {
      const errorMessage = e.data?.zodError?.fieldErrors.content;
      console.error("Error deleting application!:", errorMessage);
      toast.error("Error deleting application!");
    },
  });

  console.log(showApplication);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger className="flex items-center justify-center rounded-md border p-2 transition-colors hover:bg-muted">
          <EllipsisHorizontalIcon className="h-5 w-5" />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem
            className="cursor-pointer"
            onSelect={() => {
              console.log("clicked");
              setShowApplication(true);
            }}
          >
            Edit
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="flex cursor-pointer items-center text-destructive focus:text-destructive"
            onSelect={() => setShowDeleteAlert(true)}
          >
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <AlertDialog open={showDeleteAlert} onOpenChange={setShowDeleteAlert}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Are you sure you want to delete this Application?
            </AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={(event) => {
                event.preventDefault();
                setIsDeleteLoading(true);

                deleteApplication({ id: application.id });
              }}
              className="bg-destructive hover:bg-destructive/70 focus:ring-destructive"
            >
              {isDeleteLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <TrashIcon className="mr-2 h-4 w-4" />
              )}
              <span>Delete</span>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <ApplicationDialog
        showDialog={showApplication}
        setShowDialog={setShowApplication}
        application={application}
      />
    </>
  );
};
