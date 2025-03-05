import React from 'react';
import { Box, Button, useDisclosure } from '@chakra-ui/react';
import { FaBars, FaCog } from 'react-icons/fa';
import LeftDrawer from './drawers/LeftDrawer';
import RightDrawer from './drawers/RightDrawer';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const leftDrawer = useDisclosure();
  const rightDrawer = useDisclosure();
  
  return (
    <Box position="relative" minHeight="100vh">
      {/* Left Drawer */}
      <LeftDrawer 
        isOpen={leftDrawer.open} 
        onOpenChange={(openState) => leftDrawer.setOpen(openState)}
      />

      {/* Right Drawer */}
      <RightDrawer 
        isOpen={rightDrawer.open} 
        onOpenChange={(openState) => rightDrawer.setOpen(openState)}
      />

      <Box>
        {/* Drawer Toggle Buttons - Fixed position buttons */}
        <Box 
          position="fixed" 
          top="30px" 
          left="10px" 
          zIndex={20}
        >
          <Button 
            aria-label="Open menu" 
            variant="ghost" 
            color="gray.300" 
            size="sm"
            onClick={leftDrawer.onOpen}
          >
            <FaBars /> Menu
          </Button>
        </Box>

        <Box 
          position="fixed" 
          top="30px" 
          right="10px" 
          zIndex={20}
        >
          <Button 
            aria-label="Open settings" 
            variant="ghost" 
            color="gray.300" 
            size="sm" 
            onClick={rightDrawer.onOpen}
          >
            Settings <FaCog />
          </Button>
        </Box>

        {/* Children content (ChatContainer) */}
        {children}
      </Box>
    </Box>
  );
};

export default Layout;
