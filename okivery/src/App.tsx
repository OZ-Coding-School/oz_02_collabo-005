import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import React from "react";
import LoginPage from "./pages/LoginPage";
import SplashPage from "./pages/SplashPage";
import HomePage from "./pages/HomePage";
import Layout from "./layout/Layout";
import SignUpPage from "./pages/SignupPage";
import RestaurantPage from "./pages/RestaurantPage";
import AddressPage from "./pages/AddressPage";
import AccountPage from "./pages/AccountPage";
import MapPage from "./pages/MapPage";
import MenuPage from "./pages/MenuPage";
import OrderSheetPage from "./pages/OrderSheetPage";
import OrderStatusPage from "./pages/OrderStatusPage";
import OrdersPage from "./pages/OrdersPage";
import PaymentPage from "./pages/PaymentPage";

const App: React.FC = () => {
  const isLogined: boolean = false;
  return (
    <Router>
      <Routes>
        <Route
          path='/'
          element={
            isLogined ? (
              <Layout>
                <Navigate to='/home' />
              </Layout>
            ) : (
              <Layout>
                <Navigate to='/splash' />
              </Layout>
            )
          }
        />
        <Route
          path='/splash'
          element={
            <Layout>
              <SplashPage />
            </Layout>
          }
        />
        <Route
          path='/login'
          element={
            <Layout>
              <LoginPage />
            </Layout>
          }
        />
        <Route
          path='/home'
          element={
            <Layout>
              <HomePage />
            </Layout>
          }
        />
        <Route
          path='/sign'
          element={
            <Layout>
              <SignUpPage />
            </Layout>
          }
        />
        <Route
          path='/restaurant'
          element={
            <Layout>
              <RestaurantPage />
            </Layout>
          }
        />
        <Route
          path='/address'
          element={
            <Layout>
              <AddressPage />
            </Layout>
          }
        />
        <Route
          path='/account'
          element={
            <Layout>
              <AccountPage />
            </Layout>
          }
        />
        <Route
          path='/address/select-map'
          element={
            <Layout>
              <MapPage />
            </Layout>
          }
        />
        <Route
          path='/restaurant/menu'
          element={
            <Layout>
              <MenuPage />
            </Layout>
          }
        />
        <Route
          path='/order/sheet'
          element={
            <Layout>
              <OrderSheetPage />
            </Layout>
          }
        />
        <Route
          path='/orders'
          element={
            <Layout>
              <OrdersPage />
            </Layout>
          }
        />
        <Route
          path='/order/status'
          element={
            <Layout>
              <OrderStatusPage />
            </Layout>
          }
        />
        <Route
          path='/payment'
          element={
            <Layout>
              <PaymentPage />
            </Layout>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
