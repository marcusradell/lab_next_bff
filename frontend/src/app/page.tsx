"use client";

import { useQuery } from "@tanstack/react-query";

const luckyReplyMessage = (lucky: boolean) => (lucky ? "Yes" : "No");

const baseUrl = process.env.NEXT_PUBLIC_API_URL;

export default function Home() {
  const { status, data, error } = useQuery({
    queryKey: ["luck"],
    queryFn: () => fetch(`${baseUrl}/luck`).then((res) => res.json()),
  });

  if (status === "pending") {
    return <div>Loading...</div>;
  }

  if (status === "error") {
    console.error(error);
    return <div>Something went wrong.</div>;
  }

  const luckyString = luckyReplyMessage(data);

  return (
    <main className="container m-auto grid grid-cols-12">
      <h1 className="col-span-full text-4xl font-bold text-center p-4">
        Lab Next BFF
      </h1>
      <div className="col-span-full text-center p-4">
        Is luck on your side today?
      </div>

      <div className="text-2xl col-span-full text-center p4 animate__animated animate__zoomIn">
        {luckyString}
      </div>
    </main>
  );
}
