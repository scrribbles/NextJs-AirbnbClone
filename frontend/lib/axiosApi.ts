/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { API_CONFIG } from "../config/api";
import axios from "axios";
import { cookies } from "next/headers";

const axiosInstance = async () => {
  const cookieStore = await cookies();
  const tokenName = process.env.NEXT_ACCESS_TOKEN || "access_token";
  const accessToken = cookieStore.get(tokenName)?.value;

  const instance = axios.create({
    baseURL: API_CONFIG.BASE_URL,
    timeout: API_CONFIG.TIMEOUT,
    headers: API_CONFIG.HEADERS,
    // paramsSerializer: (params) => new URLSearchParams(params).toString(),
  });

  instance.interceptors.request.use((config) => {
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  });

  return instance;
};

export const reqFlow = async ({
  url,
  method,
  data,
  params,
}: {
  url: string;
  method: string;
  data?: any;
  params?: any;
}) => {
  try {
    const axiosApi = await axiosInstance();
    const response = await axiosApi({
      method,
      url,
      data,
      params,
    });
    return {
      status: response.status,
      data: response.data,
    };
  } catch (error: any) {
    return {
      status: error.response.status,
      data: error.response.data,
    };
  }
};

export default axiosInstance;
