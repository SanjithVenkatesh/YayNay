<template>
  <div>
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <transition name="top-nav">
      <router-view name="topBar" class="top-nav"></router-view>
    </transition>
    <transition name="page-wrapper">
      <!-- <router-view name="authWrapper" class="auth-wrapper"></router-view> -->
      <router-view name="basicWrapper" class="basic-wrapper"></router-view>
    </transition>
     <button @click="darkThemeSwitch">Switch Theme</button>
  </div>
</template>

<script>
import AV from "leancloud-storage";
export default {
  name: "App",
  components: {},
  methods:{
    _addDarkTheme() {
      let darkThemeLinkEl = document.createElement("link");
      darkThemeLinkEl.setAttribute("rel", "stylesheet");
      darkThemeLinkEl.setAttribute("href", "/css/darktheme.css");
      darkThemeLinkEl.setAttribute("id", "dark-theme-style");

      let docHead = document.querySelector("head");
      docHead.append(darkThemeLinkEl);
    },
    _removeDarkTheme() {
      let darkThemeLinkEl = document.querySelector("#dark-theme-style");
      let parentNode = darkThemeLinkEl.parentNode;
      parentNode.removeChild(darkThemeLinkEl);
    },
    darkThemeSwitch() {
      let darkThemeLinkEl = document.querySelector("#dark-theme-style");
      if (!darkThemeLinkEl) {
        this._addDarkTheme()
      } else {
        this._removeDarkTheme()
      }
    },
  },
  created(){
    const vm = this;
    const currentUser = AV.User.current();
    if(currentUser){
      vm.$store.commit("setName", currentUser.get("fullName"));
      vm.$store.commit("logIn");
    }
    else{
      vm.$store.commit("logOut");
    }
  }
};
</script>

<style>
* {
  font-family: "avenir next", sans-serif;
  font-weight: 400;
  background-color: whitesmoke;
  margin-left: 0px;
}

h1 {
  font-weight: 600;
  font-size: 18pt;
}

body {
  margin: 0px;
}
</style>
