import React, { createContext, useState, useContext, ReactNode } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { IMessage } from '../types';
import { fetchFullResponse, generateImage } from '../services/api';

interface ConversationContextType {
  messages: IMessage[];
  error: string | null;
  isLoading: boolean;
  handleSendMessage: (input: string, selectedModel: string, isImageGeneration: boolean, selectedImageStyle?: string) => Promise<void>;
  clearMessages: () => void;
}

const ConversationContext = createContext<ConversationContextType | undefined>(undefined);

export const ConversationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = async (input: string, selectedModel: string, isImageGeneration: boolean, selectedImageStyle: string = '') => {
    if (!selectedModel) {
      setError('Please select a model.');
      return;
    }

    if (!input.trim()) {
      setError('Please enter some text.');
      return;
    }

    setError(null);
    setIsLoading(true);
    
    // Add user message
    const userMessage: IMessage = {
      id: uuidv4(),
      content: input,
      isUser: true,
      timestamp: new Date()
    };
    
    setMessages(prevMessages => [...prevMessages, userMessage]);
    
    try {
      if (isImageGeneration) {
        const placeholderMessage: IMessage = {
          id: uuidv4(),
          content: "Generating image...",
          isUser: false,
          timestamp: new Date()
        };
        setMessages(prevMessages => [...prevMessages, placeholderMessage]);
        
        const imageUrl = await generateImage(selectedModel, input, selectedImageStyle);
        
        setMessages(prevMessages => {
          const updatedMessages = [...prevMessages];
          const lastIndex = updatedMessages.length - 1;
          updatedMessages[lastIndex] = {
            ...updatedMessages[lastIndex],
            content: "Image generated successfully!",
            imageUrl: imageUrl,
            timestamp: new Date()
          };
          return updatedMessages;
        });
      } else {
        const placeholderMessage: IMessage = {
          id: uuidv4(),
          content: "Thinking...",
          isUser: false,
          timestamp: new Date()
        };
        setMessages(prevMessages => [...prevMessages, placeholderMessage]);
        
        const fullResponse = await fetchFullResponse(input, selectedModel, 150);
        
        setMessages(prevMessages => {
          const updatedMessages = [...prevMessages];
          const lastIndex = updatedMessages.length - 1;
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
      
      setMessages(prevMessages => {
        return prevMessages.filter(msg => msg.isUser || (msg.content !== "Thinking..." && msg.content !== "Generating image..."));
      });
    } finally {
      setIsLoading(false);
    }
  };

  const clearMessages = () => {
    setMessages([]);
    setError(null);
  };

  return (
    <ConversationContext.Provider value={{
      messages,
      error,
      isLoading,
      handleSendMessage,
      clearMessages
    }}>
      {children}
    </ConversationContext.Provider>
  );
};

export const useConversation = () => {
  const context = useContext(ConversationContext);
  if (context === undefined) {
    throw new Error('useConversation must be used within a ConversationProvider');
  }
  return context;
};