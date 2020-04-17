<template>
  <div>
    <nav>
      <button type="logOut" class="primary" v-on:click="logOut">Create New Question</button>
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
      console.log("Logging out");
      const vm = this;
      // AV.User.logOut();
      vm.$router.push("/");
    }
  }
};
</script>

<style scoped>
* {
  text-align: right;
  background-color: lightgrey;
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
