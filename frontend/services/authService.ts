import { authSchema } from "@/types/registration";
import { reqFlow } from "../lib/axiosApi";
import { z } from "zod";
import { handleLoginToken } from "@/utilities/utils";

export const authService = Object.freeze({
  login: async function handleSubmit(e: z.infer<typeof authSchema>) {
    const { status, data } = await reqFlow({
      url: "/token/",
      method: "POST",
      data: e,
    });

    if (status === 200) {
      const user = await handleLoginToken(data);
      return [status, data, user];
    }
    return [status, data];
  },
  register: {},
});
