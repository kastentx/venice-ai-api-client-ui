import React from 'react';
import {
  Box,
  Flex,
  Text,
} from '@chakra-ui/react';
import { IModel } from '../types';
import ModelSelector from './ModelSelector';
import ImageStyleSelector from './ImageStyleSelector';
import GenerationTypeToggle from './GenerationTypeToggle';

interface HeaderProps {
  isImageGeneration: boolean;
  models: IModel[];
  selectedModel: string;
  imageStyles?: string[];
  selectedImageStyle?: string;
  onGenerationTypeChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onModelChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  onStyleChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

const Header: React.FC<HeaderProps> = ({
  isImageGeneration,
  models,
  selectedModel,
  imageStyles = [],
  selectedImageStyle = '',
  onGenerationTypeChange,
  onModelChange,
  onStyleChange
}) => {
  return (
    <Box
      position="fixed"
      top="0"
      left="0"
      right="0"
      bg="gray.800"
      boxShadow="md"
      zIndex="10"
      p={3}
    >
      <Flex
        maxWidth="1200px"
        mx="auto"
        alignItems="center"
        justifyContent="space-between"
      >
        <Text
          fontSize="xl"
          fontWeight="bold"
          color="blue.300"
        >
          MyVCU AI Chatbot
        </Text>

        <Flex alignItems="center" flexWrap="wrap" justifyContent="flex-end">
          <Box mr={4}>
            <GenerationTypeToggle
              isImageGeneration={isImageGeneration}
              onChange={onGenerationTypeChange}
            />
          </Box>
          
          <Box mr={4}>
            <ModelSelector
              models={models}
              selectedModel={selectedModel}
              onModelChange={onModelChange}
            />
          </Box>
          
          {isImageGeneration && onStyleChange && (
            <Box>
              <ImageStyleSelector
                imageStyles={imageStyles}
                selectedStyle={selectedImageStyle}
                onStyleChange={onStyleChange}
              />
            </Box>
          )}
        </Flex>
      </Flex>
    </Box>
  );
};

export default Header;