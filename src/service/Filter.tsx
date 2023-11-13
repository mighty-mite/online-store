interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
}

interface Options {
  category: string[];
  brand: string[];
  search: string;
  price: number[];
}

// {
//   category: ['smartphones', 'cars'],
//   brand: ['apple', 'toyota', 'samsung'],
//   search: 'input',
//   price: [100, 1000]
// }

function filter(arr: Product[], brand: string[], category: string[]) {
  const filteredByBrand = arr.filter((item) => {
    if (brand.length === 0) return arr;
    return brand.includes(item.brand);
  });
  const filteredByCategory = filteredByBrand.filter((item) => {
    if (category.length === 0) return filteredByBrand;
    return category.includes(item.category);
  });

  return filteredByCategory;
}

export default filter;
