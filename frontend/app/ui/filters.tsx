"use client";

import React from "react";
import { SlidersHorizontalIcon } from "lucide-react";
import { useModalContext } from "../../context/context";
import FilterProperty from "../../components/filter/filter";

const Filters = () => {
  const { openModal } = useModalContext();

  return (
    <div className="p-3 border rounded-2xl cursor-pointer hover:bg-gray-400/20">
      <div
        className="flex items-center justify-center gap-x-3 font-semibold text-sm"
        onClick={() => openModal(<FilterProperty />, "Filter")}
      >
        <SlidersHorizontalIcon size={16} /> Filter
      </div>
    </div>
  );
};

export default Filters;
