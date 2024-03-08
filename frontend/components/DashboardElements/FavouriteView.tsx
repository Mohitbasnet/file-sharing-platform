import React from "react";

import {
  HiOutlineInformationCircle,
  HiMiniNoSymbol,
  HiOutlineTrash,
  HiMiniBars3CenterLeft,
  HiMiniArrowDownTray,
  HiEllipsisVertical,
} from "react-icons/hi2";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { useQueryClient, InvalidateQueryFilters } from "@tanstack/react-query";
import {
  apiDeleteFile,
  apiRemoveFavorite,
  apiUpdateFile,
} from "@/lib/apiRequests";
import showToast from "@/lib/toastNotification";

interface FavouriteViewProps {
  file: any;
}

function FavouriteView({ file }: FavouriteViewProps) {
  const queryClient = useQueryClient();
  const unfavouriteFile = async (id: string) => {
    try {
      const res = await apiRemoveFavorite(id);
      if (res.status === 204 && res.statusText === "No Content") {
        showToast("success", "File removed from favourites.");
        queryClient.invalidateQueries("user" as InvalidateQueryFilters);
      } else {
        showToast("error", "Failed to remove file from favourites.");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {file?.map((f: any) => {
          if (f.file.is_trashed) return null;
          return (
            <div key={f.id} className="border p-4 rounded-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span>
                    <HiMiniBars3CenterLeft className="text-lg" />
                  </span>
                  {f.file.file_name.slice(0, 22)}
                  {f.file.file_name.length > 22 ? "..." : ""}
                </div>
                <div className="cursor-pointer">
                  <DropdownMenu>
                    <DropdownMenuTrigger>
                      <HiEllipsisVertical className="text-xl" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem
                        className="flex items-center gap-2 hover:bg-red-100"
                        onClick={() => unfavouriteFile(f.id)}
                      >
                        <HiMiniNoSymbol className="text-lg" />
                        <span>Unfavourite</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
              <div className="w-full h-40 bg-gray-200 my-4 rounded-xl"></div>
              <div className="flex justify-between items-center gap-2">
                <p className="flex items-center gap-2">
                  <span>
                    <HiOutlineInformationCircle className="text-lg" />
                  </span>
                  <span>
                    <span className="uppercase"> {f.file.file_type} </span>
                    file
                  </span>
                </p>
                <p>
                  <span>
                    <HiMiniArrowDownTray className="text-lg" />
                  </span>
                  <span>{f.file_size}</span>
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default FavouriteView;
