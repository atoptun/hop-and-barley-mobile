import { fetchProducts } from '@/api/store-service';
import { Product } from '@/types/product';
import { useEffect, useState } from 'react';

export function useProducts() {
  const [data, setData] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const items = await fetchProducts();
        // throw new Error("test error");
        setData(items);
      } catch {
        setError('Something went wrong.\nTry later...');
      } finally {
        setIsLoading(false);
      }
    };

    void load();
  }, []);

  return {
    products: data,
    isLoading,
    error,
  };
}
