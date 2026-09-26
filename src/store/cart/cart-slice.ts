import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import Toast from 'react-native-toast-message';

import { CartItem } from '@/types/cart';
import { ProductCardItem } from '@/types/product';

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
    addToCart: (state, { payload }: PayloadAction<ProductCardItem>) => {
      addProductToCart(state, payload);
      Toast.show({
        type: 'success',
        text1: `'${payload.name}' has been added to cart`,
      });
    },

    addListToCart: (state, action: PayloadAction<ProductCardItem[]>) => {
      action.payload.forEach(product => {
        addProductToCart(state, product);
      });
      Toast.show({
        type: 'success',
        text1: 'All ingredients have been added to the cart.',
        position: 'bottom',
      });
    },

    incQuantity: (state, { payload }: PayloadAction<string>) => {
      const slug = payload;
      if (state.items[slug]) {
        state.items[slug].quantity += 1;
        Toast.show({
          type: 'success',
          text1: `'${state.items[slug].name}' has been added to cart`,
        });
      }
    },

    decQuantity: (state, { payload }: PayloadAction<string>) => {
      const slug = payload;
      const item = state.items[slug];
      if (!item) return;

      if (item.quantity > 1) {
        item.quantity -= 1;
      } else {
        delete state.items[slug];
      }
      Toast.show({
        type: 'success',
        text1: `'${item.name}' has been removed from cart`,
      });
    },

    removeFromCart: (state, { payload }: PayloadAction<string>) => {
      const name = state.items[payload]?.name;
      delete state.items[payload];
      if (name) {
        Toast.show({
          type: 'success',
          text1: `'${state.items[payload].name}' has been removed from cart`,
        });
      }
    },

    clearCart: state => {
      state.items = {};
      Toast.show({
        type: 'success',
        text1: `Cart has been cleared`,
      });
    },
  },
});

const addProductToCart = (state: CartState, product: ProductCardItem) => {
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
      average_rating: product.average_rating,
      stock: product.stock,
      quantity: 1,
    };
  }
};

export const { addToCart, addListToCart, incQuantity, decQuantity, removeFromCart, clearCart } =
  cartSlice.actions;
export default cartSlice.reducer;
