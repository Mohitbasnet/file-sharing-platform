import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface SearchBarProps {
  placeholder?: string;
  query?: string;
  setQuery?: (query: string) => void;
  onSubmit?: (query: string) => void;
}

const SearchBar = ({
  query = "",
  onSubmit = () => {},
  setQuery = () => {},
  placeholder = "Search",
}: SearchBarProps) => {
  return (
    <div className="flex w-full max-w-sm items-center space-x-2">
      <Input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        type="text"
        placeholder={placeholder}
      />
      <Button
        className="dark:bg-zinc-700 dark:text-lime-50"
        variant={"default"}
        type="button"
        onClick={() => onSubmit(query)}
      >
        Search
      </Button>
    </div>
  );
};

export default SearchBar;
