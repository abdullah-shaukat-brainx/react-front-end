import axios from "axios";
const BASE_URL = "http://localhost:3000/api/v1";

export const postCall = async (url, data) => {
  try {
    const response = await axios.post(BASE_URL + url, data);
    const result = {
      ...response.data, // Spread the properties of response.data.data
    };
    if (response.headers.access_token) {
      result.access_token = response.headers.access_token;
    }
    return result;
  } catch (error) {
    throw error; // Rethrow the error for the caller to handle
  }
};

export const putCall = async (url, data) => {
  try {
    const response = await axios.put(BASE_URL + url, data);
    const result = {
      ...response.data, // Spread the properties of response.data.data
    };
    return result;
  } catch (error) {
    // console.log(error)
    throw error; // Rethrow the error for the caller to handle
  }
};

export const authorizedGetCall = async (url) => {
  return new Promise((resolve, reject) => {
    axios
      .get(BASE_URL + url, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("access_token"),
        },
      })
      .then((data) => {
        resolve(data?.data);
      })
      .catch((err) => {
        throw err;
      });
  });
};

export const authorizedPostCall = async (url, data) => {
  try {
    const response = await axios.post(BASE_URL + url, data, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("access_token"),
      },
    });
    const result = {
      ...response.data, // Spread the properties of response.data.data
    };
    if (response.headers.access_token) {
      result.access_token = response.headers.access_token;
    }
    return result;
  } catch (error) {
    throw error; // Rethrow the error for the caller to handle
  }
};

export const authorizedDeleteCall = async (url) => {
  try {
    const response = await axios.delete(BASE_URL + url, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("access_token"),
      },
    });
    return response;
  } catch (error) {
    console.log(error);
    throw error; // Rethrow the error for the caller to handle
  }
};

export const authorizedPutCall = async (url, data) => {
  try {
    const response = await axios.put(BASE_URL + url, data, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("access_token"),
      },
    });
    const result = {
      ...response.data, // Spread the properties of response.data.data
    };
    if (response.headers.access_token) {
      result.access_token = response.headers.access_token;
    }
    return result;
  } catch (error) {
    throw error; // Rethrow the error for the caller to handle
  }
};