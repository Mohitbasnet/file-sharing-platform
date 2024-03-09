import React from "react";
import {
  HiBars3CenterLeft,
  HiOutlineDocument,
  HiEllipsisVertical,
  HiOutlineArrowDownTray,
} from "react-icons/hi2";

interface FileCardProps {
  file: any;
  view: "grid" | "list";
}

const FileCard = ({ file, view }: FileCardProps) => {
  return (
    <div className="border rounded-lg p-3">
      <div className="flex items-center justify-between">
        <p className="flex items-center gap-2">
          <HiBars3CenterLeft className="text-lg" />
          <span>{file.file_name}</span>
        </p>
        <p>
          <HiEllipsisVertical className="text-lg" />
        </p>
      </div>
      <div className="bg-slate-200 h-40 w-full my-3 rounded-xl px-8"></div>
      <div className="flex items-center justify-between">
        <p className="flex items-center gap-2">
          <HiOutlineDocument className="text-lg" />
          <span>{file.file_type}</span>
        </p>
        <p className="flex items-center gap-2">
          <HiOutlineArrowDownTray className="text-lg" />
          <span>{file.file_size}</span>
        </p>
      </div>
    </div>
  );
};

export default FileCard;
