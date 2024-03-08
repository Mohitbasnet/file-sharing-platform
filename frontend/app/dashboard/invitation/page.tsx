"use client";
import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const Account = () => {
  const handleSubmit = () => {};
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
