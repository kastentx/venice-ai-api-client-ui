import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import './App.css';
import { useModels } from './hooks/useModels';
import { useImageStyles } from './hooks/useImageStyles';
import TextInput from './components/TextInput';
import ResponseDisplay from './components/ResponseDisplay';
import Header from './components/Header';
import { fetchFullResponse, generateImage } from './services/api';
import { Box } from '@chakra-ui/react';

// Define the Message interface
interface Message {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
  imageUrl?: string | null;
}

function App() {
  const [error, setError] = useState<string | null>(null);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isImageGeneration, setIsImageGeneration] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  
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
  };

  const handleVeniceAIRequest = async () => {
    // Existing code...
    if (!selectedModel) {
      setError('Please select a model.');
      return;
    }

    if (!inputText.trim()) {
      setError('Please enter some text.');
      return;
    }

    setError(null);
    setIsLoading(true);
    
    // Add user message
    const userMessage: Message = {
      id: uuidv4(),
      content: inputText,
      isUser: true,
      timestamp: new Date()
    };
    
    setMessages(prevMessages => [...prevMessages, userMessage]);
    setInputText(''); // Clear input after sending
    
    try {
      // Existing code for image generation and text generation...
      if (isImageGeneration) {
        // Add placeholder AI message
        const placeholderMessage: Message = {
          id: uuidv4(),
          content: "Generating image...",
          isUser: false,
          timestamp: new Date()
        };
        setMessages(prevMessages => [...prevMessages, placeholderMessage]);
        
        const imageUrl = await generateImage(selectedModel, inputText, selectedImageStyle);
        
        // Update messages with AI response containing image
        setMessages(prevMessages => {
          const updatedMessages = [...prevMessages];
          const lastIndex = updatedMessages.length - 1;
          
          // Replace the placeholder with actual response
          updatedMessages[lastIndex] = {
            ...updatedMessages[lastIndex],
            content: "Image generated successfully!",
            imageUrl: imageUrl,
            timestamp: new Date()
          };
          
          return updatedMessages;
        });
      } else {
        // Add placeholder AI message
        const placeholderMessage: Message = {
          id: uuidv4(),
          content: "Thinking...",
          isUser: false,
          timestamp: new Date()
        };
        setMessages(prevMessages => [...prevMessages, placeholderMessage]);
        
        const fullResponse = await fetchFullResponse(inputText, selectedModel, 150);
        
        // Update messages with AI response
        setMessages(prevMessages => {
          const updatedMessages = [...prevMessages];
          const lastIndex = updatedMessages.length - 1;
          
          // Replace the placeholder with actual response
          updatedMessages[lastIndex] = {
            ...updatedMessages[lastIndex],
            content: fullResponse || 'No response',
            timestamp: new Date()
          };
          
          return updatedMessages;
        });
      }
    } catch (apiError: any) {
      console.error("Venice API Error:", apiError);
      setError(`Venice API Error: ${apiError.message || 'Unknown error'}`);
      
      // Remove the placeholder message if there was an error
      setMessages(prevMessages => {
        return prevMessages.filter(msg => msg.isUser || msg.content !== "Thinking..." && msg.content !== "Generating image...");
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box
      minHeight="100vh"
      bg="gray.900"
      color="white"
      display="flex"
      flexDirection="column"
      alignItems="center"
      pt="70px" // Add padding to account for the fixed header
    >
      <Header
        isImageGeneration={isImageGeneration}
        models={models}
        selectedModel={selectedModel}
        imageStyles={imageStyles}
        selectedImageStyle={selectedImageStyle}
        onGenerationTypeChange={handleGenerationTypeChange}
        onModelChange={handleModelChange}
        onStyleChange={handleImageStyleChange}
      />
      
      <ResponseDisplay 
        messages={messages}
        error={error}
      />
      
      <Box height="80px" /> {/* Spacer for fixed input */}
      
      <TextInput 
        inputText={inputText} 
        onInputChange={handleInputChange} 
        onSubmit={handleVeniceAIRequest}
        placeholder={isImageGeneration ? "Describe the image to generate" : "Enter your prompt"}
        isLoading={isLoading}
      />
    </Box>
  );
}

export default App;
