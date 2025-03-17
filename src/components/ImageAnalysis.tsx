
import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Search, Loader2 } from "lucide-react";
import { searchImageOnWeb } from "@/lib/api";
import { toast } from "sonner";

interface ImageAnalysisProps {
  result: string | null;
  isAnalyzing: boolean;
  imageBase64: string | null;
  ollamaUrl: string | null;
  selectedModel: string;
}

const ImageAnalysis: React.FC<ImageAnalysisProps> = ({ 
  result, 
  isAnalyzing, 
  imageBase64, 
  ollamaUrl, 
  selectedModel 
}) => {
  const [webSearchResults, setWebSearchResults] = useState<string | null>(null);
  const [isSearching, setIsSearching] = useState<boolean>(false);
  
  if (!result && !isAnalyzing) return null;

  const handleWebSearch = async () => {
    if (!imageBase64 || !ollamaUrl) return;
    
    try {
      setIsSearching(true);
      const searchResults = await searchImageOnWeb(
        imageBase64, 
        ollamaUrl, 
        selectedModel
      );
      setWebSearchResults(searchResults);
      toast.success("Recherche web terminée!");
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      toast.error(`Erreur de recherche: ${errorMessage}`);
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <div className="w-full max-w-xl mx-auto mt-4 animate-slide-up">
      <Card className="glass overflow-hidden">
        <div className="p-5">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-medium">Résultats d'analyse</h3>
            <div className="inline-block px-2 py-1 rounded-full bg-blue-100 text-xs font-medium text-blue-700">
              IA Ollama
            </div>
          </div>
          <Separator className="my-2" />
          
          <div className="min-h-[100px] max-h-[400px] overflow-y-auto">
            {isAnalyzing ? (
              <div className="flex flex-col items-center justify-center py-8">
                <div className="w-8 h-8 border-t-2 border-blue-500 rounded-full animate-spin mb-3"></div>
                <p className="text-gray-500 text-sm">Analyse de l'image en cours...</p>
                <p className="text-xs text-gray-400 mt-2">Cela peut prendre quelques instants selon le modèle choisi</p>
              </div>
            ) : result ? (
              <div className="prose prose-sm max-w-none">
                <p className="whitespace-pre-line">{result}</p>
              </div>
            ) : (
              <div className="text-center py-4 text-gray-500">
                Aucun résultat
              </div>
            )}
          </div>
          
          {result && !isSearching && !webSearchResults && (
            <div className="mt-4 flex justify-center">
              <Button 
                className="flex items-center gap-2"
                onClick={handleWebSearch}
                disabled={isSearching || !imageBase64 || !ollamaUrl}
              >
                <Search className="h-4 w-4" />
                Rechercher plus d'informations sur le web
              </Button>
            </div>
          )}
          
          {isSearching && (
            <div className="mt-4">
              <Separator className="my-3" />
              <div className="flex flex-col items-center justify-center py-4">
                <Loader2 className="h-6 w-6 animate-spin text-blue-500" />
                <p className="text-sm mt-2">Recherche de données sur internet...</p>
                <p className="text-xs text-gray-400 mt-1">Utilisation du modèle {selectedModel}</p>
              </div>
            </div>
          )}
          
          {webSearchResults && (
            <div className="mt-4">
              <Separator className="my-3" />
              <h4 className="text-md font-medium mb-2">Informations complémentaires</h4>
              <div className="prose prose-sm max-w-none bg-blue-50/50 p-3 rounded-md border border-blue-100">
                <p className="whitespace-pre-line">{webSearchResults}</p>
              </div>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};

export default ImageAnalysis;
