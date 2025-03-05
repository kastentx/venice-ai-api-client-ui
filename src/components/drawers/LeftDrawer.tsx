import React from 'react';
import { Box, Button, DrawerOpenChangeDetails } from '@chakra-ui/react';
import {
  DrawerRoot,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerCloseTrigger,
  DrawerFooter,
  DrawerTitle
} from '../ui/drawer';

// Todo: DRY this up with RightDrawer
interface LeftDrawerProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

const LeftDrawer: React.FC<LeftDrawerProps> = ({ isOpen, onOpenChange }) => {
  return (
    <DrawerRoot 
      size="sm"
      open={isOpen} 
      onOpenChange={(e: DrawerOpenChangeDetails) => onOpenChange(e.open)}
    >
      <DrawerContent 
        position="fixed" 
        insetStart="0" 
        top="94px" 
        bottom="5px"
        width="full"
        bg="gray.800"
        borderRight="1px" 
        borderColor="gray.700"
      >
        <DrawerHeader>
          <DrawerTitle>Conversations</DrawerTitle>
          <DrawerCloseTrigger />
        </DrawerHeader>
        <DrawerBody>
          <Box color="white">
            <p>Conversation history will go here</p>
            {/* Conversation list would go here */}
          </Box>
        </DrawerBody>
        <DrawerFooter>
          <Button size="sm" variant="outline">New Chat</Button>
        </DrawerFooter>
      </DrawerContent>
    </DrawerRoot>
  );
};

export default LeftDrawer;
