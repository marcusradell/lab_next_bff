import { FC, useEffect, useState } from "react";

type Props = {
  status: "error" | "success" | "pending";
  render: React.ReactNode;
};

export const Async: FC<Props> = ({ status, render }) => {
  const [isThresholdReached, setIsThresholdReached] = useState(false);

  const isLoading = !isThresholdReached || status === "pending";

  const [isDone, setIsDone] = useState(false);

  const animation = isLoading ? "animate__zoomIn" : "animate__zoomOut";

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (isLoading) {
      timeout = setTimeout(() => {
        setIsThresholdReached(true);
      }, 450);
    } else {
      timeout = setTimeout(() => {
        setIsDone(true);
      }, 200);
    }

    return () => {
      clearTimeout(timeout);
    };
  }, [isLoading]);

  if (!isDone)
    return (
      <div
        className={"absolute top-1/2 left-1/2 animate__animated " + animation}
      >
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-white"></div>
      </div>
    );

  return <div className="animate__animated animate__zoomIn">{render}</div>;
};
