"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface FileInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type" | "onChange"> {
  onFileSelect?: (files: FileList | null) => void;
}

const FileInput = React.forwardRef<HTMLInputElement, FileInputProps>(
  ({ className, onFileSelect, ...props }, ref) => {
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      if (onFileSelect) {
        onFileSelect(event.target.files);
      }
    };

    return (
      <input
        type="file"
        className={cn(
          "file:mr-4 file:py-2 file:px-4",
          "file:rounded-full file:border-0",
          "file:text-sm file:font-semibold",
          "file:bg-primary file:text-primary-foreground",
          "hover:file:bg-primary/90",
          className
        )}
        onChange={handleChange}
        ref={ref}
        {...props}
      />
    );
  }
);
FileInput.displayName = "FileInput";

export { FileInput };