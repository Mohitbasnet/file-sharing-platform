"use client";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useCallback } from "react";
import SearchBar from "@/components/elements/SearchBar";
import ViewSwitch from "@/components/elements/ViewSwitch";
import { apiGetOrganizations } from "@/lib/apiRequests";
import Spinner from "@/components/elements/Spinner";
import Empty from "@/components/elements/Empty";
import OrganizationCard from "@/components/elements/OrganizationCard";
import Link from "next/link";
import CreateOrganizationForm from "@/components/elements/CreateOrganizationForm";
const Organization = () => {
  const [query, setQuery] = React.useState("");
  const [view, setView] = React.useState<"grid" | "list">("grid");
  const [filteredOrganizations, setFilteredOrganizations] = React.useState(
    [] as any[]
  );

  const {
    isLoading,
    error,
    data: organizations,
  } = useQuery<any>({
    queryKey: ["organizations"],
    queryFn: () => apiGetOrganizations(),
  });

  const handleSearch = useCallback(
    (query: string) => {
      if (organizations) {
        const filteredOrganizations = organizations.data.filter(
          (organization: any) =>
            organization.name.toLowerCase().includes(query.toLowerCase())
        );
        setFilteredOrganizations(filteredOrganizations);
      }
    },
    [organizations]
  );

  useEffect(() => {
    handleSearch(query);
  }, [query, handleSearch]);

  if (isLoading) return <Spinner />;

  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="mb-4 text-2xl font-bold">Your Organizations</h1>
        <SearchBar
          placeholder="Search Organizations"
          query={query}
          setQuery={setQuery}
          onSubmit={handleSearch}
        />
      </div>
      <div className="flex items-center justify-between">
        <div className="my-4">
          {organizations && organizations.data.length !== 0 && (
            <ViewSwitch view={view} setView={setView} />
          )}
        </div>
        <div className="flex justify-end">
          <CreateOrganizationForm />
        </div>
      </div>
      {filteredOrganizations.length === 0 ? (
        <Empty />
      ) : (
        <div className="my-2 grid grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredOrganizations.map((organization: any) => (
            <Link
              href={`/dashboard/organization/${organization.slug}`}
              key={organization.id}
            >
              <OrganizationCard org={organization} />
            </Link>
          ))}
        </div>
      )}
    </>
  );
};

export default Organization;
