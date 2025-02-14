"use client";

import Authentication from "@/features/authentication/authentication";

const page = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="md:w-1/5 lg:w-[35%] bg-white rounded-2xl border shadow-lg py-5">
        <h1 className="text-center font-semibold text-xl">Welcome to Airbnb</h1>
        <Authentication />
      </div>
    </div>
  );
};

export default page;
