"use client";

import CategoriesFilter from "./ui/categories-fIlter";
import Filters from "./ui/filters";
import TaxFiltering from "./ui/tax-filtering";
import PropertyList from "./ui/properties/property-list";
import Properties from "./ui/properties/properties";

export default function Home() {
  return (
    <main className=" max-w-[150rem]  ">
      <div className="flex items-center lg:space-x-12 xs:flex-col lg:flex-row sticky top-[4.8rem] border-b shadow-sm bg-white py-2  px-3  z-[9999]">
        <CategoriesFilter />
       <div className="flex items-center gap-3">
       <Filters />
       <TaxFiltering />
       </div>
      </div>

      <PropertyList>
        <Properties />
        <Properties />
        <Properties />
        <Properties />
        <Properties />
        <Properties />
        <Properties />
        <Properties />
        <Properties />
        <Properties />
        <Properties />
        <Properties />
        <Properties />
        <Properties />
        <Properties />
        <Properties />
        <Properties />
        <Properties />
        <Properties />
        <Properties />
        <Properties />
        <Properties />
        <Properties />
        <Properties />
        <Properties />
        <Properties />
        <Properties />
        <Properties />
      </PropertyList>
    </main>
  );
}
