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
