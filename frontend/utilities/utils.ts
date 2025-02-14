"use server";

import { cookies } from "next/headers";
import { jwtDecode } from "jwt-decode";

import { revalidatePath } from "next/cache";
import { JWTPayload } from "@/types/custom_jwt";
import { ENV } from "@/config/env";

export const handleLoginToken = async (x: {
  access: string;
  refresh: string;
}) => {
  const cookieStore = await cookies();
  const { access, refresh } = x;

  const accessToken = ENV.ACCESS_TOKEN || "access_token";
  const refreshToken = ENV.REFRESH_TOKEN || "refresh_token";

  cookieStore.set(accessToken, access, {
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 60 * 30,
    httpOnly: true,
  });
  cookieStore.set(refreshToken, refresh, {
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 60 * 60 * 24 * 14,
    httpOnly: true,
  });

  const decodedToken: JWTPayload = jwtDecode(access);
  const { full_name, email, user_id, language, currency, timezone } =
    decodedToken;

  const user = {
    full_name,
    email,
    user_id,
  };

  cookieStore.set("tz", timezone, {
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 60 * 60 * 24 * 7,
  });

  cookieStore.set("_user_attributes", JSON.stringify(user), {
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 60 * 60 * 24 * 7,
  });

  cookieStore.set("language", language, {
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 60 * 60 * 24 * 7,
  });

  cookieStore.set("_pref_currency", currency, {
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 60 * 60 * 24 * 7,
  });

  return user;
};

export const handleLogout = async () => {
  const cookieStore = await cookies();
  const accessToken = ENV.ACCESS_TOKEN || "access_token";
  const refreshToken = ENV.REFRESH_TOKEN || "refresh_token";

  cookieStore.delete(accessToken);
  cookieStore.delete(refreshToken);
  cookieStore.delete("_user_attributes");

  return true;
};

export const handlePathRevalidation = async (path: string) => {
  const revalidate = revalidatePath(path);
  return revalidate;
};
