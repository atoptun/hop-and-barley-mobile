import { fetchProducts } from '@/api/store-service';
import { Product } from '@/types/product';
import { useEffect, useState } from 'react';

export function useProducts() {
  const [data, setData] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let ignore = false;

    const load = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const items = await fetchProducts();
        // throw new Error("test error");
        if (!ignore) setData(items);
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
  }, []);

  return {
    products: data,
    isLoading,
    error,
  };
}
