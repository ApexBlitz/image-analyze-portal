
import React from "react";
import { Card } from "@/components/ui/card";
import {
  Image,
  Search,
  MessageCircleQuestion,
  Database,
  Cpu,
  Upload,
  BarChart3,
  Globe,
  Shield,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

interface FeatureCardProps {
  icon: React.ElementType;
  title: string;
  description: string;
  color: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon: Icon, title, description, color }) => (
  <Card className="overflow-hidden border-none shadow-sm h-full">
    <div className={`h-1.5 w-full ${color}`}></div>
    <div className="p-6">
      <div className={`h-10 w-10 rounded-full ${color.replace('bg-', 'bg-').replace('500', '100')} flex items-center justify-center mb-4`}>
        <Icon className={`h-5 w-5 ${color.replace('bg-', 'text-')}`} />
      </div>
      <h3 className="text-lg font-medium mb-2">{title}</h3>
      <p className="text-gray-600 text-sm">{description}</p>
    </div>
  </Card>
);

const Features: React.FC = () => {
  const { t } = useLanguage();
  
  const features: FeatureCardProps[] = [
    {
      icon: Image,
      title: "Analyse d'image précise",
      description: "Analysez le contenu visuel de vos images avec des algorithmes d'IA avancés qui détectent les objets, scènes, textes et contextes.",
      color: "bg-blue-500",
    },
    {
      icon: MessageCircleQuestion,
      title: "Questions & Réponses",
      description: "Posez des questions spécifiques sur votre image et obtenez des réponses détaillées basées sur le contenu visuel identifié.",
      color: "bg-purple-500",
    },
    {
      icon: Search,
      title: "Recherche web contextuelle",
      description: "Recherchez automatiquement des informations complémentaires sur le web en fonction du contenu de votre image.",
      color: "bg-indigo-500",
    },
    {
      icon: Globe,
      title: "Classement des résultats",
      description: "Les résultats de recherche web sont analysés, classés et présentés sous forme de suggestions de sites pertinents.",
      color: "bg-cyan-500",
    },
    {
      icon: Cpu,
      title: "Modèles d'IA flexibles",
      description: "Choisissez parmi différents modèles multimodaux comme LLaVA, BakLLaVA, DeepSeek ou Llama 3 selon vos besoins.",
      color: "bg-emerald-500",
    },
    {
      icon: Database,
      title: "Serveur local ou distant",
      description: "Connectez-vous à n'importe quel serveur Ollama, qu'il soit hébergé localement ou sur un serveur distant sécurisé.",
      color: "bg-amber-500",
    },
    {
      icon: Upload,
      title: "Upload facile",
      description: "Téléchargez des images par simple glisser-déposer ou en parcourant vos fichiers, avec prévisualisation instantanée.",
      color: "bg-rose-500",
    },
    {
      icon: Shield,
      title: "Confidentialité préservée",
      description: "Vos images sont traitées localement via votre serveur Ollama, sans envoi à des services cloud externes.",
      color: "bg-gray-500",
    },
    {
      icon: BarChart3,
      title: "Historique de questions",
      description: "Conservez l'historique de vos questions et réponses pour référence future et suivi de vos analyses.",
      color: "bg-green-500",
    },
  ];

  return (
    <div className="w-full max-w-5xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-4">{t("app.features.title")}</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          {t("app.features.subtitle")}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {features.map((feature, index) => (
          <FeatureCard
            key={index}
            icon={feature.icon}
            title={feature.title}
            description={feature.description}
            color={feature.color}
          />
        ))}
      </div>

      <Card className="p-8 border-none bg-gradient-to-r from-blue-50 to-indigo-50">
        <div className="text-center">
          <h3 className="text-2xl font-bold mb-4">{t("app.features.cta.title")}</h3>
          <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
            {t("app.features.cta.subtitle")}
          </p>
          <button 
            className="px-6 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"
            onClick={() => {
              const analyzeTab = document.querySelector('[data-value="analyze"]') as HTMLElement;
              if (analyzeTab) analyzeTab.click();
            }}
          >
            {t("app.features.cta.button")}
          </button>
        </div>
      </Card>
    </div>
  );
};

export default Features;
