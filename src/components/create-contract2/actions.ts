// "use server";

// import { ChatCompletionRole, Client } from "@octoai/client";
// import { env } from "@/env";
// import { Message } from "./chat";

// const OCTOAI_TOKEN = env.OCTOAI_TOKEN;
// const client = new Client(OCTOAI_TOKEN);

// export type CompletionMessage = {
//   role: ChatCompletionRole;
//   content: string;
// };

// export const getParams = async (conversation: Message[]) => {
//   let messages: CompletionMessage[] = [
//     {
//       role: "system",
//       content:
//         "You are a contract builder. Your goal is to discern the amount to be paid in cash and the amount to be paid in royalties. The amount to be paid in royalties may be paid in different traunches. You should return each traunch separately in the json object.",
//     },
//   ];

//   conversation.forEach((message) => {
//     messages.push({
//       role: message.sentByUser ? "user" : "assistant",
//       content: message.message,
//     });
//   });

//   const response = await client.chat.completions.create({
//     messages: messages,
//     model: "codellama-13b-instruct",
//     response_format: {
//       type: "json_object",
//       schema: {
//         title: "Contract",
//         type: "object",
//         properties: {
//           cashPayout: {
//             type: "number",
//             description:
//               "The total payout of the contract in raw cash. If no cash involved return 0",
//           },
//           royaltyPayments: {
//             type: "array",
//             description:
//               "An array of royalty payments. Only add multiple royalty payments if the user explicitly states that there should be multiple.",
//             items: {
//               type: "object",
//               properties: {
//                 percent: {
//                   type: "number",
//                   description:
//                     "If the word percent or rate is not explicitly stated return 100. The percent of revenues to be paid out for this specific traunch. As a percent 0-100.",
//                 },
//                 payout: {
//                   type: "number",
//                   description:
//                     "The payout of this royalty traunch. If the payout is not explicitly stated return 0 ",
//                 },
//               },
//             },
//           },
//         },
//       },
//     },
//   });
//   return response;
// };

// export const getQuestion = async (prompt: string) => {
//   const response = await client.chat.completions.create({
//     messages: [
//       {
//         role: "system",
//         content:
//           "You are a question builder. For each piece of missing information you are provided ask a question to gain that information. For example if you are missing percentage information for payment 2 you would ask: what percent of revnue will be paid out for payment 2. If you are missing payout information for payment one you would ask what is the payout for payment 1. Do not include any newlines.",
//       },
//       {
//         role: "user",
//         content: prompt,
//       },
//     ],
//     model: "codellama-13b-instruct",
//     temperature: 0.1,
//   });

//   return response;
// };
