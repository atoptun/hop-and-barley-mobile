import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '@/store/store';

const selectCartItemsMap = (state: RootState) => state.cart.items;

export const selectCartItemsList = createSelector([selectCartItemsMap], itemsMap =>
  Object.values(itemsMap)
);

export const selectCartTotalCount = createSelector([selectCartItemsList], items =>
  items.reduce((sum, item) => sum + item.quantity, 0)
);

export const selectCartTotalPrice = createSelector([selectCartItemsList], items =>
  items.reduce((sum, item) => sum + item.price * item.quantity, 0)
);

export const selectItemQuantity = (slug?: string | null) => (state: RootState) => {
  if (!slug) return 0;
  return state.cart.items[slug]?.quantity ?? 0;
};
