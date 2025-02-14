/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useEffect } from "react";
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
import { useSelector, useDispatch } from "react-redux";
import {
  addCheckIn,
  addCheckOut,
} from "@/store/slice/bookingFilterReducer/bookingFilterReducer";

const CheckIn = ({ form }: { form: UseFormReturn }) => {
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState<DateRange | undefined>();
  const dispatch = useDispatch();
  const checkSelector = useSelector((state: RootState) => state.bookingFilter);

  // useEffect(() => {
  //   setDate({
  //     from: new Date(new Date(checkSelector.checkIn)),
  //     to: new Date(checkSelector.checkOut),
  //   });
  // }, [checkSelector]);

  function updateCheckIn(x: DateRange) {
    if (!x) {
      // dispatch(addCheckIn(""));
      setDate(undefined);
      return;
    }
    const dateFrom = x?.from?.toLocaleDateString();
    const dateTo = x?.to?.toLocaleDateString();
    form.setValue("checkIn", dateFrom, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
    form.setValue("checkOut", dateTo, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });

    // dispatch(addCheckIn(dateFrom));
    // dispatch(addCheckOut(dateTo));

    setDate(x);
  }

  return (
    <DropdownMenu modal={false} open={open} onOpenChange={setOpen}>
      <Trigger>
        <div>
          <CustomDropDownLabel
            icon={Calendar1Icon}
            title="Check in"
            placeholder="Add dates"
            name="checkIn"
            form={form as any}
            data={checkSelector.checkIn || date?.from}
            updateData={updateCheckIn}
          />
        </div>
      </Trigger>
      <DropdownMenuPortal>
        <DropdownMenuContent className=" w-[51rem] h-[29rem]   z-[10000] border shadow-lg mt-2 rounded-3xl absolute right-[-32rem]  bg-white">
          <div className="flex justify-center items-center h-full">
            <DayPicker
              mode="range"
              required
              selected={date}
              onSelect={updateCheckIn}
              numberOfMonths={2}
              disabled={{ before: new Date() }}
            />
          </div>
        </DropdownMenuContent>
      </DropdownMenuPortal>
    </DropdownMenu>
  );
};

export default CheckIn;
