"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuPortal,
} from "@/components/ui/dropdown-menu";

import { UseFormReturn } from "react-hook-form";
import { useState } from "react";

import { locations } from "./location";
import Image from "next/image";

import { MapPinHouseIcon } from "lucide-react";
import { CustomDropDownLabel } from "../customDropdownTrigger"; // Ensure the name is correct
import Trigger from "../customDropdownTrigger";

// import { useDispatch } from "react-redux";
// import { addDestination } from "@/store/slice/bookingFilterReducer/bookingFilterReducer";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

const LocationSelect = ({ form }: { form: UseFormReturn }) => {
  const [open, setOpen] = useState(false);
  const selector = useSelector((state: RootState) => state.bookingFilter);
  const [location, setLocation] = useState<string>("");
  // const dispatch = useDispatch();

  function updateLocation(x: string) {
    setLocation(x);
    form.setValue("destination", x);
    // dispatch(addDestination(x));
  }

  return (
    <DropdownMenu modal={false} open={open} onOpenChange={setOpen}>
      <Trigger>
        <div>
          <CustomDropDownLabel
            icon={MapPinHouseIcon}
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            form={form as any}
            data={selector?.destination || location}
            updateData={updateLocation}
            title="Where"
            placeholder="Search destination"
            name="destination"
          />
        </div>
      </Trigger>
      <DropdownMenuPortal>
        <DropdownMenuContent className="w-[25rem] top-0 bg-white z-[100000000] border shadow-lg mt-2 rounded-[30px] absolute right-[-19rem] cursor-pointer scrollbar p-5 max-h-[500px] overflow-y-auto">
          {locations.map((location, index: number) => (
            <div
              className="flex items-center gap-3 py-2 px-3 hover:bg-gray-400/10 hover:rounded-lg"
              key={index}
              onClick={() => {
                updateLocation(location.country);
              }}
            >
              <Image
                src={location.imageSrc}
                width={50}
                height={50}
                alt={location.alt}
              />
              <div className="flex flex-col gap-2">
                <h3 className="text-sm">{location.country}</h3>
                <p className="text-sm font-light">{location.description}</p>
              </div>
            </div>
          ))}
        </DropdownMenuContent>
      </DropdownMenuPortal>
    </DropdownMenu>
  );
};

export default LocationSelect;
