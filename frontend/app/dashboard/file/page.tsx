"use client";
import SearchBar from "@/components/elements/SearchBar";
import UploadForm from "@/components/elements/UploadForm";
import ViewSwitch from "@/components/elements/ViewSwitch";
import React from "react";

const File = () => {
  const [query, setQuery] = React.useState("");
  const [view, setView] = React.useState<"grid" | "list">("grid");

  const handleSearch = (query: string) => {
    //! Write your search logic here
  };
  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="mb-4 text-3xl font-bold">Your Files</h1>
        <SearchBar
          placeholder="Search files"
          query={query}
          setQuery={setQuery}
          onSubmit={handleSearch}
        />
        <UploadForm />
      </div>
      <div className="my-4">
        <ViewSwitch view={view} setView={setView} />
      </div>
      <div>{/* Render your list here */}</div>
    </>
  );
};

export default File;
