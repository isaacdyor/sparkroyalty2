import { api } from "@/trpc/server";
import { ActiveType } from "@prisma/client";
import { createClient } from "./supabase/server";
import { cookies } from "next/headers";

export async function getActive(): Promise<ActiveType | null> {
  const supabase = createClient(cookies());
  const {
    data: { user: authUser },
  } = await supabase.auth.getUser();
  if (!authUser) return null;
  const user = await api.users.getCurrent.query();
  if (!user) return ActiveType.NONE;

  return user.active;
}
