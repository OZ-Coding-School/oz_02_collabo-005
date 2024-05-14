import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React from 'react';
import LoginPage from './pages/LoginPage';
import SplashPage from './pages/SplashPage';
import HomePage from './pages/HomePage';
import Layout from './layout/Layout';
import SignUpPage from './pages/SignupPage';
import RestaurantPage from './pages/RestaurantPage';
import AddressPage from './pages/AddressPage';
import AccountPage from './pages/AccountPage';
import MenuPage from './pages/MenuPage';
import OrderSheetPage from './pages/OrderSheetPage';
import OrderStatusPage from './pages/OrderStatusPage';
import OrdersPage from './pages/OrdersPage';
import PaymentPage from './pages/PaymentPage';
import ErrorPage from './pages/ErrorPage';
import KoreanCardPage from './pages/KoreanCardPage';
import ForeignCardPage from './pages/ForeignCardPage';
import ScrollToTop from '@components/scrolltotop/ScrollToTop';
import OrderDetailsPage from './pages/OrderDetailsPage/index';
import ProtectedRoute from './routes/ProtectedRoute';
import CommonRoute from './routes/CommonRoute';

const App: React.FC = () => {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route element={<CommonRoute />}>
            <Route path="/" element={<SplashPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/sign" element={<SignUpPage />} />
          </Route>
          {/* 유저 전용 */}
          <Route element={<ProtectedRoute />}>
            <Route path="/home" element={<HomePage />} />
            <Route path="/address" element={<AddressPage />} />
            <Route path="/account" element={<AccountPage />} />
            <Route
              path="/restaurant/:restaurantId"
              element={<RestaurantPage />}
            />
            <Route path="/restaurant/menu/:menuId" element={<MenuPage />} />
            <Route path="/order/sheet" element={<OrderSheetPage />} />
            <Route path="/order/details" element={<OrderDetailsPage />} />
            <Route path="/orders" element={<OrdersPage />} />
            <Route path="/order/status" element={<OrderStatusPage />} />
            <Route path="/payment" element={<PaymentPage />} />
            <Route path="/account/koreanCard" element={<KoreanCardPage />} />
            <Route path="/account/foreignCard" element={<ForeignCardPage />} />
          </Route>
        </Route>
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </Router>
  );
};

export default App;
