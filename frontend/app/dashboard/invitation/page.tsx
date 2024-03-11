"use client";
import React from "react";
import { apiGetInvitations } from "@/lib/apiRequests";
import { useQuery } from "@tanstack/react-query";
import Spinner from "@/components/elements/Spinner";
import InvitationCard from "@/components/elements/InvitationCard";

const Account = () => {
  const {
    isLoading,
    error,
    data: invitations,
  } = useQuery<any>({
    queryKey: ["invitations"],
    queryFn: () => apiGetInvitations(),
  });

  if (isLoading) return <Spinner />;
  return (
    <main>
      <h1 className="text-2xl font-bold">Your Invitations</h1>
      {invitations && invitations?.data?.length === 0 && (
        <p className="text-gray-600 my-2">
          You have no pending invitations at the moment.
        </p>
      )}
      <div className="mt-6 space-y-4">
        {invitations?.data?.map((invitation: any) => {
          return <InvitationCard key={invitation.id} invitation={invitation} />;
        })}
      </div>
    </main>
  );
};

export default Account;
