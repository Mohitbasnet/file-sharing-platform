import { getTrashedFilesOfOrganization } from "@/lib/apiRequests";
import { useQuery } from "@tanstack/react-query";
import React, { useCallback, useEffect } from "react";
import Spinner from "../elements/Spinner";
import ViewSwitch from "../elements/ViewSwitch";
import SearchBar from "../elements/SearchBar";
import Empty from "../elements/Empty";
import FileCard from "../elements/FileCard";
import { Button } from "../ui/button";
import { HiOutlineArchiveBoxXMark } from "react-icons/hi2";

interface RecycleBinProps {
  org: any;
}
const RecycleBinTab = ({ org }: RecycleBinProps) => {
  const [query, setQuery] = React.useState("");
  const [view, setView] = React.useState<"grid" | "list">("grid");
  const [filteredFiles, setFilteredFiles] = React.useState([] as any[]);
  const [isCreator, setIsCreator] = React.useState(false);

  useEffect(() => {
    const checkCreator = () => {
      if (org?.creator.id === localStorage.getItem("user_id")) {
        setIsCreator(true);
      }
    };
    checkCreator();
  }, [org]);

  const {
    isLoading,
    error,
    data: files,
  } = useQuery<any>({
    queryKey: ["files"],
    queryFn: () => getTrashedFilesOfOrganization(org?.id),
    enabled: !!org?.id,
  });

  const handleSearch = useCallback(
    (query: string) => {
      if (files) {
        const filteredFiles = files?.data?.filter((file: any) =>
          file?.file_name?.toLowerCase().includes(query.toLowerCase())
        );
        setFilteredFiles(filteredFiles);
      }
    },
    [files]
  );

  useEffect(() => {
    handleSearch(query);
  }, [query, handleSearch]);

  if (isLoading) return <Spinner />;

  return (
    <>
      <div className="flex items-center justify-between">
        {files && files.data.length !== 0 && (
          <div className="my-4">
            <ViewSwitch view={view} setView={setView} />
          </div>
        )}
        <SearchBar
          placeholder="Search files"
          query={query}
          setQuery={setQuery}
          onSubmit={handleSearch}
        />
        {isCreator && (
          <div>
            <Button variant={"destructive"} className="flex items-center gap-2">
              <HiOutlineArchiveBoxXMark className="text-xl" />
              <span>Empty</span>
            </Button>
          </div>
        )}
      </div>

      {filteredFiles.length === 0 ? (
        <Empty />
      ) : (
        <div className="my-2 grid grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredFiles.map((file: any) => (
            <FileCard
              is_org={true}
              isCreator={isCreator}
              key={file.id}
              file={file}
              view={view}
              options={["restore", "delete"]}
            />
          ))}
        </div>
      )}
    </>
  );
};

export default RecycleBinTab;
