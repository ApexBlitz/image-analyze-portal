
import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Info, FileCheck } from "lucide-react";

const AcceptedFormats: React.FC = () => {
  const { t } = useLanguage();
  
  const formats = [
    { id: "jpg", name: "JPEG/JPG", maxSize: "5MB", description: t("imageFormats.jpeg") },
    { id: "png", name: "PNG", maxSize: "5MB", description: t("imageFormats.png") },
    { id: "gif", name: "GIF", maxSize: "5MB", description: t("imageFormats.gif") },
    { id: "webp", name: "WEBP", maxSize: "5MB", description: t("imageFormats.webp") },
    { id: "bmp", name: "BMP", maxSize: "5MB", description: t("imageFormats.bmp") }
  ];

  return (
    <Card className="w-full max-w-xl mx-auto mb-6 bg-white/80 backdrop-blur-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-md font-medium flex items-center gap-2">
          <FileCheck className="h-4 w-4 text-green-500" />
          {t("imageFormats.title")}
        </CardTitle>
      </CardHeader>
      <Separator className="mb-4" />
      <CardContent>
        <div className="grid grid-cols-1 gap-3">
          {formats.map((format) => (
            <div key={format.id} className="flex items-start">
              <Badge className="mr-2 bg-blue-100 text-blue-800 hover:bg-blue-100 cursor-default">
                {format.name}
              </Badge>
              <span className="text-sm text-gray-600">{format.description}</span>
              <Badge variant="outline" className="ml-auto text-xs">
                {format.maxSize}
              </Badge>
            </div>
          ))}
        </div>
        <div className="mt-4 text-xs text-gray-500 flex items-center">
          <Info className="h-3 w-3 mr-1" />
          {t("imageFormats.note")}
        </div>
      </CardContent>
    </Card>
  );
};

export default AcceptedFormats;
