import { Loader2 } from "lucide-react";
import React from "react";
import type { UseFormReturn } from "react-hook-form";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { Input } from "../ui/input";
import type { WelcomeInput } from "./welcomeForm";

const PfpInpt: React.FC<{
  form: UseFormReturn<WelcomeInput>;
  imageUrl: string | null;
  setImageUrl: React.Dispatch<React.SetStateAction<string | null>>;
  submitted: boolean;
  setFile: React.Dispatch<React.SetStateAction<File | null>>;
  loading: boolean;
}> = ({ form, imageUrl, setImageUrl, submitted, setFile, loading }) => {
  const handleFileInputChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setFile(file);

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
          // eslint-disable-next-line
          render={({ field: { onChange, ...rest } }) => (
            <FormItem>
              <FormLabel mandatory>Profile Picture</FormLabel>
              <FormControl>
                <div className="flex flex-row gap-2">
                  <Input
                    type="file"
                    onChange={handleFileInputChange}
                    placeholder="Select a profile picture"
                    {...rest}
                  />
                  {loading && (
                    <Loader2 className="h-8 w-8 animate-spin text-muted-foreground " />
                  )}
                </div>
              </FormControl>
              {submitted && !imageUrl && (
                <p className="text-sm font-medium text-destructive">
                  You must upload an image
                </p>
              )}
            </FormItem>
          )}
        />
      </div>
    </>
  );
};

export default PfpInpt;
