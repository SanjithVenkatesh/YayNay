<template>
  <div>
    <h1>Register for the Website</h1>
    <form @submit.prevent="createNewUser">
      <p>Full Name</p>
      <input v-model="newUser.name" type="text" required />
      <p>Email address</p>
      <input v-model="newUser.email" type="email" required />
      <p>Password</p>
      <input v-model="newUser.password" type="password" required />
      <p>Phone Number</p>
      <input v-model="newUser.phoneNumber" type="tel" required />
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
  props: {},
  data() {
    return {
      newUser: {
        name: "",
        email: "",
        phoneNumber: "",
        password: ""
      }
    };
  },
  methods: {
    createNewUser() {
      const vm = this;
      var newUser = new AV.User();
      newUser.setUsername(vm.newUser.email);
      newUser.setPassword(vm.newUser.password);
      newUser.set("fullName", vm.newUser.name);
      newUser.signUp().then(
        function() {
          alert("User has been created with the email: " + vm.newUser.email);
          AV.User.logIn(vm.newUser.email, vm.newUser.password).then(
            () => {
              vm.newUser = {
                name: "",
                email: "",
                phoneNumber: "",
                password: ""
              };
              vm.$router.push("/");
            },
            error => {
              alert(error);
            }
          );
        },
        function(error) {
          if (error.code === 125) {
            alert(
              "The email address you entered is not a valid one. Please check your input."
            );
          } else if (error.code === 127) {
            alert(
              "The phone number you entered is not a valid one (non-US number should start with a plus sign). Please check your input."
            );
          } else if (error.code === 202 || error.code === 203) {
            alert(
              "The email address you entered is already used for another account."
            );
          } else if (error.code === 214) {
            alert(
              "The phone number you entered is already used for another account."
            );
          } else {
            alert(error);
          }
        }
      );
    }
  },
  created() {}
};
</script>

<style scoped></style>
