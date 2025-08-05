import axios from "axios";
import { auth } from "../firebase/config";

// Get base URL from env
const API_URL = import.meta.env.VITE_API_URL;

export const postProduct = async (data) => {
  const token = await auth.currentUser.getIdToken();
  return axios.post(`${API_URL}/api/products/create`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const fetchProducts = async () => {
  const token = await auth.currentUser.getIdToken();
  return axios.get(`${API_URL}/api/products`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};
