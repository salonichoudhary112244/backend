// export const getUser = () => {
//   const user = localStorage.getItem("user");
//   return user ? JSON.parse(user) : null;
// };

// export const isSuperAdmin = () => {
//   const user = getUser();
//   return user?.roles?.includes("SUPER_ADMIN");
// };




export const getUserFromStorage = () => {
  try {
    return JSON.parse(localStorage.getItem("user")) || null;
  } catch {
    return null;
  }
};

export const getToken = () => localStorage.getItem("token");

export const isLoggedIn = () => !!getToken();

export const hasRole = (roleName) => {
  const user = getUserFromStorage();
  if (!user || !user.roles) return false;

  // IMPORTANT: backend agar ROLE_ADMIN deta hai to yahi match hona chahiye
  return user.roles.includes(roleName);
};

export const isSuperAdmin = () => hasRole("ROLE_SUPER_ADMIN");
export const isAdmin = () => hasRole("ROLE_ADMIN");
export const isSeller = () => hasRole("ROLE_SELLER");
