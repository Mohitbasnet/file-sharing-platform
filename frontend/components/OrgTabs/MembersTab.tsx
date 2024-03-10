import { getOrganizationMembers } from "@/lib/apiRequests";
import { useQuery } from "@tanstack/react-query";
import React, { useCallback, useEffect } from "react";
import Spinner from "../elements/Spinner";
import SearchBar from "../elements/SearchBar";
import Empty from "../elements/Empty";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import AddMemberForm from "../elements/AddMemberForm";
import MemberCard from "../elements/MemberCard";

interface MembersTabProps {
  org: any;
}
const MembersTab = ({ org }: MembersTabProps) => {
  const [query, setQuery] = React.useState("");
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
        <SearchBar
          placeholder="Search members"
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
        <div className="my-10">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="">Full Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredMembers.map((member: any) => (
                <MemberCard
                  membershipId={member.id}
                  isCreator={isCreator}
                  key={member.id}
                  member={member}
                />
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </>
  );
};

export default MembersTab;
