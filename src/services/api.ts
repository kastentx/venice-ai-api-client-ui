import OpenAI from "openai";
import { IModel } from "../types";
import { ChatCompletionMessageParam } from "openai/src/resources/index.js";

const BASE_URL = import.meta.env.VITE_VENICE_BASE_URL;
const API_KEY = import.meta.env.VITE_VENICE_API_KEY;

const DEFAULT_IMAGE_STYLE = 'Default';

export const veniceClient = new OpenAI({
  baseURL: BASE_URL,
  apiKey: API_KEY,
  dangerouslyAllowBrowser: true, // needed for vite, but not best practice
});

export async function fetchModels(modelType: string = 'text'): Promise<IModel[]> {
  const options = {
    method: 'GET',
    headers: { Authorization: `Bearer ${API_KEY}` }
  };
  
  const response = await fetch(`${BASE_URL}/models?type=${modelType}`, options);
  
  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }
  
  const data = await response.json();
  if (data.data && Array.isArray(data.data)) {
    return data.data as IModel[];
  }
  
  throw new Error('Invalid data format from API');
}

export async function fetchImageStyles(): Promise<string[]> {
  const options = { method: 'GET', headers: { Authorization: `Bearer ${API_KEY}` } };
  
  const response = await fetch(`${BASE_URL}/image/styles`, options);
  
  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }
  
  const data = await response.json();
  if (Array.isArray(data.data)) {
    return [DEFAULT_IMAGE_STYLE, ...data.data as string[]];
  }
  
  throw new Error('Invalid image styles format from API');
}

export async function fetchFullResponse(
  userInput: string, 
  model: string, 
  maxTokens: number
): Promise<string> {
  let fullResponse = "";
  let stopReason = "length";
  const maxRetries = 10;
  let messages: ChatCompletionMessageParam[] = [{ role: "user", content: userInput }];
  let retries = 0;

  while (stopReason === "length" && retries < maxRetries) {
    try {
      const response = await veniceClient.chat.completions.create({
        model,
        messages,
        max_tokens: maxTokens,
      });
      
      // Directly access the response object (no need to parse as JSON)
      const chunk = response.choices[0].message.content || "";
      messages.push({ role: "assistant", content: chunk });
      fullResponse += chunk;
      
      stopReason = response.choices[0].finish_reason || "";
      
      if (stopReason === "length") {
        messages.push({ 
          role: "user",
          content: "Continue from exactly where you stopped. Provide a brief summary of the remaining information. Do not repeat any previous content." 
        });
      }
    } catch (error) {
      console.error("Error fetching response:", error);
      break;
    }
    
    retries++;
  }
  
  return fullResponse;
}

export async function generateImage(
  model: string,
  prompt: string,
  stylePreset?: string
): Promise<string> {
  const options = {
    method: 'POST',
    headers: { Authorization: `Bearer ${API_KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model,
      prompt,
      hide_watermark: true,
      style_preset: stylePreset && stylePreset !== DEFAULT_IMAGE_STYLE ? stylePreset : undefined,
    })
  };

  const response = await (await fetch(`${BASE_URL}/image/generate`, options)).json();

  if (response.images && response.images.length > 0) {
    return `data:image/png;base64,${response.images[0]}`;
  }
  
  throw new Error('No image was generated');
}
