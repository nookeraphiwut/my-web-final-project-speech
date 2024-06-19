import { defineStore } from 'pinia'
import { type ProductMain } from '~/composables/api/useProductApi'

export interface StateProduct {
  productList: ProductMain[]
}
export const useStore = defineStore('useProduct', {
  // arrow function recommended for full type inference
  state: (): StateProduct => {
    return {
      // all these properties will have their type inferred automatically
      productList: [],
    }
  },
  getters: {
    getProduct: (state) => state.productList,
  },
})
