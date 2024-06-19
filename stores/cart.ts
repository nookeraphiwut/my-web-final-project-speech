// store/cart.ts
import { defineStore, Store } from 'pinia';

interface Item {
  id: number;
  quantity: number;
}

interface CartState {
  cart: Item[];
}

export const useCartStore = defineStore('cart', {
  state: (): CartState => ({
    cart: []
  }),
  actions: {
    loadCartFromLocalStorage(context: Store<CartState>) {
      const localStorageData = localStorage.getItem('cart');
      if (localStorageData) {
        context.state.cart = JSON.parse(localStorageData);
      }
    }
  },
  getters: {
    totalQuantity(context: Store<CartState>) {
      return context.state.cart.reduce((total, item) => total + item.quantity, 0);
    }
  }
});
