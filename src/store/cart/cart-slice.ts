import { CartItem } from '@/types/cart';
import { Product, ProductCardItem } from '@/types/product';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CartState {
  items: Record<string, CartItem>;
}

const initialState: CartState = {
  items: {},
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<ProductCardItem>) => {
      const product = action.payload;
      const existing = state.items[product.slug];
      if (existing) {
        existing.quantity += 1;
      } else {
        state.items[product.slug] = {
          slug: product.slug,
          name: product.name,
          price: product.price,
          image: product.image,
          price_tag: product.price_tag,
          stock: product.stock,
          quantity: 1,
        };
      }
    },

    incQuantity: (state, action: PayloadAction<string>) => {
      const slug = action.payload;
      if (state.items[slug]) {
        state.items[slug].quantity += 1;
      }
    },

    decQuantity: (state, action: PayloadAction<string>) => {
      const slug = action.payload;
      const item = state.items[slug];
      if (!item) return;

      if (item.quantity > 1) {
        item.quantity -= 1;
      } else {
        delete state.items[slug];
      }
    },

    removeFromCart: (state, action: PayloadAction<string>) => {
      delete state.items[action.payload];
    },

    clearCart: state => {
      state.items = {};
    },
  },
});

export const { addToCart, incQuantity, decQuantity, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
