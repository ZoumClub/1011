"use client";

import { FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { FileInput } from "@/components/ui/file-input";
import { ImagePlus, VideoPlus, X } from "lucide-react";
import { useMediaUpload } from "@/lib/hooks/useMediaUpload";
import { UseFormReturn } from "react-hook-form";
import { CarFormData } from "@/types/sellCar";

interface MediaUploadProps {
  form: UseFormReturn<CarFormData>;
}

export function MediaUpload({ form }: MediaUploadProps) {
  const {
    imagePreviews,
    videoPreview,
    handleImageUpload,
    handleVideoUpload,
    removeImage,
    removeVideo,
  } = useMediaUpload(form);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Upload Media</h2>

      <FormField
        control={form.control}
        name="images"
        render={({ field: { onChange, value, ...field } }) => (
          <FormItem>
            <FormLabel>Car Images (Max 3, 5MB each)</FormLabel>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {imagePreviews.map((preview, index) => (
                <div key={index} className="relative aspect-video">
                  <img
                    src={preview}
                    alt={`Preview ${index + 1}`}
                    className="w-full h-full object-cover rounded-lg"
                  />
                  <Button
                    type="button"
                    variant="destructive"
                    size="icon"
                    className="absolute top-2 right-2"
                    onClick={() => removeImage(index)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              {imagePreviews.length < 3 && (
                <div className="aspect-video">
                  <label className="h-full border-2 border-dashed rounded-lg p-4 hover:bg-gray-50 cursor-pointer flex flex-col items-center justify-center">
                    <ImagePlus className="h-8 w-8 mb-2" />
                    <span className="text-sm">Add Image</span>
                    <FileInput
                      accept="image/*"
                      multiple
                      className="hidden"
                      onFileSelect={(files) => {
                        if (files) handleImageUpload({ target: { files } } as any);
                      }}
                      {...field}
                    />
                  </label>
                </div>
              )}
            </div>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="video"
        render={({ field: { onChange, value, ...field } }) => (
          <FormItem>
            <FormLabel>Car Video (Optional, max 100MB)</FormLabel>
            {videoPreview ? (
              <div className="relative aspect-video">
                <video
                  src={videoPreview}
                  controls
                  className="w-full h-full rounded-lg"
                />
                <Button
                  type="button"
                  variant="destructive"
                  size="icon"
                  className="absolute top-2 right-2"
                  onClick={removeVideo}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <div className="aspect-video">
                <label className="h-full border-2 border-dashed rounded-lg p-4 hover:bg-gray-50 cursor-pointer flex flex-col items-center justify-center">
                  <VideoPlus className="h-8 w-8 mb-2" />
                  <span className="text-sm">Add Video</span>
                  <FileInput
                    accept="video/*"
                    className="hidden"
                    onFileSelect={(files) => {
                      if (files) handleVideoUpload({ target: { files } } as any);
                    }}
                    {...field}
                  />
                </label>
              </div>
            )}
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}