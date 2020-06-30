<template>
  <div>
    <!-- <button type="logOut" class="primary" v-on:click="logOut">Create New Question</button>
      <button type="logOut" class="primary" v-on:click="about">About</button> -->
    <h2 class="left"><a href="/">YayNay</a></h2>
    <div class="right">
      <h3>Sign Up</h3>
      <h3>Log In</h3>
    </div>
    <div style="clear: both;"></div>
  </div>
</template>

<script>
export default {
  name: "TheTopNav",
  data() {
    return {};
  },
  methods: {
    toHomePage() {
      const vm = this;
      vm.$router.push("/");
    },
    about() {
      const vm = this;
      vm.$router.push("/about");
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
  background-color: skyblue;
  width: 100px;
  height: 40px;
  text-align: center;
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
</style>
