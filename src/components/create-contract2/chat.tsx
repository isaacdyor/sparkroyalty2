// import { ContractInput } from "@/app/(main)/create-contract2/page";
// import { Loader2, Send } from "lucide-react";
// import { useEffect, useRef, useState } from "react";
// import { UseFormReturn } from "react-hook-form";
// import { Textarea } from "../ui/textarea";
// import { getParams, getQuestion } from "./actions";
// import { Button } from "../ui/button";
// import { removeQuotesAndNewLines } from "@/lib/utils";

// export type Message = {
//   message: string;
//   sentByUser: boolean;
// };

// export type ContractType = {
//   cashPayout: number;
//   royaltyPayments: RoyaltyType[];
// };

// type RoyaltyType = {
//   percent: number;
//   payout: number;
// };

// export const ContractChat: React.FC<{
//   form: UseFormReturn<ContractInput>;
// }> = ({ form }) => {
//   const [conversation, setConversation] = useState<Message[]>([
//     {
//       message:
//         "Hello! I am an AI contract builder. Please describe the contract you want built in plain english and I will create it for you!",
//       sentByUser: false,
//     },
//   ]);
//   const [prompt, setPrompt] = useState("");
//   const [loading, setLoading] = useState(false);
//   const ref = useRef<HTMLDivElement>(null);

//   const onClick = async () => {
//     setLoading(true);
//     setPrompt("");
//     setConversation((prevConversation) => [
//       ...prevConversation,
//       {
//         message: prompt,
//         sentByUser: true,
//       },
//     ]);
//     const response = await getParams([
//       ...conversation,
//       { message: prompt, sentByUser: true },
//     ]);
//     setLoading(false);
//     const data: ContractType = JSON.parse(
//       response.choices[0]?.message?.content ?? "",
//     );

//     const allPaymentsValid = data.royaltyPayments.every(
//       (payment) => payment.payout !== 0 && payment.percent !== 100,
//     );

//     if (allPaymentsValid) {
//       complete(data);
//     } else {
//       askQuestion(data.royaltyPayments);
//     }
//   };

//   const complete = (data: ContractType) => {
//     form.setValue("royaltyPayments", data.royaltyPayments);
//     form.setValue("cashPayout", data.cashPayout);
//     setConversation((prevConversation) => [
//       ...prevConversation,
//       {
//         message: "I have completed the contract.",
//         sentByUser: false,
//       },
//     ]);
//   };

//   const askQuestion = async (payments: RoyaltyType[]) => {
//     let questionPrompt = "";
//     payments.forEach((payment, index) => {
//       if (payment.payout == 0) {
//         questionPrompt += `Missing payout information for royalty payment ${
//           index + 1
//         }. `;
//       }
//       if (payment.percent == 100) {
//         questionPrompt += `Missing percent information for royalty payment ${
//           index + 1
//         }. `;
//       }
//     });
//     const response = await getQuestion(questionPrompt);
//     const unparsedQuestion = JSON.stringify(
//       response.choices[0]?.message.content ?? "",
//     );
//     const parsedQuestion = removeQuotesAndNewLines(unparsedQuestion);
//     setConversation((prevConversation) => [
//       ...prevConversation,
//       {
//         message: parsedQuestion,
//         sentByUser: false,
//       },
//     ]);
//   };

//   useEffect(() => {
//     if (conversation) {
//       ref.current?.scrollIntoView({
//         behavior: "instant",
//         block: "end",
//       });
//     }
//   }, [conversation]);

//   return (
//     <div className="flex w-full flex-col gap-6 border-b border-border  p-8 lg:border-b-0 lg:border-r">
//       <div className="flex flex-col">
//         <h1 className="text-2xl font-semibold">AI Contract builder</h1>
//       </div>
//       <div className="flex h-full flex-col justify-between rounded-lg border border-border  p-4">
//         <div className="flex h-[330px] flex-col gap-2 overflow-scroll ">
//           {conversation.map((message, index) => (
//             <div
//               key={index}
//               className={`flex ${
//                 message.sentByUser ? "justify-end" : "justify-start"
//               } `}
//             >
//               <div
//                 className={`flex w-3/4 ${
//                   message.sentByUser ? "justify-end" : "justify-start"
//                 }`}
//               >
//                 <p
//                   className={`inline-block rounded-2xl px-2 py-1 ${
//                     message.sentByUser ? " bg-primary/50" : "bg-secondary"
//                   }`}
//                 >
//                   {message.message}
//                 </p>
//               </div>
//             </div>
//           ))}

//           <div ref={ref} />
//         </div>
//         <div className="relative flex">
//           <Textarea
//             className="h-min resize-none pr-12"
//             value={prompt}
//             onChange={(e) => setPrompt(e.target.value)}
//           />
//           <div
//             className="absolute bottom-0.5 right-0.5 rounded-md bg-primary p-2 hover:cursor-pointer hover:bg-primary/70"
//             onClick={onClick}
//           >
//             {loading ? (
//               <Loader2 className=" h-5 w-5 animate-spin " />
//             ) : (
//               <Send className=" h-5 w-5 " />
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };
