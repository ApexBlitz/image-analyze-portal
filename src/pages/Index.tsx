
import React, { useState } from "react";
import Header from "@/components/Header";
import OllamaUrlInput from "@/components/OllamaUrlInput";
import ImageUpload from "@/components/ImageUpload";
import ImageAnalysis from "@/components/ImageAnalysis";
import ModelSelector from "@/components/ModelSelector";
import { analyzeImage } from "@/lib/api";
import { toast } from "sonner";

const Index = () => {
  const [ollamaUrl, setOllamaUrl] = useState<string | null>(null);
  const [imageBase64, setImageBase64] = useState<string | null>(null);
  const [analysisResult, setAnalysisResult] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [selectedModel, setSelectedModel] = useState<string>("llava");

  const handleOllamaUrlSubmit = (url: string) => {
    setOllamaUrl(url);
    toast.success("Ollama URL set successfully!");
  };

  const handleModelChange = (modelId: string) => {
    setSelectedModel(modelId);
    toast.success(`Modèle changé pour ${modelId}`);
  };

  const handleImageUpload = async (base64: string) => {
    setImageBase64(base64);
    setAnalysisResult(null);
    
    if (!ollamaUrl) {
      toast.error("Please set Ollama URL first");
      return;
    }

    try {
      setIsAnalyzing(true);
      const result = await analyzeImage(base64, ollamaUrl, selectedModel);
      setAnalysisResult(result);
      toast.success("Image analysis complete!");
    } catch (error) {
      console.error("Analysis error:", error);
      // Toast is already shown in the API function
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <main className="min-h-screen flex flex-col items-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-gray-100 -z-10"></div>
      
      <div className="w-full max-w-4xl px-6 py-8 flex flex-col items-center">
        <Header />
        
        <OllamaUrlInput 
          onUrlSubmit={handleOllamaUrlSubmit} 
          isAnalyzing={isAnalyzing} 
        />
        
        <ModelSelector
          selectedModel={selectedModel}
          onModelChange={handleModelChange}
          isAnalyzing={isAnalyzing}
        />
        
        <ImageUpload 
          onImageUpload={handleImageUpload} 
          isAnalyzing={isAnalyzing}
          hasOllamaUrl={!!ollamaUrl}
        />
        
        <ImageAnalysis 
          result={analysisResult} 
          isAnalyzing={isAnalyzing} 
        />
      </div>
      
      <footer className="w-full mt-auto py-6 text-center text-gray-500 text-sm">
        <p>Image analysis powered by Ollama with {selectedModel}</p>
      </footer>
    </main>
  );
};

export default Index;
