import React from "react";
import convertTime from "@/lib/timeAgo";

import {
  HiOutlineInformationCircle,
  HiOutlineStar,
  HiOutlineTrash,
  HiMiniBars3CenterLeft,
  HiMiniArrowDownTray,
  HiEllipsisVertical,
  HiOutlineClipboard,
} from "react-icons/hi2";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "../ui/button";
import {
  useQuery,
  useQueryClient,
  InvalidateQueryFilters,
} from "@tanstack/react-query";
import { apiAddFavorite, apiUpdateFile } from "@/lib/apiRequests";
import showToast from "@/lib/toastNotification";

interface FileViewProps {
  file: any;
  view: string;
}

function FileView({ file, view }: FileViewProps) {
  const queryClient = useQueryClient();
  const handleAddToFavourite = async (id: string) => {
    try {
      const res = await apiAddFavorite({
        file_id: id,
        user_id: localStorage.getItem("user_id"),
      });
      if (res.status === 200) {
        showToast("success", "File added to favourites.");
        queryClient.invalidateQueries("user" as InvalidateQueryFilters);
      } else {
        showToast("error", "Failed to add file to favourites.");
      }
    } catch (error: any) {
      if (
        error.response.data.non_field_errors[0] ===
        "The fields user_id, file_id must make a unique set."
      ) {
        showToast("error", "File already in favourites");
      }
      return;
    }
  };
  const handleAddToTrash = async (id: string) => {
    try {
      const res = await apiUpdateFile({ id, is_trashed: true });
      if (res.status === 200) {
        showToast("success", "File moved to trash. You can restore it later.");
        queryClient.invalidateQueries("user" as InvalidateQueryFilters);
      } else {
        showToast("error", "Failed to move file to trash.");
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div>
      {view === "grid" ? (
        <div className="grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {file?.map((f: any) => {
            if (f.is_trashed) return null;
            return (
              <div key={f.id} className="border p-4 rounded-lg">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span>
                      <HiMiniBars3CenterLeft className="text-lg" />
                    </span>
                    <span>
                      {f.file_name.slice(0, 22)}
                      {f.file_name.length > 22 ? "..." : ""}
                    </span>
                  </div>
                  <div className="cursor-pointer">
                    <DropdownMenu>
                      <DropdownMenuTrigger>
                        <HiEllipsisVertical className="text-xl" />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        {!f.is_private && (
                          <DropdownMenuItem
                            className="flex items-center gap-2 hover:bg-gray-100"
                            onClick={() => {
                              navigator.clipboard.writeText(f.file);
                              showToast("success", "Link copied to clipboard");
                            }}
                          >
                            <HiOutlineClipboard className="text-lg" />
                            <span>Copy Link</span>
                          </DropdownMenuItem>
                        )}
                        <DropdownMenuItem
                          className="flex items-center gap-2 hover:bg-gray-100"
                          onClick={() => handleAddToFavourite(f.id)}
                        >
                          <HiOutlineStar className="text-lg" />
                          <span>Favourites</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="flex items-center gap-2 hover:bg-red-100"
                          onClick={() => handleAddToTrash(f.id)}
                        >
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
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Uploaded On</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {file?.map((f: any) => {
              if (f.is_trashed) return null;
              return (
                <TableRow key={f.id}>
                  <TableCell className="capitalize">{f.file_name}</TableCell>
                  <TableCell className="uppercase">{f.file_type}</TableCell>
                  <TableCell>{convertTime(f.created_at)}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button
                        size="sm"
                        variant="secondary"
                        onClick={() => handleAddToFavourite(f.id)}
                      >
                        <HiOutlineStar className="text-lg" />
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleAddToTrash(f.id)}
                      >
                        <HiOutlineTrash className="text-lg" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      )}
    </div>
  );
}

export default FileView;
