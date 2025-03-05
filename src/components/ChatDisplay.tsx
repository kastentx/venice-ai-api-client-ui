import React, { useRef, useEffect } from 'react';
import {
  Box,
  Text,
  Flex,
} from '@chakra-ui/react';
import ChatMessage from './ChatMessage';

interface Message {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
  imageUrl?: string | null;
}

interface ChatDisplayProps {
  messages: Message[];
  error?: string | null;
}

const ChatDisplay: React.FC<ChatDisplayProps> = ({
  messages,
  error
}) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <Box 
      width="100%" 
      maxWidth="600px"
      height="100%"
      position="relative"
    >
      <Box
        position="absolute"
        top={0}
        bottom={0}
        left={0}
        right={0}
        overflowY="auto"
        overflowX="hidden"
        p={4}
        pb="100px"
        css={{
          '&::-webkit-scrollbar': {
            width: '4px',
          },
          '&::-webkit-scrollbar-track': {
            width: '6px',
          },
          '&::-webkit-scrollbar-thumb': {
            background: 'gray.500',
            borderRadius: '24px',
          },
        }}
      >
        {error && (
          <Box 
            p={3} 
            bg="red.100" 
            color="red.800" 
            borderRadius="md" 
            mb={4}
            borderLeft="4px solid"
            borderColor="red.500"
          >
            <Text fontWeight="bold" fontSize="sm">Error:</Text>
            <Text fontSize="sm">{error}</Text>
          </Box>
        )}

        <Flex direction="column">
          {messages.map((message) => (
            <Box key={message.id} mb={4}>
              <ChatMessage
                content={message.content}
                isUser={message.isUser}
                timestamp={message.timestamp}
                imageUrl={message.imageUrl}
              />
            </Box>
          ))}
        </Flex>
        <div ref={messagesEndRef} />
      </Box>
    </Box>
  );
};

export default ChatDisplay;
