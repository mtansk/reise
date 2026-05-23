import { createSafeActionClient } from "next-safe-action";

export const actionClient = createSafeActionClient({
  handleServerError: (e) => {
    console.error(e);
    return {
      message: e.message,
      stack: e.stack,
    };
  },
});
