"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Brand } from "@/types/brand";

export const columns: ColumnDef<Brand>[] = [
  {
    accessorKey: "order_index",
    header: "Order",
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "logo_url",
    header: "Logo",
    cell: ({ row }) => (
      <img
        src={row.getValue("logo_url")}
        alt={`${row.getValue("name")} logo`}
        className="w-12 h-12 object-contain"
      />
    ),
  },
  {
    id: "actions",
    cell: ({ row, table }) => {
      const brand = row.original;
      return (
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => table.options.meta?.onEdit(brand)}
          >
            Edit
          </Button>
          <Button 
            variant="destructive" 
            size="sm"
            onClick={() => table.options.meta?.onDelete(brand.id)}
          >
            Delete
          </Button>
        </div>
      );
    },
  },
];