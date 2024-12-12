import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { filterProducts } from "../store/slices/productsSlice";
import { AppDispatch, RootState } from "../store/store";
import { IFilters } from "../types/Product";

const Filters: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const products = useSelector(
    (state: RootState) => state.products.allProducts
  );

  const [filter, setFilter] = useState<IFilters>({
    gender: [],
    color: [],
    price: [],
    type: [],
  });

  const colorsDups = products.map((product) => product.color);
  const colors = colorsDups.filter(
    (item, index) => colorsDups.indexOf(item) === index
  );

  const genderDups = products.map((product) => product.gender);
  const genders = genderDups.filter(
    (item, index) => genderDups.indexOf(item) === index
  );

  const typesDups = products.map((product) => product.type);
  const types = typesDups.filter(
    (item, index) => typesDups.indexOf(item) === index
  );

  const pricesDups = products.map((product) => product.price);
  const prices = pricesDups.filter(
    (item, index) => pricesDups.indexOf(item) === index
  );
  const maxPrice = Math.max(...prices);

  const filters = [
    {
      id: "color",
      name: "Color",
      options: colors.map((item) => ({
        value: item,
        label: item,
        checked: false,
      })),
    },
    {
      id: "gender",
      name: "Gender",
      options: genders.map((item) => ({
        value: item,
        label: item,
        checked: false,
      })),
    },
    {
      id: "price",
      name: "Price Range",
      options: [
        { value: "0-250", label: "Rs 0 - Rs 250", checked: false },
        { value: "251-450", label: "Rs 251 - Rs 450", checked: false },
        {
          value: `451-${maxPrice}`,
          label: `Rs 451 - Rs ${maxPrice}`,
          checked: false,
        },
      ],
    },
    {
      id: "type",
      name: "Type",
      options: types.map((item) => ({
        value: item,
        label: item,
        checked: false,
      })),
    },
  ];

  useEffect(() => {
    dispatch(filterProducts(filter));
  }, [dispatch, filter]);

  return (
    <div className="hidden lg:block">
      {filters.map((section) => (
        <div
          key={`key-${section.id}`}
          className="border-b border-gray-200 px-4 py-6"
        >
          <h3 className="-mx-2 -my-3 flow-root">
            <div className="group flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">
              <span className="font-medium text-gray-900">{section.name}</span>
            </div>
          </h3>
          <div className="pt-4">
            <div className="space-y-4">
              {section.options.map((option, optionIdx) => (
                <div key={option.value} className="flex gap-3">
                  <div className="flex h-5 shrink-0 items-center">
                    <div className="group grid size-4 grid-cols-1">
                      <input
                        defaultValue={option.value}
                        id={`filter-mobile-${section.id}-${optionIdx}`}
                        name={`${section.id}[]`}
                        type="checkbox"
                        className="col-start-1 row-start-1 appearance-none rounded border border-gray-300 bg-white checked:border-blue-500 checked:bg-blue-500 indeterminate:border-blue-500 indeterminate:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 disabled:border-gray-300 disabled:bg-gray-100 disabled:checked:bg-gray-100 forced-colors:appearance-auto"
                        onChange={(e) => {
                          if (e.target.checked) {
                            setFilter((prev) => {
                              const existingFilters = prev[
                                section.id as keyof IFilters
                              ] as string[];
                              return {
                                ...prev,
                                [section.id]: [
                                  ...existingFilters,
                                  e.target.value,
                                ],
                              };
                            });
                          } else {
                            setFilter((prev) => {
                              const existingFilters = filter[
                                section.id as keyof IFilters
                              ] as string[];
                              return {
                                ...prev,
                                [section.id]: existingFilters.filter(
                                  (item) => item !== e.target.value
                                ),
                              };
                            });
                          }
                        }}
                      />
                      <svg
                        fill="none"
                        viewBox="0 0 14 14"
                        className="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-[:disabled]:stroke-gray-950/25"
                      >
                        <path
                          d="M3 8L6 11L11 3.5"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="opacity-0 group-has-[:checked]:opacity-100"
                        />
                        <path
                          d="M3 7H11"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="opacity-0 group-has-[:indeterminate]:opacity-100"
                        />
                      </svg>
                    </div>
                  </div>
                  <label
                    htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
                    className="min-w-0 flex-1 text-gray-500 text-left"
                  >
                    {option.label}
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Filters;
