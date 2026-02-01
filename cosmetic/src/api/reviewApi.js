import axiosInstance from "./axiosInstance";

// get all reviews
export const getProductReviews = (productId) =>
  axiosInstance.get(`/auth/products/${productId}/reviews`);

// rating summary
export const getRatingSummary = (productId) =>
  axiosInstance.get(`/auth/products/${productId}/reviews/summary`);

// add review
export const addReview = (productId, userId, data) =>
  axiosInstance.post(
    `/auth/products/${productId}/reviews`,
    data,
    { params: { userId } }
  );

// ⚠️ update review (same API – backend overwrite logic)
export const updateReview = (productId, userId, data) =>
  axiosInstance.post(
    `/auth/products/${productId}/reviews`,
    data,
    { params: { userId } }
  );
