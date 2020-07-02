import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    components: {
      basicWrapper: () => import("../components/TheBasicWrapper.vue"),
      topBar: () => import("../components/TheTopBar.vue"),
      bercowQuote: () => import("@/components/BercowQuote.vue")
    },
    children: [
      {
        path: "/",
        component: () => import("../views/HomePage.vue")
      },
      {
        path: "/logIn",
        component: () => import("../views/LogInPage.vue")
      },
      {
        path: "/about",
        component: () => import("../views/AboutPage.vue")
      },
      {
        path: "/register",
        component: () => import("../views/RegisterUserPage.vue")
      },
      {
        path: "/settings",
        component: () => import("../views/SettingsPage.vue")
      },
      {
        path: "/:id",
        component: () => import("../views/VotingPage.vue")
      }
    ]
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});
export default router;
