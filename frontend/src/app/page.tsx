"use client";

import { useQuery } from "@tanstack/react-query";

const luckyToString = (lucky: boolean) => (lucky ? "Yes" : "No");

export default function Home() {
  const query = useQuery({
    queryKey: ["repoData"],
    queryFn: () => Promise.resolve(Math.random() < 0.5),
  });

  if (query.status === "pending") {
    return <div>Loading...</div>;
  }

  if (query.status === "error") {
    return <div>Something went wrong</div>;
  }

  const luckyString = luckyToString(query.data);

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
