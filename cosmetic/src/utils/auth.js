// add to cart ke liye 

// src/utils/auth.js

export const getStoredUser = () => {
  try {
    const user = localStorage.getItem("user");
    const parsedUser = user ? JSON.parse(user) : null;

    return parsedUser && parsedUser.id ? parsedUser : null;
  } catch (err) {
    console.error("Failed to parse user from localStorage", err);
    return null;
  }
};

