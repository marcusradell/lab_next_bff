"use client";

import { useQuery } from "@tanstack/react-query";
import { Async } from "./compontents";

const baseUrl = process.env.NEXT_PUBLIC_API_URL;

export default function Home() {
  const query = useQuery({
    queryKey: ["course_plans"],
    queryFn: () =>
      fetch(`${baseUrl}/course_plans/get_all`).then(
        (res) => res.json() as Promise<{ id: number; name: string }>
      ),
  });

  if (query.status === "error") {
    console.error(query.error);
    return <div>Something went wrong.</div>;
  }

  return (
    <main className="container m-auto grid grid-cols-12">
      <h1 className="col-span-full text-4xl font-bold text-center p-4">
        Lab Next BFF
      </h1>
      <div className="text-2xl col-span-full text-center p-4">Course plans</div>

      <Async
        status={query.status}
        render={
          <div className=" col-span-full p4 animate__animated animate__zoomIn">
            <pre>{JSON.stringify(query.data, null, 2)}</pre>
          </div>
        }
      />
    </main>
  );
}
