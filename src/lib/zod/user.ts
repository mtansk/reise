import { User } from "next-auth";
import z from "zod";

export const UserWithIdSchema = z.object({
  id: z.string(),
  name: z.string().optional(),
  image: z.string().optional(),
  email: z.email().optional(),
}) satisfies z.ZodType<User>;

export type UserWithId = z.infer<typeof UserWithIdSchema>;
