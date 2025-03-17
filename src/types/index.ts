
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
