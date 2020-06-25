<template>
  <div>
    <h1>Register for the Website</h1>
    <form @submit.prevent="createNewUser">
      <p>Full Name</p>
      <input v-model="name" type="text" required />
      <p>Email address</p>
      <input v-model="email" type="email" required />
      <p>Password</p>
      <input v-model="password" type="password" required />
      <br />
      <br />
      <button type="submit">Register User</button>
    </form>
  </div>
</template>

<script>
import AV from "leancloud-storage";
export default {
  name: "AddUser",
  props: {
    callback: Function
  },
  data() {
    return {
      name: "",
      email: "",
      phoneNumber: "",
      password: ""
    };
  },
  methods: {
    createNewUser() {
      const vm = this;
      var newUser = new AV.User();
      newUser.setUsername(vm.email);
      newUser.setPassword(vm.password);
      newUser.set("fullName", vm.name);
      newUser.signUp().then(
        function() {
          vm.callback();
        },
        function(error) {
          alert(error);
        }
      );
    }
  }
};
</script>

<style scoped></style>
