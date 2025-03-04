import React from 'react';
import { IModel } from '../types';

interface ModelSelectorProps {
  models: IModel[];
  selectedModel: string;
  onModelChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

const ModelSelector: React.FC<ModelSelectorProps> = ({ models, selectedModel, onModelChange }) => {
  return (
    <div className="model-selector">
      <select value={selectedModel} onChange={onModelChange}>
        <option value="">Select a Model</option>
        {models.map((model) => (
          <option key={model.id} value={model.id}>
            {model.id}
          </option>
        ))}
      </select>
      {selectedModel && (
        <div className="selected-model">
          Selected Model: {selectedModel}
        </div>
      )}
    </div>
  );
};

export default ModelSelector;
