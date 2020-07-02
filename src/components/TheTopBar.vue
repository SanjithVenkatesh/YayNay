<template>
  <!-- <div>
    <button type="logOut" class="primary" v-on:click="logOut">Create New Question</button>
      <button type="logOut" class="primary" v-on:click="about">About</button>
    <h2 class="left"><a href="/">YayNay</a></h2>
    <div class="right" v-if="!loggedIn">
      <h3>Sign Up</h3>
      <h3>Log In</h3>
    </div>
    <div class="right" v-if="loggedIn">
      <p>Welcome {{fullName}}</p>
    </div>
    <div style="clear: both;"></div>
  </div> -->
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
      fullName: ""
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
