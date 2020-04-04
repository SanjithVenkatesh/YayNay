<template></template>

<script>
import AV from "leancloud-storage";
export default {
  name: "OrganizationTile",
  props: {
      orgId: String
  },
  data() {
      return {
          orgName: "",
          orgMeetings: [],
          orgCreator: "",
      };
  },
  created() {},
  methods: {}
};
</script>

<style scoped></style>
