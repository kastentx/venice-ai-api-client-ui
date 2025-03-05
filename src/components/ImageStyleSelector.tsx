import React, { useEffect } from 'react';
import {
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectRoot,
  SelectTrigger,
  SelectValueText,
} from "@/components/ui/select";
import { createListCollection, SelectValueChangeDetails } from '@chakra-ui/react';

interface ImageStyleSelectorProps {
  imageStyles: string[];
  selectedStyle: string;
  onStyleChange: (imageStyle: string) => void;
}

const ImageStyleSelector: React.FC<ImageStyleSelectorProps> = ({ 
  imageStyles, 
  selectedStyle, 
  onStyleChange 
}) => {
  const allStyles = ['None', ...imageStyles];

  useEffect(() => {
    if (!selectedStyle && allStyles.length > 0) {
      onStyleChange(allStyles[0]);
    }
  }, [allStyles, selectedStyle, onStyleChange]);

  return (
    <div className="image-style-selector" style={{ minWidth: '250px' }}>
      <SelectRoot 
        value={[selectedStyle]} 
        onValueChange={(details: SelectValueChangeDetails) => onStyleChange(details.value[0])}
        collection={createListCollection({
          items: allStyles.map((style) => ({
            label: style,
            value: style,
          })),
        })}
      >
        <SelectLabel>Selected Image Style:</SelectLabel>
        <SelectTrigger style={{ minWidth: '250px' }}>
          <SelectValueText placeholder="Select Image Style..."/>
        </SelectTrigger>
        <SelectContent style={{ minWidth: '250px' }}>
          {allStyles.map((style) => (
            <SelectItem
              key={style}
              item={{
                label: style,
                value: style,
              }}
            >
              {style}
            </SelectItem>
          ))}
        </SelectContent>
      </SelectRoot>
    </div>
  );
};

export default ImageStyleSelector;
