
import React, { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Info, FileType, Image as ImageIcon, Calendar, Layers } from "lucide-react";

interface ImageMetadataProps {
  imageBase64: string | null;
}

interface Metadata {
  format: string;
  size: string;
  dimensions: string;
  lastModified?: string;
  name?: string;
  type?: string;
}

const ImageMetadata: React.FC<ImageMetadataProps> = ({ imageBase64 }) => {
  const { t } = useLanguage();
  const [metadata, setMetadata] = useState<Metadata | null>(null);
  
  React.useEffect(() => {
    if (imageBase64) {
      const extractMetadata = async () => {
        try {
          // Create an image element to get dimensions
          const img = new Image();
          img.onload = () => {
            // Basic metadata extraction
            const format = imageBase64.split(';')[0].split('/')[1];
            
            // Calculate approximate size from base64
            const base64Length = imageBase64.length - (imageBase64.indexOf(',') + 1);
            const sizeInBytes = (base64Length * 3) / 4;
            const sizeInKB = Math.round(sizeInBytes / 1024);
            
            setMetadata({
              format: format.toUpperCase(),
              dimensions: `${img.width} × ${img.height}`,
              size: `${sizeInKB} KB`,
            });
          };
          img.src = imageBase64;
        } catch (error) {
          console.error("Error extracting metadata:", error);
        }
      };

      extractMetadata();
    } else {
      setMetadata(null);
    }
  }, [imageBase64]);

  // If no image is uploaded, don't render this component
  if (!imageBase64 || !metadata) return null;

  return (
    <Card className="w-full max-w-xl mx-auto mt-4 mb-6 bg-white/80 backdrop-blur-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-md font-medium flex items-center gap-2">
          <Info className="h-4 w-4 text-blue-500" />
          {t("imageMetadata.title")}
        </CardTitle>
      </CardHeader>
      <Separator className="mb-4" />
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center gap-2">
            <FileType className="h-4 w-4 text-gray-500" />
            <span className="text-sm font-medium text-gray-700">{t("imageMetadata.format")}:</span>
            <Badge variant="outline" className="ml-auto">
              {metadata.format}
            </Badge>
          </div>
          
          <div className="flex items-center gap-2">
            <Layers className="h-4 w-4 text-gray-500" />
            <span className="text-sm font-medium text-gray-700">{t("imageMetadata.size")}:</span>
            <Badge variant="outline" className="ml-auto">
              {metadata.size}
            </Badge>
          </div>
          
          <div className="flex items-center gap-2 col-span-2">
            <ImageIcon className="h-4 w-4 text-gray-500" />
            <span className="text-sm font-medium text-gray-700">{t("imageMetadata.dimensions")}:</span>
            <Badge variant="outline" className="ml-auto">
              {metadata.dimensions}
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ImageMetadata;
