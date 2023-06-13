import axios from "redaxios";

const BASE_URL = "http://localhost:8080/api/v2";

export const axiosInstanceNoToken = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// create a new axios instance
// create interceptor to add token to all requests
// use interceprtor to redirect to login page if token is expired or invalid
export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("token")}`,
    "Access-Control-Allow-Origin": "*",
  },
});
