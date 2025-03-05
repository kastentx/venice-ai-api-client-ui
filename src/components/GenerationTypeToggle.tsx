import React from 'react';
import { SwitchCheckedChangeDetails } from '@chakra-ui/react';
import { Switch } from '@/components/ui/switch';
import { FaImage } from 'react-icons/fa';
import { IoMdText } from "react-icons/io";

interface GenerationTypeToggleProps {
  isImageGeneration: boolean;
  onModeChange: (event: SwitchCheckedChangeDetails) => void;
}

const GenerationTypeToggle: React.FC<GenerationTypeToggleProps> = ({ isImageGeneration, onModeChange }) => {
  const switchLabel = isImageGeneration ? 'Image Mode' : 'Text Mode';
  return (
    <div className="generation-type-toggle">
      <Switch
        id="generation-type-toggle"
        checked={isImageGeneration}
        onCheckedChange={onModeChange}
        label={switchLabel}
        size="lg"
        thumbLabel={{
          on: <FaImage />,
          off : < IoMdText /> 
        }}
       >
        {switchLabel}
       </Switch>
    </div>
  );
};

export default GenerationTypeToggle;
