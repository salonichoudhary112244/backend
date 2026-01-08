import { Routes, Route } from "react-router-dom";

import SaloniHome from "./components/SaloniHome";
import Register from "./components/Register";
import Login from "./components/Login";
import VerifyOtp from "./components/VerifyOtp";
import ForgotPassword from "./components/ForgotPassword";
import ResetPassword from "./components/ResetPassword";
import Products from "./components/Products";


import BrandPanel from "./admin/brands/BrandPanel";
import CategoryPanel from "./admin/categories/CategoryPanel";
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
import Success from "./admin/Success";



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


<Route path="/admin" element={<AdminLayout />}>
  <Route index element={<Dashboard />} />
  <Route path="dashboard" element={<Dashboard />} />

  {/* MASTER DATA */}
  <Route path="brands" element={<BrandPanel />} />
  <Route path="categories" element={<CategoryPanel />} />
  <Route path="attributes" element={<AttributePanel />} />

  {/* PRODUCT FLOW */}
  <Route path="products/create" element={<ProductPanel />} />
  <Route path="variants" element={<VariantPanel />} />
  <Route path="pricing" element={<VariantPricingPanel />} />
  <Route path="images" element={<ProductImagePanel />} />
  <Route path="features" element={<ProductFeaturePanel />} />
  <Route path="specifications" element={<ProductSpecificationPanel />} />
  <Route path="manufacturer" element={<ProductManufacturerPanel />} />
  <Route path="success" element={<Success />} />
  <Route path="product-attributes" element={<ProductAttributeMapping />} />

</Route>

    </Routes>

   
  );
}
