import axiosInstance from "./axiosInstance";

//cart ke liye
export const addToCartApi = (payload) =>
  axiosInstance.post("/auth/cart/add", payload);

export const getCartApi = (userId) =>
  axiosInstance.get(`/auth/cart/${userId}`);

//quntity
export const decreaseQtyApi = (cartItemId) =>
  axiosInstance.put(`/auth/cart/decrease/${cartItemId}`);

//cart-icon
// export const getCartCountApi = (userId) =>
//   axiosInstance.get(`/auth/cart/count?userId=${userId}`);


export const getCartCountApi = (userId) =>
  axiosInstance.get(`/auth/cart/count`, {
    params: { userId }
  });
