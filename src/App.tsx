import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/homePage/HomePage';
import ShopPage from './pages/shopPage/ShopPage';
import ErrorPage from './pages/errorPage/ErrorPage';
import SingleProductPage from './pages/singleProductPage/SingleProductPage';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/shop" element={<ShopPage />} />
      <Route path="/singleproductpage" element={<SingleProductPage />} />
      <Route path="/404" element={<ErrorPage />} />
    </Routes>
  );
}
