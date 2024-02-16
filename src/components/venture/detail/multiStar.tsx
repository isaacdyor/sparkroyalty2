import { Review } from "@prisma/client";
import Link from "next/link";
import React from "react";
import { AiFillStar } from "react-icons/ai";

export const MultiStar: React.FC = () => {
  // const totalStars = reviews.reduce((sum, review) => sum + review.stars, 0);
  // const averageStars = totalStars / reviews.length;

  const averageStars = 5.0;

  const integerPart = Math.floor(averageStars);
  const fractionalPart = averageStars - integerPart;

  const length = 1;

  return (
    <div className="flex items-center">
      <p className="mr-1">{averageStars.toFixed(1)}</p>
      {Array.from({ length: 5 }).map((_, index) => (
        <div key={index} style={{ width: "1.1em", height: "1.1em" }}>
          <AiFillStar
            className={
              index < integerPart
                ? "absolute text-primary"
                : index === integerPart && fractionalPart > 0
                  ? "absolute text-primary"
                  : "absolute text-secondary"
            }
            style={{
              fontSize: "1.1em",
              zIndex: 1,
              clipPath:
                index === integerPart && fractionalPart > 0
                  ? `inset(0 ${(1 - fractionalPart) * 100}% 0 0)`
                  : "",
            }}
          />
          <AiFillStar
            className=" text-secondary"
            style={{
              fontSize: "1.1em",
            }}
          />
        </div>
      ))}
      {/* <Link href={`/founder/${venture.founder.id}/reviews`}> */}
      <Link href={`poop`}>
        <p className="text-primary hover:underline">(10)</p>
      </Link>
    </div>
  );
};
