"use client";

import { useState } from "react";

import {
  Form,
  FormField,
  FormControl,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { useCustomForm } from "@/app/utilities/customForm";
import { authSchema } from "@/lib/definitions";

import z from "zod";
import { reqFlow } from "@/app/utilities/api/axiosInstance";

import { EyeClosedIcon, EyeIcon } from "lucide-react";
import { handleLoginToken } from "@/app/utilities/utils";

/* might be needed for future implementation
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
*/

const Authentication = () => {
  const [revealPassword, setRevealPassword] = useState<boolean>(false);

  const form = useCustomForm(authSchema, { email: "", password: "" });

  async function handleSubmit(e: z.infer<typeof authSchema>) {
    const response = await reqFlow("/token/", "POST", e);
    handleLoginToken(response);

    alert("Successfully logged in");
  }

  return (
    <div className="overflow-none p-5 space-y-5">
      {/* <p className="font-bold text-lg">Welcome to AirBnb</p> */}
      <Form {...form}>
        <form className="space-y-3" onSubmit={form.handleSubmit(handleSubmit)}>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input {...field} className="shadow-none p-4" />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="relative">
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type={revealPassword ? "text" : "password"}
                    className="p-5 text-black text-base font-semibold w-full rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                  />
                </FormControl>
                <div className="absolute top-8 right-2 z-50">
                  {!revealPassword ? (
                    <EyeClosedIcon
                      size={20}
                      onClick={() => {
                        setRevealPassword(true);
                      }}
                      className="cursor-pointer "
                    />
                  ) : (
                    <EyeIcon
                      size={20}
                      onClick={() => {
                        setRevealPassword(false);
                      }}
                      className="cursor-pointer "
                    />
                  )}
                </div>
              </FormItem>
            )}
          />
          <Button
            type="submit"
            tabIndex={0}
            role="button"
            // onKeyDown={(e) => {
            //   if (e.key === "Enter" || e.key === " ") form.handleSubmit();
            // }}
            className="w-full rounded-lg text-white bg-red hover:bg-red/80 transition-colors duration-200 hover:text-white p-5 font-semibold"
          >
            Continue
          </Button>
        </form>
      </Form>
      <div className="flex flex-col space-y-2">
        <Button className="hover:bg-white/70 bg-white transition-all duration-100 text-black hover:text-black border p-5 hover:font-semibold shadow-none">
          Continue with Google
        </Button>
        <Button className="hover:bg-white/70 bg-white transition-all duration-100 text-black hover:text-black border p-5 hover:font-semibold shadow-none">
          Continue with Apple
        </Button>
        <Button className="hover:bg-white/70 bg-white transition-all duration-100 text-black hover:text-black border p-5 hover:font-semibold shadow-none">
          Continue with Email
        </Button>
        <Button className="hover:bg-white/70 bg-white transition-all duration-100 text-black hover:text-black border p-5 hover:font-semibold shadow-none">
          Continue with Facebook
        </Button>
      </div>
    </div>
  );
};

export default Authentication;
