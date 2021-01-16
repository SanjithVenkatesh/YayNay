<template>
  <div>
    <h1>Create New Organization</h1>
    <form @submit.prevent="createNewOrganization">
      <span>Organization Name</span>
      <input v-model="newOrganizationName" type="text" required />
      <button type="submit">Add</button>
    </form>
  </div>
</template>

<script>
import AV from "leancloud-storage";
export default {
  name: "CreateNewOrganization",
  props: {
    callback: Function,
  },
  data() {
    return {
      newOrganizationName: "",
    };
  },
  methods: {
    createNewOrganization() {
      console.log("hi");
      const vm = this;
      var newOrg = new AV.Object("Organizations");
      newOrg.set("name", vm.newOrganizationName);
      newOrg.set("createdBy", AV.User.current());
      newOrg.save().then(
        function() {
          vm.callback();
        },
        function(error) {
          alert(error);
        }
      );
    },
  },
};
</script>

<style scoped></style>
