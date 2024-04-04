// import { Button } from "@/components/ui/button";
// import type { ApplicationVenture } from "@/server/api/routers/types";
// import React, { useState } from "react";

// import {
//   AlertDialog,
//   AlertDialogAction,
//   AlertDialogCancel,
//   AlertDialogContent,
//   AlertDialogDescription,
//   AlertDialogFooter,
//   AlertDialogHeader,
//   AlertDialogTitle,
// } from "@/components/ui/alert-dialog";
// import { api } from "@/trpc/react";
// import { CheckIcon } from "@heroicons/react/24/solid";
// import { Loader2 } from "lucide-react";
// import { toast } from "sonner";

// export const MarkCompleteButton: React.FC<{
//   application: ApplicationVenture;
// }> = ({ application }) => {
//   const [showDialog, setShowDialog] = useState(false);
//   const [isHireLoading, setIsHireLoading] = useState(false);

//   const { mutate } = api.buildingUpdates.create.useMutation({
//     onSuccess: () => {
//       setIsHireLoading(false);
//       setShowDialog(false);
//       toast.success("Venture updated!");
//     },
//     onError: (e) => {
//       const errorMessage = e.data?.zodError?.fieldErrors.content;
//       console.error("Error updating venture:", errorMessage);
//       setIsHireLoading(false);
//       setShowDialog(false);
//       toast.error("Error updating venture");
//     },
//   });

//   const onClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
//     e.stopPropagation();
//     e.preventDefault();
//     setShowDialog(true);
//   };

//   const acceptApplication = async (
//     applicationId: string,
//     ventureId: string,
//   ) => {
//     // mutate({ applicationId, ventureId });
//     console.log("not sure whats going on");
//   };

//   const user = application?.investor.user;
//   return (
//     <>
//       <Button onClick={onClick} className="w-full px-6">
//         Hire
//       </Button>
//       <AlertDialog open={showDialog} onOpenChange={setShowDialog}>
//         <AlertDialogContent>
//           <AlertDialogHeader>
//             <AlertDialogTitle>
//               Are you sure you want to mark it complete
//             </AlertDialogTitle>
//             <AlertDialogDescription>
//               This action cannot be undone.
//             </AlertDialogDescription>
//           </AlertDialogHeader>
//           <AlertDialogFooter>
//             <AlertDialogCancel>Cancel</AlertDialogCancel>
//             <AlertDialogAction
//               onClick={async (event) => {
//                 event.preventDefault();
//                 setIsHireLoading(true);

//                 acceptApplication(application.id, application.ventureId);
//               }}
//               className="bg-primary hover:bg-primary/70"
//             >
//               {isHireLoading ? (
//                 <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//               ) : (
//                 <CheckIcon className="mr-2 h-4 w-4" />
//               )}
//               <span>Confirm</span>
//             </AlertDialogAction>
//           </AlertDialogFooter>
//         </AlertDialogContent>
//       </AlertDialog>
//     </>
//   );
// };
