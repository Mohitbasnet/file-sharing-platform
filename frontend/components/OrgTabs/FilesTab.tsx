import React, { useCallback, useEffect } from "react";
import SearchBar from "../elements/SearchBar";
import UploadOrg from "../elements/UploadOrg";
import { getFilesOfOrganization } from "@/lib/apiRequests";
import { useQuery } from "@tanstack/react-query";
import Spinner from "../elements/Spinner";
import ViewSwitch from "../elements/ViewSwitch";
import Empty from "../elements/Empty";
import FileCard from "../elements/FileCard";
interface FilesTabProps {
  org: any;
}
const FilesTab = ({ org }: FilesTabProps) => {
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
    queryFn: () => getFilesOfOrganization(org?.id),
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
        <UploadOrg org_id={org?.id} />
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
              options={["trash", "copy"]}
            />
          ))}
        </div>
      )}
    </>
  );
};

export default FilesTab;
