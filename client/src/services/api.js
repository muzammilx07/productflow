import axios from "axios";
import { auth } from "../firebase/config";

export const postProduct = async (data) => {
  const token = await auth.currentUser.getIdToken();
 return axios.post("http://localhost:5000/api/products/create", data, {
   headers: { Authorization: `Bearer ${token}` },
 });
};

export const fetchProducts = async () => {
  const token = await auth.currentUser.getIdToken();
  return axios.get("http://localhost:5000/api/products", {
    headers: { Authorization: `Bearer ${token}` },
  });
};
