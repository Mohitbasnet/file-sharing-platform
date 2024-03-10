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
import {
  apiAddFavorite,
  apiDeleteFile,
  apiRemoveFavorite,
  apiUpdateFile,
} from "@/lib/apiRequests";
import showToast from "@/lib/toastNotification";
import { useQueryClient, InvalidateQueryFilters } from "@tanstack/react-query";

interface DropdownProps {
  onCopyLink?: () => void;
  options?: string[];
  is_private?: any;
  isCreator?: boolean;
  isOrg?: boolean;
  file_id?: string;
  fav_id?: string;
}

const Dropdown = ({
  onCopyLink,
  options,
  is_private,
  isCreator,
  isOrg,
  file_id,
  fav_id,
}: DropdownProps) => {
  const queryClient = useQueryClient();
  const handleAddToFavorites = async () => {
    try {
      const res = await apiAddFavorite({
        file_id,
        user_id: localStorage.getItem("user_id"),
      });
      if (res.status === 201) {
        showToast("success", "File added to favourites.");
        queryClient.invalidateQueries("favourites" as InvalidateQueryFilters);
      }
    } catch (error: any) {
      if (
        error.response.data.non_field_errors[0] ===
        "The fields user_id, file_id must make a unique set."
      ) {
        showToast("error", "File already in favourites.");
      } else {
        showToast("error", "Something went wrong. Please try again.");
      }
    }
  };
  const handleUnfavourite = async () => {
    try {
      const res = await apiRemoveFavorite(fav_id);
      if (res.status === 204) {
        showToast("success", "File removed from favourites.");
        queryClient.invalidateQueries("favourites" as InvalidateQueryFilters);
      }
    } catch (error) {
      showToast("error", "Something went wrong. Please try again.");
    }
  };
  const handleAddToTrash = async () => {
    try {
      const res = await apiUpdateFile({
        id: file_id,
        is_trashed: true,
      });
      if (res.status === 200) {
        showToast("success", "File moved to trash.");
        queryClient.invalidateQueries("files" as InvalidateQueryFilters);
      }
    } catch (error) {
      showToast("error", "Something went wrong. Please try again.");
    }
  };
  const handleRestore = async () => {
    try {
      const res = await apiUpdateFile({
        id: file_id,
        is_trashed: false,
      });
      if (res.status === 200) {
        showToast("success", "File restored.");
        queryClient.invalidateQueries("files" as InvalidateQueryFilters);
      }
    } catch (error) {
      showToast("error", "Something went wrong. Please try again.");
    }
  };

  const handleDelete = async () => {
    try {
      const res = await apiDeleteFile(file_id);
      if (res.status === 204) {
        showToast("success", "File deleted permanently.");
        queryClient.invalidateQueries("files" as InvalidateQueryFilters);
      }
    } catch (error) {
      showToast("error", "Something went wrong. Please try again.");
    }
  };

  const handleMakePublic = async () => {
    try {
      const res = await apiUpdateFile({
        id: file_id,
        is_private: false,
      });
      if (res.status === 200) {
        showToast("success", "File is now public.");
        queryClient.invalidateQueries("files" as InvalidateQueryFilters);
      }
    } catch (error) {
      showToast("error", "Something went wrong. Please try again.");
    }
  };
  const handleMakePrivate = async () => {
    try {
      const res = await apiUpdateFile({
        id: file_id,
        is_private: true,
      });
      if (res.status === 200) {
        showToast("success", "File is now private.");
        queryClient.invalidateQueries("files" as InvalidateQueryFilters);
      }
    } catch (error) {
      showToast("error", "Something went wrong. Please try again.");
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <HiEllipsisVertical className="text-lg" />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {options?.includes("favourite") && (
          <DropdownMenuItem
            className="cursor-pointer hover:bg-gray-100 flex items-center gap-2"
            onClick={handleAddToFavorites}
          >
            <HiOutlineStar className="text-lg" />
            <span>Favourites</span>
          </DropdownMenuItem>
        )}
        {options?.includes("unfavourite") && (
          <DropdownMenuItem
            className="cursor-pointer hover:bg-gray-100 flex items-center gap-2"
            onClick={handleUnfavourite}
          >
            <HiOutlineStar className="text-lg" />
            <span>Unfavourite</span>
          </DropdownMenuItem>
        )}
        {options?.includes("restore") && (
          <DropdownMenuItem
            className="cursor-pointer hover:bg-gray-100 flex items-center gap-2"
            onClick={handleRestore}
          >
            <HiArrowPath className="text-lg" />
            <span>Restore</span>
          </DropdownMenuItem>
        )}
        {options?.includes("delete") && isCreator && isOrg && (
          <DropdownMenuItem
            className="cursor-pointer hover:bg-gray-100 flex items-center gap-2"
            onClick={handleDelete}
          >
            <HiOutlineTrash className="text-lg" />
            <span>Delete Permanently</span>
          </DropdownMenuItem>
        )}
        {options?.includes("trash") && isCreator && isOrg && (
          <DropdownMenuItem
            className="cursor-pointer hover:bg-gray-100 flex items-center gap-2"
            onClick={handleAddToTrash}
          >
            <HiOutlineTrash className="text-lg" />
            <span>Trash</span>
          </DropdownMenuItem>
        )}
        {options?.includes("delete") && !isOrg && (
          <DropdownMenuItem
            className="cursor-pointer hover:bg-gray-100 flex items-center gap-2"
            onClick={handleDelete}
          >
            <HiOutlineTrash className="text-lg" />
            <span>Delete Permanently</span>
          </DropdownMenuItem>
        )}
        {options?.includes("trash") && !isOrg && (
          <DropdownMenuItem
            className="cursor-pointer hover:bg-gray-100 flex items-center gap-2"
            onClick={handleAddToTrash}
          >
            <HiOutlineTrash className="text-lg" />
            <span>Trash</span>
          </DropdownMenuItem>
        )}
        {options?.includes("permission") && is_private && (
          <DropdownMenuItem
            className="cursor-pointer hover:bg-gray-100 flex items-center gap-2"
            onClick={handleMakePublic}
          >
            <HiEye className="text-lg" />
            <span>Make Public</span>
          </DropdownMenuItem>
        )}
        {options?.includes("permission") && !is_private && (
          <DropdownMenuItem
            className="cursor-pointer hover:bg-gray-100 flex items-center gap-2"
            onClick={handleMakePrivate}
          >
            <HiLockClosed className="text-lg" />
            <span>Make Private</span>
          </DropdownMenuItem>
        )}
        {options?.includes("copy") && !is_private && (
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
