"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { NewsArticle } from "@/types/news";
import { formatDate } from "@/lib/utils";

export const columns: ColumnDef<NewsArticle>[] = [
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "excerpt",
    header: "Excerpt",
    cell: ({ row }) => {
      const excerpt = row.getValue("excerpt") as string;
      return excerpt.length > 100 
        ? `${excerpt.slice(0, 100)}...` 
        : excerpt;
    },
  },
  {
    accessorKey: "published_at",
    header: "Published",
    cell: ({ row }) => formatDate(row.getValue("published_at")),
  },
  {
    id: "actions",
    cell: ({ row, table }) => {
      const article = row.original;
      return (
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => table.options.meta?.onEdit(article)}
          >
            Edit
          </Button>
          <Button 
            variant="destructive" 
            size="sm"
            onClick={() => table.options.meta?.onDelete(article.id)}
          >
            Delete
          </Button>
        </div>
      );
    },
  },
];