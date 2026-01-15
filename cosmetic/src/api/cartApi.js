import axiosInstance from "./axiosInstance";
import { getStoredUser } from "../utils/auth";

export const addToCartApi = async ({ productId, variantId, quantity }) => {
  const user = getStoredUser();
  if (!user) throw new Error("Login required");

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

export const getCartCountApi = async (userId) => {
  return axiosInstance.get(`/auth/cart/count/${userId}`);
};

export const increaseQtyApi = (cartItemId) =>
  axiosInstance.post(`/auth/cart/add`, { cartItemId });

export const decreaseQtyApi = (cartItemId) =>
  axiosInstance.put(`/auth/cart/decrease/${cartItemId}`);

export const removeCartItemApi = (cartItemId) =>
  axiosInstance.delete(`/auth/cart/remove/${cartItemId}`);
