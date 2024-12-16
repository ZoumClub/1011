import { SellCarForm } from "@/components/forms/SellCarForm";

export default function SellPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-8">Sell Your Car</h1>
        <SellCarForm />
      </div>
    </div>
  );
}