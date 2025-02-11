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

function App() {
  // model select
  const [models, setModels] = useState<Model[]>([]);
  const [selectedModel, setSelectedModel] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  
  // text input field
  const [inputText, setInputText] = useState('');
  const [responseText, setResponseText] = useState('');

  const openai = new OpenAI({
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

  const handleApiRequest = async () => {
    // Mock API request
    try {
      const mockApiResponse = await new Promise((resolve) => {
        setTimeout(() => {
          resolve(`Response from API - ${inputText}`);
        }, 500); // Simulate API latency
      });

      setResponseText(mockApiResponse as string);
    } catch (error) {
      setResponseText('Error occurred while fetching data.');
    }
  };

  return (
    <>
      <input
        type="text"
        value={inputText}
        onChange={handleInputChange}
        placeholder="Enter text for API request"
      />
      <br/>
      <button onClick={handleApiRequest}>Send to API</button>
      <br/>
      {responseText && (
        <span>API Response: {responseText}</span>        
      )}
      <br/>
      <br/>
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
      {error && (
        <span>Error: {error}</span>
      )}
      
    </>
  );
}

export default App;
