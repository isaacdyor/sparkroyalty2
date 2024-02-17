import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { useRouter } from "next/navigation";

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
        onKeyPress={(e) => {
          if (e.key === "Enter") {
            onSubmit();
          }
        }}
      />
      <div
        onClick={onSubmit}
        className=" absolute right-0 top-0 rounded-r-md  bg-secondary p-2 hover:cursor-pointer hover:bg-secondary/70"
      >
        <MagnifyingGlassIcon className="h-6 w-6 " />
      </div>
    </div>
  );
};
