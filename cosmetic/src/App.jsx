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
      <Route
        path="/admin/products/create"
        element={<CreateProduct />}
      />

      {/* // Brand routes */}
<Route path="/admin/brands" element={<BrandList />} />

         {/* categories */}
<Route path="/admin/categories" element={<CategoryList />} />

 {/* // attributes */}
    <Route path="/admin/attributes" element={<AttributePanel/>} />

{/* ProductAttributeMapping */}
<Route
  path="/admin/product-attributes"
  element={<ProductAttributeMapping />}
/>

       {/* VariantPanel */}
<Route
  path="/admin/variants"
  element={<VariantPanel />}
/>

    {/* ===== ADMIN ROUTES ===== */}
      <Route path="/admin/Pricing" element={<VariantPricingPanel />} />
      <Route path="/admin/images" element={<ProductImagePanel />} />
      <Route path="/admin/features" element={<ProductFeaturePanel />} />
      <Route path="/admin/specs" element={<ProductSpecificationPanel />} />
      <Route path="/admin/manufacturer" element={<ProductManufacturerPanel />} />

{/* <Route path="/admin/products" element={<CreateProduct/>} /> */}

<Route path="/admin/products" element={<ProductPanel />} />
    </Routes>

   
  );
}
