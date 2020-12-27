<template>
  <div>
    <AddUser></AddUser>
  </div>
</template>

<script>
import AddUser from "../components/AddUser.vue";
export default {
  name: "RegisterUserPage",
  components: {
    AddUser,
  },
  data() {
    return {
      setUser: false,
    };
  },
  created() {},
  methods: {
    callback() {},
  },
};
</script>

<style scoped>
* {
  text-align: center;
}
</style>
