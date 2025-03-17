
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
    
    // Prepare the request to Ollama
    const response = await fetch(`${normalizedUrl}/api/generate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: modelId,
        prompt: "Describe this image in detail. What do you see? List objects, people, context, and any interesting details.",
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
