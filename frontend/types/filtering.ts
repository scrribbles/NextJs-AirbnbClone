import { z } from "zod";

export const filterSchema = z.object({
  rooms: z.number().optional(),
  guests: z.number().optional(),
  bedrooms: z.number().optional(),
  beds: z.number().optional(),
  price: z.object({
    min: z.number().optional(),
    max: z.number().optional(),
  }),
  rating: z.number().optional(),
  type: z.enum(["entire", "private", "shared"]).optional(),
  amenities: z.array(z.string()).optional(),
  location: z.string().optional(),
  booking_type: z.enum(["instant", "request"]).optional(),
});
