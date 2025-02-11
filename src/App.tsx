import { useState, useEffect } from 'react';
import OpenAI from "openai";
import './App.css';

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
      const chatCompletion = await veniceClient.chat.completions.create({
        model: selectedModel, // Use the selected model ID (e.g., "gpt-3.5-turbo")
        messages: [{ role: "user", content: inputText }],
        max_tokens: 150,
      });
      const chatCompletionObj = JSON.parse(chatCompletion as unknown as string) as CompletionResponse;
      console.log("Chat Completion Response:", chatCompletionObj);
      setResponseText(chatCompletionObj.choices[0].message.content || 'No response');
      // todo: handle responses that terminate due to 'length'
      

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
            wordWrap: 'break-word', /* ADDED THIS LINE */
            whiteSpace: 'pre-wrap', /* ADDED THIS LINE */

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
