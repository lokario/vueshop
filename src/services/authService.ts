import api from "@/plugins/api";

export const loginUser = async (email: string, password: string) => {
  const response = await api.post("/login", { email, password });
  return response.data;
};

export const signUpUser = async (
  name: string,
  email: string,
  password: string,
  c_password: string
) => {
  const response = await api.post("/register", {
    name,
    email,
    password,
    c_password,
  });
  return response.data;
};
