import axios from "axios";
const BASE_URL = "http://localhost:3000/api/v1";

export const postCall = async (url, data) => {
  try {
    const response = await axios.post(BASE_URL + url, data);
    const result = {
      ...response.data, // Spread the properties of response.data.data
    };
    if (response.headers.refresh_token) {
      result.refresh_token = response.headers.refresh_token;
    }
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
