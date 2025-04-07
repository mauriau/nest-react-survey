import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:3000/",
  timeout: 5000,
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});
