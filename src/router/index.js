import Vue from "vue";
import VueRouter from "vue-router";
import DefaultLayout from "@/layouts/default/DefaultLayout.vue";

Vue.use(VueRouter);

const router = new VueRouter({
  mode: "history",
  base: import.meta.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "default-layout",
      component: DefaultLayout,
      children: [
        {
          path: "/",
          name: "home",
          component: () => import("@/pages/HomeView.vue"),
          meta: {
            text: "Home",
            defaultVisited: true,
          },
        },
      ],
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../pages/AboutView.vue"),
    },
  ],
});

export default router;
