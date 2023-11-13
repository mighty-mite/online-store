import { createContext } from 'react';

interface Context {
  category: string[];
  brand: string[];
  search: string;
  price: number[];
}

const context = createContext<Context>({
  category: [],
  brand: [],
  search: '',
  price: [],
});

export default context;
