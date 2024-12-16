import { Card } from "@/components/ui/card";
import { CarSpecs } from "@/types/car";
import { 
  Gauge, 
  Fuel, 
  Calendar, 
  Settings
} from "lucide-react";

interface CarSpecsProps {
  specs: CarSpecs;
}

export function CarSpecs({ specs }: CarSpecsProps) {
  const specItems = [
    { icon: <Gauge className="h-5 w-5" />, label: "Mileage", value: `${specs.mileage} km` },
    { icon: <Settings className="h-5 w-5" />, label: "Transmission", value: specs.transmission },
    { icon: <Fuel className="h-5 w-5" />, label: "Fuel Type", value: specs.fuelType },
    { icon: <Calendar className="h-5 w-5" />, label: "Year", value: specs.year },
  ];

  return (
    <div>
      <h3 className="text-lg font-semibold mb-4">Specifications</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {specItems.map((item) => (
          <Card key={item.label} className="p-4">
            <div className="flex items-center gap-3">
              <div className="text-primary">{item.icon}</div>
              <div>
                <p className="text-sm text-muted-foreground">{item.label}</p>
                <p className="font-medium">{item.value}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}