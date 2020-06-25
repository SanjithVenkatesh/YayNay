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
  components: {}
};
</script>

<style>
* {
  font-family: "avenir next", sans-serif;
  font-weight: 400;
  background-color: whitesmoke;
  overflow-x: hidden;
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
