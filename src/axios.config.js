import axios from "axios";
import * as utils from "@/utils/localStorage";
import { refreshToken } from "./api/auth";
import { setToLocaleStorage } from "./utils/localStorage";

const baseUrl = "http://localhost:3001/api/v1/";

const http = axios.create({
  baseURL: baseUrl,
});

// Request interceptor for API calls
http.interceptors.request.use(
  async (config) => {
    const keys = await utils.getAccessToken();
    if (keys) {
      config.headers = {
        Authorization: `Bearer ${keys}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      };
    }
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

// Response interceptor for API calls
let isRefreshing = false;

http.interceptors.response.use(
  (response) => {
    return response;
  },
  async function (error) {
    const originalRequest = error?.config;
    if (
      error.response.status === 401 &&
      !originalRequest._retry &&
      !isRefreshing
    ) {
      isRefreshing = true;
      originalRequest._retry = true;
      const { data } = await refreshToken();
      setToLocaleStorage("access_token", data.token);
      axios.defaults.headers.common["Authorization"] =
        "Bearer " + data.access_token;
      return http(originalRequest);
    }
    isRefreshing = false;
    if (error.response.status === 401) {
      useJwt.logout();
    }
    return Promise.reject(error);
  }
);

export default http;
