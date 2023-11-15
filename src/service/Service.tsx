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

  getProducts = async (query: string, offset = 0, limit = 20) => {
    const res = await this.getResource(
      `${this.apiBase}/search?q=${query}&limit=${limit}&skip=${offset}`
    );
    return res;
  };
}

export default Service;
