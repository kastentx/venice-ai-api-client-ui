import React from 'react';

interface GenerationTypeToggleProps {
  isImageGeneration: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const GenerationTypeToggle: React.FC<GenerationTypeToggleProps> = ({ isImageGeneration, onChange }) => {
  return (
    <div className="generation-type-toggle">
      <label>
        Generate Image:
        <input
          type="checkbox"
          checked={isImageGeneration}
          onChange={onChange}
        />
      </label>
    </div>
  );
};

export default GenerationTypeToggle;
