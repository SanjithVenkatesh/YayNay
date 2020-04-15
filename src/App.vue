<template>
  <div>
    <transition name="top-nav">
      <router-view name="topBar" class="top-nav"></router-view>
    </transition>
    <transition name="page-wrapper">
      <!-- <router-view name="authWrapper" class="auth-wrapper"></router-view> -->
      <router-view name="basicWrapper" class="basic-wrapper"></router-view>
    </transition>
  </div>
</template>

<script>

export default {
  name: "App",
  components: {
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

* {
  font-family: "avenir next", sans-serif;
  font-weight: 400;
}

h1 {
  font-weight: 600;
  font-size: 18pt;
}

body{
  margin: 0px;
}
</style>
