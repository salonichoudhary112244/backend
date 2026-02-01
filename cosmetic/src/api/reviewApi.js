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

// UPDATE review (IMPORTANT)
export const updateReview = (productId, reviewId, userId, data) =>
  axiosInstance.put(
    `/auth/products/${productId}/reviews/${reviewId}`,
    data,
    { params: { userId } }
  );

  export const deleteReview = (productId, reviewId, userId) =>
  axiosInstance.post(
    `/auth/products/${productId}/reviews/${reviewId}/delete`,
    null,
    { params: { userId } }
  );

