import { Routes, Route } from "react-router-dom";

import SaloniHome from "./components/SaloniHome";
import Register from "./components/Register";
import Login from "./components/Login";
import VerifyOtp from "./components/VerifyOtp";
import ForgotPassword from "./components/ForgotPassword";
import ResetPassword from "./components/ResetPassword";
import Products from "./components/Products";


import CreateProduct from "./admin/products/CreateProduct";
import BrandList from "./admin/brands/BrandList";
import CategoryList from "./admin/categories/CategoryList";
import AttributePanel from "./admin/attributes/AttributePanel";

import ProductAttributeMapping from "./admin/productAttributes/ProductAttributeMapping";
import VariantPanel from "./admin/variants/VariantPanel";
/* ========= ADMIN MODULES ========= */
import VariantPricingPanel from "./admin/Pricing/VariantPricingPanel";
import ProductImagePanel from "./admin/images/ProductImagePanel";
import ProductFeaturePanel from "./admin/features/ProductFeaturePanel";
import ProductSpecificationPanel from "./admin/specs/ProductSpecificationPanel";
import ProductManufacturerPanel from "./admin/manufacturer/ProductManufacturerPanel";
// import CreateProduct from "./admin/products/CreateProduct";
import ProductPanel from "./admin/products/ProductPanel";
import Dashboard from "./admin/Dashboard";
import ProductList from "./admin/products/ProductListing";
import AdminLayout from "./admin/layout/AdminLayout";



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


      
      {/* ADMIN ROUTES */}
 <Route path="/admin" element={<AdminLayout />}>
   {/* 👇 DEFAULT PAGE */}
  <Route index element={<Dashboard />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="products/create" element={<ProductPanel />} />
        <Route path="variants" element={<VariantPanel />} />
        <Route path="pricing" element={<VariantPricingPanel />} />
        <Route path="images" element={<ProductImagePanel />} />
        <Route path="features" element={<ProductFeaturePanel />} />
        <Route path="specifications" element={<ProductSpecificationPanel />} />
        <Route path="manufacturer" element={<ProductManufacturerPanel />} />
        <Route path="products/list" element={<ProductList />} />
      </Route>
    </Routes>

   
  );
}
