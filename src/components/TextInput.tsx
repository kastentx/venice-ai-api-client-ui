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
}

const TextInput: React.FC<TextInputProps> = ({ 
  inputText, 
  onInputChange, 
  onSubmit,
  placeholder = "Enter text for API request" 
}) => {
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      onSubmit();
    }
  };

  return (
    <Box mb={4} width="100%" maxWidth="600px">
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
          colorScheme="blue"
          onClick={onSubmit}
          disabled={!inputText.trim()}
        >
          Send
        </Button>
      </Flex>
    </Box>
  );
};

export default TextInput;
