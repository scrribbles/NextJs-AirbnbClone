"use server";

import axiosInstance from "../lib/axiosApi";

export const handleTokenRefresh = async (refreshToken: string) => {
  const myAxios = await axiosInstance();
  try {
    const response = await myAxios.post(
      "/token/refresh/",
      {
        refresh: refreshToken,
      },
      {
        headers: {
          "Content-Type": "application/json",
          "Content-Length": JSON.stringify({ refresh: refreshToken }).length,
        },
      }
    );

    const { access } = response.data;
    return access;
  } catch (error) {
    console.error(error);
  }
};
