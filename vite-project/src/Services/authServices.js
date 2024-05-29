import { postCall,putCall } from "./APIsServices";

export const signup = async (email, password, confirmPassword) => {
  return new Promise((resolve, reject) => {
    postCall("/users/signup", { email, password, confirmPassword })
      .then((data) => {
        resolve(data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const verify = async (token) => {
  return new Promise((resolve, reject) => {
    putCall(`/users/verify_email/${token}`,{})
      .then((data) => {
        resolve(data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const login = async (email, password) => {
  return new Promise((resolve, reject) => {
    postCall('/users/login', { email, password })
      .then((data) => {
        resolve(data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};