import axios from "./axiosInstance";

export const addToWishlistApi = (data) =>
  axios.post("/auth/wishlist/add", data);

export const getWishlistApi = (userId) =>
  axios.get(`/auth/wishlist/${userId}`);

export const removeWishlistApi = (userId, productId) =>
  axios.delete(`/auth/wishlist/remove`, {
    params: { userId, productId }
  });
