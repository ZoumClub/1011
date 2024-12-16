"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { useCarListings } from "@/lib/hooks/useCarListings";
import { CarListingDialog } from "./dialogs/CarListingDialog";
import { columns } from "./columns/carListingsColumns";

export function CarListingsTab() {
  const [showDialog, setShowDialog] = useState(false);
  const [selectedListing, setSelectedListing] = useState(null);
  const { listings, isLoading, refresh } = useCarListings();

  const handleEdit = (listing) => {
    setSelectedListing(listing);
    setShowDialog(true);
  };

  const handleClose = () => {
    setSelectedListing(null);
    setShowDialog(false);
    refresh();
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Car Listings</h2>
        <Button onClick={() => setShowDialog(true)}>Add New Listing</Button>
      </div>

      <DataTable
        columns={columns}
        data={listings}
        isLoading={isLoading}
        onEdit={handleEdit}
      />

      <CarListingDialog
        open={showDialog}
        onClose={handleClose}
        listing={selectedListing}
      />
    </div>
  );
}