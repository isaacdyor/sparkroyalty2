import { createClient } from "@/utils/supabase/client";
import React from "react";
import { UseFormReturn } from "react-hook-form";
import { toast } from "sonner";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { WelcomeInput } from "./welcomeForm";

const PfpInpt: React.FC<{
  form: UseFormReturn<WelcomeInput>;
  imageUrl: string | null;
  setImageUrl: React.Dispatch<React.SetStateAction<string | null>>;
}> = ({ form, imageUrl, setImageUrl }) => {
  const supabase = createClient();

  const handleFileInputChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const { data, error } = await supabase.storage
      .from("profile-pictures")
      .upload(`avatar_${Date.now()}.png`, file);

    if (error) {
      console.error("Error uploading file:", error);
      toast.error("Error uploading file");
      return;
    }
    setImageUrl(URL.createObjectURL(file));
  };

  const url =
    "https://st3.depositphotos.com/6672868/13701/v/450/depositphotos_137014128-stock-illustration-user-profile-icon.jpg";

  return (
    <>
      <div className="flex w-full items-center gap-4">
        <Avatar size="lg">
          <AvatarImage src={imageUrl ?? url} alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>

        <FormField
          control={form.control}
          name="image"
          render={({ field: { onChange, value, ...rest } }) => (
            <FormItem>
              <FormLabel mandatory>Profile Picture</FormLabel>
              <FormControl>
                <Input
                  type="file"
                  onChange={handleFileInputChange}
                  placeholder="Select a profile picture"
                  {...rest}
                />
              </FormControl>
              <FormMessage file />
            </FormItem>
          )}
        />
      </div>
    </>
  );
};

export default PfpInpt;
