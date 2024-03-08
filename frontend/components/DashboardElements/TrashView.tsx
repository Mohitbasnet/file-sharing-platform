import React from "react";
import convertTime from "@/lib/timeAgo";

import {
  HiOutlineInformationCircle,
  HiArrowPath,
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
import { apiDeleteFile, apiUpdateFile } from "@/lib/apiRequests";
import showToast from "@/lib/toastNotification";

interface TrashViewProps {
  file: any;
}

function TrashView({ file }: TrashViewProps) {
  const queryClient = useQueryClient();
  const deletePermanantly = async (id: string) => {
    try {
      const res = await apiDeleteFile(id);
      if (res.status === 204 && res.statusText === "No Content") {
        showToast("success", "File deleted permanently.");
        queryClient.invalidateQueries("user" as InvalidateQueryFilters);
      } else {
        showToast("error", "Failed to delete file permanently.");
      }
    } catch (error) {
      console.error(error);
    }
  };
  const restoreFile = async (id: string) => {
    try {
      const res = await apiUpdateFile({ id, is_trashed: false });
      if (res.status === 200) {
        showToast("success", "File restored successfully.");
        queryClient.invalidateQueries("user" as InvalidateQueryFilters);
      } else {
        showToast("error", "Failed to restore file.");
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {file?.map((f: any) => {
          if (!f.is_trashed) return null;
          return (
            <div key={f.id} className="border p-4 rounded-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span>
                    <HiMiniBars3CenterLeft className="text-lg" />
                  </span>
                  {f.file_name.slice(0, 22)}
                  {f.file_name.length > 22 ? "..." : ""}
                </div>
                <div className="cursor-pointer">
                  <DropdownMenu>
                    <DropdownMenuTrigger>
                      <HiEllipsisVertical className="text-xl" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem
                        className="flex items-center gap-2 hover:bg-slate-100"
                        onClick={() => restoreFile(f.id)}
                      >
                        <HiArrowPath className="text-lg" />
                        <span>Restore file</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="flex items-center gap-2 hover:bg-red-100"
                        onClick={() => deletePermanantly(f.id)}
                      >
                        <HiOutlineTrash className="text-lg" />
                        <span>Delete Permanantly</span>
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
                    <span className="uppercase"> {f.file_type} </span>
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

export default TrashView;
