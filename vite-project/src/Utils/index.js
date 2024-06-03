export const isAuthenticated = () => {
  // Check if the user is authenticated
  return localStorage.getItem("access_token") !== null;
};
