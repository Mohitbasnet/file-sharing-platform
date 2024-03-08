import React from "react";
import { HiMiniBars3CenterLeft } from "react-icons/hi2";
import Image from "next/image";
import Link from "next/link";

interface OrganizationViewProps {
  organization: any;
}

const OrganizationView = ({ organization }: OrganizationViewProps) => {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4">
      {organization?.map((org: any) => (
        <Link href={`/dashboard/organization/${org.slug}`} key={org.id}>
          <div key={org.id} className="border p-4 rounded-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span>
                  <HiMiniBars3CenterLeft className="text-lg" />
                </span>
                <span>{org.name}</span>
              </div>
            </div>
            <div className="w-full h-40  bg-gray-200 my-4 rounded-xl dark:bg-gray-700 flex items-center justify-center">
              <span className="text-4xl">T</span>
            </div>
            <div>
              <div className="flex justify-between items-center gap-2">
                <p className="flex items-center gap-1">
                  <Image
                    className="rounded-full"
                    height={40}
                    width={40}
                    src={org.creator.profile_image}
                    alt=""
                  />
                  <span className="capitalize">{org.creator.full_name}</span>
                </p>
                <div className="flex items-center gap-2">
                  <p className="h-2 w-2 bg-green-500 rounded-full"></p>
                  <p>
                    {org.creator.id === localStorage.getItem("user_id")
                      ? "Founder"
                      : "Member"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default OrganizationView;
