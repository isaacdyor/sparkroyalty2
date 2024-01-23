import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { api } from "@/trpc/server";

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");

  if (code) {
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);
    await supabase.auth.exchangeCodeForSession(code);
  }

  const user = await api.users.getCurrent.query();
  if (!user) {
    return NextResponse.redirect(new URL("/welcome", request.url));
  }

  // URL to redirect to after sign in process completes
  return NextResponse.redirect(request.url);
}
