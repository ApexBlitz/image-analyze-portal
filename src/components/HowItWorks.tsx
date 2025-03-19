
import React from "react";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { 
  Server, 
  Upload, 
  Brain, 
  Search, 
  MessageCircleQuestion,
  ArrowRight
} from "lucide-react";

const StepCard = ({ 
  icon: Icon, 
  title, 
  description 
}: { 
  icon: React.ElementType; 
  title: string; 
  description: string;
}) => (
  <Card className="p-6 bg-white/90 backdrop-blur-sm flex flex-col items-center text-center h-full">
    <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center mb-4">
      <Icon className="h-6 w-6 text-blue-600" />
    </div>
    <h3 className="text-lg font-medium mb-2">{title}</h3>
    <p className="text-gray-600 text-sm">{description}</p>
  </Card>
);

const HowItWorks: React.FC = () => {
  return (
    <div className="w-full max-w-5xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-4">Comment fonctionne Vision Insight</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Notre plateforme utilise des modèles d'IA avancés pour analyser vos images, 
          rechercher des informations complémentaires et répondre à vos questions.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-12">
        <StepCard 
          icon={Server}
          title="1. Connexion à Ollama"
          description="Connectez-vous à votre serveur Ollama local ou distant qui héberge les modèles d'IA multimodaux."
        />
        
        <div className="hidden md:flex items-center justify-center">
          <ArrowRight className="h-6 w-6 text-gray-400" />
        </div>
        
        <StepCard 
          icon={Upload}
          title="2. Upload d'Image"
          description="Téléchargez l'image que vous souhaitez analyser, par glisser-déposer ou en sélectionnant un fichier."
        />
        
        <div className="hidden md:flex items-center justify-center">
          <ArrowRight className="h-6 w-6 text-gray-400" />
        </div>
        
        <StepCard 
          icon={Brain}
          title="3. Analyse d'IA"
          description="Notre système utilise le modèle d'IA sélectionné pour analyser en détail le contenu de votre image."
        />
      </div>
      
      <Separator className="my-12" />
      
      <div className="text-center mb-10">
        <h2 className="text-2xl font-bold mb-3">Fonctionnalités avancées</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Après l'analyse initiale, explorez plus en profondeur avec nos outils supplémentaires.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <Card className="p-8 bg-gradient-to-br from-blue-50 to-indigo-50 border-none">
          <div className="flex items-start gap-4">
            <div className="h-10 w-10 rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0">
              <Search className="h-5 w-5 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-medium mb-3">Recherche Web Intelligente</h3>
              <p className="text-gray-700 mb-4">
                Après l'analyse initiale, notre système peut rechercher des informations complémentaires
                sur le web en utilisant des modèles comme DeepSeek, Llama 3, ou Phi-4 pour contextualiser
                le contenu de votre image.
              </p>
              <p className="text-sm text-gray-600">
                Les résultats sont classés et présentés sous forme de suggestions de sites web pertinents, avec
                pagination pour une navigation facile.
              </p>
            </div>
          </div>
        </Card>
        
        <Card className="p-8 bg-gradient-to-br from-purple-50 to-pink-50 border-none">
          <div className="flex items-start gap-4">
            <div className="h-10 w-10 rounded-full bg-purple-500 flex items-center justify-center flex-shrink-0">
              <MessageCircleQuestion className="h-5 w-5 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-medium mb-3">Questions sur l'Image</h3>
              <p className="text-gray-700 mb-4">
                Posez des questions spécifiques sur votre image et obtenez des réponses détaillées
                directement basées sur le contenu visuel. Notre système de dialogue intelligent
                utilise le modèle d'IA choisi pour comprendre et répondre à vos interrogations.
              </p>
              <p className="text-sm text-gray-600">
                L'historique des questions est conservé pour référence, vous permettant de suivre votre
                conversation avec l'IA au sujet de l'image.
              </p>
            </div>
          </div>
        </Card>
      </div>
      
      <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-gray-200 mb-6">
        <h3 className="text-lg font-medium mb-3">Configuration requise</h3>
        <ul className="space-y-2 text-gray-700">
          <li className="flex items-start gap-2">
            <span className="text-blue-500 font-bold">•</span>
            <span>Un serveur Ollama fonctionnel (local ou distant)</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-500 font-bold">•</span>
            <span>Au moins un modèle multimodal installé (LLaVA, BakLLaVA, Moondream, etc.)</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-500 font-bold">•</span>
            <span>Pour la recherche web, des modèles plus avancés comme DeepSeek-R1 ou Llama 3 sont recommandés</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default HowItWorks;
