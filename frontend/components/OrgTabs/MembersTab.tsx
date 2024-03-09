import { getOrganizationMembers } from "@/lib/apiRequests";
import { useQuery } from "@tanstack/react-query";
import React, { useCallback, useEffect } from "react";
import Spinner from "../elements/Spinner";
import ViewSwitch from "../elements/ViewSwitch";
import SearchBar from "../elements/SearchBar";
import Empty from "../elements/Empty";
import { Button } from "../ui/button";
import { HiMiniPlus } from "react-icons/hi2";
import AddMemberForm from "../elements/AddMemberForm";

interface MembersTabProps {
  org: any;
}
const MembersTab = ({ org }: MembersTabProps) => {
  const [query, setQuery] = React.useState("");
  const [view, setView] = React.useState<"grid" | "list">("grid");
  const [filteredMembers, setFilteredMembers] = React.useState([] as any[]);
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
    data: members,
  } = useQuery<any>({
    queryKey: ["members"],
    queryFn: () => getOrganizationMembers(org?.id),
    enabled: !!org,
  });

  const handleSearch = useCallback(
    (query: string) => {
      if (members) {
        const filteredMembers = members?.data?.filter((member: any) =>
          member?.user?.full_name?.toLowerCase().includes(query.toLowerCase())
        );
        setFilteredMembers(filteredMembers);
      }
    },
    [members]
  );

  useEffect(() => {
    handleSearch(query);
  }, [query, handleSearch]);
  if (isLoading) return <Spinner />;

  return (
    <>
      <div className="flex items-center justify-between">
        {members && members.data.length !== 0 && (
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
            <AddMemberForm org={org} />
          </div>
        )}
      </div>
      {filteredMembers.length === 0 ? (
        <Empty />
      ) : (
        <div className="my-2 grid grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredMembers.map((member: any) => (
            <h1 key={member.id}>{member.user.full_name}</h1>
          ))}
        </div>
      )}
    </>
  );
};

export default MembersTab;
