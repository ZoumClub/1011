"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ContactInfo } from "./sell-car/ContactInfo";
import { CarInfo } from "./sell-car/CarInfo";
import { TechnicalSpecs } from "./sell-car/TechnicalSpecs";
import { FeaturesSection } from "./sell-car/FeaturesSection";
import { MediaUpload } from "./sell-car/MediaUpload";
import { submitCarListing } from "@/lib/supabase/api";
import { toast } from "sonner";
import { FORM_TABS, FormTab } from "@/lib/constants/formTabs";
import { sellCarSchema, type SellCarFormData } from "@/lib/validations/sellCar";

const defaultValues: Partial<SellCarFormData> = {
  name: "",
  pinCode: "",
  brand: "",
  model: "",
  year: new Date().getFullYear(),
  price: 0,
  mileage: "",
  previousOwners: 0,
  fuelType: undefined,
  transmission: undefined,
  bodyType: undefined,
  exteriorColor: undefined,
  interiorColor: undefined,
  features: [],
  images: [],
};

// Validation rules for each tab
const tabValidationFields: Record<FormTab, (keyof SellCarFormData)[]> = {
  contact: ["name", "pinCode"],
  car: ["brand", "model", "year", "price", "mileage", "previousOwners"],
  specs: ["fuelType", "transmission", "bodyType", "exteriorColor", "interiorColor"],
  features: ["features"],
  media: ["images"],
};

export function SellCarForm() {
  const [currentTab, setCurrentTab] = useState<FormTab>("contact");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  
  const form = useForm<SellCarFormData>({
    resolver: zodResolver(sellCarSchema),
    defaultValues,
    mode: "onChange",
  });

  const onSubmit = async (data: SellCarFormData) => {
    try {
      setIsSubmitting(true);
      const result = await submitCarListing(data);
      
      if (result.success) {
        toast.success("Car listing submitted successfully!");
        router.push("/dashboard");
      } else {
        throw new Error(result.error?.message || "Failed to submit car listing");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Failed to submit car listing. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const currentTabIndex = FORM_TABS.findIndex(tab => tab.id === currentTab);
  const isLastTab = currentTabIndex === FORM_TABS.length - 1;
  const isFirstTab = currentTabIndex === 0;

  const validateTabFields = async (tabId: FormTab) => {
    const fields = tabValidationFields[tabId];
    const result = await form.trigger(fields);
    return result;
  };

  const handleNext = async () => {
    const isValid = await validateTabFields(currentTab);
    
    if (isValid && !isLastTab) {
      setCurrentTab(FORM_TABS[currentTabIndex + 1].id);
    }
  };

  const handleTabChange = async (tab: string) => {
    // Only validate when moving forward
    const newTabIndex = FORM_TABS.findIndex(t => t.id === tab);
    if (newTabIndex > currentTabIndex) {
      const isValid = await validateTabFields(currentTab);
      if (!isValid) return;
    }
    setCurrentTab(tab as FormTab);
  };

  return (
    <Card className="max-w-4xl mx-auto p-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <Tabs value={currentTab} onValueChange={handleTabChange}>
            <TabsList className="grid grid-cols-5 w-full">
              {FORM_TABS.map((tab) => (
                <TabsTrigger key={tab.id} value={tab.id}>
                  {tab.label}
                </TabsTrigger>
              ))}
            </TabsList>

            <TabsContent value="contact">
              <ContactInfo form={form} />
            </TabsContent>

            <TabsContent value="car">
              <CarInfo form={form} />
            </TabsContent>

            <TabsContent value="specs">
              <TechnicalSpecs form={form} />
            </TabsContent>

            <TabsContent value="features">
              <FeaturesSection form={form} />
            </TabsContent>

            <TabsContent value="media">
              <MediaUpload form={form} />
            </TabsContent>
          </Tabs>
          
          <div className="flex justify-between">
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                if (!isFirstTab) {
                  setCurrentTab(FORM_TABS[currentTabIndex - 1].id);
                }
              }}
              disabled={isFirstTab || isSubmitting}
            >
              Previous
            </Button>

            {isLastTab ? (
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Submitting..." : "Submit"}
              </Button>
            ) : (
              <Button
                type="button"
                onClick={handleNext}
                disabled={isSubmitting}
              >
                Next
              </Button>
            )}
          </div>
        </form>
      </Form>
    </Card>
  );
}