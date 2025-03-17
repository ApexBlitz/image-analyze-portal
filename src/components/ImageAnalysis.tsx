
import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Search, Loader2, Globe, ExternalLink } from "lucide-react";
import { searchImageOnWeb } from "@/lib/api";
import { toast } from "sonner";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

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
      // The AI model returns unstructured text, so we'll try to extract links and descriptions
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

  return (
    <div className="w-full max-w-xl mx-auto mt-4 animate-slide-up">
      <Card className="glass overflow-hidden">
        <div className="p-5">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-medium">Résultats d'analyse</h3>
            <div className="inline-block px-2 py-1 rounded-full bg-blue-100 text-xs font-medium text-blue-700">
              IA Ollama
            </div>
          </div>
          <Separator className="my-2" />
          
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
        </div>
      </Card>
    </div>
  );
};

export default ImageAnalysis;
