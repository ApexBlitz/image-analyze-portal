
import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Key } from "lucide-react";

interface OpenAITokenInputProps {
  onTokenSubmit: (token: string) => void;
  isAnalyzing: boolean;
}

const OpenAITokenInput: React.FC<OpenAITokenInputProps> = ({ 
  onTokenSubmit, 
  isAnalyzing 
}) => {
  const [token, setToken] = useState<string>(
    localStorage.getItem("openaiToken") || ""
  );
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const handleSubmit = () => {
    if (!token.trim()) {
      toast.error("Veuillez entrer un token API valide");
      return;
    }

    // Save to localStorage for future use
    localStorage.setItem("openaiToken", token);
    onTokenSubmit(token);
    toast.success("Token OpenAI enregistré!");
  };

  return (
    <div className="w-full max-w-md mx-auto mb-6 animate-slide-up">
      <div className="glass rounded-xl p-4 backdrop-blur-md">
        <label htmlFor="openai-token" className="text-sm font-medium block mb-2 text-gray-700 flex items-center gap-2">
          <Key className="h-4 w-4" />
          Token API OpenAI
        </label>
        <div className="flex gap-2">
          <Input
            id="openai-token"
            type={isVisible ? "text" : "password"}
            value={token}
            onChange={(e) => setToken(e.target.value)}
            placeholder="sk-..."
            className="flex-1 transition-all duration-300"
            disabled={isAnalyzing}
          />
          <Button 
            type="button"
            onClick={() => setIsVisible(!isVisible)} 
            className="px-3"
            variant="outline"
            disabled={isAnalyzing}
          >
            {isVisible ? "Cacher" : "Voir"}
          </Button>
          <Button 
            onClick={handleSubmit} 
            disabled={!token.trim() || isAnalyzing}
            className="button-shine bg-green-500 hover:bg-green-600 transition-all duration-300"
          >
            Sauvegarder
          </Button>
        </div>
        <p className="text-xs text-gray-500 mt-2">
          Votre token API sera stocké localement dans votre navigateur
        </p>
      </div>
    </div>
  );
};

export default OpenAITokenInput;
