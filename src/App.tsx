import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React from "react";
import LoginPage from "./pages/LoginPage";
import SplashPage from "./pages/SplashPage";
import HomePage from "./pages/HomePage";
import Layout from "./layout/Layout";
import SignUpPage from "./pages/SignupPage";
import RestaurantPage from "./pages/RestaurantPage";
import AddressPage from "./pages/AddressPage";
import AccountPage from "./pages/AccountPage";
import MenuPage from "./pages/MenuPage";
import OrderSheetPage from "./pages/OrderSheetPage";
import OrderStatusPage from "./pages/OrderStatusPage";
import OrdersPage from "./pages/OrdersPage";
import PaymentPage from "./pages/PaymentPage";
import ErrorPage from "./pages/ErrorPage";
import KoreanCardPage from "./pages/KoreanCardPage";
import ForeignCardPage from "./pages/ForeignCardPage";
import ScrollToTop from "@components/scrolltotop/ScrollToTop";
import OrderDetailsPage from "./pages/OrderDetailsPage/index";
// import useLoginStore from "./store/useStore";

const App: React.FC = () => {
  // const isLogin: boolean = useLoginStore.getState().isLogin;
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/sign" element={<SignUpPage />} />
          <Route path="/restaurant" element={<RestaurantPage />} />
          <Route path="/" element={<SplashPage />} />
          <Route path="/address" element={<AddressPage />} />
          <Route path="/account" element={<AccountPage />} />
          <Route path="/restaurant/menu" element={<MenuPage />} />
          <Route path="/order/sheet" element={<OrderSheetPage />} />
          <Route path="/order/details" element={<OrderDetailsPage />} />
          <Route path="/orders" element={<OrdersPage />} />
          <Route path="/order/status" element={<OrderStatusPage />} />
          <Route path="/payment" element={<PaymentPage />} />
          <Route path="/account/koreanCard" element={<KoreanCardPage />} />
          <Route path="/account/foreignCard" element={<ForeignCardPage />} />
        </Route>
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </Router>
  );
};

export default App;
