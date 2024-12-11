import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IFilters, IProduct } from "../../types/Product";

interface ProductsState {
  allProducts: IProduct[];
  filteredProducts: IProduct[];
}

const initialState: ProductsState = {
  allProducts: [],
  filteredProducts: [],
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setProducts(state, action: PayloadAction<IProduct[]>) {
      state.allProducts = action.payload;
      state.filteredProducts = action.payload;
    },
    filterProducts(state, action: PayloadAction<IFilters>) {
      const filters = action.payload;
      const priceRange = filters.price.map((price) => {
        const [min, max] = price.split("-");
        return { min: +min, max: +max };
      });

      state.filteredProducts = state.allProducts.filter((product) => {
        const matchesColor =
          !filters.color.length || filters.color.includes(product.color);
        const matchesGender =
          !filters.gender.length || filters.gender.includes(product.gender);
        const matchesType =
          !filters.type.length || filters.type.includes(product.type);
        const matchesPrice =
          !filters.price.length ||
          priceRange.some(
            (range) => product.price >= range.min && product.price <= range.max
          );

        return matchesColor && matchesGender && matchesType && matchesPrice;
      });
    },
  },
});

export const { setProducts, filterProducts } = productsSlice.actions;
export default productsSlice.reducer;
