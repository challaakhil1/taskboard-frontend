// import axios from "axios";

// const API = axios.create({
//   baseURL: "http://localhost:5050/api"
//   ,
// });

// API.interceptors.request.use((req) => {
//   const token = localStorage.getItem("token");
//   if (token) req.headers.Authorization = `Bearer ${token}`;
//   return req;
// });

// export default API;

// src/axios.js
import axios from "axios";

const instance = axios.create({
  baseURL: `http://${window.location.hostname}:5050/api`, // ✅ resolves correctly even in Docker
  withCredentials: true, // ✅ needed for cookies/JWT
});

export default instance;
