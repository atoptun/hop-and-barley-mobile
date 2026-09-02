import { memo } from 'react';
import { ProductCard, ProductCardProps } from './product-card';

export const ProductListItem = memo(function ProductListItem(props: ProductCardProps) {
  return <ProductCard {...props} />;
});
