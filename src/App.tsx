import { useState } from 'react';
import './App.css';
import { useModels } from './hooks/useModels';
import { useImageStyles } from './hooks/useImageStyles';
import ModelSelector from './components/ModelSelector';
import ImageStyleSelector from './components/ImageStyleSelector';
import TextInput from './components/TextInput';
import ResponseDisplay from './components/ResponseDisplay';
import GenerationTypeToggle from './components/GenerationTypeToggle';
import { fetchFullResponse, generateImage } from './services/api';

function App() {
  const [error, setError] = useState<string | null>(null);
  const [inputText, setInputText] = useState('');
  const [responseText, setResponseText] = useState('');
  const [isImageGeneration, setIsImageGeneration] = useState(false);
  const [generatedImageUrl, setGeneratedImageUrl] = useState<string | null>(null);
  
  // Use our custom hooks
  const { 
    models, 
    selectedModel, 
    setSelectedModel, 
    loadModels 
  } = useModels();
  
  const { 
    imageStyles, 
    selectedImageStyle, 
    setSelectedImageStyle 
  } = useImageStyles();

  const handleModelChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedModel(event.target.value);
  };  

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(event.target.value);
  };

  const handleImageStyleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedImageStyle(event.target.value);
  };  

  const handleGenerationTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newIsImageMode = event.target.checked;
    loadModels(newIsImageMode ? 'image' : 'text');
    setIsImageGeneration(newIsImageMode);
    setInputText('');
    setResponseText('');
    setGeneratedImageUrl(null);
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
    setResponseText('Loading...');
    
    try {
      if (isImageGeneration) {
        const imageUrl = await generateImage(selectedModel, inputText, selectedImageStyle);
        setGeneratedImageUrl(imageUrl);
        setResponseText('Image generated successfully!');
      } else {
        const fullResponse = await fetchFullResponse(inputText, selectedModel, 150);
        setResponseText(fullResponse || 'No response');
      }
    } catch (apiError: any) {
      console.error("Venice API Error:", apiError);
      setError(`Venice API Error: ${apiError.message || 'Unknown error'}`);
      setResponseText('');
    }
  };

  return (
    <>
      <GenerationTypeToggle 
        isImageGeneration={isImageGeneration} 
        onChange={handleGenerationTypeChange} 
      />
      
      {isImageGeneration && (
        <ImageStyleSelector 
          imageStyles={imageStyles} 
          selectedStyle={selectedImageStyle} 
          onStyleChange={handleImageStyleChange} 
        />
      )}
      
      <ModelSelector 
        models={models} 
        selectedModel={selectedModel} 
        onModelChange={handleModelChange} 
      />
      
      <TextInput 
        inputText={inputText} 
        onInputChange={handleInputChange} 
        onSubmit={handleVeniceAIRequest}
        placeholder={isImageGeneration ? "Describe the image to generate" : "Enter your prompt"}
      />
      
      <ResponseDisplay 
        responseText={responseText}
        imageUrl={generatedImageUrl}
        isImageMode={isImageGeneration}
        error={error}
      />
    </>
  );
}

export default App;
