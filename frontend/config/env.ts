export const ENV = Object.freeze({
  NODE_ENV: process.env.NODE_ENV, //dev or prod
  API_URL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api",
  MEDIA_URL: process.env.NEXT_PUBLIC_MEDIA_URL || "http://localhost:8000",
  ACCESS_TOKEN: process.env.NEXT_ACCESS_TOKEN || "bnb_access",
  REFRESH_TOKEN: process.env.NEXT_REFRESH_TOKEN || "bnb_refresh",
});
