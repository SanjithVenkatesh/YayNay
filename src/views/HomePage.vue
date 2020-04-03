<template>
  <div>
    <h1>Hi</h1>
    <div v-if="!addOrg">
      <button v-on:click="addOrg = true">Add Organization</button>
    </div>
    <div v-if="addOrg">
      <CreateNewOrganization :callback="callback"/>
    </div>
  </div>
</template>

<script>
// import AV from "leancloud-storage";
import CreateNewOrganization from "@/components/CreateNewOrganization.vue";
export default {
  name: "HomePage",
  components: {
    CreateNewOrganization
  },
  data() {
    return {
      addOrg: false,
      name: "",
      organizations: [],
      meetings: [],
      votes: []
    };
  },
  created() {},
  methods: {
    callback(){
      const vm = this;
      vm.addOrg = false;
    }
  }
};
</script>

<style scoped></style>
