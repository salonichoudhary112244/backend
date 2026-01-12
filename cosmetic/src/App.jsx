import { Routes, Route } from "react-router-dom";

import SaloniHome from "./components/SaloniHome";
import Register from "./components/Register";
import Login from "./components/Login";
import VerifyOtp from "./components/VerifyOtp";
import ForgotPassword from "./components/ForgotPassword";
import ResetPassword from "./components/ResetPassword";
import Products from "./components/Products";
// import ProductDetailPage from "./components/ProductDetailPage";

import SellerPanel from "./admin/sellerPanel";
import { ProductProvider } from "./api/ProductContext";


export default function App() {
  return (
    <Routes>
      <Route path="/" element={<SaloniHome />} />
      <Route path="/register" element={<Register />} />
      <Route path="/verify-otp" element={<VerifyOtp />} />
      <Route path="/login" element={<Login />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="/products" element={<Products/>}/>

     <Route
  path="/seller-product-create"
  element={
    <ProductProvider>
      <SellerPanel />
    </ProductProvider>
  }
  />
  {/* <Route 
  path="/products/:productId" 
  element={<ProductDetailPage />}
  /> */}


    </Routes>

   
  );
}
