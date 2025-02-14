/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React from "react";
import { useState } from "react";

import { CustomDropDownLabel } from "../customDropdownTrigger";
import Trigger from "../customDropdownTrigger";

import { Calendar1Icon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
} from "@/components/ui/dropdown-menu";

import { UseFormReturn } from "react-hook-form";
import { DropdownMenuPortal } from "@radix-ui/react-dropdown-menu";

import { DayPicker, DateRange } from "react-day-picker";

import { RootState } from "@/store/store";
import { useDispatch, useSelector } from "react-redux";

const CheckOut = ({ form }: { form: UseFormReturn }) => {
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState<DateRange | undefined>(undefined);

  const checkSelector = useSelector((state: RootState) => state.bookingFilter);

  function updateCheckOut(x: DateRange) {
    if (!x) {
      // dispatch(addCheckOut(""));
      setDate(undefined);
      return;
    }
    // dispatch(addCheckOut(x.to?.toLocaleDateString()));
    form.setValue(
      "checkIn",
      checkSelector.checkOut || x?.to?.toLocaleDateString()
    );
    setDate(x);
  }

  return (
    <DropdownMenu modal={false} open={open} onOpenChange={setOpen}>
      <Trigger>
        <div>
          <CustomDropDownLabel
            icon={Calendar1Icon}
            title="Check-Out"
            placeholder="Add dates"
            name="checkOut"
            form={form as any}
            data={checkSelector.checkOut || date}
            updateData={updateCheckOut}
          />
        </div>
      </Trigger>
      <DropdownMenuPortal>
        <DropdownMenuContent
          className=" w-[51rem] h-[29rem]   z-[10000] border shadow-lg mt-2 rounded-3xl absolute right-[-32rem]  bg-white
                        "
          onPointerDownOutside={(e) => {
            console.log("Clicked outside", e);
          }}
        >
          <div className="flex justify-center items-center h-full">
            <DayPicker
              mode="range"
              required
              selected={date}
              onSelect={updateCheckOut}
              numberOfMonths={2}
              disabled={{ before: new Date() }}
            />
          </div>
        </DropdownMenuContent>
      </DropdownMenuPortal>
    </DropdownMenu>
  );
};

export default CheckOut;
