import { fetchProductBySlug } from '@/api/store-service';
import { Product } from '@/types/product';
import { useEffect, useState } from 'react';

export function useProductDetails(slug: string) {
  const [data, setData] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      setIsLoading(true);
      setError(null);
      setData(null);

      try {
        const item = await fetchProductBySlug(slug);
        // throw Error('Connection error')
        setData(item);
      } catch {
        setError('Load product error');
      } finally {
        setIsLoading(false);
      }
    };

    void load();
  }, [slug]);

  return {
    product: data,
    isLoading,
    error,
  };
}
