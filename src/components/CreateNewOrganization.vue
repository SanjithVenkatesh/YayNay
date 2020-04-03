<template>
  <div>
    <h1>Create New Organization</h1>
    <form @submit="createNewOrganization">
      <span>Organization Name</span>
      <input v-model="newOrganiationName" type="text" required />
      <button v-on:click="createNewOrganization">Add</button>
    </form>
  </div>
</template>

<script>
import AV from "leancloud-storage";
export default {
  name: "CreateNewOrganization",
  data() {
    return {
      newOrganiationName: ""
    };
  },
  methods: {
    createNewOrganization() {
      console.log("hi");
      const vm = this;
      const organizations = AV.Object.extend("Organization");
      var newOrg = new organizations();
      newOrg.set("name", vm.newOrganiationName);
      newOrg.set("createdBy", AV.User.current());
      newOrg.save().then(
        function() {
          vm.$router.push("/overview");
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
