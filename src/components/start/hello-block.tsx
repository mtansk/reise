"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Loader2, Sparkles } from "lucide-react";
import { signInAsGuest } from "@/server/actions/auth";
import { useStateAction } from "next-safe-action/hooks";
import { toast } from "sonner";
import { useEffect } from "react";

export function HelloBlock() {
  const { formAction, isPending, hasErrored, reset } =
    useStateAction(signInAsGuest);

  useEffect(() => {
    if (hasErrored) {
      reset();
      toast.error("Please, try again");
    }
  }, [hasErrored, reset]);

  function formActionHandler() {
    formAction();
  }

  return (
    <div className="relative z-10 flex w-full max-w-2xl flex-col items-center justify-center gap-8 px-4 py-12 text-center">
      <div className="pointer-events-none absolute inset-0 -z-10 flex items-center justify-center">
        <div className="h-64 w-64 rounded-full bg-indigo-500/10 blur-[80px] md:h-96 md:w-96 dark:bg-indigo-500/15" />
      </div>

      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className={cn(
          "text-5xl tracking-tight text-slate-900 md:text-6xl dark:text-white",
        )}
      >
        <span className="font-extrabold">Reise. </span>
        <span className="font-medium text-slate-600 dark:text-slate-300">
          will suggest the best destinations for one-day
          trips
        </span>
      </motion.h1>

      <motion.form
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.4,
          duration: 0.7,
          ease: "easeOut",
        }}
        className="mt-4 flex w-full items-center justify-center"
      >
        <motion.button
          type="submit"
          disabled={isPending}
          formAction={formActionHandler}
          whileHover={
            !isPending ? { scale: 1.02 } : undefined
          }
          whileTap={
            !isPending ? { scale: 0.98 } : undefined
          }
          animate={
            isPending ?
              { opacity: 0.7, scale: 0.98 }
            : { opacity: 1, scale: 1 }
          }
          className="relative flex h-12 cursor-pointer items-center justify-center gap-2 rounded-full bg-slate-900 px-8 font-medium text-white shadow-[0_0_0_1px_rgba(0,0,0,0.1),0_4px_12px_rgba(0,0,0,0.1)] transition-all"
        >
          {isPending ?
            <Loader2
              className="animate-spin"
              strokeWidth={1.5}
            />
          : <Sparkles strokeWidth={1.5} />}
          <span>{`Let's try`}</span>
        </motion.button>
      </motion.form>
    </div>
  );
}
