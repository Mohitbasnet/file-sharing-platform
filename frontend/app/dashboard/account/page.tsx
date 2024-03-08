"use client";
import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const Account = () => {
  const handleSubmit = () => {};
  return (
    <main>
      <h1 className="text-2xl font-bold">Update Your Account</h1>
      <form
        action=""
        method="post"
        className="w-96 mt-8"
        onSubmit={(e) => e.preventDefault()}
      >
        <div className="flex flex-col space-y-4">
          <div>
            <Label htmlFor="name">Name</Label>
            <Input type="text" id="name" />
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input type="email" id="email" />
          </div>
          <div>
            <Label htmlFor="password">Password</Label>
            <Input type="password" id="password" />
          </div>
          <div>
            <Button onClick={handleSubmit}>Update</Button>
          </div>
        </div>
      </form>
    </main>
  );
};

export default Account;
