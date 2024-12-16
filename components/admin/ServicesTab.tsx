"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { useServices } from "@/lib/hooks/useServices";
import { ServiceDialog } from "./dialogs/ServiceDialog";
import { columns } from "./columns/servicesColumns";

export function ServicesTab() {
  const [showDialog, setShowDialog] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const { services, isLoading, refresh } = useServices();

  const handleEdit = (service) => {
    setSelectedService(service);
    setShowDialog(true);
  };

  const handleClose = () => {
    setSelectedService(null);
    setShowDialog(false);
    refresh();
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Services</h2>
        <Button onClick={() => setShowDialog(true)}>Add New Service</Button>
      </div>

      <DataTable
        columns={columns}
        data={services}
        isLoading={isLoading}
        onEdit={handleEdit}
      />

      <ServiceDialog
        open={showDialog}
        onClose={handleClose}
        service={selectedService}
      />
    </div>
  );
}