import { useState, useEffect } from 'react';
import { IModel } from '../types';
import { fetchModels } from '../services/api';

export function useModels(initialType: string = 'text') {
  const [models, setModels] = useState<IModel[]>([]);
  const [selectedModel, setSelectedModel] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const loadModels = async (modelType: string = 'text') => {
    setLoading(true);
    setError(null);
    try {
      const modelData = await fetchModels(modelType);
      setModels(modelData);
    } catch (e: any) {
      setError(e.message || 'An error occurred while fetching models');
      setModels([]);
    } finally {
      setLoading(false);
    }
  };

  // Load models on initial render
  useEffect(() => {
    loadModels(initialType);
  }, [initialType]);

  return { 
    models, 
    selectedModel, 
    setSelectedModel, 
    loading, 
    error,
    loadModels
  };
}
