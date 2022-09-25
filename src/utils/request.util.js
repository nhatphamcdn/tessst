import axios from "axios";
import { APP_API_URL } from "@/config/app.config";
import qs from "qs";

axios.defaults.withCredentials = true;
const request = axios.create({
  baseURL: APP_API_URL, // url = base url + request url
  // send cookies when cross-domain requests
  // timeout: 5000 // request timeout
});

request.interceptors.request.use(
  function (config) {
    config.headers = {
      // ...(store.state.user.token ? { Authorization: 'Bearer ' + store.state.user.token } : {}),
      ...(config.headers || {}),
    };
    if (config.method === "get") {
      config.paramsSerializer = function (params) {
        return qs.stringify(params, { arrayFormat: "repeat" });
      };
    }
    return config;
  },
  function (err) {
    return Promise.reject(err);
  },
);

request.interceptors.response.use(
  function (res) {
    if (res.request.responseType === "blob") {
      return res;
    }
    if (res.data.code !== 0) {
      return Promise.reject(res.data);
    }
    return res.data.data;
  },
  function (err) {
    return Promise.reject(err);
  },
);

export default request;
