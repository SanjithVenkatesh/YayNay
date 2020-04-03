<template>
  <div>
    <h1>Hi</h1>
    <button type="logOut" class="primary" v-on:click="logOut">Log Out</button>
  </div>
</template>

<script>
import AV from "leancloud-storage";
export default {
  name: "HomePage",
  components: {},
  created(){},
  methods: {
    logOut(){
      console.log("Logging out");
      const vm = this;
      AV.User.logOut();
      vm.$router.push("/");
    }
  }
}
</script>

<style scoped></style>
