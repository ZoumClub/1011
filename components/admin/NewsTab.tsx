"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { useNews } from "@/lib/hooks/useNews";
import { NewsDialog } from "./dialogs/NewsDialog";
import { columns } from "./columns/newsColumns";

export function NewsTab() {
  const [showDialog, setShowDialog] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const { articles, isLoading, refresh } = useNews();

  const handleEdit = (article) => {
    setSelectedArticle(article);
    setShowDialog(true);
  };

  const handleClose = () => {
    setSelectedArticle(null);
    setShowDialog(false);
    refresh();
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">News Articles</h2>
        <Button onClick={() => setShowDialog(true)}>Add New Article</Button>
      </div>

      <DataTable
        columns={columns}
        data={articles}
        isLoading={isLoading}
        onEdit={handleEdit}
      />

      <NewsDialog
        open={showDialog}
        onClose={handleClose}
        article={selectedArticle}
      />
    </div>
  );
}