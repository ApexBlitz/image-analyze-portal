
export interface ImageAnalysisResult {
  description?: string;
  tags?: string[];
  objects?: string[];
  error?: string;
}

export interface OllamaResponse {
  model: string;
  created_at: string;
  response: string;
  done: boolean;
}

export interface OllamaModel {
  id: string;
  name: string;
  description: string;
}

export interface OpenAIMessage {
  role: "system" | "user" | "assistant";
  content: string | Array<{
    type: "text" | "image_url";
    text?: string;
    image_url?: {
      url: string;
    };
  }>;
}

export interface OpenAIResponse {
  id: string;
  object: string;
  created: number;
  model: string;
  choices: Array<{
    index: number;
    message: {
      role: string;
      content: string;
    };
    finish_reason: string;
  }>;
}
