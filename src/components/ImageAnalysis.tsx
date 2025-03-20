
import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Bot, Search, MessageSquareText, BrainCircuit } from "lucide-react";
import { searchImageOnWeb } from "@/lib/api";
import { toast } from "sonner";
import ImageQuestions from "./ImageQuestions";

interface ImageAnalysisProps {
  result: string | null;
  isAnalyzing: boolean;
  imageBase64: string | null;
  ollamaUrl: string | null;
  selectedModel: string;
  modelProvider?: "ollama" | "openai";
}

const ImageAnalysis: React.FC<ImageAnalysisProps> = ({
  result,
  isAnalyzing,
  imageBase64,
  ollamaUrl,
  selectedModel,
  modelProvider = "ollama"
}) => {
  const [activeTab, setActiveTab] = useState<string>("analysis");
  const [webResults, setWebResults] = useState<string | null>(null);
  const [isSearching, setIsSearching] = useState<boolean>(false);

  if (!imageBase64) return null;

  const handleWebSearch = async () => {
    if (!ollamaUrl || !imageBase64) return;

    setIsSearching(true);
    try {
      const results = await searchImageOnWeb(imageBase64, ollamaUrl, "deepseek-r1");
      setWebResults(results);
      setActiveTab("web");
      toast.success("Recherche web terminée!");
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      toast.error(`Erreur lors de la recherche: ${errorMessage}`);
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <div className="w-full max-w-xl mx-auto mt-8 animate-fade-in">
      <Card className="glass overflow-hidden border-none shadow-md bg-white/90">
        <div className="p-5">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-medium flex items-center gap-2">
              {modelProvider === "ollama" ? (
                <Bot className="h-5 w-5 text-blue-500" />
              ) : (
                <BrainCircuit className="h-5 w-5 text-green-500" />
              )}
              Analyse d'image
            </h3>
            <div className="inline-block px-2 py-1 rounded-full bg-blue-100 text-xs font-medium text-blue-700">
              {modelProvider === "ollama" ? "Ollama" : "OpenAI"}: {selectedModel}
            </div>
          </div>
          <Separator className="my-2" />

          {isAnalyzing && (
            <div className="flex flex-col items-center justify-center py-12">
              <div className="w-10 h-10 border-t-2 border-blue-500 rounded-full animate-spin mb-4"></div>
              <p className="text-gray-500">Analyse d'image en cours...</p>
              <p className="text-xs text-gray-400 mt-2">
                {modelProvider === "ollama" 
                  ? "Le temps d'analyse dépend de la puissance de votre machine" 
                  : "Analyse via l'API OpenAI en cours"}
              </p>
            </div>
          )}

          {!isAnalyzing && result && (
            <>
              <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-4">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="analysis" className="flex items-center gap-1">
                    <Bot className="h-3 w-3" />
                    <span>Analyse</span>
                  </TabsTrigger>
                  <TabsTrigger 
                    value="web" 
                    className="flex items-center gap-1"
                    disabled={!webResults && !isSearching}
                  >
                    <Search className="h-3 w-3" />
                    <span>Recherche</span>
                  </TabsTrigger>
                  <TabsTrigger value="questions" className="flex items-center gap-1">
                    <MessageSquareText className="h-3 w-3" />
                    <span>Questions</span>
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="analysis" className="pt-4">
                  <div className="whitespace-pre-line">{result}</div>
                  
                  {!webResults && !isSearching && modelProvider === "ollama" && (
                    <div className="mt-6">
                      <Button 
                        onClick={handleWebSearch} 
                        className="w-full bg-blue-50 text-blue-600 hover:bg-blue-100"
                        variant="outline"
                      >
                        <Search className="h-4 w-4 mr-2" />
                        Rechercher sur le web
                      </Button>
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="web" className="pt-4">
                  {isSearching ? (
                    <div className="flex flex-col items-center justify-center py-12">
                      <div className="w-8 h-8 border-t-2 border-blue-500 rounded-full animate-spin mb-3"></div>
                      <p className="text-gray-500">Recherche d'informations...</p>
                    </div>
                  ) : (
                    <div className="whitespace-pre-line">
                      {webResults || "Aucun résultat"}
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="questions" className="pt-4">
                  <ImageQuestions 
                    imageBase64={imageBase64}
                    ollamaUrl={ollamaUrl}
                    selectedModel={selectedModel}
                    isVisible={activeTab === "questions"}
                  />
                </TabsContent>
              </Tabs>
            </>
          )}

          {!isAnalyzing && !result && (
            <div className="flex flex-col items-center justify-center py-12 text-gray-400">
              <p>En attente d'analyse...</p>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};

export default ImageAnalysis;
