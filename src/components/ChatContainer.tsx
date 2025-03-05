import React, { useState } from 'react';
import { Box } from '@chakra-ui/react';
import { SwitchCheckedChangeDetails } from '@chakra-ui/react';
import { useModels } from '../hooks/useModels';
import { useImageStyles } from '../hooks/useImageStyles';
import { useConversation } from '../context/ConversationContext';
import ChatDisplay from './ChatDisplay';
import TextInput from './TextInput';
import Header from './Header';

const ChatContainer: React.FC = () => {
  const [inputText, setInputText] = useState('');
  const [isImageGeneration, setIsImageGeneration] = useState(false);
  
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

  const {
    messages,
    error,
    isLoading,
    handleSendMessage
  } = useConversation();

  const handleModelChange = (modelId: string) => {
    setSelectedModel(modelId);
  };  

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(event.target.value);
  };

  const handleImageStyleChange = (imageStyle: string) => {
    setSelectedImageStyle(imageStyle);
  };  

  const handleModeChange = (event: SwitchCheckedChangeDetails) => {
    const newIsImageMode = event.checked;
    loadModels(newIsImageMode ? 'image' : 'text');
    setIsImageGeneration(newIsImageMode);
    setInputText('');
    setSelectedImageStyle('');
  };

  const handleVeniceAIRequest = async () => {
    await handleSendMessage(
      inputText,
      selectedModel,
      isImageGeneration,
      selectedImageStyle
    );
    setInputText(''); // Clear input after sending
  };

  return (
    <Box
      height="100vh"
      minWidth="600px"
      bg="gray.900"
      color="white"
      display="flex"
      flexDirection="column"
      alignItems="center"
      overflow="hidden"
    >
      <Header
        isImageGeneration={isImageGeneration}
        models={models}
        selectedModel={selectedModel}
        imageStyles={imageStyles}
        selectedImageStyle={selectedImageStyle}
        onModeChange={handleModeChange}
        onModelChange={handleModelChange}
        onStyleChange={handleImageStyleChange}
      />
      
      <Box 
        flex="1"
        width="100%"
        display="flex"
        justifyContent="center"
        position="relative"
        overflow="hidden"
        mb="40px" // Increased margin bottom to prevent textInput overlap
        mt="80px" // Increased margin top to prevent header overlap
        pt="5px" // Increased padding top to prevent header overlap
      >
        <ChatDisplay 
          messages={messages}
          error={error}
        />
      </Box>
      
      <TextInput 
        inputText={inputText} 
        onInputChange={handleInputChange} 
        onSubmit={handleVeniceAIRequest}
        placeholder={isImageGeneration ? "Describe the image to generate" : "Enter your prompt"}
        isLoading={isLoading}
      />
    </Box>
  );
};

export default ChatContainer;