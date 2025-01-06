import { createRouter, createWebHistory } from "vue-router/auto";
import { setupLayouts } from "virtual:generated-layouts";
import SignInPage from "@/pages/LoginPage.vue";
import SignUpPage from "@/pages/SignUpPage.vue";
import HomePage from "@/pages/HomePage.vue";
import { useAuthStore } from "@/stores/authStore";
import NotFound from "@/pages/NotFound.vue";

const routes = [
  {
    path: "/",
    name: "Index",
    component: HomePage,
    meta: { requiresAuth: true },
  },
  { path: "/signin", name: "SignIn", component: SignInPage },
  { path: "/signup", name: "SignUp", component: SignUpPage },
  {
    path: "/:catchAll(.*)",
    name: "NotFound",
    component: NotFound,
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: setupLayouts(routes),
});

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();

  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next({ path: "/signin" }); // Go login
  } else if (authStore.isAuthenticated && !to.meta.requiresAuth) {
    next({ path: "/" }); // Go home
  } else {
    next(); // Allow navigation
  }
});

// Workaround for https://github.com/vitejs/vite/issues/11804
router.onError((err, to) => {
  if (err?.message?.includes?.("Failed to fetch dynamically imported module")) {
    if (!localStorage.getItem("vuetify:dynamic-reload")) {
      console.log("Reloading page to fix dynamic import error");
      localStorage.setItem("vuetify:dynamic-reload", "true");
      location.assign(to.fullPath);
    } else {
      console.error("Dynamic import error, reloading page did not fix it", err);
    }
  } else {
    console.error(err);
  }
});

router.isReady().then(() => {
  localStorage.removeItem("vuetify:dynamic-reload");
});

export default router;
