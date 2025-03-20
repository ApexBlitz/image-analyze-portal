
import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { askQuestionAboutImage } from "@/lib/api";
import { Loader2, MessageCircleQuestion, SendHorizontal, Clock, Bot, UserRound, BrainCircuit } from "lucide-react";
import { toast } from "sonner";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface ImageQuestionsProps {
  imageBase64: string | null;
  ollamaUrl: string | null;
  selectedModel: string;
  isVisible: boolean;
  modelProvider?: "ollama" | "openai";
}

interface QuestionAnswer {
  question: string;
  answer: string;
  timestamp: number;
}

const ImageQuestions: React.FC<ImageQuestionsProps> = ({
  imageBase64,
  ollamaUrl,
  selectedModel,
  isVisible,
  modelProvider = "ollama"
}) => {
  const [question, setQuestion] = useState<string>("");
  const [isAsking, setIsAsking] = useState<boolean>(false);
  const [questionHistory, setQuestionHistory] = useState<QuestionAnswer[]>([]);
  const [error, setError] = useState<string | null>(null);

  if (!isVisible || !imageBase64) return null;

  const handleAskQuestion = async () => {
    if (!imageBase64 || !ollamaUrl || !question.trim()) {
      toast.error("Veuillez entrer une question valide");
      return;
    }

    setError(null);
    setIsAsking(true);

    try {
      const answer = await askQuestionAboutImage(
        imageBase64,
        question,
        ollamaUrl,
        selectedModel,
        modelProvider
      );

      // Add to question history
      setQuestionHistory(prev => [
        {
          question: question,
          answer: answer,
          timestamp: Date.now()
        },
        ...prev
      ]);

      // Clear the question input
      setQuestion("");
      toast.success("Réponse reçue!");
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      setError(`Erreur lors de la réponse: ${errorMessage}`);
    } finally {
      setIsAsking(false);
    }
  };

  // Function to handle Enter key press
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleAskQuestion();
    }
  };

  return (
    <div className="w-full max-w-xl mx-auto mt-4 animate-fade-in">
      <Card className="glass overflow-hidden border-none shadow-md bg-white/90">
        <div className="p-5">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-medium flex items-center gap-2">
              <MessageCircleQuestion className="h-5 w-5 text-purple-500" />
              Questions sur l'image
            </h3>
            <div className="inline-block px-2 py-1 rounded-full bg-purple-100 text-xs font-medium text-purple-700 flex items-center gap-1">
              {modelProvider === "ollama" ? (
                <Bot className="h-3 w-3" />
              ) : (
                <BrainCircuit className="h-3 w-3" />
              )}
              <span>{modelProvider === "ollama" ? "Ollama" : "OpenAI"}: {selectedModel}</span>
            </div>
          </div>
          <Separator className="my-2" />

          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="flex gap-2 mb-4">
            <Textarea
              placeholder="Posez une question sur cette image..."
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-grow min-h-[80px] border-purple-200 focus-visible:ring-purple-500"
              disabled={isAsking}
            />
            <Button
              onClick={handleAskQuestion}
              disabled={isAsking || !question.trim()}
              className="self-end bg-purple-600 hover:bg-purple-700"
            >
              {isAsking ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <SendHorizontal className="h-4 w-4" />
              )}
            </Button>
          </div>

          {questionHistory.length > 0 && (
            <>
              <h4 className="text-sm font-medium text-gray-500 mb-2 flex items-center gap-2">
                <Clock className="h-3 w-3" /> Historique des questions
              </h4>
              <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
                {questionHistory.map((qa, index) => (
                  <div key={index} className="rounded-md overflow-hidden">
                    <div className="bg-purple-50 p-3 flex items-start gap-3">
                      <UserRound className="h-5 w-5 text-purple-600 mt-0.5" />
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <p className="font-medium text-purple-700">{qa.question}</p>
                          <span className="text-xs text-gray-400 whitespace-nowrap ml-3">
                            {new Date(qa.timestamp).toLocaleTimeString()}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="bg-white p-3 border border-gray-100 flex items-start gap-3">
                      {modelProvider === "ollama" ? (
                        <Bot className="h-5 w-5 text-blue-600 mt-0.5" />
                      ) : (
                        <BrainCircuit className="h-5 w-5 text-green-600 mt-0.5" />
                      )}
                      <p className="text-sm whitespace-pre-line flex-1">{qa.answer}</p>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {questionHistory.length === 0 && !isAsking && (
            <div className="text-center py-6 text-gray-500 bg-gray-50/50 rounded-lg">
              <MessageCircleQuestion className="h-8 w-8 mx-auto text-gray-400 mb-2" />
              <p className="font-medium text-gray-600">Posez votre première question sur cette image</p>
              <p className="text-xs mt-2 text-gray-500 max-w-md mx-auto">
                Exemples: "Que vois-tu dans cette image?", "Peux-tu identifier les objets?", 
                "Quelle est l'ambiance de cette scène?", "Peux-tu décrire les couleurs?"
              </p>
            </div>
          )}

          {isAsking && (
            <div className="flex flex-col items-center justify-center py-8">
              <div className="w-8 h-8 border-t-2 border-purple-500 rounded-full animate-spin mb-3"></div>
              <p className="text-gray-500 text-sm">Analyse de la question en cours...</p>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};

export default ImageQuestions;
