<template>
  <div>
    <h1>Log In</h1>
    <LogIn></LogIn>
  </div>
</template>

<script>
import LogIn from "../components/LogIn.vue";
export default {
  name: "LogInPage",
  props: {},
  components: {
    LogIn
  },
  data() {
    return {};
  },
  methods: {},
  created() {}
};
</script>

<style scoped>
* {
  text-align: center;
  align-content: center;
  justify-content: center;
  margin-top: 50px;
}
</style>
