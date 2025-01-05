import api from "@/plugins/api";

export const fetchProducts = async (page = 1, category = "") => {
  const response = await api.get("/shop", {
    params: { page, category_uuid: category },
  });
  return response.data;
};

export const fetchAllProducts = async () => {
  const response = await api.get("/shop", { params: { per_page: 0 } });
  return response.data;
};

export const searchProductsByName = async (name: string) => {
  const allProducts = await fetchAllProducts();
  return allProducts.data.filter((product: { name: string }) =>
    product.name.toLowerCase().includes(name.toLowerCase())
  );
};