import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);
export default new Vuex.Store({
  state: {
    logInState: false,
    settingState: false,
    sideNavOn: false,
    openedTopNavItem: "",
    globalSearchOn: false
  },
  mutations: {
    closeSideNav(state) {
      state.sideNavOn = false;
    },
    toggleSideNav(state) {
      state.sideNavOn = !state.sideNavOn;
    },
    updateOpenedTopNavItem(state, item) {
      state.openedTopNavItem = state.openedTopNavItem === item ? "" : item;
    },
    openGlobalSearch(state) {
      state.globalSearchOn = true;
    },
    closeGlobalSearch(state) {
      state.globalSearchOn = false;
    },
    logOut(state) {
      state.logInState = false;
    },
    logIn(state) {
      state.logInState = true;
    },
    openSettings(state) {
      state.settingState = true;
    },
    closeSettings(state) {
      state.settingState = false;
    }
  }
});
