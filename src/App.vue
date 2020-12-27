<template>
  <div
    :class="{ dark: $store.state.darkTheme, light: $store.state.lightTheme }"
  >
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <transition name="top-nav">
      <router-view
        name="topBar"
        class="top-nav"
        :lightTheme="pageBackground.lightTheme"
        :darkTheme="pageBackground.darkTheme"
      ></router-view>
    </transition>
    <transition name="page-wrapper">
      <!-- <router-view name="authWrapper" class="auth-wrapper"></router-view> -->
      <router-view name="basicWrapper" class="basic-wrapper"></router-view>
    </transition>
    <div id="Switch Theme">
      <label>Switch Theme</label>
      <toggle-button @change="themeSwitch" />
    </div>
  </div>
</template>

<script>
import AV from "leancloud-storage";
export default {
  name: "App",
  data() {
    return {
      pageBackground: {
        darkTheme: false,
        lightTheme: true,
      },
    };
  },
  components: {},
  methods: {
    themeSwitch() {
      const vm = this;
      if (vm.$store.state.lightTheme) {
        vm.$store.commit("setDarkTheme");
      } else {
        vm.$store.commit("setLightTheme");
      }

      console.log("darkTheme = " + vm.pageBackground.darkTheme);
    },
  },
  created() {
    const vm = this;
    const currentUser = AV.User.current();
    if (currentUser) {
      vm.$store.commit("setName", currentUser.get("fullName"));
      vm.$store.commit("logIn");
    } else {
      vm.$store.commit("logOut");
    }
  },
};
</script>

<style>
* {
  font-family: "avenir next", sans-serif;
  font-weight: 400;
}

#wrapper {
  margin: 0px;
}

.dark {
  background-color: #121212;
  height: 100%;
  color: white;
}

.light {
  background-color: whitesmoke;
  min-height: 100%;
}

/* html, body{
  height: 100%;
} */

h1 {
  font-weight: 600;
  font-size: 18pt;
}

a {
  text-decoration: none;
}
</style>
