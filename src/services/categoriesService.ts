import api from "@/plugins/api";

export const fetchCategories = async () => {
  const response = await api.get("/categories", { params: { per_page: 0 } });
  return response.data;
};
