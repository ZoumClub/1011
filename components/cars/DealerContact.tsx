import { Button } from "@/components/ui/button";
import { Phone, MessageCircle } from "lucide-react";
import { Dealer } from "@/types/car";

interface DealerContactProps {
  dealer: Dealer;
}

export function DealerContact({ dealer }: DealerContactProps) {
  const handleCall = () => {
    window.location.href = `tel:${dealer.phone}`;
  };

  const handleWhatsApp = () => {
    window.location.href = `https://wa.me/${dealer.whatsapp}`;
  };

  return (
    <div className="border-t pt-4 mt-4">
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm font-medium text-muted-foreground">Listed by:</p>
        <p className="font-medium">{dealer.name}</p>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <Button 
          variant="outline" 
          onClick={handleCall}
          className="flex items-center gap-2"
        >
          <Phone className="h-4 w-4" />
          Call
        </Button>
        <Button 
          onClick={handleWhatsApp}
          className="flex items-center gap-2"
        >
          <MessageCircle className="h-4 w-4" />
          WhatsApp
        </Button>
      </div>
    </div>
  );
}