import { createClient } from "@/utils/supabase/middleware";
import { NextResponse, type NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const { supabase } = createClient(request);
  await supabase.auth.getSession();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

export const config = {
  matcher:
    "/((?!api|_next/static|_next/image|favicon.ico|$|login|signup|auth|trial).*)",
};
