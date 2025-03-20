
import React from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Bot, BrainCircuit } from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface ModelSelectorProps {
  selectedModel: string;
  onModelChange: (modelId: string, provider: "ollama" | "openai") => void;
  isAnalyzing: boolean;
  modelProvider: "ollama" | "openai";
  hasOllamaUrl: boolean;
  hasOpenAIToken: boolean;
}

const ModelSelector: React.FC<ModelSelectorProps> = ({
  selectedModel,
  onModelChange,
  isAnalyzing,
  modelProvider,
  hasOllamaUrl,
  hasOpenAIToken
}) => {
  const ollamaModels = [
    { id: "llava", name: "LLaVA", description: "Vision Language Assistant" },
    { id: "bakllava", name: "Bakllava", description: "Vers. améliorée de LLaVA" },
    { id: "llava-phi3", name: "LLaVA-Phi3", description: "LLaVA basé sur Phi-3" },
    { id: "moondream", name: "Moondream", description: "Modèle vision léger" },
    { id: "cogvlm", name: "CogVLM", description: "Multimodal par THUDM" },
    { id: "deepseek-r1", name: "DeepSeek VL", description: "Advanced Vision Language Model" }
  ];

  const openaiModels = [
    { id: "gpt-4o", name: "GPT-4o", description: "Modèle multimodal performant" },
    { id: "gpt-4o-mini", name: "GPT-4o Mini", description: "Version plus légère de GPT-4o" }
  ];

  const handleModelChange = (value: string) => {
    onModelChange(value, modelProvider);
  };

  const handleProviderChange = (value: "ollama" | "openai") => {
    if (value === "ollama") {
      if (hasOllamaUrl) {
        onModelChange("llava", "ollama");
      }
    } else if (value === "openai") {
      if (hasOpenAIToken) {
        onModelChange("gpt-4o", "openai");
      }
    }
  };

  const currentModels = modelProvider === "ollama" ? ollamaModels : openaiModels;

  return (
    <div className="w-full">
      <Tabs value={modelProvider} onValueChange={(v) => handleProviderChange(v as "ollama" | "openai")} className="mb-4">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger 
            value="ollama" 
            disabled={isAnalyzing || !hasOllamaUrl}
            className="flex items-center gap-2"
          >
            <Bot className="h-4 w-4" /> 
            <span>Ollama</span>
          </TabsTrigger>
          <TabsTrigger 
            value="openai" 
            disabled={isAnalyzing || !hasOpenAIToken}
            className="flex items-center gap-2"
          >
            <BrainCircuit className="h-4 w-4" /> 
            <span>OpenAI</span>
          </TabsTrigger>
        </TabsList>
      </Tabs>

      <Select onValueChange={handleModelChange} value={selectedModel} disabled={isAnalyzing}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Sélectionnez un modèle" />
        </SelectTrigger>
        <SelectContent>
          {currentModels.map((model) => (
            <SelectItem key={model.id} value={model.id}>
              <div className="flex flex-col">
                <span className="font-medium">{model.name}</span>
                <span className="text-xs text-gray-500">{model.description}</span>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      
      <div className="mt-2 text-xs text-gray-500">
        {modelProvider === "ollama" ? (
          <p>Ces modèles s'exécutent localement sur votre machine via Ollama</p>
        ) : (
          <p>Ces modèles utilisent l'API OpenAI (nécessite un crédit)</p>
        )}
      </div>
    </div>
  );
};

export default ModelSelector;
