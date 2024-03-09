import React from "react";
import {
  HiBars3CenterLeft,
  HiOutlineUsers,
  HiOutlineBriefcase,
} from "react-icons/hi2";

interface OrganizationCardProps {
  org: any;
}

const OrganizationCard = ({ org }: OrganizationCardProps) => {
  //   console.log(org);
  return (
    <div className="border rounded-lg p-3">
      <div className="flex items-center justify-between">
        <p className="flex items-center gap-2">
          <HiBars3CenterLeft className="text-lg" />
          <span>{org.name}</span>
        </p>
      </div>
      <div className="bg-slate-200 h-40 w-full my-3 rounded-xl px-8 flex items-center justify-center">
        <p className="text-4xl font-bold">T</p>
      </div>
      <div className="flex items-center justify-between">
        <p className="flex items-center gap-2">
          <span>
            <HiOutlineBriefcase className="text-lg" />
          </span>
          <span>{org.creator.full_name}</span>
        </p>
        <p className="flex items-center gap-2 text-gray-600">
          <span>
            <HiOutlineUsers className="text-lg" />
          </span>
          <span>{org.members?.length} Members</span>
        </p>
      </div>
    </div>
  );
};

export default OrganizationCard;
