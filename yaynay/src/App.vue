<template>
  <div>
    <!-- <transition name="side-nav">
      <router-view
        name="sideNav"
        :class="['side-nav', $store.state.sideNavOn ? 'on' : '']"
      ></router-view>
    </transition> -->
    <!-- <transition name="side-nav-toggle">
      <router-view name="sideNavToggle" class="side-nav-toggle"></router-view>
    </transition>
    <transition name="top-nav">
      <router-view name="topNav" class="top-nav"></router-view>
    </transition> -->
    <transition name="page-wrapper">
      <router-view name="authWrapper" class="auth-wrapper"></router-view>
      <!-- <router-view name="basicWrapper" class="basic-wrapper"></router-view> -->
    </transition>
    <!-- <router-view
      v-if="$store.state.globalSearchOn"
      name="globalSearch"
      class="global-search"
    ></router-view> -->
  </div>
</template>


<script>
// import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  components: {

  }
}
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
</style>
