"use client";

export default function Home() {
  return (
    <main className="container m-auto grid grid-cols-12">
      <h1 className="col-span-full text-4xl font-bold text-center p-4">
        Lab Next BFF
      </h1>
      <div className="col-span-full text-center p-4">
        Is luck on your side today?
      </div>

      <div className="text-2xl col-span-full text-center p4 animate__animated animate__zoomIn">
        No.
      </div>
    </main>
  );
}
