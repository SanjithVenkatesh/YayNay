import Vue from "vue";
import VueRouter from "vue-router";
import AV from "leancloud-storage";

Vue.use(VueRouter);

async function isLoggedIn() {
  try {
    const user = AV.User.current();
    if (user) {
      const result = await user.isAuthenticated();
      if (result) {
        await user.fetch();
      } else {
        await AV.User.logOut();
      }
      return result;
    }
    return false;
  } catch (error) {
    alert(error);
  }
}

const routes = [
  {
    path: "/",
    components: {
      authWrapper: () => import("../components/TheAuthWrapper.vue")
    },
    children: [
      // {
      //     path: "/addUser",
      //     component: () => import("../views/AddUser.vue")
      // },
      {
        path: "/",
        component: () => import("../views/AuthPage.vue"),
        beforeEnter: (to, from, next) => {
          isLoggedIn().then(result => {
            if (result) {
              next("/overview");
            } else {
              next();
            }
          });
        }
      }
    ]
  },
  {
    path: "/",
    components: {
      basicWrapper: () => import("../components/TheBasicWrapper.vue"),
      topBar: () => import("../components/TheTopBar.vue"),
      bercowQuote: () => import("../components/BercowQuote.vue")
    },
    children: [
      {
        path: "/overview",
        component: () => import("../views/HomePage.vue")
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
