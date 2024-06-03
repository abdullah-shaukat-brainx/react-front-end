import { postCall, putCall,authorizedPostCall } from "./APIsServices";

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
    putCall(`/users/verify_email/${token}`, {})
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
    postCall("/users/login", { email, password })
      .then((data) => {
        resolve(data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const forgetPassword = async (email) => {
  return new Promise((resolve, reject) => {
    postCall("/users/forget_password", { email })
      .then((data) => {
        resolve(data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const resetPassword = async (token, newPassword, confirmNewPassword) => {
  return new Promise((resolve, reject) => {
    putCall(`/users/reset_password/${token}`, {
      newPassword,
      confirmNewPassword,
    })
      .then((data) => {
        resolve(data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const changePassword = async (
  oldPassword,
  newPassword,
  confirmNewPassword

  // body
) => {
  return new Promise((resolve, reject) => {
    authorizedPostCall("/users/change_password", {
      oldPassword,
      newPassword,
      confirmNewPassword,
    })
      .then((data) => {
        resolve(data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};
