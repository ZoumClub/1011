"use client";

import { useState } from "react";
import dynamic from 'next/dynamic';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PriceTag } from "./PriceTag";
import { DealerContact } from "./DealerContact";
import { Car } from "@/types/car";

// Lazy load the dialog component
const CarDialog = dynamic(() => import('./CarDialog').then(mod => mod.CarDialog), {
  loading: () => <div className="fixed inset-0 bg-black/20" />
});

interface CarCardProps {
  car: Car;
}

export function CarCard({ car }: CarCardProps) {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <>
      <Card className="overflow-hidden">
        <CardContent className="p-0">
          <img 
            src={car.images[0]} 
            alt={car.name}
            className="w-full h-48 object-cover"
            loading="lazy"
          />
          <div className="p-6">
            <Badge className="mb-2">{car.type}</Badge>
            <h3 className="text-xl font-semibold mb-2">{car.name}</h3>
            <PriceTag price={car.price} savings={car.savings} />
          </div>
        </CardContent>
        <CardFooter className="flex flex-col p-6 pt-0">
          <Button 
            className="w-full mb-4"
            onClick={() => setShowDetails(true)}
          >
            View Details
          </Button>
          <DealerContact dealer={car.dealer} />
        </CardFooter>
      </Card>

      {showDetails && (
        <CarDialog
          car={car}
          open={showDetails}
          onClose={() => setShowDetails(false)}
        />
      )}
    </>
  );
}