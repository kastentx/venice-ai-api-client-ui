import { useState, useEffect } from 'react';
import OpenAI from "openai";
import './App.css';
import { ChatCompletionMessageParam } from 'openai/src/resources/index.js';

const BASE_URL = import.meta.env.VITE_VENICE_BASE_URL;
const API_KEY = import.meta.env.VITE_VENICE_API_KEY;

interface Model {
  id: string;
  type: string;
  object: string;
  created: number;
  owned_by: string;
  model_spec: {
    availableContextTokens: number;
    traits: string[];
    modelSource: string;
  };
}

interface CompletionResponse {
  id: string;
  object: string;
  created: number;
  model: string;
  choices: {
    index: number;
    message: {
      role: string;
      content: string;
      reasoning_content: null | string;
      tool_calls: any[];
    };
    logprobs: null | any;
    finish_reason: string;
    stop_reason: null | string;
  }[];
  usage: {
    prompt_tokens: number;
    total_tokens: number;
    completion_tokens: number;
    prompt_tokens_details: null | any;
  };
}

function App() {
  const [error, setError] = useState<string | null>(null);
  // model select
  const [models, setModels] = useState<Model[]>([]);
  const [selectedModel, setSelectedModel] = useState<string>('');
  // text input field
  const [inputText, setInputText] = useState('');
  const [responseText, setResponseText] = useState('');

  const veniceClient = new OpenAI({
    baseURL: BASE_URL,
    apiKey: API_KEY,
    dangerouslyAllowBrowser: true, // needed for vite, but not best practice
  });

  const fetchModels = async () => {
    const options = {method: 'GET', headers: {Authorization: `Bearer ${API_KEY}`}};
    try {
      const response = await fetch(BASE_URL + '/models', options);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      if (data.data && Array.isArray(data.data)) {
        setModels(data.data as Model[]);
      } else {
        throw new Error('Invalid data format from API');
      }
      setError(null);
    } catch (e: any) {
      setError(e.message || 'An error occurred');
      setModels([]);
      console.error("Fetch error:", e);
    }
  };

  useEffect(() => {
    fetchModels(); // Fetch models when the component mounts
  }, []);

  const handleModelChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedModel(event.target.value);
  };  

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(event.target.value);
  };

  async function fetchFullResponse(openai: OpenAI, userInput: string, model: string, maxTokens: number) {
    let fullResponse = ""; // To store the complete response
    let stopReason = "length"; // Initial stop reason
    const maxRetries = 10; // Limit retries to avoid infinite loops
    let messages: ChatCompletionMessageParam[] = [{ role: "user", content: userInput }];
    let retries = 0;
  
    while (stopReason === "length" && retries < maxRetries) {
      try {
        const response = await openai.chat.completions.create({
          model,
          messages,
          max_tokens: maxTokens,
        });
        const responseObj = JSON.parse(response as unknown as string) as CompletionResponse;
        // Append the content of this chunk to the full response
        const chunk = responseObj.choices[0].message?.content || "";
        messages.push({ role: "assistant", content: chunk });
        fullResponse += chunk;
        console.log("responseObj", responseObj);
        console.log("chunk", chunk);
  
        // Check the stop reason
        stopReason = responseObj.choices[0].finish_reason;
  
        // If the stop reason is "length", add a continuation message
        if (stopReason === "length") {
          messages.push({ 
            role: "user",
            content: "Continue from exactly where you stopped. Provide a brief summary of the remaining information. Do not repeat any previous content." 
          });
        }
  
      } catch (error) {
        console.error("Error fetching response:", error);
        break; // Exit loop on error
      }
  
      retries++;
    }
  
    if (retries >= maxRetries) {
      console.warn("Reached maximum retries for fetching full response.");
    }
  
    return fullResponse;
  }

  const handleVeniceAIRequest = async () => {
    if (!selectedModel) {
      setError('Please select a model.');
      return;
    }

    if (!inputText) {
      setError('Please enter some text.');
      return;
    }

    setError(null);
    
    setResponseText('Loading...');
    try {
      // Example API requests using the selected model
      // You can uncomment the one you need based on your use case

      // 1. Completions API (for text generation):
      // const completion = await veniceClient.completions.create({
      //   model: selectedModel,  // Use the selected model ID
      //   prompt: inputText,
      //   max_tokens: 150,
      // });
      // setResponseText(completion.choices[0].text);

      // 2. Chat Completions API (for conversational models like GPT-3.5 Turbo, GPT-4):

      // using the completions response interface as the response type
      const fullResponse = await fetchFullResponse(veniceClient, inputText, selectedModel, 150);
      setResponseText(fullResponse || 'No response');

      // 3. Embeddings API (for creating vector embeddings):
      // const embeddings = await veniceClient.embeddings.create({
      //   model: "text-embedding-ada-002", // Usually a specific embedding model
      //   input: inputText,
      // });
      // // The embeddings are in embeddings.data[0].embedding
      // setResponseText(JSON.stringify(embeddings.data[0].embedding)); // Display as JSON

    } catch (apiError: any) {
      console.error("Venice API Error:", apiError);
      setResponseText(`Venice API Error: ${apiError.message || 'Unknown error'}`);
      setError(`Venice API Error: ${apiError.message || 'Unknown error'}`);
    }
  };

  return (
    <>
      <select value={selectedModel} onChange={handleModelChange}>
          <option value="">Select a Model</option>
          {models.map((model) => (
            <option key={model.id} value={model.id}>
              {model.id}
            </option>
          ))}
      </select>
      <br/>
      <br/>
      {selectedModel && (
        <span>Selected Model: {selectedModel}</span>
      )}
      <br/>
      <br/>
      <input
          type="text"
          value={inputText}
          onChange={handleInputChange}
          placeholder="Enter text for API request"
      />
      <button onClick={handleVeniceAIRequest}>
        Send to VeniceAI
      </button>
      
      {error && (
        <div className="error">
          Error: {error}
        </div>
      )}

      {responseText && (
        <div className="response">
          <div 
            style={{ 
            backgroundColor: 'black',
            color: '#00ff00', // Terminal green
            fontFamily: 'monospace',
            padding: '20px',
            borderRadius: '4px',
            margin: '20px 0',
            border: '1px solid #003300',
            maxWidth: '600px',
            maxHeight: '400px',
            wordWrap: 'break-word',
            whiteSpace: 'pre-wrap',
            overflowY: 'auto',
            }}
          >
            {responseText}
          </div>
        </div>        
      )}
      
    </>
  );
}

export default App;
