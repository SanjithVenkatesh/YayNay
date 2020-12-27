<template>
  <div class="logInForm">
    <form @submit.prevent="authenticateUser">
      <span>Email</span>
      <input v-model="email" type="email" required />
      <span>Password</span>
      <input v-model="password" type="password" required />
      <button type="submit">Log In</button>
    </form>
  </div>
</template>

<script>
import AV from "leancloud-storage";
export default {
  name: "LogIn",
  props: {},
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    authenticateUser() {
      const vm = this;
      AV.User.logIn(vm.email, vm.password).then(
        () => {
          vm.$store.commit("setName", AV.User.current().get("fullName"));
          vm.$store.commit("logIn");
          vm.$store.commit("closeSettings");
          vm.$router.push("/");
        },
        (error) => {
          alert(error);
        }
      );
    },
  },
  created() {},
};
</script>

<style scoped>
* {
  text-align: center;
  justify-content: center;
  align-items: center;
}

form {
  display: flex;
  flex-direction: column;
}

form input {
  margin-top: 10px;
  margin-bottom: 10px;
  width: 200px;
}

form button {
  margin-top: 10px;
}
</style>
