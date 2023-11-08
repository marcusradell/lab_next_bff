"use client";

import { useQuery } from "@tanstack/react-query";

const baseUrl = process.env.NEXT_PUBLIC_API_URL;

export default function Home() {
  const { status, data, error } = useQuery({
    queryKey: ["course_plans"],
    queryFn: () =>
      fetch(`${baseUrl}/course_plans/get_all`).then((res) => res.json()),
  });

  if (status === "pending") {
    return <div>Loading...</div>;
  }

  if (status === "error") {
    console.error(error);
    return <div>Something went wrong.</div>;
  }

  return (
    <main className="container m-auto grid grid-cols-12">
      <h1 className="col-span-full text-4xl font-bold text-center p-4">
        Lab Next BFF
      </h1>
      <div className="col-span-full text-center p-4">
        Is luck on your side today?
      </div>

      <div className="text-2xl col-span-full p4 animate__animated animate__zoomIn">
        <pre>{JSON.stringify(data, null, 2)}</pre>
      </div>
    </main>
  );
}
