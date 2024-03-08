import React from "react";
import {
  HiMiniBars3CenterLeft,
  HiOutlineStar,
  HiOutlineTrash,
  HiMiniUserCircle,
  HiEllipsisVertical,
} from "react-icons/hi2";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
              <div className="cursor-pointer">
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <HiEllipsisVertical className="text-xl" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem className="flex items-center gap-2 hover:bg-gray-100">
                      <HiOutlineStar className="text-lg" />
                      <span>Favourites</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="flex items-center gap-2 hover:bg-red-100">
                      <HiOutlineTrash className="text-lg" />
                      <span>Trash</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
            <div className="w-full h-40 bg-gray-200 my-4 rounded-xl"></div>
            <div className="flex justify-between items-center gap-2">
              <p className="flex items-center gap-2">
                <Image
                  height={40}
                  width={40}
                  src={org.creator.profile_image}
                  alt=""
                />
                <span className="capitalize">{org.creator.full_name}</span>
              </p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default OrganizationView;
