
import { toast } from "sonner";
import { OllamaResponse } from "@/types";

export async function analyzeImage(
  imageBase64: string,
  ollamaUrl: string
): Promise<string> {
  try {
    // First, validate the Ollama URL
    if (!ollamaUrl.startsWith("http://") && !ollamaUrl.startsWith("https://")) {
      throw new Error("Invalid Ollama URL. It must start with http:// or https://");
    }

    const normalizedUrl = ollamaUrl.endsWith("/")
      ? ollamaUrl.slice(0, -1)
      : ollamaUrl;
    
    // Prepare the request to Ollama
    const response = await fetch(`${normalizedUrl}/api/generate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "llava",
        prompt: "Describe this image in detail. What do you see? List objects, people, context, and any interesting details.",
        stream: false,
        images: [imageBase64.split(",")[1]],
      }),
    });

    if (!response.ok) {
      throw new Error(`Failed to analyze image: ${response.statusText}`);
    }

    const data = await response.json() as OllamaResponse;
    return data.response;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    toast.error(`Analysis failed: ${errorMessage}`);
    throw error;
  }
}
