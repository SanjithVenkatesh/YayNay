<template>
  <div>
    <nav>
      <button type="logOut" class="primary" v-on:click="logOut">Log Out</button>
    </nav>
  </div>
</template>

<script>
import AV from "leancloud-storage";
export default {
  name: "TheTopNav",
  data() {
    return {
      fullName: AV.User.current().get("fullName"),
      allowAddingNewUsers: AV.User.current().get("allowAddingNewUsers")
    };
  },
  methods: {
    logOut() {
      console.log("Logging out");
      const vm = this;
      AV.User.logOut();
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
