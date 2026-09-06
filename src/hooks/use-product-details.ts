import { fetchProductById } from '@/api/store-service';
import { Product } from '@/types/product';
import { useEffect, useState } from 'react';

export function useProductDetails(id: string) {
  const [data, setData] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      setIsLoading(true);
      setError(null);
      setData(null);

      try {
        const item = await fetchProductById(id);
        // throw Error('Connection error')
        setData(item);
      } catch {
        setError('Load product error');
      } finally {
        setIsLoading(false);
      }
    };

    void load();
  }, [id]);

  return {
    product: data,
    isLoading,
    error,
  };
}
