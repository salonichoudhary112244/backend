import axios from "axios";

/* ==============================
   AXIOS INSTANCE
================================ */
const API = axios.create({
  baseURL: "http://localhost:8080/auth",
  headers: {
    "Content-Type": "application/json",
  },
});

/* ==============================
   AUTH APIs
================================ */

// 🔐 LOGIN
export const login = (data) => {
  return API.post("/login", data);
};

// 📝 REGISTER
export const register = (data) => {
  return API.post("/register", data);
};

// 📧 VERIFY EMAIL OTP
export const verifyEmailOtp = (email, otp) => {
  return API.post("/verify-email-otp", null, {
    params: {
      email,
      otp,
    },
  });
};

// 📱 VERIFY PHONE OTP
export const verifyPhoneOtp = (phone, otp) => {
  return API.post("/verify-phone-otp", null, {
    params: {
      phone,
      otp,
    },
  });
};

// 🔁 FORGOT PASSWORD (SEND MAIL)
export const forgotPassword = (email) => {
  return API.post("/forgot-password", {
    email,
  });
};

// 🔑 RESET PASSWORD
export const resetPassword = (token, newPassword) => {
  return API.post("/reset-password", null, {
    params: {
      token,
      newPassword,
    },
  });
};

// 🔵 GOOGLE LOGIN
export const googleLogin = (idtoken) => {
  return API.post("/google", {
    idtoken,
  });
};





// ================= PRODUCT APIs =================

// Create Product
export const createProduct = (data) => {
  return API.post("/products", data);
};

// ================= BRAND APIs =================

// Get all brands
export const getAllBrands = () => {
  return API.get("/brands");
};

// Create brands (bulk)
export const createBrandsBulk = (data) => {
  return API.post("/brands/bulk", data);
};

// ================= CATEGORY APIs =================

// Bulk create categories
export const createCategoriesBulk = (data) => {
  return API.post("/categories/bulk", data);
};

// Get breadcrumb (optional use later)
export const getCategoryBreadcrumb = (categoryId) => {
  return API.get(`/categories/breadcrumb/${categoryId}`);
};

// ================= ATTRIBUTE APIs =================

// create attribute
export const createAttribute = (data) => {
  return API.post("/attributes", data);
};

// get all attributes
export const getAllAttributes = () => {
  return API.get("/attributes");
};

API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    console.log("JWT TOKEN 👉", token); // 🔥 DEBUG LINE

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);


// ================= PRODUCT ATTRIBUTE MAPPING =================
export const assignAttributesToProduct = (productId, data) =>
  API.post(`/products/${productId}/attributes`, data);


// ================= VARIANT APIs =================

// create variant
export const createVariant = (productId, data) =>
  API.post(`/products/${productId}/variants`, data);

// get variants by product
export const getVariants = (productId) =>
  API.get(`/products/${productId}/variants`);




















// // import axios from "axios";

// /* ======================================================
//    ATTRIBUTE APIs
// ====================================================== */

// // Create Attribute
// export const createAttribute = (data) =>
//   authApi.post("/attributes", data);

// // Get All Attributes
// export const getAllAttributes = () =>
//   authApi.get("/attributes");

// // Assign Attributes to Product
// export const assignAttributesToProduct = (productId, data) =>
//   authApi.post(`/products/${productId}/attributes`, data);


// /* ======================================================
//    BRAND APIs
// ====================================================== */

// // Bulk Create Brands
// export const createBrandsBulk = (data) =>
//   authApi.post("/brands/bulk", data);

// // Get All Brands
// export const getAllBrands = () =>
//   authApi.get("/brands");


// /* ======================================================
//    CATEGORY APIs
// ====================================================== */

// // Bulk Create Categories
// export const createCategoriesBulk = (data) =>
//   authApi.post("/categories/bulk", data);

// // Get Category Breadcrumb
// export const getCategoryBreadcrumb = (categoryId) =>
//   authApi.get(`/categories/breadcrumb/${categoryId}`);


// /* ======================================================
//    PRODUCT APIs
// ====================================================== */

// // Create Product
// export const createProduct = (data) =>
//   authApi.post("/products", data);

// // Get Product By Slug
// export const getProductBySlug = (slug) =>
//   authApi.get(`/products/${slug}`);

// // (OPTIONAL) Get All Products – if you add endpoint later
// export const getAllProducts = () =>
//   authApi.get("/products");


// /* ======================================================
//    PRODUCT FEATURES APIs
// ====================================================== */

// // Save Product Features (Bulk)
// export const saveProductFeatures = (productId, data) =>
//   authApi.post(`/products/${productId}/features/bulk`, data);

// // Get Product Features
// export const getProductFeatures = (productId) =>
//   authApi.get(`/products/${productId}/features`);


// /* ======================================================
//    PRODUCT SPECIFICATIONS APIs
// ====================================================== */

// // Save Specifications (Bulk)
// export const saveProductSpecifications = (productId, data) =>
//   authApi.post(`/products/${productId}/specifications/bulk`, data);

// // Get Specifications
// export const getProductSpecifications = (productId) =>
//   authApi.get(`/products/${productId}/specifications`);


// /* ======================================================
//    PRODUCT IMAGES APIs
// ====================================================== */

// // Upload Product Images (Multipart)
// export const uploadProductImages = (productId, formData) =>
//   authApi.post(`/products/${productId}/images`, formData, {
//     headers: { "Content-Type": "multipart/form-data" },
//   });

// // Get Product Images
// export const getProductImages = (productId, variantId) =>
//   authApi.get(`/products/${productId}/images`, {
//     params: { variantId },
//   });

// // Set Primary Image
// export const setPrimaryImage = (imageId) =>
//   authApi.put(`/products/images/${imageId}/set-primary`);


// /* ======================================================
//    VARIANT APIs
// ====================================================== */

// // Create Variant
// export const createVariant = (productId, data) =>
//   authApi.post(`/products/${productId}/variants`, data);

// // Get Variants of Product
// export const getProductVariants = (productId) =>
//   authApi.get(`/products/${productId}/variants`);


// /* ======================================================
//    VARIANT PRICING APIs
// ====================================================== */

// // Set Variant Price
// export const setVariantPrice = (variantId, data) =>
//   authApi.post(`/variants/${variantId}/pricing/price`, data);

// // Set Variant Discount
// export const setVariantDiscount = (variantId, data) =>
//   authApi.post(`/variants/${variantId}/pricing/discount`, data);

// // Get Variant Pricing
// export const getVariantPricing = (variantId) =>
//   authApi.get(`/variants/${variantId}/pricing`);


// /* ======================================================
//    MANUFACTURER INFO APIs
// ====================================================== */

// // Save Manufacturer Info
// export const saveManufacturerInfo = (productId, content) =>
//   authApi.post(`/products/${productId}/manufacturer`, content);

// // Get Manufacturer Info
// export const getManufacturerInfo = (productId) =>
//   authApi.get(`/products/${productId}/manufacturer`);

