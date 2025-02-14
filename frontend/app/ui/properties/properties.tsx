/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useMemo, useState } from "react";
import { HeartIcon, ChevronRightIcon, ChevronLeftIcon } from "lucide-react";

import Link from "next/link";
import { StarIcon } from "lucide-react";
import { ENV } from "@/config/env";
import { favorites } from "@/services/favorites";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

const Properties = ({
  images,
  rating,
  bookmarked,
  id,
  location,
  price_per_night,
}: {
  images: string[];
  rating: number;
  bookmarked: boolean;
  id: string;
  location: string;

  price_per_night: string;
}) => {
  const [currentImage, setCurrentImage] = useState<string[]>([]);
  const queryClient = useQueryClient();

  useMemo(() => {
    setCurrentImage(images);
  }, [images]);

  const [index, setIndex] = useState<number>(0);

  function nextImage(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    if (index === currentImage.length - 1) {
      return;
    }
    setIndex((index) => (index + 1) % images.length);
  }

  function previousImage(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    if (index === 0) {
      return;
    }
    setIndex((index) => (index - 1 + images.length) % images.length);
  }

  async function toggleFavorite(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();

    if (bookmarked) {
      await favorites.removeFavorites(id);
    } else {
      await favorites.addToFavorites(id);
    }
    toast.success(
      `Successfully ${bookmarked ? "removed from" : "added to"} favorites`
    );
    queryClient.invalidateQueries({ queryKey: ["listings"] });
  }

  return (
    <Link
      href={`/rooms/${id}`}
      target="_blank"
      className="rounded-md lg:h-[430px] w-full space-y-5 flex flex-col group"
      tabIndex={-1}
    >
      <div className="h-[270px] relative">
        <HeartIcon
          className="top-5 right-3 absolute cursor-pointer hover:scale-125 transition-all z-50"
          stroke="white"
          fill={bookmarked ? "red" : "gray"}
          size={25}
          onClick={(e) => toggleFavorite(e)}
        />{" "}
        <div className="flex items-center h-full w-full relative rounded-lg overflow-hidden">
          {currentImage.map((image, idx) => (
            <img
              src={`${ENV.MEDIA_URL}${image}`}
              key={idx}
              alt=""
              className="min-w-full shrink-0 flex-grow-0 max-w-full h-full rounded-lg duration-200 transition-transform"
              style={{ transform: `translateX(${index * -100}%)` }}
            />
          ))}
        </div>
        {index !== currentImage.length - 1 && (
          <div className="absolute right-2 rounded-full bg-white p-1 top-1/2  opacity-0 group-hover:opacity-100 transition-all duration-200">
            <ChevronRightIcon
              size={20}
              onClick={(e) => nextImage(e)}
              role="button"
              tabIndex={1}
            />
          </div>
        )}
        {index !== 0 && (
          <div className="rounded-full bg-white p-1 absolute left-2 top-1/2 opacity-0 group-hover:opacity-100 trnaistion-all duration-200">
            <ChevronLeftIcon
              size={20}
              onClick={(e) => previousImage(e)}
              role="button"
              tabIndex={1}
            />
          </div>
        )}
      </div>

      <div className="select-none space-y-3 font-normal text-sm">
        <div className="flex justify-between">
          <h2 className="font-semibold">{location}</h2>
          <div className="flex items-center gap-1">
            <StarIcon size={16} fill="black" />
            <span>{rating}</span>
          </div>
        </div>
        <p>Added 9 weeks ago</p>
        <p>{price_per_night} night</p>
      </div>
    </Link>
  );
};

export default Properties;
