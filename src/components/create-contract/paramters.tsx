// "use client";

// import { ContractInput } from "@/app/(main)/create-contract/page";
// import { Button } from "@/components/ui/button";
// import {
//   Form,
//   FormControl,
//   FormDescription,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import { TrashIcon } from "@heroicons/react/24/outline";
// import { UseFieldArrayReturn, UseFormReturn } from "react-hook-form";
// import { Input } from "../ui/input";

// export const ContractParamaters: React.FC<{
//   form: UseFormReturn<ContractInput>;
//   fieldArray: UseFieldArrayReturn<ContractInput>;
// }> = ({ form, fieldArray }) => {
//   const onSubmit = () => {
//     console.log("bang");
//   };

//   const watchRoyaltyPayments = form.watch("royaltyPayments");
//   const watchCashPayout = form.watch("cashPayout");

//   return (
//     <div className="w-full p-8">
//       <h1 className="text-2xl font-semibold">Contract Paramaters</h1>
//       <p className="text-muted-foreground">You can edit these as you choose</p>
//       <div className="pt-8">
//         <Form {...form}>
//           <form
//             onSubmit={form.handleSubmit(onSubmit)}
//             className="flex w-full flex-1 flex-col justify-center gap-6 text-muted-foreground"
//           >
//             {watchCashPayout != "0" && watchCashPayout !== "" && (
//               <FormField
//                 control={form.control}
//                 name="cashPayout"
//                 render={({ field }) => (
//                   <FormItem className="w-full">
//                     <FormLabel>Cash Payment</FormLabel>
//                     <FormControl>
//                       <div className="group relative flex items-center gap-1">
//                         <Input
//                           placeholder="How much cash will you pay"
//                           {...field}
//                         />
//                         <TrashIcon
//                           className="invisible absolute right-1 h-6 w-6 text-muted-foreground/40 hover:cursor-pointer hover:text-muted-foreground/30 group-hover:visible"
//                           onClick={() => form.setValue("cashPayout", "")}
//                         />
//                       </div>
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//             )}
//             {fieldArray.fields.length >= 1 && (
//               <FormField
//                 control={form.control}
//                 name="royaltyPayments"
//                 render={() => (
//                   <FormItem>
//                     <FormLabel>Royalty Payments</FormLabel>
//                     <div className="flex flex-col gap-2">
//                       {fieldArray.fields.map((field, index) => (
//                         <div key={field.id}>
//                           <div className="group relative flex items-center gap-4">
//                             <FormControl>
//                               <Input
//                                 placeholder="Royalty rate"
//                                 className="group-hover:pr-8"
//                                 {...form.register(
//                                   `royaltyPayments.${index}.percent` as const,
//                                 )}
//                               />
//                             </FormControl>
//                             <FormControl>
//                               <Input
//                                 placeholder="Payout"
//                                 className="group-hover:pr-8"
//                                 {...form.register(
//                                   `royaltyPayments.${index}.payout` as const,
//                                 )}
//                               />
//                             </FormControl>
//                             {fieldArray.fields.length > 1 && (
//                               <TrashIcon
//                                 className="invisible absolute right-1 h-6 w-6 text-muted-foreground/40 hover:cursor-pointer hover:text-muted-foreground/30 group-hover:visible"
//                                 onClick={() => fieldArray.remove(index)}
//                               />
//                             )}
//                           </div>

//                           {(form.formState.errors.royaltyPayments?.[index]
//                             ?.percent ||
//                             form.formState.errors.royaltyPayments?.[index]
//                               ?.payout) && (
//                             <p className="text-sm font-medium text-destructive">
//                               This can&apos;t be empty
//                             </p>
//                           )}
//                         </div>
//                       ))}
//                     </div>
//                     <div className="flex gap-4 pb-4">
//                       <FormDescription className="w-full">
//                         Royalty Rate
//                       </FormDescription>
//                       <FormDescription className="w-full">
//                         Total Payout
//                       </FormDescription>
//                     </div>
//                     <div className="flex gap-2">
//                       <Button
//                         type="button"
//                         variant="secondary"
//                         disabled={
//                           watchRoyaltyPayments.length === 0 ||
//                           watchRoyaltyPayments.some(
//                             (field) => !field.percent || !field.payout,
//                           )
//                         }
//                         onClick={() =>
//                           fieldArray.append({ percent: "", payout: "" })
//                         }
//                         className="max-w-min"
//                       >
//                         Add Royalty Payment
//                       </Button>
//                       {watchCashPayout == "0" ||
//                         (watchCashPayout == "" && (
//                           <Button
//                             type="button"
//                             variant="secondary"
//                             disabled={
//                               watchRoyaltyPayments.length === 0 ||
//                               watchRoyaltyPayments.some(
//                                 (field) => !field.percent || !field.payout,
//                               )
//                             }
//                             onClick={() =>
//                               fieldArray.append({ percent: "", payout: "" })
//                             }
//                             className="max-w-min"
//                           >
//                             Add Cash Payment
//                           </Button>
//                         ))}
//                     </div>
//                   </FormItem>
//                 )}
//               />
//             )}

//             <Button variant="default" className="my-4 w-full" type="submit">
//               Submit
//             </Button>
//           </form>
//         </Form>
//       </div>
//     </div>
//   );
// };
