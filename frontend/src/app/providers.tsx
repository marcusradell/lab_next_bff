"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { FC } from "react";

type Props = {
  children: React.ReactNode;
};

const client = new QueryClient();

export const Providers: FC<Props> = ({ children }) => {
  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
};
