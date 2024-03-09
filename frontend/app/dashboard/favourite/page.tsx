"use client";
import Empty from "@/components/elements/Empty";
import FileCard from "@/components/elements/FileCard";
import SearchBar from "@/components/elements/SearchBar";
import Spinner from "@/components/elements/Spinner";
import ViewSwitch from "@/components/elements/ViewSwitch";
import { apiGetFavorites } from "@/lib/apiRequests";
import { useQuery } from "@tanstack/react-query";
import React, { useCallback, useEffect } from "react";

const Favourite = () => {
  const [query, setQuery] = React.useState("");
  const [view, setView] = React.useState<"grid" | "list">("grid");
  const [filteredFiles, setFilteredFiles] = React.useState([] as any[]);

  const {
    isLoading,
    error,
    data: favorites,
  } = useQuery<any>({
    queryKey: ["files"],
    queryFn: () => apiGetFavorites(),
  });

  const handleSearch = useCallback(
    (query: string) => {
      if (favorites) {
        const filteredFiles = favorites?.data?.filter((file: any) =>
          file?.file?.file_name?.toLowerCase().includes(query.toLowerCase())
        );
        setFilteredFiles(filteredFiles);
      }
    },
    [favorites]
  );

  useEffect(() => {
    handleSearch(query);
  }, [query, handleSearch]);

  if (isLoading) return <Spinner />;

  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="mb-4 text-2xl font-bold">Your Favourites</h1>
        <SearchBar
          placeholder="Search in favourites"
          query={query}
          setQuery={setQuery}
          onSubmit={handleSearch}
        />
      </div>
      {favorites && favorites.data.length !== 0 && (
        <div className="my-4">
          <ViewSwitch view={view} setView={setView} />
        </div>
      )}
      {filteredFiles.length === 0 ? (
        <Empty />
      ) : (
        <div className="my-2 grid grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredFiles.map((file: any) => (
            <FileCard
              key={file.id}
              file={file.file}
              view={view}
              options={["unfavourite", "copy"]}
            />
          ))}
        </div>
      )}
    </>
  );
};

export default Favourite;
