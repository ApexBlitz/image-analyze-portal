
import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface OllamaUrlInputProps {
  onUrlSubmit: (url: string) => void;
  isAnalyzing: boolean;
}

const OllamaUrlInput: React.FC<OllamaUrlInputProps> = ({ 
  onUrlSubmit, 
  isAnalyzing 
}) => {
  const [url, setUrl] = useState<string>(
    localStorage.getItem("ollamaUrl") || "http://localhost:11434"
  );
  const [isValid, setIsValid] = useState<boolean>(true);

  useEffect(() => {
    // Basic URL validation
    const isValidUrl = url.startsWith("http://") || url.startsWith("https://");
    setIsValid(isValidUrl);
  }, [url]);

  const handleSubmit = () => {
    if (!isValid) {
      toast.error("Please enter a valid URL starting with http:// or https://");
      return;
    }

    // Save to localStorage for future use
    localStorage.setItem("ollamaUrl", url);
    onUrlSubmit(url);
  };

  return (
    <div className="w-full max-w-md mx-auto mb-6 animate-slide-up">
      <div className="glass rounded-xl p-4 backdrop-blur-md">
        <label htmlFor="ollama-url" className="text-sm font-medium block mb-2 text-gray-700">
          Ollama Server URL
        </label>
        <div className="flex gap-2">
          <Input
            id="ollama-url"
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="http://localhost:11434"
            className={`flex-1 transition-all duration-300 ${
              !isValid && url ? "border-red-500 focus:ring-red-500" : ""
            }`}
            disabled={isAnalyzing}
          />
          <Button 
            onClick={handleSubmit} 
            disabled={!isValid || isAnalyzing}
            className="button-shine bg-blue-500 hover:bg-blue-600 transition-all duration-300"
          >
            Connect
          </Button>
        </div>
        {!isValid && url && (
          <p className="text-red-500 text-xs mt-1">
            URL must start with http:// or https://
          </p>
        )}
        <p className="text-xs text-gray-500 mt-2">
          Make sure your Ollama server is running and accessible
        </p>
      </div>
    </div>
  );
};

export default OllamaUrlInput;
