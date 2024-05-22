import axios from "axios";
import {TokenName} from "@/library/index.jsx";

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL + '/api',
})

axiosClient.interceptors.request.use(function (config) {
  const token = localStorage.getItem(TokenName);
  if (token) {
    config.headers.Authorization = 'Bearer ' + token
  }
  return config
})

export {axiosClient}
