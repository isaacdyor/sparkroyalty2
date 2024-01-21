import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import { MetadataType } from "@/types/types";

export async function getMetadata(): Promise<MetadataType> {
  const supabase = createClient(cookies());
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("User not found");
  const metadata = user?.user_metadata as MetadataType;
  return metadata;
}
