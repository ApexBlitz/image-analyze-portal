
import React from "react";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Download, 
  Terminal, 
  Server, 
  ArrowRight,
  Command,
  Cpu,
  AlertCircle
} from "lucide-react";

const CodeBlock = ({ children }: { children: React.ReactNode }) => (
  <div className="bg-gray-900 text-white p-4 rounded-md font-mono text-sm overflow-x-auto my-4">
    {children}
  </div>
);

const InstallationGuide: React.FC = () => {
  return (
    <div className="w-full max-w-5xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-4">Installation d'Ollama</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Vision Insight se connecte à Ollama pour analyser vos images. Suivez ces instructions pour installer Ollama sur votre système.
        </p>
      </div>

      <Tabs defaultValue="windows" className="w-full mb-12">
        <TabsList className="grid w-full max-w-md mx-auto grid-cols-3">
          <TabsTrigger value="windows">Windows</TabsTrigger>
          <TabsTrigger value="macos">macOS</TabsTrigger>
          <TabsTrigger value="linux">Linux</TabsTrigger>
        </TabsList>

        <TabsContent value="windows" className="pt-6">
          <Card className="p-6 bg-white/90 backdrop-blur-sm">
            <h3 className="text-xl font-bold flex items-center gap-2 mb-4">
              <Download className="h-5 w-5 text-blue-500" />
              Installation sur Windows
            </h3>
            
            <ol className="list-decimal pl-6 space-y-4 mb-6">
              <li>
                <span className="font-medium">Téléchargez l'installateur :</span>
                <p className="text-gray-600 mt-1">
                  Visitez le site officiel d'Ollama et téléchargez la dernière version pour Windows.
                </p>
                <a 
                  href="https://ollama.com/download" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-blue-600 hover:text-blue-800 mt-2"
                >
                  Télécharger Ollama 
                  <ArrowRight className="ml-1 h-4 w-4" />
                </a>
              </li>
              <li>
                <span className="font-medium">Exécutez l'installateur :</span>
                <p className="text-gray-600 mt-1">
                  Ouvrez le fichier téléchargé et suivez les instructions d'installation.
                </p>
              </li>
              <li>
                <span className="font-medium">Lancez Ollama :</span>
                <p className="text-gray-600 mt-1">
                  Une fois installé, Ollama démarrera automatiquement et s'exécutera en arrière-plan. Vous pouvez y accéder via l'icône dans la barre des tâches.
                </p>
              </li>
              <li>
                <span className="font-medium">Téléchargez un modèle multimodal :</span>
                <p className="text-gray-600 mt-1">
                  Ouvrez PowerShell ou Command Prompt et exécutez la commande suivante pour installer un modèle comme LLaVA :
                </p>
                <CodeBlock>ollama pull llava</CodeBlock>
              </li>
            </ol>

            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
              <div className="flex">
                <div className="flex-shrink-0">
                  <AlertCircle className="h-5 w-5 text-blue-500" />
                </div>
                <div className="ml-3">
                  <p className="text-sm text-blue-700">
                    Une fois Ollama installé, vous pourrez vous y connecter depuis Vision Insight en utilisant l'URL <code className="bg-blue-100 px-1 py-0.5 rounded">http://localhost:11434</code>
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="macos" className="pt-6">
          <Card className="p-6 bg-white/90 backdrop-blur-sm">
            <h3 className="text-xl font-bold flex items-center gap-2 mb-4">
              <Download className="h-5 w-5 text-blue-500" />
              Installation sur macOS
            </h3>
            
            <ol className="list-decimal pl-6 space-y-4 mb-6">
              <li>
                <span className="font-medium">Téléchargez l'application :</span>
                <p className="text-gray-600 mt-1">
                  Visitez le site officiel d'Ollama et téléchargez la dernière version pour macOS.
                </p>
                <a 
                  href="https://ollama.com/download" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-blue-600 hover:text-blue-800 mt-2"
                >
                  Télécharger Ollama 
                  <ArrowRight className="ml-1 h-4 w-4" />
                </a>
              </li>
              <li>
                <span className="font-medium">Installez l'application :</span>
                <p className="text-gray-600 mt-1">
                  Ouvrez le fichier téléchargé (.dmg) et glissez l'application Ollama dans votre dossier Applications.
                </p>
              </li>
              <li>
                <span className="font-medium">Lancez Ollama :</span>
                <p className="text-gray-600 mt-1">
                  Ouvrez l'application Ollama depuis votre dossier Applications. Une icône apparaîtra dans la barre de menu.
                </p>
              </li>
              <li>
                <span className="font-medium">Téléchargez un modèle multimodal :</span>
                <p className="text-gray-600 mt-1">
                  Ouvrez le Terminal et exécutez la commande suivante pour installer un modèle comme LLaVA :
                </p>
                <CodeBlock>ollama pull llava</CodeBlock>
              </li>
            </ol>

            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
              <div className="flex">
                <div className="flex-shrink-0">
                  <AlertCircle className="h-5 w-5 text-blue-500" />
                </div>
                <div className="ml-3">
                  <p className="text-sm text-blue-700">
                    Une fois Ollama installé, vous pourrez vous y connecter depuis Vision Insight en utilisant l'URL <code className="bg-blue-100 px-1 py-0.5 rounded">http://localhost:11434</code>
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="linux" className="pt-6">
          <Card className="p-6 bg-white/90 backdrop-blur-sm">
            <h3 className="text-xl font-bold flex items-center gap-2 mb-4">
              <Terminal className="h-5 w-5 text-blue-500" />
              Installation sur Linux
            </h3>
            
            <ol className="list-decimal pl-6 space-y-4 mb-6">
              <li>
                <span className="font-medium">Installation via script :</span>
                <p className="text-gray-600 mt-1">
                  Exécutez la commande suivante dans votre terminal pour installer Ollama :
                </p>
                <CodeBlock>curl -fsSL https://ollama.com/install.sh | sh</CodeBlock>
              </li>
              <li>
                <span className="font-medium">Démarrez le service Ollama :</span>
                <p className="text-gray-600 mt-1">
                  Une fois installé, démarrez le service Ollama :
                </p>
                <CodeBlock>ollama serve</CodeBlock>
              </li>
              <li>
                <span className="font-medium">Téléchargez un modèle multimodal :</span>
                <p className="text-gray-600 mt-1">
                  Dans un autre terminal, exécutez la commande suivante pour installer un modèle comme LLaVA :
                </p>
                <CodeBlock>ollama pull llava</CodeBlock>
              </li>
            </ol>

            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
              <div className="flex">
                <div className="flex-shrink-0">
                  <AlertCircle className="h-5 w-5 text-blue-500" />
                </div>
                <div className="ml-3">
                  <p className="text-sm text-blue-700">
                    Une fois Ollama installé, vous pourrez vous y connecter depuis Vision Insight en utilisant l'URL <code className="bg-blue-100 px-1 py-0.5 rounded">http://localhost:11434</code>
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>

      <Separator className="my-10" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
        <Card className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 border-none">
          <div className="flex items-start gap-4">
            <div className="h-10 w-10 rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0">
              <Command className="h-5 w-5 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-medium mb-3">Installation d'un modèle multimodal</h3>
              <p className="text-gray-700 mb-4">
                Pour utiliser Vision Insight, vous devez installer au moins un modèle multimodal capable d'analyser des images. Voici les modèles recommandés :
              </p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 font-bold">•</span>
                  <div>
                    <span className="font-medium">LLaVA</span>
                    <CodeBlock>ollama pull llava</CodeBlock>
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 font-bold">•</span>
                  <div>
                    <span className="font-medium">BakLLaVA</span>
                    <CodeBlock>ollama pull bakllava</CodeBlock>
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 font-bold">•</span>
                  <div>
                    <span className="font-medium">Moondream</span>
                    <CodeBlock>ollama pull moondream</CodeBlock>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-purple-50 to-pink-50 border-none">
          <div className="flex items-start gap-4">
            <div className="h-10 w-10 rounded-full bg-purple-500 flex items-center justify-center flex-shrink-0">
              <Cpu className="h-5 w-5 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-medium mb-3">Configuration requise</h3>
              <p className="text-gray-700 mb-4">
                Assurez-vous que votre système répond aux exigences suivantes pour exécuter Ollama efficacement :
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <span className="text-purple-500 font-bold">•</span>
                  <div>
                    <span className="font-medium">Processeur :</span>
                    <p className="text-gray-600">CPU x86_64 avec prise en charge des extensions AVX</p>
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-500 font-bold">•</span>
                  <div>
                    <span className="font-medium">RAM :</span>
                    <p className="text-gray-600">Minimum 8 Go, 16 Go ou plus recommandé pour de meilleures performances</p>
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-500 font-bold">•</span>
                  <div>
                    <span className="font-medium">Stockage :</span>
                    <p className="text-gray-600">10-20 Go d'espace libre pour les modèles</p>
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-500 font-bold">•</span>
                  <div>
                    <span className="font-medium">GPU (optionnel) :</span>
                    <p className="text-gray-600">Une carte graphique compatible CUDA/ROCm accélère considérablement le traitement</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </Card>
      </div>

      <Card className="p-8 border-none bg-gradient-to-r from-blue-50 to-indigo-50">
        <div className="text-center">
          <h3 className="text-2xl font-bold mb-4">Prêt à vous connecter ?</h3>
          <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
            Maintenant qu'Ollama est installé sur votre système, retournez à l'onglet "Analyse d'image" et connectez-vous à votre serveur local.
          </p>
          <button 
            className="px-6 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"
            onClick={() => {
              const analyzeTab = document.querySelector('[data-value="analyze"]') as HTMLElement;
              if (analyzeTab) analyzeTab.click();
            }}
          >
            Commencer l'analyse
          </button>
        </div>
      </Card>
    </div>
  );
};

export default InstallationGuide;
