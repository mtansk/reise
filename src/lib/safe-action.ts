import { createSafeActionClient } from "next-safe-action";

export const actionClient = createSafeActionClient({
  handleServerError: (e) => {
    if (process.env.NODE_ENV === "development") {
      console.error(e);
    }

    return {
      message: e.message,
    };
  },
});
