
import React from "react";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

interface ImageAnalysisProps {
  result: string | null;
  isAnalyzing: boolean;
}

const ImageAnalysis: React.FC<ImageAnalysisProps> = ({ result, isAnalyzing }) => {
  if (!result && !isAnalyzing) return null;

  return (
    <div className="w-full max-w-xl mx-auto mt-4 animate-slide-up">
      <Card className="glass overflow-hidden">
        <div className="p-5">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-medium">Analysis Results</h3>
            <div className="inline-block px-2 py-1 rounded-full bg-blue-100 text-xs font-medium text-blue-700">
              Ollama LLaVA
            </div>
          </div>
          <Separator className="my-2" />
          
          <div className="min-h-[100px] max-h-[400px] overflow-y-auto">
            {isAnalyzing ? (
              <div className="flex flex-col items-center justify-center py-8">
                <div className="w-8 h-8 border-t-2 border-blue-500 rounded-full animate-spin mb-3"></div>
                <p className="text-gray-500 text-sm">Analyzing image...</p>
              </div>
            ) : (
              <div className="prose prose-sm max-w-none">
                <p className="whitespace-pre-line">{result}</p>
              </div>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ImageAnalysis;
