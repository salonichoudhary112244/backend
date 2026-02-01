import { Routes, Route } from "react-router-dom";

import AuthLayout from "./layout/AuthLayout";
import MainLayout from "./layout/MainLayout";

import SaloniHome from "./components/SaloniHome";
import Register from "./components/Register";
import Login from "./components/Login";
import VerifyOtp from "./components/VerifyOtp";
import ForgotPassword from "./components/ForgotPassword";
import ResetPassword from "./components/ResetPassword";
import Products from "./components/Products";
import ProductDetailPage from "./components/ProductDetailPage";
import CartPage from "./components/CartPage";
import Wishlist from "./components/Wishlist";
import SellerPanel from "./admin/sellerPanel";
import { ProductProvider } from "./api/ProductContext";
import OrderSuccess from "./components/OrderSuccess";
import SubscriptionSuccess from "./components/SubscriptionSuccess";

import MyOrders from "./components/MyOrders";

import TrackOrder from "./components/TrackOrder";

import AdminOrders from "./admin/AdminOrders";
import AdminPanel from "./admin/pages/AdminPanel";
import AdminDashboard from "./admin/pages/AdminDashboard";


export default function App() {
  return (
    <Routes>
      
       {/* 🟢 HOME PAGE (OWN NAVBAR) */}
      <Route path="/" element={<SaloniHome />} />
           {/* 🟣 AUTH PAGES */}
    <Route element={<AuthLayout />}>
      <Route path="/register" element={<Register />} />
      <Route path="/verify-otp" element={<VerifyOtp />} />
      <Route path="/login" element={<Login />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />
     <Route path="/subscription-success" element={<SubscriptionSuccess />} />
</Route>

     <Route
  path="/seller-product-create"
  element={
    <ProductProvider>
      <SellerPanel />
    </ProductProvider>
  }
  />

      {/* 🔵 PUBLIC WEBSITE */}
      <Route element={<MainLayout />}>
      <Route path="/products" element={<Products/>}/>
  <Route 
  path="/products/:id" 
  element={<ProductDetailPage />}
  />
  
   <Route path="/cart" element={<CartPage />} /> 
<Route path="/wishlist" element={<Wishlist />} />
<Route path="/orders-success" element={<OrderSuccess />} />

<Route path="/my-orders" element={<MyOrders />} />
<Route path="/admin/orders" element={<AdminOrders />} />
<Route path="/track-order/:orderNumber" element={<TrackOrder />} />
 </Route>

   {/* 🔴 ADMIN PANEL */}
<Route path="/admin" element={<AdminPanel />}>
  <Route index element={<AdminDashboard />} />
  <Route path="dashboard" element={<AdminDashboard />} />
  <Route path="orders" element={<AdminOrders />} />
</Route>

    </Routes>

   
  );
}
