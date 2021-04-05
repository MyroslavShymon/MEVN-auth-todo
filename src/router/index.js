import Vue from "vue";
import VueRouter from "vue-router";
import store from "../store";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/about",
    name: "About",
    component: () => import("../views/About.vue"),
  },
  {
    path: "/login",
    name: "Login",
    meta: {
      requiresGuests: true,
    },
    component: () => import("../views/Login.vue"),
  },
  {
    path: "/register",
    name: "Register",
    meta: {
      requiresGuests: true,
    },
    component: () => import("../views/Register.vue"),
  },
  {
    path: "/profile",
    name: "Profile",
    meta: {
      requiresAuth: true,
    },
    component: () => import("../views/Profile.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!store.getters.isLoggedIn) {
      // Redirect to the Login Page
      next("/login");
    } else {
      next();
    }
  } else if (to.matched.some((record) => record.meta.requiresGuests)) {
    if (store.getters.isLoggedIn) {
      // Redirect to the Login Page
      next("/profile");
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
