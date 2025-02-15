"use client";

import React, { useState, lazy } from "react";
import { filterSchema } from "@/lib/definitions";
import { useForm } from "react-hook-form";
import RangeSlider from "react-range-slider-input";
import "react-range-slider-input/dist/style.css";
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  MinusIcon,
  PlusIcon,
  ZapIcon,
  KeyRoundIcon,
  SnowflakeIcon,
  ThermometerIcon,
  TvMinimalIcon,
  UtilityPoleIcon,
  WashingMachineIcon,
  WifiIcon,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { ThreeDots } from "react-loader-spinner";

const ClothDryer = lazy(
  () =>
    import("@/app/assets/svg/dryer.svg") as Promise<{
      default: React.FC<React.SVGProps<SVGSVGElement>>;
    }>
);
const Kitchen = lazy(() => import("@/app/assets/svg/kitchen.svg"));
const Workspace = lazy(() => import("@/app/assets/svg/workspace.svg"));
const HairDryer = lazy(() => import("@/app/assets/svg/hairDryer.svg"));
const PressingIron = lazy(() => import("@/app/assets/svg/pressingIron.svg"));

const amenitiesList = [
  {
    icon: <WifiIcon size={16} />,
    name: "Wifi",
  },
  {
    icon: <TvMinimalIcon size={16} />,
    name: "TV",
  },
  {
    icon: <WashingMachineIcon size={16} />,
    name: "Washer",
  },
  {
    icon: <ClothDryer className="w-10" height={16} />, // SVG component used as JSX
    name: "Dryer",
  },
  {
    icon: <UtilityPoleIcon size={16} />,
    name: "24/7 Electricity",
  },
  {
    icon: <PressingIron />, // SVG component used as JSX
    name: "Iron",
  },
  {
    icon: <HairDryer />, // SVG component used as JSX
    name: "Hair Dryer",
  },
  {
    icon: <SnowflakeIcon size={16} />,
    name: "Air Conditioning",
  },
  {
    icon: <Kitchen />, // SVG component used as JSX
    name: "Kitchen",
  },
  {
    icon: <ThermometerIcon size={16} />,
    name: "Heating",
  },
  {
    icon: <Workspace />, // SVG component used as JSX
    name: "Workspace",
  },
];

const FilterProperty = () => {
  const [beds, setBeds] = useState(1);
  const [rooms, setRooms] = useState(1);
  const [guests, setGuests] = useState(1);

  const [minValue,setMinValue] = useState(10)
  const [maxValue,setMaxValue] = useState(960)
  const form = useForm<z.infer<typeof filterSchema>>({
    resolver: zodResolver(filterSchema),
  });

  const handleChange = (value) =>{
    setMinValue(value[0])
    setMaxValue(value[1])
  }

  function resetForm() {
    form.reset();
    setBeds(1);
    setRooms(1);
    setGuests(1);
  }

  function increaseInfo(x: string) {
    switch (x) {
      case "beds":
        setBeds(beds + 1);
        break;
      case "rooms":
        setRooms(rooms + 1);
        break;
      case "guests":
        setGuests(guests + 1);
        break;
      default:
        break;
    }
  }

  function decreaseInfo(x: string) {
    switch (x) {
      case "beds":
        setBeds(beds - 1);
        break;
      case "rooms":
        setRooms(rooms - 1);
        break;
      case "guests":
        setGuests(guests - 1);
        break;
      default:
        break;
    }
  }

  function submitData(data: z.infer<typeof filterSchema>) {
    console.log(data);
  }

  return (
    <div className="max-h-[60vh] overflow-y-auto px-5 relative">
      <Form {...form}>
        <form
          className="space-y-4  h-full"
          onSubmit={form.handleSubmit(submitData)}
        >
          <section className="grid items-center gap-y-3  ">
            <div>
              <h3 className="font-bold">Price Range</h3>
              <p className="text-sm pb-2">Nightly prices before fees and taxes</p>
            </div>
            <RangeSlider value={[minValue,maxValue]} min={10} max={880} step={1} onInput={(e)=>handleChange(e)} />
            <div className="flex gap-x-12 items-center justify-between pt-2">
              <FormField
                name="price.min"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="flex flex-col  items-center w-20 ">
                    <FormLabel htmlFor="price.min" className="text-[10px] ">
                      Minimum
                    </FormLabel>
                    <FormControl>
                      <Input {...field} className="rounded-full text-center" value={`$${minValue}`} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                name="price.max"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="flex flex-col items-center rounded-full w-20">
                    <FormLabel htmlFor="price.max" className="text-[10px]">
                      Maximum
                    </FormLabel>
                    <FormControl>
                      <Input {...field} className="rounded-full text-center" value={`$${maxValue}`} />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
          </section>

          <hr />
          <div className="space-y-5">
            <p className="font-semibold text-lg">Rooms, Beds and Guests</p>
            <FormItem className="flex items-center gap-x-10 space-y-0">
              <FormLabel
                htmlFor="rooms"
                className="font-normal text-base flex-1"
              >
                Rooms
              </FormLabel>
              <div className="flex items-center gap-x-5 w-fit">
                <div
                  className="flex items-center rounded-full border p-2 hover:bg-gray-100 transition"
                  onClick={() => decreaseInfo("rooms")}
                >
                  <MinusIcon size={16} />
                </div>

                <FormField
                  name="rooms"
                  control={form.control}
                  render={({ field }) => (
                    <FormControl>
                      <Input
                        {...field}
                        className="w-[50px] flex items-center justify-center font-semibold shadow-none"
                        value={rooms}
                      />
                    </FormControl>
                  )}
                />
                <div
                  className="flex items-center rounded-full border p-2 hover:bg-gray-100 transition"
                  onClick={() => increaseInfo("rooms")}
                >
                  <PlusIcon size={16} />
                </div>
              </div>
            </FormItem>
            <FormItem className="flex items-center gap-x-10 space-y-0">
              <FormLabel
                htmlFor="beds"
                className="font-normal text-base flex-1"
              >
                Beds
              </FormLabel>
              <div className="flex items-center gap-x-5 w-fit">
                <div
                  className="flex items-center rounded-full border p-2 hover:bg-gray-100 transition"
                  onClick={() => decreaseInfo("beds")}
                >
                  <MinusIcon size={16} />
                </div>
                <FormField
                  name="beds"
                  control={form.control}
                  render={({ field }) => (
                    <FormControl>
                      <Input
                        {...field}
                        className="w-[50px] flex items-center justify-center font-semibold shadow-none"
                        value={beds}
                      />
                    </FormControl>
                  )}
                />
                <div
                  className="flex items-center rounded-full border p-2 hover:bg-gray-100 transition"
                  onClick={() => increaseInfo("beds")}
                >
                  <PlusIcon size={16} />
                </div>
              </div>
            </FormItem>
            <FormItem className="flex items-center gap-x-10 space-y-0">
              <FormLabel
                htmlFor="guests"
                className="font-normal text-base flex-1 capitalize"
              >
                Guests
              </FormLabel>
              <div className="flex items-center gap-x-5 w-fit">
                <div
                  className="flex items-center rounded-full border p-2 hover:bg-gray-100 transition"
                  onClick={() => decreaseInfo("guests")}
                >
                  <MinusIcon size={16} />
                </div>

                <FormField
                  name="guests"
                  control={form.control}
                  render={({ field }) => (
                    <FormControl>
                      <Input
                        {...field}
                        className="w-[50px] flex items-center justify-center font-semibold shadow-none"
                        value={guests}
                      />
                    </FormControl>
                  )}
                />
                <div
                  className="flex items-center rounded-full border p-2 hover:bg-gray-100 transition"
                  onClick={() => increaseInfo("guests")}
                >
                  <PlusIcon size={16} />
                </div>
              </div>
            </FormItem>
          </div>
          <hr />
          <div className="space-y-5">
            <p className="font-semibold">Booking Options</p>
            <div className="flex gap-x-5">
              <FormField
                name="booking_type"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Button
                        {...field}
                        value="instant"
                        variant={
                          field.value === "instant" ? "default" : "outline"
                        }
                        className="flex items-center p-5 gap-x-2 shadow-none rounded-3xl"
                        type="button"
                        onClick={() => field.onChange("instant")}
                      >
                        <ZapIcon />
                        <span>Instant</span>
                      </Button>
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                name="booking_type"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Button
                        {...field}
                        value="request"
                        variant={
                          field.value === "request" ? "default" : "outline"
                        }
                        className="flex items-center p-5 gap-x-2 shadow-none rounded-3xl"
                        type="button"
                        onClick={() => field.onChange("request")}
                      >
                        <KeyRoundIcon />
                        <span>Request</span>
                      </Button>
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
          </div>
          <div className="space-y-5">
            <p className="font-semibold">Amenities</p>
            <div className="flex flex-wrap gap-x-5 gap-y-5">
              {amenitiesList.map((amenity, index: number) => (
                <FormField
                  key={index}
                  name="amenities"
                  control={form.control}
                  render={({ field }) => {
                    const isSelected = field.value?.includes(amenity.name);
                    return (
                      <FormItem>
                        <FormControl>
                          <Button
                            variant={isSelected ? "default" : "outline"}
                            className="flex items-center p-6 gap-x-2 shadow-none rounded-3xl"
                            type="button"
                            onClick={() => {
                              const current = field.value || [];
                              if (current.includes(amenity.name)) {
                                field.onChange(
                                  current.filter(
                                    (name: string) => name !== amenity.name
                                  )
                                );
                              } else {
                                field.onChange([...current, amenity.name]);
                              }
                            }}
                          >
                            {amenity.icon}
                            <span>{amenity.name}</span>
                          </Button>
                        </FormControl>
                      </FormItem>
                    );
                  }}
                />
              ))}
            </div>
          </div>
          <div className="flex items-center bg-white sticky bottom-0 justify-between py-5 border-t mt-5 ">
            <Button
              variant="link"
              className="rounded-3xl p-5 hover:decoration-0 font-semibold"
              onClick={resetForm}
            >
              Clear all
            </Button>
            <Button className="rounded-lg text-base p-6">
              {form.formState.isSubmitting ? (
                <ThreeDots
                  color="white"
                  height="80"
                  width="80
                "
                />
              ) : (
                "Show 1,000 places"
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default FilterProperty;
