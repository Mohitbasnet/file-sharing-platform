import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface SelectBoxProps {
  type: string;
  setType: (type: string) => void;
}

const SelectBox = ({ type, setType }: SelectBoxProps) => {
  const handleTypeChange = (newType: string) => {
    setType(newType);
  };

  return (
    <Select>
      <SelectTrigger className="w-[180px]">
        <SelectValue className="capitalize" placeholder={type} />
      </SelectTrigger>
      <SelectContent>
        <SelectItem
          value="All Files"
          onClick={() => handleTypeChange("All Files")}
        >
          All Files
        </SelectItem>
        <SelectItem value="csv" onClick={() => handleTypeChange("csv")}>
          CSV
        </SelectItem>
        <SelectItem value="image" onClick={() => handleTypeChange("image")}>
          Image
        </SelectItem>
        <SelectItem value="pdf" onClick={() => handleTypeChange("pdf")}>
          PDF
        </SelectItem>
      </SelectContent>
    </Select>
  );
};

export default SelectBox;
