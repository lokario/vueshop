import api from "@/plugins/api";

export const fetchProducts = async (page = 1) => {
  const response = await api.get("/shop", { params: { page } });
  return response.data;
};
