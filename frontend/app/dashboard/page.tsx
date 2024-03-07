"use client";
import { Button } from "@/components/ui/button";
import { logoutClick } from "@/lib/logout";
import React from "react";
const Dashboard = () => {
  return (
    <main className="p-10">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <Button onClick={logoutClick} variant={"destructive"} className="mt-4">
        Logout
      </Button>
    </main>
  );
};

export default Dashboard;
