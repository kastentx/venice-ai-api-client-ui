import React from 'react';
import {
  Box,
  Text,
  Image,
  Flex,
} from '@chakra-ui/react';

interface ChatMessageProps {
  content: string;
  isUser: boolean;
  timestamp?: Date;
  imageUrl?: string | null;
}

const ChatMessage: React.FC<ChatMessageProps> = ({
  content,
  isUser,
  timestamp,
  imageUrl
}) => {
  return (
    <Flex 
      justifyContent={isUser ? 'flex-end' : 'flex-start'} 
      mb={4}
      width="100%"
    >
      <Box
        maxWidth="80%"
        bg={isUser ? 'blue.500' : 'gray.700'}
        color={isUser ? 'white' : 'white'}
        p={3}
        borderRadius="lg"
        boxShadow="md"
      >
        <Text fontSize="sm">
          {content}
        </Text>
        
        {imageUrl && (
          <Image 
            src={imageUrl} 
            alt="Generated content" 
            mt={2}
            maxWidth="100%" 
            borderRadius="md" 
          />
        )}
        
        {timestamp && (
          <Text fontSize="xs" color={isUser ? 'whiteAlpha.700' : 'gray.300'} mt={1} textAlign="right">
            {timestamp.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
          </Text>
        )}
      </Box>
    </Flex>
  );
};

export default ChatMessage;