import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function capitalizeFirstLetter(inputString: string) {
  const lowercaseString = inputString.toLowerCase();

  const capitalizedString =
    lowercaseString.charAt(0).toUpperCase() + lowercaseString.slice(1);

  return capitalizedString;
}

export function getInitials(firstName: string, lastName: string) {
  return `${firstName.charAt(0)}${lastName.charAt(0)}`;
}

export const formatCurrency = (value: number): string => {
  if (value >= 1000) {
    const wholePart = value.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return "$" + wholePart;
  } else {
    const formattedCurrency =
      "$" + value.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return formattedCurrency;
  }
};

export const timeAgo = (createdAt: Date): string => {
  const currentTime = new Date();
  const timeDifference = currentTime.getTime() - createdAt.getTime();

  if (timeDifference < 1000 * 60) {
    return "Just now";
  } else if (timeDifference < 1000 * 60 * 60) {
    const minutes = Math.floor(timeDifference / (1000 * 60));
    return `${minutes} minute${minutes === 1 ? "" : "s"} ago`;
  } else if (timeDifference < 1000 * 60 * 60 * 24) {
    const hours = Math.floor(timeDifference / (1000 * 60 * 60));
    return `${hours} hour${hours === 1 ? "" : "s"} ago`;
  } else if (timeDifference < 1000 * 60 * 60 * 24 * 7) {
    const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    return `${days} day${days === 1 ? "" : "s"} ago`;
  } else if (timeDifference < 1000 * 60 * 60 * 24 * 30) {
    const weeks = Math.floor(timeDifference / (1000 * 60 * 60 * 24 * 7));
    return `${weeks} week${weeks === 1 ? "" : "s"} ago`;
  } else {
    const months = Math.floor(timeDifference / (1000 * 60 * 60 * 24 * 30));
    return `${months} month${months === 1 ? "" : "s"} ago`;
  }
};

// export const removeQuotesAndNewLines = (inputString: string) => {
//   console.log();
//   // This regex looks for quotes, captures content inside quotes allowing for leading/trailing spaces
//   const regex = /" *([^"]*?) *"/g;

//   // Replace matches by trimming spaces inside quotes and removing the quotes themselves
//   let result = inputString.replace(regex, function (match, p1) {
//     return p1.trim();
//   });

//   // Additionally, replace any newline characters with a space
//   result = result.replace(/\n/g, " ");

//   return result;
// };

export const removeQuotesAndNewLines = (inputString: string) => {
  // Adjusting for escaped newline characters in JSON strings
  let result = inputString.replace(/\\n/g, " ");

  // Additionally, since JSON.stringify adds quotes around the string,
  // we need to remove them if they are not part of the original content.
  // This strips the leading and trailing quote from a JSON-stringified string.
  result = result.replace(/^"|"$/g, "");

  return result;
};
