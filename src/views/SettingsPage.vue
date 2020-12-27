<template>
  <div>
    <Settings></Settings>
  </div>
</template>

<script>
import Settings from "../components/Settings.vue";
export default {
  name: "SettingsPage",
  props: {},
  components: {
    Settings,
  },
  data() {
    return {};
  },
  methods: {},
  created() {
    alert("in settings page");
  },
};
</script>

<style scoped></style>
