import React from "react";
import { AiFillStar } from "react-icons/ai";

export const MultiStar: React.FC<{ simple?: boolean }> = ({ simple }) => {
  // const totalStars = reviews.reduce((sum, review) => sum + review.stars, 0);
  // const averageStars = totalStars / reviews.length;

  const averageStars = 5.0;

  const integerPart = Math.floor(averageStars);
  const fractionalPart = averageStars - integerPart;

  return (
    <div className="flex items-center">
      {!simple && <p className="mr-1 text-sm">{averageStars.toFixed(1)}</p>}

      {Array.from({ length: 5 }).map((_, index) => (
        <div key={index} style={{ width: "1em", height: "1em" }}>
          <AiFillStar
            className={
              index < integerPart
                ? "absolute text-primary"
                : index === integerPart && fractionalPart > 0
                  ? "absolute text-primary"
                  : "absolute text-secondary"
            }
            style={{
              fontSize: "1em",
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
              fontSize: "1em",
            }}
          />
        </div>
      ))}
      {/* {!simple && (
        <Link href={`poop`}>
          <p className="text-sm hover:underline">(10)</p>
        </Link>
      )} */}
    </div>
  );
};
