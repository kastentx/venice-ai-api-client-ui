import { useState, useEffect } from 'react';
import { fetchImageStyles } from '../services/api';

export function useImageStyles() {
  const [imageStyles, setImageStyles] = useState<string[]>([]);
  const [selectedImageStyle, setSelectedImageStyle] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const loadImageStyles = async () => {
    setLoading(true);
    setError(null);
    try {
      const styles = await fetchImageStyles();
      setImageStyles(styles);
    } catch (e: any) {
      setError(e.message || 'An error occurred while fetching image styles');
      setImageStyles([]);
    } finally {
      setLoading(false);
    }
  };

  // Load image styles on initial render
  useEffect(() => {
    loadImageStyles();
  }, []);

  return { 
    imageStyles, 
    selectedImageStyle, 
    setSelectedImageStyle, 
    loading, 
    error 
  };
}
