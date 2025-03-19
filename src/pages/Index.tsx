import React, { useState } from "react";
import Header from "@/components/Header";
import OllamaUrlInput from "@/components/OllamaUrlInput";
import ImageUpload from "@/components/ImageUpload";
import ImageAnalysis from "@/components/ImageAnalysis";
import ModelSelector from "@/components/ModelSelector";
import HowItWorks from "@/components/HowItWorks";
import Features from "@/components/Features";
import InstallationGuide from "@/components/InstallationGuide";
import { analyzeImage, checkModelAvailability } from "@/lib/api";
import { toast } from "sonner";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertTriangle, Zap } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Index = () => {
  const [ollamaUrl, setOllamaUrl] = useState<string | null>(null);
  const [imageBase64, setImageBase64] = useState<string | null>(null);
  const [analysisResult, setAnalysisResult] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [selectedModel, setSelectedModel] = useState<string>("llava");
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<string>("analyze");

  const handleOllamaUrlSubmit = async (url: string) => {
    setOllamaUrl(url);
    setError(null);
    
    try {
      const testResponse = await fetch(`${url}/api/tags`);
      if (!testResponse.ok) {
        throw new Error(`Impossible de se connecter au serveur Ollama: ${testResponse.statusText}`);
      }
      toast.success("Connexion à Ollama réussie!");
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      toast.error(`Erreur de connexion: ${errorMessage}`);
      setError(`Problème de connexion à Ollama. Vérifiez que le serveur est bien lancé à l'adresse ${url}`);
    }
  };

  const handleModelChange = async (modelId: string) => {
    setSelectedModel(modelId);
    setError(null);
    
    if (ollamaUrl) {
      const isAvailable = await checkModelAvailability(ollamaUrl, modelId);
      if (!isAvailable) {
        setError(`Le modèle "${modelId}" ne semble pas être installé sur votre serveur Ollama. Utilisez la commande "ollama pull ${modelId}" pour l'installer.`);
        toast.warning(`Modèle ${modelId} possiblement non installé`);
      } else {
        toast.success(`Modèle changé pour ${modelId}`);
      }
    }
  };

  const handleImageUpload = async (base64: string) => {
    setImageBase64(base64);
    setAnalysisResult(null);
    setError(null);
    
    if (!ollamaUrl) {
      toast.error("Veuillez d'abord configurer l'URL d'Ollama");
      return;
    }

    try {
      setIsAnalyzing(true);
      const result = await analyzeImage(base64, ollamaUrl, selectedModel);
      setAnalysisResult(result);
      toast.success("Analyse d'image terminée!");
    } catch (error) {
      console.error("Analysis error:", error);
      const errorMessage = error instanceof Error ? error.message : String(error);
      
      if (errorMessage.includes("Failed to fetch") || errorMessage.includes("NetworkError")) {
        setError(`Impossible de se connecter au serveur Ollama. Vérifiez que le serveur est bien lancé à l'adresse ${ollamaUrl}`);
      } else if (errorMessage.includes("model not found")) {
        setError(`Le modèle "${selectedModel}" n'est pas installé. Utilisez la commande "ollama pull ${selectedModel}" dans votre terminal pour l'installer.`);
      } else {
        setError(`Erreur lors de l'analyse: ${errorMessage}`);
      }
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <main className="min-h-screen flex flex-col items-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-gray-100 -z-10"></div>
      
      <div className="w-full max-w-5xl px-6 py-8 flex flex-col items-center">
        <Header />
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full mt-8">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-4">
            <TabsTrigger value="analyze" className="rounded-md">Analyse d'image</TabsTrigger>
            <TabsTrigger value="installation" className="rounded-md">Installation</TabsTrigger>
            <TabsTrigger value="howItWorks" className="rounded-md">Comment ça marche</TabsTrigger>
            <TabsTrigger value="features" className="rounded-md">Fonctionnalités</TabsTrigger>
          </TabsList>
          
          <TabsContent value="analyze" className="w-full pt-6">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm p-6 mb-8">
              <div className="flex flex-col md:flex-row gap-6 items-start">
                <OllamaUrlInput 
                  onUrlSubmit={handleOllamaUrlSubmit} 
                  isAnalyzing={isAnalyzing} 
                />
                
                <ModelSelector
                  selectedModel={selectedModel}
                  onModelChange={handleModelChange}
                  isAnalyzing={isAnalyzing}
                />
              </div>
              
              {error && (
                <Alert variant="destructive" className="my-4 max-w-xl w-full">
                  <AlertTriangle className="h-4 w-4 mr-2" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
            </div>
            
            <ImageUpload 
              onImageUpload={handleImageUpload} 
              isAnalyzing={isAnalyzing}
              hasOllamaUrl={!!ollamaUrl}
            />
            
            <ImageAnalysis 
              result={analysisResult} 
              isAnalyzing={isAnalyzing}
              imageBase64={imageBase64}
              ollamaUrl={ollamaUrl}
              selectedModel={selectedModel}
            />
          </TabsContent>
          
          <TabsContent value="installation" className="pt-6">
            <InstallationGuide />
          </TabsContent>
          
          <TabsContent value="howItWorks" className="pt-6">
            <HowItWorks />
          </TabsContent>
          
          <TabsContent value="features" className="pt-6">
            <Features />
          </TabsContent>
        </Tabs>
      </div>
      
      <footer className="w-full mt-auto py-10 bg-white/50 backdrop-blur-sm border-t border-gray-200">
        <div className="max-w-5xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center">
              <Zap className="h-5 w-5 text-blue-500 mr-2" />
              <span className="font-medium">Vision Insight</span>
            </div>
            <p className="text-gray-500 text-sm">
              Analyse d'images intelligente propulsée par Ollama
            </p>
            <div className="text-xs text-gray-400">
              {selectedModel && ollamaUrl ? `Connecté à ${selectedModel}` : "Non connecté"}
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
};

export default Index;
