import React, { createContext, useContext, useState } from "react";

// 1️⃣ Create context
const ProductContext = createContext();

// 2️⃣ Provider
export const ProductProvider = ({ children }) => {

const [productState, setProductState] = useState({
  categoryId: null,
  brandId: null,
  productId: null,   
  slug: null,        
  attributes: [],
  variants: []
});


  return (
    <ProductContext.Provider
      value={{ productState, setProductState }}>
      {children}
    </ProductContext.Provider>
  );
};

// 3️⃣ Custom hook
export const useProduct = () => {
  return useContext(ProductContext);
};