// import Service from './Service';

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

// function filter(options: Options) {
//   const service = new Service();
//   const { category, brand, search } = options;
//   service.getProducts(search).then((products: Product[]) => {
//     const filteredByCategory = products.filter((product) => {
//       if (category.length === 0) return products;
//       return category.includes(product.category);
//     });

//     const filteredByBrand = filteredByCategory.filter((product) => {
//       if (brand.length === 0) return products;
//       return brand.includes(product.brand);
//     });
//   });
// }

function filter(options: Options, arr: Product[]) {
  const { category, brand } = options;
  const filteredByCategory = arr.filter((item) => {
    if (category.length === 0) return arr;
    return category.includes(item.category);
  });
  const filteredByBrand = filteredByCategory.filter((item) => {
    if (brand.length === 0) return filteredByCategory;
    return brand.includes(item.brand);
  });
  return filteredByBrand;
}

export default filter;
