
import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, Cpu, Database, Share2 } from "lucide-react";

const models = [
  {
    id: "llama3",
    name: "Llama 3",
    description: "Modèle de langage avancé de Meta pour l'analyse d'images et la génération de contenu.",
    type: "Multimodal",
    capabilities: ["Analyse d'images", "Génération de texte", "Compréhension du contexte"],
    icon: <Cpu className="h-12 w-12 text-blue-500" />,
    installCommand: "ollama pull llama3:8b-vision-q8_0",
    link: "https://ollama.com/library/llama3"
  },
  {
    id: "bakllava",
    name: "BakLLaVA",
    description: "Version spécialisée de LLaVA, optimisée pour la reconnaissance visuelle et la description détaillée.",
    type: "Vision-Langage",
    capabilities: ["Description d'image", "Reconnaissance d'objets", "Analyse de scènes"],
    icon: <Share2 className="h-12 w-12 text-indigo-500" />,
    installCommand: "ollama pull bakllava:latest",
    link: "https://ollama.com/library/bakllava"
  },
  {
    id: "moondream",
    name: "Moondream",
    description: "Petit modèle efficace pour l'analyse d'images avec une empreinte mémoire réduite.",
    type: "Compact",
    capabilities: ["Analyse légère", "Performances rapides", "Économe en ressources"],
    icon: <Database className="h-12 w-12 text-purple-500" />,
    installCommand: "ollama pull moondream:latest",
    link: "https://ollama.com/library/moondream"
  },
  {
    id: "phi-3",
    name: "Phi-3 Vision",
    description: "Modèle de Microsoft avec d'excellentes capacités de compréhension visuelle et un raisonnement avancé.",
    type: "Vision intelligente",
    capabilities: ["Analyse contextuelle", "Raisonnement", "Reconnaissance détaillée"],
    icon: <Cpu className="h-12 w-12 text-green-500" />,
    installCommand: "ollama pull phi:latest",
    link: "https://ollama.com/library/phi"
  },
];

const OtherModels: React.FC = () => {
  const copyCommand = (command: string) => {
    navigator.clipboard.writeText(command);
    alert("Commande copiée !");
  };

  return (
    <main className="min-h-screen py-12 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="mb-12 text-center">
          <h1 className="text-3xl font-bold mb-4">Modèles d'IA pour l'analyse d'images</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Découvrez notre sélection de modèles d'intelligence artificielle pour l'analyse d'images.
            Chacun offre des capacités différentes selon vos besoins.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {models.map((model) => (
            <Card key={model.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <Badge variant="outline" className="mb-2">{model.type}</Badge>
                    <CardTitle className="text-xl">{model.name}</CardTitle>
                    <CardDescription className="mt-2">{model.description}</CardDescription>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-full">{model.icon}</div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p className="text-sm font-medium">Capacités :</p>
                  <ul className="text-sm text-gray-500 space-y-1">
                    {model.capabilities.map((capability, index) => (
                      <li key={index} className="flex items-center">
                        <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                        {capability}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mt-4">
                  <p className="text-sm font-medium mb-2">Installation :</p>
                  <div className="bg-gray-100 p-2 rounded-md relative group">
                    <code className="text-sm text-gray-800">{model.installCommand}</code>
                    <button
                      onClick={() => copyCommand(model.installCommand)}
                      className="absolute right-2 top-2 opacity-0 group-hover:opacity-100 transition-opacity bg-white p-1 rounded-md"
                      title="Copier la commande"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                    </button>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button asChild variant="outline" className="w-full">
                  <a href={model.link} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center">
                    En savoir plus <ArrowRight className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </main>
  );
};

export default OtherModels;
