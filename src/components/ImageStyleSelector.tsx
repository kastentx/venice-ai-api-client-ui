import React from 'react';

interface ImageStyleSelectorProps {
  imageStyles: string[];
  selectedStyle: string;
  onStyleChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

const ImageStyleSelector: React.FC<ImageStyleSelectorProps> = ({ 
  imageStyles, 
  selectedStyle, 
  onStyleChange 
}) => {
  return (
    <div className="image-style-selector">
      <select value={selectedStyle} onChange={onStyleChange}>
        <option value="">Select Image Style</option>
        {imageStyles.map((style) => (
          <option key={style} value={style}>
            {style}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ImageStyleSelector;
