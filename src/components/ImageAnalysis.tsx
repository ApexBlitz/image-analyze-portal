
import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Search, Loader2, Globe, ExternalLink, MessageCircleQuestion, Bot, SendHorizontal, User } from "lucide-react";
import { searchImageOnWeb, askQuestionAboutImage } from "@/lib/api";
import { toast } from "sonner";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Textarea } from "@/components/ui/textarea";
import ImageQuestions from "./ImageQuestions";

interface ImageAnalysisProps {
  result: string | null;
  isAnalyzing: boolean;
  imageBase64: string | null;
  ollamaUrl: string | null;
  selectedModel: string;
}

interface SearchResult {
  title: string;
  url: string;
  description: string;
}

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
  timestamp: number;
}

const ImageAnalysis: React.FC<ImageAnalysisProps> = ({ 
  result, 
  isAnalyzing, 
  imageBase64, 
  ollamaUrl, 
  selectedModel 
}) => {
  const [webSearchResults, setWebSearchResults] = useState<string | null>(null);
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [parsedResults, setParsedResults] = useState<SearchResult[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [activeTab, setActiveTab] = useState<"analysis" | "chat">("analysis");
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState<string>("");
  const [isAskingQuestion, setIsAskingQuestion] = useState<boolean>(false);
  
  const resultsPerPage = 3;
  
  if (!result && !isAnalyzing) return null;

  const handleWebSearch = async () => {
    if (!imageBase64 || !ollamaUrl) return;
    
    try {
      setIsSearching(true);
      const searchResults = await searchImageOnWeb(
        imageBase64, 
        ollamaUrl, 
        selectedModel
      );
      setWebSearchResults(searchResults);
      
      // Parse the search results to extract website information
      const extractedResults = parseSearchResults(searchResults);
      setParsedResults(extractedResults);
      
      toast.success("Recherche web terminée!");
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      toast.error(`Erreur de recherche: ${errorMessage}`);
    } finally {
      setIsSearching(false);
    }
  };
  
  // Function to parse search results and extract website information
  const parseSearchResults = (results: string): SearchResult[] => {
    // This is a simple parser that looks for patterns like URLs or numbered lists
    const extractedResults: SearchResult[] = [];
    
    // Split into paragraphs
    const paragraphs = results.split('\n\n');
    
    let currentTitle = "";
    let currentDescription = "";
    
    paragraphs.forEach(paragraph => {
      // Check if paragraph contains a URL
      const urlMatch = paragraph.match(/(https?:\/\/[^\s]+)/g);
      
      if (urlMatch) {
        // If we already have a title, create a result
        if (currentTitle && currentDescription) {
          extractedResults.push({
            title: currentTitle,
            description: currentDescription,
            url: urlMatch[0]
          });
          currentTitle = "";
          currentDescription = "";
        }
      } else if (paragraph.trim() && paragraph.length < 100) {
        // Short paragraphs are likely titles
        currentTitle = paragraph.trim();
      } else if (paragraph.trim()) {
        // Longer paragraphs are likely descriptions
        currentDescription = paragraph.trim();
        
        // If we have both title and description but no URL, create a result with a placeholder URL
        if (currentTitle && currentDescription) {
          extractedResults.push({
            title: currentTitle,
            description: currentDescription,
            url: "#"
          });
          currentTitle = "";
          currentDescription = "";
        }
      }
    });
    
    // Add any remaining content
    if (currentTitle && currentDescription) {
      extractedResults.push({
        title: currentTitle,
        description: currentDescription,
        url: "#"
      });
    }
    
    // If our parsing logic didn't work well, create a fallback result
    if (extractedResults.length === 0 && results.trim()) {
      // Try to extract sections by looking for numbered points
      const lines = results.split('\n');
      let currentSection = { title: "", description: "", url: "#" };
      
      lines.forEach((line, index) => {
        if (line.match(/^\d+\.\s/) || line.match(/^-\s/) || line.match(/^•\s/)) {
          // This is likely a new section
          if (currentSection.title) {
            extractedResults.push({...currentSection});
          }
          currentSection = { 
            title: line.replace(/^\d+\.\s|-\s|•\s/, ''), 
            description: "", 
            url: "#" 
          };
        } else if (currentSection.title && line.trim()) {
          // Add to current section's description
          currentSection.description += line + " ";
          
          // Check for URLs in this line
          const urlMatch = line.match(/(https?:\/\/[^\s]+)/g);
          if (urlMatch) {
            currentSection.url = urlMatch[0];
          }
        }
      });
      
      // Add the last section
      if (currentSection.title) {
        extractedResults.push({...currentSection});
      }
      
      // If we still don't have results, just split the content into chunks
      if (extractedResults.length === 0) {
        const chunks = results.split('\n\n');
        chunks.forEach((chunk, index) => {
          if (chunk.trim()) {
            extractedResults.push({
              title: `Résultat ${index + 1}`,
              description: chunk.trim(),
              url: "#"
            });
          }
        });
      }
    }
    
    return extractedResults;
  };
  
  // Calculate pagination
  const totalPages = Math.ceil(parsedResults.length / resultsPerPage);
  const startIndex = (currentPage - 1) * resultsPerPage;
  const endIndex = startIndex + resultsPerPage;
  const currentResults = parsedResults.slice(startIndex, endIndex);
  
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Handle sending a question to the API
  const handleSendQuestion = async () => {
    if (!currentQuestion.trim() || !imageBase64 || !ollamaUrl) return;
    
    // Add user message to chat
    setChatMessages(prev => [
      ...prev,
      {
        role: "user",
        content: currentQuestion,
        timestamp: Date.now()
      }
    ]);
    
    const question = currentQuestion;
    setCurrentQuestion(""); // Clear input
    setIsAskingQuestion(true);
    
    try {
      const answer = await askQuestionAboutImage(
        imageBase64,
        question,
        ollamaUrl,
        selectedModel
      );
      
      // Add assistant response to chat
      setChatMessages(prev => [
        ...prev,
        {
          role: "assistant",
          content: answer,
          timestamp: Date.now()
        }
      ]);
      
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      toast.error(`Erreur: ${errorMessage}`);
      
      // Add error message to chat
      setChatMessages(prev => [
        ...prev,
        {
          role: "assistant",
          content: `Désolé, je n'ai pas pu répondre à cette question. Erreur: ${errorMessage}`,
          timestamp: Date.now()
        }
      ]);
    } finally {
      setIsAskingQuestion(false);
    }
  };
  
  // Handle key press in textarea
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendQuestion();
    }
  };

  return (
    <div className="w-full max-w-xl mx-auto mt-4 animate-slide-up">
      <Card className="glass overflow-hidden">
        <div className="p-5">
          <div className="flex items-center justify-between mb-2">
            <div className="flex gap-4">
              <button 
                onClick={() => setActiveTab("analysis")} 
                className={`text-lg font-medium pb-1 relative ${activeTab === "analysis" ? "text-blue-600" : "text-gray-500"}`}
              >
                Résultats d'analyse
                {activeTab === "analysis" && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 rounded-full"></span>}
              </button>
              <button 
                onClick={() => setActiveTab("chat")} 
                className={`text-lg font-medium pb-1 flex items-center gap-1 relative ${activeTab === "chat" ? "text-blue-600" : "text-gray-500"}`}
              >
                <Bot className="h-4 w-4" />
                Poser des questions
                {activeTab === "chat" && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 rounded-full"></span>}
              </button>
            </div>
            <div className="inline-block px-2 py-1 rounded-full bg-blue-100 text-xs font-medium text-blue-700">
              IA Ollama
            </div>
          </div>
          <Separator className="my-2" />
          
          {activeTab === "analysis" ? (
            <>
              <div className="min-h-[100px] max-h-[400px] overflow-y-auto">
                {isAnalyzing ? (
                  <div className="flex flex-col items-center justify-center py-8">
                    <div className="w-8 h-8 border-t-2 border-blue-500 rounded-full animate-spin mb-3"></div>
                    <p className="text-gray-500 text-sm">Analyse de l'image en cours...</p>
                    <p className="text-xs text-gray-400 mt-2">Cela peut prendre quelques instants selon le modèle choisi</p>
                  </div>
                ) : result ? (
                  <div className="prose prose-sm max-w-none">
                    <p className="whitespace-pre-line">{result}</p>
                  </div>
                ) : (
                  <div className="text-center py-4 text-gray-500">
                    Aucun résultat
                  </div>
                )}
              </div>
              
              {result && !isSearching && !webSearchResults && (
                <div className="mt-4 flex justify-center">
                  <Button 
                    className="flex items-center gap-2"
                    onClick={handleWebSearch}
                    disabled={isSearching || !imageBase64 || !ollamaUrl}
                  >
                    <Search className="h-4 w-4" />
                    Rechercher plus d'informations sur le web
                  </Button>
                </div>
              )}
              
              {isSearching && (
                <div className="mt-4">
                  <Separator className="my-3" />
                  <div className="flex flex-col items-center justify-center py-4">
                    <Loader2 className="h-6 w-6 animate-spin text-blue-500" />
                    <p className="text-sm mt-2">Recherche de données sur internet...</p>
                    <p className="text-xs text-gray-400 mt-1">Utilisation du modèle {selectedModel}</p>
                  </div>
                </div>
              )}
              
              {webSearchResults && parsedResults.length > 0 && (
                <div className="mt-4">
                  <Separator className="my-3" />
                  <h4 className="text-md font-medium mb-2 flex items-center gap-2">
                    <Globe className="h-4 w-4" /> 
                    Informations complémentaires
                    <span className="text-xs text-gray-500">({parsedResults.length} résultats)</span>
                  </h4>
                  
                  <div className="space-y-4">
                    {currentResults.map((result, index) => (
                      <div key={index} className="bg-blue-50/50 p-3 rounded-md border border-blue-100">
                        <div className="flex items-start justify-between">
                          <h5 className="font-medium text-blue-800">{result.title}</h5>
                          <span className="text-xs bg-blue-100 px-2 py-0.5 rounded-full">#{startIndex + index + 1}</span>
                        </div>
                        <p className="text-sm mt-1">{result.description}</p>
                        {result.url && result.url !== "#" && (
                          <a 
                            href={result.url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-xs text-blue-600 hover:underline flex items-center gap-1 mt-2"
                          >
                            <ExternalLink className="h-3 w-3" /> Visiter le site
                          </a>
                        )}
                      </div>
                    ))}
                  </div>
                  
                  {totalPages > 1 && (
                    <div className="mt-4">
                      <Pagination>
                        <PaginationContent>
                          {currentPage > 1 && (
                            <PaginationItem>
                              <PaginationPrevious 
                                onClick={() => handlePageChange(currentPage - 1)} 
                              />
                            </PaginationItem>
                          )}
                          
                          {[...Array(totalPages)].map((_, i) => (
                            <PaginationItem key={i}>
                              <PaginationLink 
                                isActive={currentPage === i + 1}
                                onClick={() => handlePageChange(i + 1)}
                              >
                                {i + 1}
                              </PaginationLink>
                            </PaginationItem>
                          ))}
                          
                          {currentPage < totalPages && (
                            <PaginationItem>
                              <PaginationNext 
                                onClick={() => handlePageChange(currentPage + 1)} 
                              />
                            </PaginationItem>
                          )}
                        </PaginationContent>
                      </Pagination>
                    </div>
                  )}
                </div>
              )}
              
              {webSearchResults && parsedResults.length === 0 && (
                <div className="mt-4">
                  <Separator className="my-3" />
                  <h4 className="text-md font-medium mb-2">Informations complémentaires</h4>
                  <div className="prose prose-sm max-w-none bg-blue-50/50 p-3 rounded-md border border-blue-100">
                    <p className="whitespace-pre-line">{webSearchResults}</p>
                  </div>
                </div>
              )}
            </>
          ) : (
            // Chat interface for asking questions
            <div className="flex flex-col h-[500px]">
              {/* Chat messages */}
              <div className="flex-1 overflow-y-auto mb-4 space-y-4">
                {chatMessages.length === 0 ? (
                  <div className="flex items-center justify-center h-full">
                    <div className="text-center p-6 max-w-md">
                      <Bot className="h-12 w-12 text-blue-500/70 mx-auto mb-4" />
                      <h3 className="text-lg font-medium mb-2">Dialogue avec l'image</h3>
                      <p className="text-gray-500 text-sm">
                        Posez des questions sur l'image et obtenez des réponses détaillées. 
                        Vous pouvez demander des informations spécifiques ou des clarifications.
                      </p>
                    </div>
                  </div>
                ) : (
                  chatMessages.map((message, index) => (
                    <div 
                      key={index} 
                      className={`flex items-start gap-3 ${
                        message.role === "user" ? "justify-end" : "justify-start"
                      }`}
                    >
                      {message.role === "assistant" && (
                        <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                          <Bot className="h-4 w-4 text-blue-600" />
                        </div>
                      )}
                      
                      <div 
                        className={`px-4 py-3 rounded-lg max-w-[80%] ${
                          message.role === "user" 
                            ? "bg-blue-500 text-white rounded-tr-none" 
                            : "bg-gray-100 text-gray-800 rounded-tl-none"
                        }`}
                      >
                        <p className="whitespace-pre-line">{message.content}</p>
                        <div className={`text-xs mt-1 ${message.role === "user" ? "text-blue-100" : "text-gray-400"}`}>
                          {new Date(message.timestamp).toLocaleTimeString()}
                        </div>
                      </div>
                      
                      {message.role === "user" && (
                        <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0">
                          <User className="h-4 w-4 text-white" />
                        </div>
                      )}
                    </div>
                  ))
                )}
                
                {isAskingQuestion && (
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                      <Bot className="h-4 w-4 text-blue-600" />
                    </div>
                    <div className="px-3 py-2 bg-gray-100 rounded-lg rounded-tl-none">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:0.4s]"></div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              
              {/* Input area */}
              <div className="flex gap-2 border-t pt-4">
                <Textarea
                  placeholder="Posez une question sur cette image..."
                  value={currentQuestion}
                  onChange={(e) => setCurrentQuestion(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="flex-grow min-h-[60px] max-h-[120px] resize-none"
                  disabled={isAskingQuestion}
                />
                <Button
                  onClick={handleSendQuestion}
                  disabled={isAskingQuestion || !currentQuestion.trim() || !imageBase64 || !ollamaUrl}
                  className="self-end"
                >
                  {isAskingQuestion ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <SendHorizontal className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};

export default ImageAnalysis;
