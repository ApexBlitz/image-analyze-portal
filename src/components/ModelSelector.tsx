
import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { OllamaModel } from "@/types";

// Liste des modèles supportés par Ollama avec capacité d'analyse d'image
const SUPPORTED_MODELS: OllamaModel[] = [
  {
    id: "llava",
    name: "LLaVA",
    description: "Modèle multimodal text-image",
  },
  {
    id: "bakllava",
    name: "BakLLaVA",
    description: "Modèle LLaVA entraîné sur Bakllava",
  },
  {
    id: "moondream",
    name: "Moondream",
    description: "Petit modèle efficace pour l'analyse d'image",
  },
  {
    id: "cogvlm",
    name: "CogVLM",
    description: "Modèle vision-langage pour compréhension d'image",
  },
  {
    id: "deepseek-r1",
    name: "DeepSeek-R1",
    description: "Modèle avancé pour analyse et recherche web",
  },
  {
    id: "llama3",
    name: "Llama 3.3",
    description: "Modèle multimodal pour compréhension complexe",
  },
  {
    id: "phi-4",
    name: "Phi-4",
    description: "Modèle Microsoft avec capacités visuelles",
  },
  {
    id: "mistral",
    name: "Mistral",
    description: "Modèle performant pour analyse et génération",
  },
  {
    id: "gemma3:8b-vision",
    name: "Gemma 3",
    description: "Modèle vision-langage de Google",
  },
];

interface ModelSelectorProps {
  selectedModel: string;
  onModelChange: (modelId: string) => void;
  isAnalyzing: boolean;
}

const ModelSelector: React.FC<ModelSelectorProps> = ({
  selectedModel,
  onModelChange,
  isAnalyzing,
}) => {
  return (
    <div className="w-full max-w-md mx-auto mb-6 animate-slide-up">
      <div className="glass rounded-xl p-4 backdrop-blur-md">
        <label htmlFor="model-selector" className="text-sm font-medium block mb-2 text-gray-700">
          Modèle d'IA pour l'analyse
        </label>
        <Select
          disabled={isAnalyzing}
          value={selectedModel}
          onValueChange={onModelChange}
        >
          <SelectTrigger className="w-full" id="model-selector">
            <SelectValue placeholder="Sélectionner un modèle" />
          </SelectTrigger>
          <SelectContent>
            {SUPPORTED_MODELS.map((model) => (
              <SelectItem key={model.id} value={model.id}>
                <div className="flex flex-col">
                  <span>{model.name}</span>
                  <span className="text-xs text-gray-500">{model.description}</span>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <p className="text-xs text-gray-500 mt-2">
          Assurez-vous que votre serveur Ollama a installé le modèle sélectionné
        </p>
      </div>
    </div>
  );
};

export default ModelSelector;
