"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useQuery } from "@tanstack/react-query";
import { apiGetOrganizations } from "@/lib/apiRequests";
import Spinner from "@/components/DashboardElements/Spinner";
import OrganizationView from "@/components/DashboardElements/OrganizationView";

const Organization = () => {
  const [query, setQuery] = useState("");

  const {
    isLoading,
    error,
    data: organizations,
  } = useQuery<any>({
    queryKey: ["organization"],
    queryFn: () => apiGetOrganizations(),
  });

  isLoading && <Spinner />;

  const handleSearch = () => {};
  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Your Organizations</h1>
        <form
          className="flex w-full max-w-sm items-center space-x-2"
          method="get"
          onSubmit={(e) => e.preventDefault()}
        >
          <Input
            type="text"
            placeholder="Search Organizations"
            onChange={(e) => setQuery(e.target.value)}
            value={query}
          />
          <Button type="submit" onClick={handleSearch}>
            Search
          </Button>
        </form>
      </div>
      <div className="mt-8">
        <OrganizationView organization={organizations?.data} />
      </div>
    </>
  );
};

export default Organization;
