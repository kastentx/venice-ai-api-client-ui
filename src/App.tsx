import { useState } from 'react';
import './App.css';

function App() {
  const [inputText, setInputText] = useState('');
  const [responseText, setResponseText] = useState('');

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
    
      {responseText && (
        <span>API Response: {responseText}</span>        
      )}
    </>
  );
}

export default App;
