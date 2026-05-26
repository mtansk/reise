import { redirect } from "next/navigation";
import { NextRequest } from "next/server";
import { auth } from "@/lib/auth";
import { mergeGuestWithUser } from "@/server/functions/auth";

export async function GET(req: NextRequest) {
  const guestId = req.nextUrl.searchParams.get("guestId");
  const session = await auth();

  if (guestId && session?.user?.id) {
    try {
      await mergeGuestWithUser({
        guestId,
        userId: session.user.id,
      });
    } catch (e) {}
  }

  redirect(`/`);
}
