import { defineStore } from "pinia";
import { useLocalStorage } from "@vueuse/core";
import { loginUser } from "@/services/authService";
import { useRouter } from "vue-router";
import { handleApiError } from "@/services/errorHandler";
import { ref, computed } from "vue";
import User from "@/models/User";

export const useAuthStore = defineStore("auth", () => {
  // State
  const token = useLocalStorage<string | null>("authToken", null);
  const rawUser = useLocalStorage<Partial<User> | null>("user", null);
  const user = computed(() => (rawUser.value ? new User(rawUser.value) : null));

  const apiError = ref<string>("");

  // Getters
  const isAuthenticated = computed(() => !!token.value);

  // Actions
  const router = useRouter();
  const login = async (email: string, password: string) => {
    try {
      const { data } = await loginUser(email, password);

      // Token and user instantiation
      token.value = data.token;
      rawUser.value = new User(data.user);

      // Redirect after login
      router.push("/index");
    } catch (error: unknown) {
      apiError.value = handleApiError(error);
    }
  };

  return {
    token,
    user,
    apiError,
    isAuthenticated,
    login,
  };
});
