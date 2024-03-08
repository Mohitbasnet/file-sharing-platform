"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useQuery } from "@tanstack/react-query";
import { apiGetFavorites } from "@/lib/apiRequests";
import Spinner from "@/components/DashboardElements/Spinner";
import FavouriteView from "@/components/DashboardElements/FavouriteView";

const Favourite = () => {
  const [query, setQuery] = useState("");
  const [filteredFiles, setFilteredFiles] = useState(null);

  const {
    isLoading,
    error,
    data: files,
  } = useQuery<any>({
    queryKey: ["favourites"],
    queryFn: () => apiGetFavorites(),
  });

  useEffect(() => {
    setFilteredFiles(files?.data);
    if (query.length === 0) setFilteredFiles(files?.data);
  }, [files, query]);

  isLoading && <Spinner />;

  const handleSearch = () => {
    const filteredFiles = files?.data.filter((file: any) =>
      file.file.file_name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredFiles(filteredFiles);
  };

  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Your Favourites</h1>
        <form
          className="flex w-full max-w-sm items-center space-x-2"
          method="get"
          onSubmit={(e) => e.preventDefault()}
        >
          <Input
            type="text"
            placeholder="Search"
            onChange={(e) => setQuery(e.target.value)}
            value={query}
          />
          <Button type="submit" onClick={handleSearch}>
            Search
          </Button>
        </form>
      </div>
      <div className="mt-8">
        <FavouriteView file={filteredFiles || files?.data} />
      </div>
    </>
  );
};

export default Favourite;
