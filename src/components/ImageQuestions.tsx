
import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { askQuestionAboutImage } from "@/lib/api";
import { Loader2, MessageCircleQuestion, SendHorizontal } from "lucide-react";
import { toast } from "sonner";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface ImageQuestionsProps {
  imageBase64: string | null;
  ollamaUrl: string | null;
  selectedModel: string;
  isVisible: boolean;
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
  isVisible
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
        selectedModel
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
      <Card className="glass overflow-hidden">
        <div className="p-5">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-medium flex items-center gap-2">
              <MessageCircleQuestion className="h-5 w-5 text-blue-500" />
              Poser des questions sur l'image
            </h3>
            <div className="inline-block px-2 py-1 rounded-full bg-blue-100 text-xs font-medium text-blue-700">
              Modèle: {selectedModel}
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
              className="flex-grow min-h-[80px]"
              disabled={isAsking}
            />
            <Button
              onClick={handleAskQuestion}
              disabled={isAsking || !question.trim()}
              className="self-end"
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
              <h4 className="text-sm font-medium text-gray-500 mb-2">Historique des questions</h4>
              <div className="space-y-4 max-h-[400px] overflow-y-auto">
                {questionHistory.map((qa, index) => (
                  <div key={index} className="bg-gray-50 rounded-md p-3 border border-gray-100">
                    <div className="flex justify-between items-start">
                      <p className="font-medium text-blue-700">{qa.question}</p>
                      <span className="text-xs text-gray-400">
                        {new Date(qa.timestamp).toLocaleTimeString()}
                      </span>
                    </div>
                    <Separator className="my-2" />
                    <p className="text-sm whitespace-pre-line">{qa.answer}</p>
                  </div>
                ))}
              </div>
            </>
          )}

          {questionHistory.length === 0 && !isAsking && (
            <div className="text-center py-4 text-gray-500">
              <p>Posez votre première question sur cette image</p>
              <p className="text-xs mt-1">Exemples: "Que vois-tu dans cette image?", "Peux-tu identifier les objets?", "Quelle est l'ambiance de cette scène?"</p>
            </div>
          )}

          {isAsking && (
            <div className="flex flex-col items-center justify-center py-8">
              <div className="w-8 h-8 border-t-2 border-blue-500 rounded-full animate-spin mb-3"></div>
              <p className="text-gray-500 text-sm">Analyse de la question en cours...</p>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};

export default ImageQuestions;
