import React, { useEffect } from 'react';
import { IModel } from '../types';
import {
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectRoot,
  SelectTrigger,
  SelectValueText,
} from "@/components/ui/select";
import { createListCollection, SelectValueChangeDetails } from '@chakra-ui/react';

interface ModelSelectorProps {
  models: IModel[];
  selectedModel: string;
  onModelChange: (value: string) => void;
}

const ModelSelector: React.FC<ModelSelectorProps> = ({ models, selectedModel, onModelChange }) => {
 
  // Set a default model on page load or when models change
  const prevModelsRef = React.useRef<IModel[]>([]);
  useEffect(() => {
    const modelsChanged = models.length !== prevModelsRef.current.length || 
      models.some((model, index) => model.id !== prevModelsRef.current[index]?.id);
    if ((modelsChanged || !selectedModel) && models.length > 0) {
      onModelChange(models[0].id);
    }
    prevModelsRef.current = [...models];
  }, [models, selectedModel, onModelChange]);
  
  return (
    <div className="model-selector" style={{ minWidth: '300px' }}>
      <SelectRoot 
        value={[selectedModel]} 
        onValueChange={(details: SelectValueChangeDetails) => onModelChange(details.value[0])}
        collection={createListCollection({
          items: models.map((model) => ({
            label: model.id,
            value: model.id,
          })),
        })}
      >
        <SelectLabel>Selected Model:</SelectLabel>
        <SelectTrigger style={{ minWidth: '300px' }}>
          <SelectValueText placeholder="Select a model..."/>
        </SelectTrigger>
        <SelectContent style={{ minWidth: '300px' }}>
          {models.map((model) => (
            <SelectItem 
              key={model.id} 
              item={{ 
                label: model.id, 
                value: model.id 
              }}
            >
            {model.id}
          </SelectItem>
          ))}
        </SelectContent>
      </SelectRoot>
    </div>
  );
};

export default ModelSelector;
