"use client";

import { useState, useCallback, useEffect } from "react";
import { UseFormReturn } from "react-hook-form";
import { CarFormData } from "@/types/sellCar";

export function useMediaUpload(form: UseFormReturn<CarFormData>) {
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [videoPreview, setVideoPreview] = useState<string | null>(null);

  useEffect(() => {
    return () => {
      // Cleanup previews when component unmounts
      imagePreviews.forEach(preview => URL.revokeObjectURL(preview));
      if (videoPreview) URL.revokeObjectURL(videoPreview);
    };
  }, [imagePreviews, videoPreview]);

  const handleImageUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const totalFiles = files.length + imagePreviews.length;
    
    if (totalFiles > 3) {
      alert("Maximum 3 images allowed");
      return;
    }

    // Validate file sizes
    const invalidFiles = files.filter(file => file.size > 5 * 1024 * 1024);
    if (invalidFiles.length > 0) {
      alert("Each image must be less than 5MB");
      return;
    }

    const previews = files.map(file => URL.createObjectURL(file));
    setImagePreviews(prev => [...prev, ...previews]);

    const currentFiles = form.getValues("images") || [];
    form.setValue("images", [...currentFiles, ...files], { shouldValidate: true });
  }, [form, imagePreviews.length]);

  const handleVideoUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 100 * 1024 * 1024) {
      alert("Video must be less than 100MB");
      return;
    }

    if (videoPreview) {
      URL.revokeObjectURL(videoPreview);
    }

    const preview = URL.createObjectURL(file);
    setVideoPreview(preview);
    form.setValue("video", file, { shouldValidate: true });
  }, [form, videoPreview]);

  const removeImage = useCallback((index: number) => {
    URL.revokeObjectURL(imagePreviews[index]);
    
    const newPreviews = imagePreviews.filter((_, i) => i !== index);
    setImagePreviews(newPreviews);
    
    const currentFiles = form.getValues("images");
    const newFiles = currentFiles.filter((_, i) => i !== index);
    form.setValue("images", newFiles, { shouldValidate: true });
  }, [form, imagePreviews]);

  const removeVideo = useCallback(() => {
    if (videoPreview) {
      URL.revokeObjectURL(videoPreview);
    }
    setVideoPreview(null);
    form.setValue("video", undefined, { shouldValidate: true });
  }, [form, videoPreview]);

  return {
    imagePreviews,
    videoPreview,
    handleImageUpload,
    handleVideoUpload,
    removeImage,
    removeVideo,
  };
}