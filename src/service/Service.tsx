import { Product } from './types';

class Service {
  apiBase = 'https://dummyjson.com/products';

  // eslint-disable-next-line class-methods-use-this
  getResource = async (url: string) => {
    const res = await fetch(url);

    if (!res.ok) {
      throw new Error(`Could not fetch ${url}, status ${res.status}`);
    }

    return res.json();
  };

  getAllCategories = async () => {
    const res = await this.getResource(`${this.apiBase}/categories`);
    return res;
  };

  getAllBrands = async (): Promise<string[]> => {
    const res = await this.getResource(`${this.apiBase}?limit=100&skip=0`);
    const set = new Set();
    res.products.forEach((item: Product) => set.add(item.brand));
    return Array.from(set) as string[];
  };

  getProducts = async (query = '', offset = 0, limit = 100) => {
    const res = await this.getResource(
      `${this.apiBase}/search?q=${query}&limit=${limit}&skip=${offset}`
    );
    return res.products;
  };

  getSingleProduct = async (id: string) => {
    const res = await this.getResource(`${this.apiBase}/${id}`);
    return res;
  };

  getMinMaxPrices = async () => {
    const res = await this.getResource(
      'https://dummyjson.com/products?limit=100&skip=0&select=price'
    );
    const prices = new Set<number>();
    res.products.forEach((item: { id: number; price: number }) => {
      prices.add(item.price);
    });
    return [Math.min(...prices), Math.max(...prices)];
  };
}

export default Service;
