import axiosInstance from "./axiosInstance";
import { getStoredUser } from "../utils/auth";

export const addToCartApi = async ({ productId, variantId, quantity }) => {
  const user = getStoredUser();
  return axiosInstance.post("/auth/cart/add", {
    userId: user.id,
    productId,
    variantId,
    quantity
  });
};


export const getCartApi = async () => {
  const user = getStoredUser();
  if (!user || !user.id) throw new Error("User not logged in");
  return axiosInstance.get(`/auth/cart/${user.id}`);
};

// ✅ COUNT
export const getCartCountApi = async (userId) => {
  return axiosInstance.get(`/auth/cart/count/${userId}`);
};

// ✅ INCREASE QTY (🔥 FIX)
export const increaseQtyApi = (cartItemId) => {
  console.log("INCREASE API ID:", cartItemId); // debug
  return axiosInstance.put(
    `/auth/cart/increase/${cartItemId}`,
    null   // ⚠️ IMPORTANT: body null honi chahiye
  );
};

// ✅ DECREASE QTY
export const decreaseQtyApi = (cartItemId) =>
  axiosInstance.put(`/auth/cart/decrease/${cartItemId}`);


// ✅ REMOVE
export const removeCartItemApi = (cartItemId) =>
  axiosInstance.delete(`/auth/cart/remove/${cartItemId}`);
