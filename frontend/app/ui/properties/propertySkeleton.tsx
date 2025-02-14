import React from "react";

const PropertySkeleton = () => {
  return (
    <main className="px-6  grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 3xl:grid-cols-6 xs:grid-cols-1  gap-6 pt-4">
      {Array.from({ length: 10 }).map((_, i) => (
        <div
          key={i}
          className="rounded-md lg:h-[430px] w-full space-y-5 flex flex-col animate-pulse"
        >
          <div className="h-[270px] relative bg-gray-200 rounded-md">
            {/* <div className="w-6 h-6 rounded-full bg-gray-300 absolute top-5 right-3" />
            <div className="w-8 h-8 rounded-full bg-gray-300 absolute right-2 top-1/2 transform -translate-y-1/2" />
            <div className="w-8 h-8 rounded-full bg-gray-300 absolute left-2 top-1/2 transform -translate-y-1/2" /> */}
          </div>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <div className="h-4 bg-gray-200 rounded w-1/3" />
            </div>
            <div className="h-4 bg-gray-200 rounded w-1/4" />
            <div className="h-4 bg-gray-200 rounded w-1/5" />
            <div className="h-4 bg-gray-200 rounded w-1/4" />
          </div>
        </div>
      ))}
    </main>
  );
};

export default PropertySkeleton;
