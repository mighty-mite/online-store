import { Product } from './types';

export default function sort(arr: Product[], mode: string) {
  if (mode === 'asc') return arr.sort((a, b) => a.price - b.price);

  if (mode === 'desc') return arr.sort((a, b) => b.price - a.price);

  return arr;
}
