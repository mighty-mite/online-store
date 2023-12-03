import { Product } from './types';

function filter(
  arr: Product[],
  brand: string[],
  category: string[],
  search: string,
  price: number[]
) {
  const filteredBySearch = arr.filter(
    (item) =>
      item.description.toLowerCase().includes(search) ||
      item.title.toLowerCase().includes(search) ||
      item.brand.toLowerCase().includes(search) ||
      item.category.toLowerCase().includes(search)
  );
  const filteredByBrand = filteredBySearch.filter((item) => {
    if (brand.length === 0) return arr;
    return brand.includes(item.brand);
  });
  const filteredByCategory = filteredByBrand.filter((item) => {
    if (category.length === 0) return filteredByBrand;
    return category.includes(item.category);
  });

  const filteredByPrice = filteredByCategory.filter(
    (item) => item.price >= price[0] && item.price <= price[1]
  );

  return filteredByPrice;
}

export default filter;
