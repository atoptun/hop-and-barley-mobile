import { fetchProductBySlug } from '@/api/store-service';
import { Product } from '@/types/product';
import { useEffect, useState } from 'react';

export function useProductDetails(slug: string) {
  const [data, setData] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let ignore = false;

    const load = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const item = await fetchProductBySlug(slug);
        // throw Error('Connection error')
        if (!ignore) setData(item);
      } catch {
        if (!ignore) setError('Something went wrong.\nTry later...');
      } finally {
        if (!ignore) setIsLoading(false);
      }
    };

    void load();

    return () => {
      ignore = true;
    };
  }, [slug]);

  return {
    product: data,
    isLoading,
    error,
  };
}
