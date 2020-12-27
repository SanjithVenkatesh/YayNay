import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vueClipboards from "vue-clipboard2";
import ToggleButton from "vue-js-toggle-button";
// import store from "./store";
// import AV from "leancloud-storage";
const AV = require("leancloud-storage/live-query");
Vue.use(vueClipboards);
Vue.use(ToggleButton);
AV.init({
  appId: "lms0hGMSElc8CKnfQJ8onWCV-MdYXbMMI",
  appKey: "vk5O9VLHEnRXvXn069Rwv6e0",
});

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
