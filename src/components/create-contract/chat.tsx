// "use client";

// import type { ContractInput } from "@/app/(main)/create-contract/page";
// import { removeQuotesAndNewLines } from "@/lib/utils";
// import type { ChatCompletionRole } from "@octoai/client";
// import { Loader2, Send } from "lucide-react";
// import React, { useEffect, useRef, useState } from "react";
// import type { UseFormReturn } from "react-hook-form";
// import { AutosizeTextarea } from "../ui/auto-resizable";
// import { getParams, getQuestion } from "./actions";
// import { FirstMessage } from "./firstMessage";
// import { StreamMessage } from "./streamMessage";

// export type CompletionType = {
//   cashPayout: string;
//   royaltyPayments: RoyaltyPayments[];
// };

// type RoyaltyPayments = {
//   percent: string;
//   payout: string;
// };

// export type Message = {
//   message: string;
//   sentByUser: boolean;
// };
// export type CompletionMessage = {
//   role: ChatCompletionRole;
//   content: string;
// };

// export const ContractChat: React.FC<{
//   form: UseFormReturn<ContractInput>;
// }> = ({ form }) => {
//   const [prompt, setPrompt] = useState("");
//   const [conversation, setConversation] = useState<Message[]>([]);
//   const [loading, setLoading] = useState(false);
//   const [question, setQuestion] = useState<string | null>(null);
//   const [rerender, setRerender] = useState(true);
//   const [systemMessage, setSystemMessage] = useState<string | null>(null);

//   const onClick = async () => {
//     const updatedConversation = [
//       ...conversation,
//       { message: prompt, sentByUser: true },
//     ];

//     // Now update the state
//     setConversation(updatedConversation);
//     setPrompt("");
//     setRerender(!rerender);

//     const newMessages: CompletionMessage[] = [
//       {
//         role: "system",
//         content:
//           "You are a contract builder. Your goal is to discern the amount to be paid in cash and the amount to be paid in royalties. The amount to be paid in royalties may be paid in different traunches. You should return each traunch separately in the json object.",
//       },
//     ];

//     // Use updatedConversation here instead of the conversation state
//     if (updatedConversation) {
//       updatedConversation.forEach((message) => {
//         newMessages.push({
//           role: message.sentByUser ? "user" : "assistant",
//           content: message.message,
//         });
//       });
//     }

//     setLoading(true);

//     const response = await getParams(newMessages);
//     setLoading(false);
//     const data: CompletionType = JSON.parse(
//       response.choices[0]?.message?.content ?? "",
//     );
//     data.royaltyPayments.forEach((payment) => {
//       if (payment.payout == "0" || payment.percent == "0") {
//         askQuestion(data.royaltyPayments);
//       }
//     });
//     form.setValue("royaltyPayments", data.royaltyPayments);
//     form.setValue("cashPayout", data.cashPayout);
//     completionMessage();
//   };

//   const askQuestion = async (payments: RoyaltyPayments[]) => {
//     setQuestion(null);
//     let questionPrompt = "";
//     payments.forEach((payment, index) => {
//       if (payment.payout == "0") {
//         questionPrompt += `Missing payout information for royalty payment ${
//           index + 1
//         }. `;
//       }
//       if (payment.percent == "0") {
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
//     setSystemMessage(parsedQuestion);
//   };

//   const completionMessage = () => {
//     setSystemMessage("I have successfully completed the contract");
//   };

//   const ref = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     if (conversation) {
//       ref.current?.scrollIntoView({
//         behavior: "instant",
//         block: "end",
//       });
//     }
//   }, [conversation]);

//   return (
//     <div className="flex w-full flex-col gap-6 border-b border-border p-8 lg:border-b-0 lg:border-r">
//       <div className="flex flex-col">
//         <h1 className="text-2xl font-semibold">AI Contract builder</h1>
//       </div>
//       <div className="flex h-full flex-col justify-between rounded-lg border border-border p-4">
//         <div className="flex h-[352px] flex-col gap-2 overflow-scroll ">
//           <FirstMessage />
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
//           {systemMessage && (
//             <StreamMessage
//               message={systemMessage}
//               setConversation={setConversation}
//             />
//           )}

//           <div ref={ref} />
//         </div>
//         <div className="relative flex">
//           <AutosizeTextarea
//             className="h-min resize-none pr-12"
//             minHeight={38}
//             maxHeight={100}
//             value={prompt}
//             rerender={rerender}
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
