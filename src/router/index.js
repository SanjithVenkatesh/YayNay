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
        path: "/about",
        component: () => import("../views/AboutPage.vue")
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
