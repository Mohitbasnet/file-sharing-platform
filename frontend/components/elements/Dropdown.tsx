import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  HiEllipsisVertical,
  HiOutlineStar,
  HiOutlineTrash,
  HiOutlineClipboard,
  HiEye,
  HiArrowPath,
  HiLockClosed,
} from "react-icons/hi2";

interface DropdownProps {
  onCopyLink?: () => void;
  options?: string[];
  is_private?: any;
}

const Dropdown = ({ onCopyLink, options, is_private }: DropdownProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <HiEllipsisVertical className="text-lg" />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {options?.includes("favourite") && (
          <DropdownMenuItem className="cursor-pointer hover:bg-gray-100 flex items-center gap-2">
            <HiOutlineStar className="text-lg" />
            <span>Favourites</span>
          </DropdownMenuItem>
        )}
        {options?.includes("unfavourite") && (
          <DropdownMenuItem className="cursor-pointer hover:bg-gray-100 flex items-center gap-2">
            <HiOutlineStar className="text-lg" />
            <span>Unfavourite</span>
          </DropdownMenuItem>
        )}
        {options?.includes("restore") && (
          <DropdownMenuItem className="cursor-pointer hover:bg-gray-100 flex items-center gap-2">
            <HiArrowPath className="text-lg" />
            <span>Restore</span>
          </DropdownMenuItem>
        )}
        {options?.includes("delete") && (
          <DropdownMenuItem className="cursor-pointer hover:bg-gray-100 flex items-center gap-2">
            <HiOutlineTrash className="text-lg" />
            <span>Delete Permanently</span>
          </DropdownMenuItem>
        )}
        {options?.includes("trash") && (
          <DropdownMenuItem className="cursor-pointer hover:bg-gray-100 flex items-center gap-2">
            <HiOutlineTrash className="text-lg" />
            <span>Trash</span>
          </DropdownMenuItem>
        )}
        {options?.includes("permission") && is_private && (
          <DropdownMenuItem className="cursor-pointer hover:bg-gray-100 flex items-center gap-2">
            <HiEye className="text-lg" />
            <span>Make Public</span>
          </DropdownMenuItem>
        )}
        {options?.includes("permission") && !is_private && (
          <DropdownMenuItem className="cursor-pointer hover:bg-gray-100 flex items-center gap-2">
            <HiLockClosed className="text-lg" />
            <span>Make Private</span>
          </DropdownMenuItem>
        )}
        {options?.includes("copy") && (
          <DropdownMenuItem
            onClick={onCopyLink}
            className="cursor-pointer hover:bg-gray-100 flex items-center gap-2"
          >
            <HiOutlineClipboard className="text-lg" />
            <span>Copy Link</span>
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Dropdown;
