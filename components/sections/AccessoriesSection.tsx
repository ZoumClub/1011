"use client";

import { useAccessories } from "@/lib/hooks/useAccessories";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/utils";

export default function AccessoriesSection() {
  const { accessories, isLoading } = useAccessories();

  if (isLoading) {
    return (
      <section className="py-20">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">Car Accessories</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-[400px] bg-gray-100 animate-pulse rounded-lg" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (!accessories.length) {
    return null;
  }

  return (
    <section className="py-20">
      <div className="container mx-auto">
        <h2 className="text-4xl font-bold text-center mb-12">Car Accessories</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {accessories.map((accessory) => (
            <Card key={accessory.id} className="overflow-hidden">
              <CardContent className="p-0">
                <img 
                  src={accessory.image_url} 
                  alt={accessory.name}
                  className="w-full h-48 object-cover"
                  loading="lazy"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{accessory.name}</h3>
                  <p className="text-muted-foreground mb-4">{accessory.description}</p>
                  <p className="text-2xl font-bold text-primary">
                    {formatPrice(accessory.price)}
                  </p>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Add to Cart</Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}