import { FC, useEffect, useState } from "react";

type Props = {
  status: "error" | "success" | "pending";
  render: React.ReactNode;
};

export const Async: FC<Props> = ({ status, render }) => {
  const [isThresholdReached, setIsThresholdReached] = useState(false);

  const isLoading = !isThresholdReached || status === "pending";

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsThresholdReached(true);
    }, 300);

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  if (isLoading)
    return (
      <div className="absolute top-1/2 left-1/2">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-white"></div>
      </div>
    );

  return render;
};
