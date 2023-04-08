import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../modules/home/views/Home.vue";
import page404 from "../views/404.vue";
import { getAccessToken } from "../utils/localStorage";

// modules
const login = () => import("../modules/auth/views/Login.vue");
const register = () => import("../modules/auth/views/Registration.vue");
const invoises = () => import("../modules/invoises/views/Invoises.vue");

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/login",
      name: "login",
      component: login,
      meta: {
        login: true,
      },
    },
    {
      path: "/register",
      name: "register",
      component: register,
    },
    {
      path: "/invoises",
      name: "invoises",
      component: invoises,
    },

    // -> 404
    {
      path: "/:pathMatch(.*)*",
      name: "404",
      component: page404,
    },
  ],
});

router.beforeEach((to, from, next) => {
  const token = getAccessToken();

  if (to.meta && to.meta.login) next();
  if (!token) {
    next("/login");
  } else {
    next();
  }
});

export default router;
