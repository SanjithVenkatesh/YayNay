<template>
  <div>
    <nav>
      <button type="logOut" class="primary" v-on:click="logOut">Create New Question</button>
      <button type="logOut" class="primary" v-on:click="about">About</button>
    </nav>
  </div>
</template>

<script>
export default {
  name: "TheTopNav",
  data() {
    return {
    };
  },
  methods: {
    logOut() {
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
  background-color: lightgrey;
  display: flex;
}

button{
  background-color: skyblue;
  width: 100px;
  height: 40px;
  text-align: center;
}

body{
  margin: 0px;
}
</style>
