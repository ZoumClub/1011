interface PriceTagProps {
  price: string;
  savings?: string;
}

export function PriceTag({ price, savings }: PriceTagProps) {
  return (
    <div className="space-y-1">
      <div className="flex items-baseline gap-2">
        <p className="text-2xl font-bold text-primary">${price}</p>
        {savings && (
          <p className="text-sm font-medium text-green-600">
            Save ${savings}
          </p>
        )}
      </div>
      {savings && (
        <p className="text-sm text-muted-foreground line-through">
          ${parseInt(price.replace(/,/g, "")) + parseInt(savings.replace(/,/g, ""))},000
        </p>
      )}
    </div>
  );
}