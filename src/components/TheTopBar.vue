<template>
  <nav>
    <ul class="left">
      <li>
        <h2 class="left"><a href="/">YayNay</a></h2>
      </li>
    </ul>
    <ul class="right">
      <div v-if="$store.state.logInState">
        <li :class="[$store.state.openedTopNavItem === 'user' ? 'open' : '']">
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
    </ul>
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
      theme: "light"
    };
  },
  created() {
    const vm = this;
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
    }
  }
};
</script>

<style scoped>
* {
  text-align: left;
  background-color: whitesmoke;
  /* display: flex; */
  margin-left: 10px;
  margin-right: 10px;
  margin-top: 5px;
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
  color: black;
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
  background-color: whitesmoke;
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
