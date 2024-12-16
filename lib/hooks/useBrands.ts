"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase/client";
import { Brand } from "@/types/brand";

export function useBrands() {
  const [brands, setBrands] = useState<Brand[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchBrands = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from("brands")
        .select("*")
        .eq("is_active", true)
        .order("order_index");

      if (error) throw error;
      setBrands(data || []);
    } catch (error) {
      console.error("Error fetching brands:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBrands();
  }, []);

  return {
    brands,
    isLoading,
    refresh: fetchBrands,
  };
}