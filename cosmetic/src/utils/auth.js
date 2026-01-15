// //add to cart ke liye banaya

// export const getStoredUser = () => {
//   try {
//     const data = localStorage.getItem("user");
//     if (!data || data === "undefined") return null;
//     return JSON.parse(data);
//   } catch {
//     return null;
//   }
// };


export const getStoredUser = () => {
  try {
    const raw = localStorage.getItem("user");
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
};

