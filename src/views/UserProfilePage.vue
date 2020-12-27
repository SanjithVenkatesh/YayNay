<template>
  <div>
    <UserProfile :userId="id"></UserProfile>
  </div>
</template>

<script>
import UserProfile from "../components/UserProfile.vue";
export default {
  name: "UserProfilePage",
  props: {},
  components: {
    UserProfile,
  },
  data() {
    return {
      id: "",
    };
  },
  methods: {},
  created() {
    const vm = this;
    vm.id = vm.$route.params.id;
    vm.$store.commit("closeSettings");
  },
};
</script>

<style scoped></style>
