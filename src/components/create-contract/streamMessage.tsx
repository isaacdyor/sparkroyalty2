// import React, { useEffect, useState } from "react";
// import { TypeAnimation } from "react-type-animation";
// import type { Message } from "./chat";

// export const StreamMessage: React.FC<{
//   message: string;
//   setConversation: React.Dispatch<React.SetStateAction<Message[]>>;
// }> = ({ message, setConversation }) => {
//   const [show, setShow] = useState(true);

//   useEffect(() => {
//     setShow(true);
//   }, [message]);

//   return (
//     <div className="mt-0.5 flex justify-start">
//       <div className="flex w-3/4 justify-start">
//         {show && (
//           <TypeAnimation
//             sequence={[
//               message,
//               500,
//               () => {
//                 setShow(false);
//                 setConversation((prevConversation) => [
//                   ...prevConversation,
//                   {
//                     message: message,
//                     sentByUser: false,
//                   },
//                 ]);
//               },
//             ]}
//             wrapper="span"
//             speed={70}
//             cursor={true}
//             className="inline-block rounded-2xl bg-secondary px-2 py-1"
//           />
//         )}
//       </div>
//     </div>
//   );
// };
