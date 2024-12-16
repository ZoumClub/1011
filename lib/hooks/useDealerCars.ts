"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase/client";
import { DealerCar } from "@/types/dealerCar";

export function useDealerCars() {
  const [cars, setCars] = useState<DealerCar[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchCars = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from("dealer_cars")
        .select(`
          *,
          dealer_car_media (*)
        `)
        .order("created_at", { ascending: false });

      if (error) throw error;
      setCars(data || []);
    } catch (error) {
      console.error("Error fetching dealer cars:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCars();
  }, []);

  return {
    cars,
    isLoading,
    refresh: fetchCars,
  };
}