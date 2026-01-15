import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8080",
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
    (error) => Promise.reject(error)
);

export default axiosInstance;


//interceptor  :- object (axios)   two type
//promise :- 
// difference between http and https(convert http to https :- eslint.config.js (ssl certificate download))
// async defer
// async await
// component based stucture