import { setActivePinia, createPinia } from "pinia";
import { describe, it, expect, beforeEach, vi } from "vitest";
import router from "@/router"; // Adjust the path to your router file
import * as authService from "@/services/authService";
import { useAuthStore } from "@/stores/authStore";

describe("authStore", () => {
  beforeEach(() => {
    setActivePinia(createPinia());

    vi.mock("@/router", () => ({
      default: {
        push: vi.fn(), // Mock push method
      },
    }));
  });

  it("should log in a user and update the state", async () => {
    const mockResponse = {
      data: {
        token: "mock-token",
        user: { id: 1, name: "John Doe", email: "john@example.com" },
      },
    };

    vi.spyOn(authService, "loginUser").mockResolvedValue(mockResponse);

    const store = useAuthStore();
    await store.login("john@example.com", "password");

    expect(store.token).toBe("mock-token");
    expect(store.user).toMatchObject(mockResponse.data.user);
    expect(store.isAuthenticated).toBe(true);
  });

  it("should sign up a user and update the state", async () => {
    const mockResponse = {
      data: {
        token: "mock-token",
        user: { id: 2, name: "Jane Doe", email: "jane@example.com" },
      },
    };

    vi.spyOn(authService, "signUpUser").mockResolvedValue(mockResponse);

    const store = useAuthStore();
    await store.signUp("Jane Doe", "jane@example.com", "password");

    expect(store.token).toBe("mock-token");
    expect(store.user).toMatchObject(mockResponse.data.user);
    expect(store.isAuthenticated).toBe(true);
  });
});
