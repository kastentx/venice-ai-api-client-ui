import React from 'react';
import { 
  Input, 
  Button, 
  Box,
  Flex
} from '@chakra-ui/react';

interface TextInputProps {
  inputText: string;
  onInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: () => void;
  placeholder?: string;
  isLoading?: boolean;
}

const TextInput: React.FC<TextInputProps> = ({ 
  inputText, 
  onInputChange, 
  onSubmit,
  placeholder = "Enter text for API request",
  isLoading = false
}) => {
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && inputText.trim()) {
      onSubmit();
    }
  };

  return (
    <Box 
      width="100%" 
      maxWidth="600px"
      position="fixed"
      bottom="20px"
      bg="gray.800"
      p={3}
      borderRadius="lg"
      boxShadow="lg"
    >
      <Flex>
        <Input
          value={inputText}
          onChange={onInputChange}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          borderRadius="md"
          mr={2}
        />
        <Button 
          onClick={onSubmit}
          disabled={!inputText.trim()}
          loading={isLoading}
          variant="surface"
        >
          Send
        </Button>
      </Flex>
    </Box>
  );
};

export default TextInput;
