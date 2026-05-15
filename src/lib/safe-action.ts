import { createSafeActionClient } from "next-safe-action";

export const actionClient = createSafeActionClient({
  handleServerError: (e) => {
    return {
      message: e.message,
      stack: e.stack,
    };
  },
});
