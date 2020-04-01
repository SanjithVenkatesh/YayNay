<template>
  <div>
    <h1>Log In</h1>
    <form @submit.prevent="go">
      <div>
        <label>
          <span>Email</span>
          <input v-model="email" type="email" autocomplete="email" required />
        </label>
      </div>
      <div>
          <label>
              <span>Password</span>
              <input v-model="password" type="password" autocomplete="current-password" required />
          </label>
      </div>
      <div>
          <button type = "submit" class = "primary">Continue</button>
      </div>
    </form>
  </div>
</template>

<script>
import AV from "leancloud-storage";
export default {
  name: "AuthPage",
  data() {
    return {
      email: "",
      password: ""
    };
  },
  methods: {
    go() {
      const vm = this;
      AV.User.logIn(vm.email, vm.password)
        .then(() => {
          vm.$router.push(vm.$route.query.return || "/overview");
        })
        .catch(error => {
          if (error.code === 210) {
            alert("The password you have provided is incorrect.");
          } else if (error.code === 211) {
            alert("The email address provided does not exist.");
          } else {
            alert(error);
          }
        });
    }
  }
};
</script>

<style scoped></style>
