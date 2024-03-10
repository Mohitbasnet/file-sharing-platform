"use client";
import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { apiGetInvitations } from "@/lib/apiRequests";
import { useQuery } from "@tanstack/react-query";
import Spinner from "@/components/elements/Spinner";

const Account = () => {
  const handleSubmit = () => {};
  const {
    isLoading,
    error,
    data: invitations,
  } = useQuery<any>({
    queryKey: ["invitations"],
    queryFn: () => apiGetInvitations(),
  });

  if (isLoading) return <Spinner />;
  console.log(invitations);
  return (
    <main>
      <h1 className="text-2xl font-bold">Your Invitations</h1>
      <p className="text-gray-600 my-2">
        You have no pending invitations at the moment.
      </p>
    </main>
  );
};

export default Account;
