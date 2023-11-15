import axios from "axios";
import { history } from "./history";
import { getLocalStorageTokens, removeLocalStorageUser } from "./auth";
import config from "./config";

const http = axios.create({
  baseURL: config.apiUrl,
  headers: { "Content-Type": "application/json" },
});

http.interceptors.request.use(
  (config) => {
    const tokens = getLocalStorageTokens();
    if (tokens) config.headers.Authorization = `Token ${tokens.accessToken}`;
    return config;
  },
  (error) => Promise.reject(error)
);

http.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error?.response?.status === 500 || error?.response?.status === 404)
      return Promise.reject(null);
    else if (error?.response?.status === 401) {
      removeLocalStorageUser();
      history.push("/");
    }
    return Promise.reject(error);
  }
);

export default http;
