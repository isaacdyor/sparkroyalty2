"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
import { EllipsisHorizontalIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import { useState } from "react";
import { api } from "@/trpc/react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { TrashIcon } from "@heroicons/react/24/outline";

export const PostActions: React.FC<{ id: string }> = ({ id }) => {
  const router = useRouter();
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const [isDeleteLoading, setIsDeleteLoading] = useState(false);

  const { mutate } = api.ventures.delete.useMutation({
    onSuccess: async () => {
      toast.success("Venture succesfully deleted!");
      setIsDeleteLoading(false);
      setShowDeleteAlert(false);
      router.refresh();
    },
    onError: (e) => {
      const errorMessage = e.data?.zodError?.fieldErrors.content;
      console.error("Error deleting venture!:", errorMessage);
      toast.error("Error deleting venture!");
    },
  });
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger
          onClick={(e) => e.stopPropagation()}
          className="flex items-center justify-center rounded-md border p-2 transition-colors hover:bg-muted"
        >
          <EllipsisHorizontalIcon className="h-5 w-5" />
          <span className="sr-only">Open</span>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem className="md:hidden">
            <Link href={`/venture/${id}/applications`} className="flex w-full">
              View Applications
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator className="md:hidden" />
          <DropdownMenuItem>
            <Link href={`/venture/${id}/edit`} className="flex w-full">
              Edit
            </Link>
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
              Are you sure you want to delete this post?
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

                const deleted = mutate({ id });
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
    </>
  );
};
