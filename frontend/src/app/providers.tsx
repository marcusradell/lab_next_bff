import { FC } from "react";

type Props = {
  children: React.ReactNode;
};

export const Providers: FC<Props> = ({ children }) => {
  return <>{children}</>;
};
