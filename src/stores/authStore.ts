import { defineStore } from "pinia";
import { useLocalStorage } from "@vueuse/core";
import { loginUser, signUpUser } from "@/services/authService";
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

      saveDataAndRedirect(data);
    } catch (error: unknown) {
      apiError.value = handleApiError(error);
    }
  };

  const signUp = async (name: string, email: string, password: string) => {
    try {
      const { data } = await signUpUser(name, email, password, password);

      saveDataAndRedirect(data);
    } catch (error: unknown) {
      apiError.value = handleApiError(error);
    }
  };

  const saveDataAndRedirect = (data) => {
    // Token and user instantiation
    token.value = data.token;
    rawUser.value = new User(data.user);

    // Redirect after login
    router.push("/");
  };

  return {
    token,
    user,
    apiError,
    isAuthenticated,
    login,
    signUp,
  };
});
