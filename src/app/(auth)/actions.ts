"use server";

import { capitalizeFirstLetter } from "@/lib/utils";
import { api } from "@/trpc/server";
import { createClient } from "@/utils/supabase/server";
import { cookies, headers } from "next/headers";
import type { LoginInput } from "./login/page";
import type { SignupInput } from "./signup/page";
const supabase = createClient(cookies());
const origin = headers().get("origin");

export const signUp = async (formData: SignupInput) => {
  "use server";
  const { data, error } = await supabase.auth.signUp({
    email: formData.email,
    password: formData.password,
    options: {
      emailRedirectTo: `${origin}/auth/callback`,
    },
  });
  if (error) {
    return {
      error: error.message,
    };
  } else if (data.user) {
    try {
      await api.users.create.mutate({
        id: data.user.id,
        email: formData.email,
        firstName: capitalizeFirstLetter(formData.firstName),
        lastName: capitalizeFirstLetter(formData.lastName),
      });
    } catch (error) {
      return {
        error: "error creating user",
      };
    }
  }
};

export const signIn = async (data: LoginInput) => {
  "use server";

  const { error } = await supabase.auth.signInWithPassword({
    email: data.email,
    password: data.password,
  });
  if (error) {
    return {
      error: error.message,
    };
  }
};
