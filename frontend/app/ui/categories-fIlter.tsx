/* eslint-disable @next/next/no-img-element */

"use client";

import React, { useEffect, useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { addCategory } from "@/store/slice/category";
import { useDispatch } from "react-redux";

const categories = [
  {
    image: "/categories-image/beach.png",
    text: "beach",
  },
  {
    image: "/categories-image/arctic.png",
    text: "arctic",
  },
  {
    image: "/categories-image/beachfront.png",
    text: "beachfront",
  },
  {
    image: "/categories-image/cities.png",
    text: "cities",
  },
  {
    image: "/categories-image/design.png",
    text: "design",
  },
  {
    image: "/categories-image/icons.png",
    text: "icons",
  },
  {
    image: "/categories-image/island.png",
    text: "island",
  },
  {
    image: "/categories-image/lakefront.png",
    text: "lakefront",
  },
  {
    image: "/categories-image/luxe.png",
    text: "luxe",
  },
  {
    image: "/categories-image/mansions.png",
    text: "mansions",
  },
  {
    image: "/categories-image/new.png",
    text: "new",
  },
  {
    image: "/categories-image/pools.png",
    text: "pools",
  },
  {
    image: "/categories-image/rooms.png",
    text: "rooms",
  },
  {
    image: "/categories-image/trending.png",
    text: "trending",
  },
];

const CategoriesFilter = () => {
  const dispatch = useDispatch();

  const [selected, setSelected] = useState<string>("");

  const handleCatgorySelect = (e: string) => {
    setSelected(e);
    dispatch(addCategory(e));
  };
  return (
    <div className="w-full ">
      <Carousel>
        <CarouselPrevious className="hover:shadow-md duration-200 transition-all absolute left-[-2%] z-[9999]" />
        <CarouselContent>
          {categories.map(({ image, text }, index: number) => (
            <CarouselItem
              key={index}
              className="flex flex-col items-center justify-center w-6 h-full sm:basis-20 gap-x-2 cursor-pointer group p-2 lg:basis-20 2xl:basis-26 3xl:basis-28 select-none"
              onClick={() =>
                selected === text
                  ? handleCatgorySelect("")
                  : handleCatgorySelect(text)
              }
            >
              <img
                src={image}
                alt={text}
                className={`w-6 h-6 group-hover:opacity-100 ${
                  selected === text ? "group:opacity-100" : "opacity-50"
                }`}
              />
              <p
                className={`group-hover:after:border-b-2 hover:after:border-b-black transition-colors hover:after:inline-block after:left-0 select-none text-sm after: ${
                  selected === text ? "text-black" : "text-black/60"
                } group-hover:text-black duration-100`}
              >
                {text}
              </p>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselNext className="hover:shadow-md duration-200 transition-all mr-2" />
      </Carousel>
    </div>
  );
};

export default CategoriesFilter;
