// import type { ContractInput } from "@/app/(main)/create-contract2/page";
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
// import { type UseFormReturn, useFieldArray } from "react-hook-form";
// import { Input } from "../ui/input";

// export const ContractForm: React.FC<{
//   form: UseFormReturn<ContractInput>;
// }> = ({ form }) => {
//   const onSubmit = (data: ContractInput) => {
//     console.log(data);
//   };

//   const fieldArray = useFieldArray({
//     control: form.control,
//     name: "royaltyPayments",
//   });

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
//             <FormField
//               control={form.control}
//               name="cashPayout"
//               render={({ field }) => (
//                 <FormItem className="w-full">
//                   <FormLabel>Cash Payment</FormLabel>
//                   <FormControl>
//                     <Input
//                       className="group-hover:pr-8"
//                       type="number"
//                       placeholder="How much cash will you pay"
//                       {...field}
//                     />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />

//             {fieldArray.fields.length >= 1 && (
//               <FormField
//                 control={form.control}
//                 name="royaltyPayments"
//                 render={() => (
//                   <FormItem>
//                     <FormLabel>Royalty Payments</FormLabel>
//                     <div className="flex flex-col gap-2">
//                       {fieldArray.fields.map((field, index) => (
//                         <div
//                           key={field.id}
//                           className="group relative flex items-center gap-4"
//                         >
//                           <FormControl>
//                             <Input
//                               type="number"
//                               placeholder="Royalty rate"
//                               {...form.register(
//                                 `royaltyPayments.${index}.percent` as const,
//                               )}
//                             />
//                           </FormControl>
//                           <FormControl>
//                             <Input
//                               type="number"
//                               placeholder="Payout"
//                               className={`${
//                                 fieldArray.fields.length > 1 &&
//                                 "group-hover:w-[calc(100%-1.5rem)] group-hover:pr-8"
//                               }`}
//                               {...form.register(
//                                 `royaltyPayments.${index}.payout` as const,
//                               )}
//                             />
//                           </FormControl>
//                           {fieldArray.fields.length > 1 && (
//                             <TrashIcon
//                               className="invisible absolute right-1 h-6 w-6 text-muted-foreground/40 hover:cursor-pointer hover:text-muted-foreground/30 group-hover:visible"
//                               onClick={() => fieldArray.remove(index)}
//                             />
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
//                           ) ||
//                           watchRoyaltyPayments.length === 4
//                         }
//                         onClick={() =>
//                           fieldArray.append({ percent: 0, payout: 0 })
//                         }
//                       >
//                         Add Royalty Payment
//                       </Button>
//                       {!watchCashPayout ||
//                         (watchCashPayout == 0 && (
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
//                               fieldArray.append({ percent: 0, payout: 0 })
//                             }
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
