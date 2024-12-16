"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { useAccessories } from "@/lib/hooks/useAccessories";
import { AccessoryDialog } from "./dialogs/AccessoryDialog";
import { columns } from "./columns/accessoriesColumns";

export function AccessoriesTab() {
  const [showDialog, setShowDialog] = useState(false);
  const [selectedAccessory, setSelectedAccessory] = useState(null);
  const { accessories, isLoading, refresh } = useAccessories();

  const handleEdit = (accessory) => {
    setSelectedAccessory(accessory);
    setShowDialog(true);
  };

  const handleClose = () => {
    setSelectedAccessory(null);
    setShowDialog(false);
    refresh();
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Accessories</h2>
        <Button onClick={() => setShowDialog(true)}>Add New Accessory</Button>
      </div>

      <DataTable
        columns={columns}
        data={accessories}
        isLoading={isLoading}
        onEdit={handleEdit}
      />

      <AccessoryDialog
        open={showDialog}
        onClose={handleClose}
        accessory={selectedAccessory}
      />
    </div>
  );
}