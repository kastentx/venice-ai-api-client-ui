import React from 'react';
import {
  Box,
  Text,
  Image,
  Flex,
} from '@chakra-ui/react';

interface ResponseDisplayProps {
  responseText?: string;
  imageUrl?: string | null;
  isImageMode: boolean;
  error?: string | null;
}

const ResponseDisplay: React.FC<ResponseDisplayProps> = ({
  responseText,
  imageUrl,
  isImageMode,
  error
}) => {
  return (
    <Box width="100%" maxWidth="600px" mt={4}>
      {error && (
        <Box 
          p={4} 
          bg="red.100" 
          color="red.800" 
          borderRadius="md" 
          mb={4}
          borderLeft="4px solid"
          borderColor="red.500"
        >
          <Text fontWeight="bold" fontSize="md">Error:</Text>
          <Text>{error}</Text>
        </Box>
      )}

      {responseText && (
        <Box mb={4}>
          <Box 
            bg="gray.900"
            color="green.400"
            fontFamily="mono"
            p={4}
            borderRadius="md"
            border="1px"
            borderColor="green.800"
            maxHeight="400px"
            wordBreak="break-word"
            whiteSpace="pre-wrap"
            overflowY="auto"
          >
            {responseText}
          </Box>
        </Box>        
      )}
      
      {isImageMode && imageUrl && (
        <Flex justifyContent="center" mt={4}>
          <Image 
            src={imageUrl} 
            alt="Generated" 
            maxWidth="100%" 
            borderRadius="md"
            boxShadow="lg"
          />
        </Flex>
      )}
    </Box>
  );
};

export default ResponseDisplay;
