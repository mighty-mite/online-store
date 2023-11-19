import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/homePage/HomePage';
import ShopPage from './pages/shopPage/ShopPage';
import ErrorPage from './pages/errorPage/ErrorPage';
import SingleProductPage from './pages/singleProductPage/SingleProductPage';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';

import './commonStyles/normalize.scss';
import './commonStyles/global.scss';
import './app.scss';

export default function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/shop" element={<ShopPage />} />
        <Route path="/singleproductpage" element={<SingleProductPage />} />
        <Route path="/404" element={<ErrorPage />} />
      </Routes>
      <Footer />
    </>
  );
}
