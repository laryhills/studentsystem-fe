const logout = () => {
  localStorage.removeItem("user");
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user") || "{}");
};

export const AuthService = {
  logout,
  getCurrentUser,
};
