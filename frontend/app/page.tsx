"use client";

import CategoriesFilter from "./ui/categories-fIlter";
import Filters from "./ui/filters";
import TaxFiltering from "./ui/tax-filtering";
import HomePage from "./(pages)/home/listings";

export default function Home() {
  return (
    <main className=" max-w-[150rem]  ">
      <div className="flex items-center lg:space-x-12 xs:flex-col lg:flex-row sticky top-[4.8rem]  shadow-none bg-white py-2  px-3  z-[9999]">
        <CategoriesFilter />
        <Filters />
        <TaxFiltering />
      </div>
      <HomePage />
    </main>
  );
}
