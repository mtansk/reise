import { User } from "next-auth";
import z from "zod";

export const UserWithIdSchema = z.object({
  id: z.string(),
  name: z.string().nullable().optional(),
  image: z.string().nullable().optional(),
  email: z.email().nullable().optional(),
  isGuest: z.boolean(),
}) satisfies z.ZodType<User>;

export type UserWithId = z.infer<typeof UserWithIdSchema>;
