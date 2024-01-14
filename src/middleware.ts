import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "@/utils/supabase/middleware";
import { env } from "./env";
import { headers } from "next/headers";

export async function middleware(request: NextRequest) {
  const { supabase } = createClient(request);
  await supabase.auth.getSession();

  const unprotectedRoutes = ["/", "/login", "/signup"];
  const callbackUrl =
    "https://lbcubcyvjdzufnvuynno.supabase.co/auth/v1/callback";

  const requestedUrl = new URL(request.url).pathname;
  console.log(request.url);
  // if (
  //   !(unprotectedRoutes.includes(requestedUrl) || request.url === callbackUrl)
  // ) {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  // }
}

export const config = {
  matcher:
    "/((?!api|_next/static|_next/image|favicon.ico|$|login|signup|auth).*)",
};
