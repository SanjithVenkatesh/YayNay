<template>
  <nav>
    <div
      :class="{ dark: $store.state.darkTheme, light: $store.state.lightTheme }"
    >
      <ul class="left">
        <li>
          <h2 class="left" style="text-decoration: none">
            <a class="noDecoration" href="/">YayNay</a>
          </h2>
        </li>
      </ul>
      <ul
        class="right"
        :class="{
          dark: $store.state.darkTheme,
          light: $store.state.lightTheme,
        }"
      >
        <div class="topRight">
          <toggle-button
            :width="35"
            :height="17"
            :color="{
              checked: '#9370DB',
              unchecked: '#E6CCB3',
              disabled: '#CCCCCC',
            }"
            style="margin-top: 15px;"
            @change="themeSwitch"
          />
          <div v-if="$store.state.logInState">
            <li
              :class="[$store.state.openedTopNavItem === 'user' ? 'open' : '']"
            >
              <button class="welcome" @click="modifyOpened">
                <h3>Welcome {{ $store.state.currentUser.fullName }}</h3>
              </button>
              <ul class="dialogue" v-if="$store.state.settingState">
                <li>
                  <button @click="toProfilePage">
                    <span>Profile</span>
                  </button>
                </li>
                <li>
                  <router-link :to="'/settings'">
                    <span>Settings</span>
                  </router-link>
                </li>
                <li>
                  <button @click="logOut">
                    <span>Log out</span>
                  </button>
                </li>
              </ul>
            </li>
          </div>
          <div v-if="!$store.state.logInState">
            <router-link :to="'/register'">
              <span>Sign Up</span>
            </router-link>
            <router-link :to="'/login'">
              <span>Log In</span>
            </router-link>
          </div>
        </div>
      </ul>
    </div>
  </nav>
</template>

<script>
import AV from "leancloud-storage";
export default {
  name: "TheTopNav",
  data() {
    return {
      loggedIn: false,
      fullName: "",
    };
  },
  watch: {
    lightTheme: function(newVal) {
      console.log("New lightTheme = " + newVal);
    },
    darkTheme: function(newVal) {
      console.log("New darkTheme = " + newVal);
    },
  },
  created() {
    const vm = this;
    console.log("in top bar, lightTheme = " + vm.lightTheme);
    vm.$forceUpdate();
    vm.$store.commit("closeSettings");
    const currentUser = AV.User.current();
    if (currentUser) {
      vm.$store.commit("logIn");
      vm.loggedIn = true;
      vm.fullName = currentUser.get("fullName");
    }
  },
  methods: {
    toHomePage() {
      const vm = this;
      vm.$router.push("/");
    },
    about() {
      const vm = this;
      vm.$router.push("/about");
    },
    modifyOpened() {
      const vm = this;
      if (vm.$store.state.settingState) {
        vm.$store.commit("closeSettings");
      } else {
        vm.$store.commit("openSettings");
      }
    },
    themeSwitch() {
      const vm = this;
      if (vm.$store.state.lightTheme) {
        vm.$store.commit("setDarkTheme");
      } else {
        vm.$store.commit("setLightTheme");
      }
    },
    logOut() {
      const vm = this;
      AV.User.logOut();
      vm.loggedIn = false;
      vm.$store.commit("closeSettings");
      vm.$store.commit("logOut");
      vm.toHomePage();
    },
    toProfilePage() {
      const vm = this;
      vm.$router.push("/users/" + AV.User.current().get("objectId"));
    },
  },
};
</script>

<style scoped>
* {
  text-align: left;
  /* display: flex; */
  margin-left: 10px;
  margin-right: 10px;
  text-decoration: none;
  margin-bottom: 0px;
  padding-bottom: 0px;
}

.left,
.right {
  margin: 0;
  padding: 0;
  list-style: none;
}

button {
  text-align: center;
  padding: 0;
  border: none;
  background: none;
  cursor: auto;
}

body {
  margin: 0px;
}

nav {
  /* display: flex; */
}

.left {
  float: left;
  margin: 0 0 0 8px;
}

.right {
  float: right;
  margin: 0 8px 0 0;
  display: flex;
}

a {
  text-decoration: none;
}

.welcome {
  font-size: 12px;
}

.dialogue {
  /* display: none; */
  position: absolute;
  top: 48px;
  margin: 0;
  margin-left: 0px;
  padding: 0px 0 0 0;
  border-radius: 2px;
  list-style: none;
}

.dialogue li {
  margin-left: 0px;
}

.dialogue router-link {
  font-size: 10px;
}

.dialogue button {
  font-size: 16px;
}
.dark a {
  text-decoration: none;
}

.dark {
  background-color: #121212;
  color: white;
}

.dark h3,
h2,
span {
  color: white;
}

.light {
  background-color: whitesmoke;
}

.light span {
  color: black;
}

.topRight{
  display: flex;
}

a[href],
input[type="submit"],
input[type="image"],
label[for],
select,
button,
.pointer {
  cursor: pointer;
}
</style>
