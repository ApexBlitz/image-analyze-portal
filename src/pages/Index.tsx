import React, { useState } from "react";
import OllamaUrlInput from "@/components/OllamaUrlInput";
import OpenAITokenInput from "@/components/OpenAITokenInput";
import ImageUpload from "@/components/ImageUpload";
import ImageAnalysis from "@/components/ImageAnalysis";
import ModelSelector from "@/components/ModelSelector";
import { analyzeImage, checkModelAvailability } from "@/lib/api";
import { toast } from "sonner";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertTriangle } from "lucide-react";
import Header from "@/components/Header";
import Features from "@/components/Features";
import HowItWorks from "@/components/HowItWorks";
import ImageMetadata from "@/components/ImageMetadata";
import AcceptedFormats from "@/components/AcceptedFormats";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useLanguage } from "@/context/LanguageContext";

const Index = () => {
  const { t } = useLanguage();
  const [ollamaUrl, setOllamaUrl] = useState<string | null>(null);
  const [openaiToken, setOpenaiToken] = useState<string | null>(null);
  const [imageBase64, setImageBase64] = useState<string | null>(null);
  const [analysisResult, setAnalysisResult] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [selectedModel, setSelectedModel] = useState<string>("llava");
  const [error, setError] = useState<string | null>(null);
  const [modelProvider, setModelProvider] = useState<"ollama" | "openai">("ollama");
  const [activeTab, setActiveTab] = useState<string>("welcome");

  const handleOllamaUrlSubmit = async (url: string) => {
    setOllamaUrl(url);
    setError(null);
    setModelProvider("ollama");
    
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

  const handleOpenAITokenSubmit = (token: string) => {
    setOpenaiToken(token);
    setError(null);
    setModelProvider("openai");
    setSelectedModel("gpt-4o");
    toast.success("Token OpenAI enregistré!");
  };

  const handleModelChange = async (modelId: string, provider: "ollama" | "openai") => {
    setSelectedModel(modelId);
    setModelProvider(provider);
    setError(null);
    
    if (provider === "ollama" && ollamaUrl) {
      const isAvailable = await checkModelAvailability(ollamaUrl, modelId);
      if (!isAvailable) {
        setError(`Le modèle "${modelId}" ne semble pas être installé sur votre serveur Ollama. Utilisez la commande "ollama pull ${modelId}" pour l'installer.`);
        toast.warning(`Modèle ${modelId} possiblement non installé`);
      } else {
        toast.success(`Modèle changé pour ${modelId}`);
      }
    } else if (provider === "openai") {
      if (!openaiToken) {
        setError("Veuillez d'abord configurer votre token API OpenAI");
        return;
      }
      toast.success(`Modèle changé pour ${modelId}`);
    }
  };

  const handleImageUpload = async (base64: string) => {
    setImageBase64(base64);
    setAnalysisResult(null);
    setError(null);
    
    if (modelProvider === "ollama" && !ollamaUrl) {
      toast.error(t("errors.configureOllamaFirst"));
      return;
    }

    if (modelProvider === "openai" && !openaiToken) {
      toast.error(t("errors.configureOpenAIFirst"));
      return;
    }

    try {
      setIsAnalyzing(true);
      let result;
      
      if (modelProvider === "ollama") {
        result = await analyzeImage(base64, ollamaUrl as string, selectedModel, "ollama");
      } else {
        result = await analyzeImage(base64, openaiToken as string, selectedModel, "openai");
      }
      
      setAnalysisResult(result);
      toast.success(t("success.analysisComplete"));
    } catch (error) {
      console.error("Analysis error:", error);
      const errorMessage = error instanceof Error ? error.message : String(error);
      
      if (modelProvider === "ollama") {
        if (errorMessage.includes("Failed to fetch") || errorMessage.includes("NetworkError")) {
          setError(`${t("errors.ollamaConnectionFailed")} ${ollamaUrl}`);
        } else if (errorMessage.includes("model not found")) {
          const translatedError = t("errors.modelNotInstalled").replace("{{model}}", selectedModel);
          setError(translatedError);
        } else {
          setError(`${t("errors.analysisError")}: ${errorMessage}`);
        }
      } else {
        if (errorMessage.includes("401")) {
          setError(t("errors.invalidOpenAIToken"));
        } else if (errorMessage.includes("429")) {
          setError(t("errors.openAIRateLimit"));
        } else {
          setError(`${t("errors.analysisError")}: ${errorMessage}`);
        }
      }
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <main className="min-h-screen flex flex-col items-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-gray-100 -z-10"></div>
      
      <div className="w-full max-w-5xl px-6 py-8 flex flex-col items-center">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="mb-8 grid w-full max-w-md mx-auto grid-cols-3">
            <TabsTrigger value="welcome" data-value="welcome">{t("tabs.welcome")}</TabsTrigger>
            <TabsTrigger value="analyze" data-value="analyze">{t("tabs.analyze")}</TabsTrigger>
            <TabsTrigger value="how" data-value="how">{t("tabs.howItWorks")}</TabsTrigger>
          </TabsList>
          
          <TabsContent value="welcome" className="pb-12">
            <Header />
            <Features />
          </TabsContent>
          
          <TabsContent value="analyze">
            <div className="w-full">
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm p-6 mb-8">
                <div className="flex flex-col md:flex-row gap-6 items-start">
                  <div className="flex-1">
                    <h3 className="text-lg font-medium mb-3">{t("ollamaSection.title")}</h3>
                    <OllamaUrlInput 
                      onUrlSubmit={handleOllamaUrlSubmit} 
                      isAnalyzing={isAnalyzing} 
                    />
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="text-lg font-medium mb-3">{t("openaiSection.title")}</h3>
                    <OpenAITokenInput
                      onTokenSubmit={handleOpenAITokenSubmit}
                      isAnalyzing={isAnalyzing}
                    />
                  </div>
                </div>
                
                <div className="mt-6">
                  <h3 className="text-lg font-medium mb-3">{t("modelSection.title")}</h3>
                  <ModelSelector
                    selectedModel={selectedModel}
                    onModelChange={handleModelChange}
                    isAnalyzing={isAnalyzing}
                    modelProvider={modelProvider}
                    hasOllamaUrl={!!ollamaUrl}
                    hasOpenAIToken={!!openaiToken}
                  />
                </div>
                
                {error && (
                  <Alert variant="destructive" className="my-4 max-w-xl w-full">
                    <AlertTriangle className="h-4 w-4 mr-2" />
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}
              </div>
              
              <AcceptedFormats />
              
              <ImageUpload 
                onImageUpload={handleImageUpload} 
                isAnalyzing={isAnalyzing}
                hasOllamaUrl={!!ollamaUrl || !!openaiToken}
              />
              
              <ImageMetadata imageBase64={imageBase64} />
              
              <ImageAnalysis 
                result={analysisResult} 
                isAnalyzing={isAnalyzing}
                imageBase64={imageBase64}
                ollamaUrl={ollamaUrl}
                selectedModel={selectedModel}
                modelProvider={modelProvider}
              />
            </div>
          </TabsContent>
          
          <TabsContent value="how">
            <HowItWorks />
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
};

export default Index;
