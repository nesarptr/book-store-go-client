import axios, { AxiosHeaders } from "axios";
import Cookies from "js-cookie";

const instance = axios.create({
  baseURL: "https://manage-inventory.onrender.com/api/v1",
});

instance.defaults.headers.post["Content-Type"] = "application/json";

// Add a request interceptor
instance.interceptors.request.use(
  function (config) {
    // Do something before request is sent

    const headers: AxiosHeaders = config.headers as AxiosHeaders;

    if (Cookies.get("jwtoken") && !headers.has("Authorization")) {
      headers.set("Authorization", `Bearer ${Cookies.get("jwtoken")}`);
    }
    config.headers = headers;
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

export default instance;
