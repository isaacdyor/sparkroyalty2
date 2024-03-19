import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { SearchIcon } from "lucide-react";

export const Search = () => {
  const router = useRouter();

  const [query, setQuery] = useState("");

  const onSubmit = () => {
    router.push(`/search?q=${query}`);
  };
  return (
    <div className="relative">
      <Input
        placeholder="Search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            onSubmit();
          }
        }}
      />
      <div
        onClick={onSubmit}
        className=" absolute right-0 top-0 rounded-r-md  bg-secondary p-2 hover:cursor-pointer hover:bg-secondary/70"
      >
        <SearchIcon className="h-6 w-6 " />
      </div>
    </div>
  );
};
