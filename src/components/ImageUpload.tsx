
import React, { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Upload, ImageIcon } from "lucide-react";

interface ImageUploadProps {
  onImageUpload: (base64: string) => void;
  isAnalyzing: boolean;
  hasOllamaUrl: boolean;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  onImageUpload,
  isAnalyzing,
  hasOllamaUrl,
}) => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (file: File | null) => {
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      toast.error("Please upload an image file");
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image size should be less than 5MB");
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const base64 = e.target?.result as string;
      setPreviewUrl(base64);
      onImageUpload(base64);
    };
    reader.readAsDataURL(file);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileChange(e.dataTransfer.files[0]);
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="w-full max-w-xl mx-auto mb-6 animate-fade-in">
      <div
        className={`glass rounded-xl p-6 transition-all duration-300 ${
          isDragging ? "border-blue-400 bg-blue-50/50" : ""
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          accept="image/*"
          onChange={(e) => handleFileChange(e.target.files?.[0] || null)}
          disabled={isAnalyzing || !hasOllamaUrl}
        />

        {previewUrl ? (
          <div className="relative">
            <img
              src={previewUrl}
              alt="Preview"
              className="w-full h-64 object-contain rounded-lg shadow-sm image-fade-in"
            />
            <Button
              onClick={handleClick}
              disabled={isAnalyzing || !hasOllamaUrl}
              variant="outline"
              size="sm"
              className="absolute bottom-4 right-4 bg-white/80 backdrop-blur-sm hover:bg-white"
            >
              Change Image
            </Button>
          </div>
        ) : (
          <div
            onClick={handleClick}
            className={`cursor-pointer h-64 flex flex-col items-center justify-center text-center p-4 border-2 border-dashed rounded-lg ${
              !hasOllamaUrl
                ? "border-gray-300 text-gray-400"
                : "border-blue-200 text-blue-500 hover:border-blue-400 hover:text-blue-600"
            } transition-colors duration-300`}
          >
            {!hasOllamaUrl ? (
              <>
                <ImageIcon className="h-12 w-12 mb-4 text-gray-300" />
                <p className="text-gray-400">Please connect to Ollama first</p>
              </>
            ) : (
              <>
                <Upload className="h-12 w-12 mb-4" />
                <p className="text-lg font-medium mb-1">Upload an image</p>
                <p className="text-sm text-gray-500">
                  Drag & drop or click to browse
                </p>
                <p className="text-xs text-gray-400 mt-2">
                  Supported formats: JPG, PNG, GIF, BMP, WEBP
                </p>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageUpload;
