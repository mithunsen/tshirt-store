import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Filters from "../components/Filters";
import ProductCard from "../components/ProductCard";
import { setProducts } from "../store/slices/productsSlice";
import { AppDispatch, RootState } from "../store/store";

const Home: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [isProductLoaded, setIsProductLoaded] = useState<boolean>(false);

  const products = useSelector(
    (state: RootState) => state.products.filteredProducts
  );

  const init = useCallback(async () => {
    if (!isProductLoaded) {
      try {
        const rawResponse = await fetch(
          "https://mocki.io/v1/4ef9fde5-c17f-4b99-9cb5-0a14ed5db18a"
        );
        const data = await rawResponse.json();
        dispatch(setProducts(data));
        setIsProductLoaded(true);
      } catch (error) {}
    }
  }, [dispatch, isProductLoaded]);

  useEffect(() => {
    init();
  }, [init]);

  return (
    <main className="mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 mt-4">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900">
          T-Shirt Store
        </h1>
        {/* <Header /> */}
      </div>
      <section aria-labelledby="products-heading" className="pb-24 pt-6">
        <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-5">
          {isProductLoaded && products.length > 0 && <Filters />}
          <div className="lg:col-span-4">
            {isProductLoaded && products.length > 0 && (
              <div className="mt-4 grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                {products.map((product) => (
                  <ProductCard key={product.id} {...product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;
