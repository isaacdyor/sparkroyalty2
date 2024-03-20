import React, { useEffect, useState } from "react";
import { TypeAnimation } from "react-type-animation";

export const FirstMessage = () => {
  const [streaming, setStreaming] = useState(true);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!loaded) {
      setLoaded(true);
    }
  }, []);

  const message =
    "Hello! I am an AI contract builder. Please describe the contract you want built in plain english and I will create it for you!";
  return (
    loaded && (
      <div className="mt-0.5 flex justify-start">
        <div className="flex w-3/4 justify-start">
          {streaming ? (
            <TypeAnimation
              sequence={[
                message,
                500,
                () => {
                  setStreaming(false);
                },
              ]}
              wrapper="span"
              speed={70}
              cursor={true}
              className="inline-block rounded-2xl bg-secondary px-2 py-1"
            />
          ) : (
            <p className="inline-block rounded-2xl bg-secondary px-2 py-1">
              {message}
            </p>
          )}
        </div>
      </div>
    )
  );
};
