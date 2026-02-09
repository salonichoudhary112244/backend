export const getUser = () => {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
};

export const isSuperAdmin = () => {
  const user = getUser();
  return user?.roles?.includes("SUPER_ADMIN");
};
