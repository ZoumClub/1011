"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Accessory } from "@/types/accessory";
import { formatPrice } from "@/lib/utils";

export const columns: ColumnDef<Accessory>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "price",
    header: "Price",
    cell: ({ row }) => formatPrice(row.getValue("price")),
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: ({ row }) => {
      const description = row.getValue("description") as string;
      return description.length > 100 
        ? `${description.slice(0, 100)}...` 
        : description;
    },
  },
  {
    id: "actions",
    cell: ({ row, table }) => {
      const accessory = row.original;
      return (
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => table.options.meta?.onEdit(accessory)}
          >
            Edit
          </Button>
          <Button 
            variant="destructive" 
            size="sm"
            onClick={() => table.options.meta?.onDelete(accessory.id)}
          >
            Delete
          </Button>
        </div>
      );
    },
  },
];