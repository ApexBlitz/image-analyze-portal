
import { toast } from "sonner";
import { OllamaResponse } from "@/types";

export async function analyzeImage(
  imageBase64: string,
  ollamaUrl: string,
  modelId: string = "llava"
): Promise<string> {
  try {
    // First, validate the Ollama URL
    if (!ollamaUrl.startsWith("http://") && !ollamaUrl.startsWith("https://")) {
      throw new Error("Invalid Ollama URL. It must start with http:// or https://");
    }

    const normalizedUrl = ollamaUrl.endsWith("/")
      ? ollamaUrl.slice(0, -1)
      : ollamaUrl;
    
    console.log("Sending request to Ollama:", `${normalizedUrl}/api/generate`);
    console.log("Using model:", modelId);
    
    // Prepare the request to Ollama with a prompt in French
    const response = await fetch(`${normalizedUrl}/api/generate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: modelId,
        prompt: "Décris cette image en détail en français. Que vois-tu ? Liste les objets, les personnes, le contexte, et tous les détails intéressants.",
        stream: false,
        images: [imageBase64.split(",")[1]],
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Ollama API error:", response.status, errorText);
      throw new Error(`Ollama API error: ${response.status} - ${errorText || response.statusText}`);
    }

    const data = await response.json() as OllamaResponse;
    return data.response;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error("Analysis error details:", errorMessage);
    toast.error(`Analyse échouée: ${errorMessage}`);
    throw error;
  }
}

// Add a function to check if a model is available
export async function checkModelAvailability(
  ollamaUrl: string,
  modelId: string
): Promise<boolean> {
  try {
    const normalizedUrl = ollamaUrl.endsWith("/")
      ? ollamaUrl.slice(0, -1)
      : ollamaUrl;
    
    const response = await fetch(`${normalizedUrl}/api/tags`);
    
    if (!response.ok) {
      throw new Error(`Failed to get models: ${response.statusText}`);
    }
    
    const data = await response.json();
    const models = data.models || [];
    
    return models.some((model: any) => model.name === modelId);
  } catch (error) {
    console.error("Error checking model availability:", error);
    return false;
  }
}

// Function to search for image information on the web with a more structured approach
export async function searchImageOnWeb(
  imageBase64: string,
  ollamaUrl: string,
  modelId: string = "deepseek-r1"
): Promise<string> {
  try {
    // Validate the Ollama URL
    if (!ollamaUrl.startsWith("http://") && !ollamaUrl.startsWith("https://")) {
      throw new Error("Invalid Ollama URL. It must start with http:// or https://");
    }

    const normalizedUrl = ollamaUrl.endsWith("/")
      ? ollamaUrl.slice(0, -1)
      : ollamaUrl;
    
    console.log("Sending web search request to Ollama with model:", modelId);
    
    // Updated prompt in French
    const prompt = `
Je te montre une image. En te basant sur ce que tu vois dans cette image:

1. Donne-moi une analyse détaillée du contenu de l'image en français.
2. Quels seraient de bons termes de recherche pour trouver plus d'informations sur ce qui est présent dans cette image?
3. Fournis une liste classée d'au moins 5 sites web ou sources potentiels où l'on pourrait trouver plus d'informations sur ce sujet.
4. Pour chaque source:
   - Donne un titre pour la source
   - Fournis une brève description de quelles informations cette source pourrait fournir
   - Si possible, suggère une URL hypothétique où ces informations pourraient être trouvées

Formate ta réponse de manière à ce que chaque source potentielle soit clairement séparée et numérotée.
La liste doit être classée par pertinence, avec les sources les plus pertinentes en premier.
Réponds en français uniquement.
`;

    const response = await fetch(`${normalizedUrl}/api/generate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: modelId,
        prompt: prompt,
        stream: false,
        images: [imageBase64.split(",")[1]],
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Ollama web search error:", response.status, errorText);
      throw new Error(`Recherche web échouée: ${response.status} - ${errorText || response.statusText}`);
    }

    const data = await response.json() as OllamaResponse;
    return data.response;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error("Web search error details:", errorMessage);
    throw error;
  }
}

// Function to ask specific questions about an image
export async function askQuestionAboutImage(
  imageBase64: string,
  question: string,
  ollamaUrl: string,
  modelId: string = "llava"
): Promise<string> {
  try {
    // First, validate the Ollama URL
    if (!ollamaUrl.startsWith("http://") && !ollamaUrl.startsWith("https://")) {
      throw new Error("Invalid Ollama URL. It must start with http:// or https://");
    }

    const normalizedUrl = ollamaUrl.endsWith("/")
      ? ollamaUrl.slice(0, -1)
      : ollamaUrl;
    
    console.log("Sending question to Ollama:", `${normalizedUrl}/api/generate`);
    console.log("Using model:", modelId);
    console.log("Question:", question);
    
    // Prepare the request to Ollama with instruction to respond in French
    const response = await fetch(`${normalizedUrl}/api/generate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: modelId,
        prompt: `${question}\n\nRéponds en français s'il te plaît.`,
        stream: false,
        images: [imageBase64.split(",")[1]],
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Ollama API error:", response.status, errorText);
      throw new Error(`Ollama API error: ${response.status} - ${errorText || response.statusText}`);
    }

    const data = await response.json() as OllamaResponse;
    return data.response;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error("Question handling error details:", errorMessage);
    toast.error(`Question échouée: ${errorMessage}`);
    throw error;
  }
}
