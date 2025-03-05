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

interface RightDrawerProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

const RightDrawer: React.FC<RightDrawerProps> = ({ isOpen, onOpenChange }) => {
  return (
    <DrawerRoot 
      size="sm"
      open={isOpen} 
      onOpenChange={(e: DrawerOpenChangeDetails) => onOpenChange(e.open)}
    >
      <DrawerContent 
        position="fixed" 
        insetEnd="0" 
        top="94px" 
        bottom="5px"
        width="full"
        bg="gray.800"
        borderLeft="1px" 
        borderColor="gray.700"
      >
        <DrawerHeader>
          <DrawerTitle>Settings</DrawerTitle>
          <DrawerCloseTrigger />
        </DrawerHeader>
        <DrawerBody>
          <Box color="white">
            <p>Settings options will go here</p>
            {/* Settings options would go here */}
          </Box>
        </DrawerBody>
        <DrawerFooter>
          <Button size="sm" variant="outline">Apply</Button>
        </DrawerFooter>
      </DrawerContent>
    </DrawerRoot>
  );
};

export default RightDrawer;
