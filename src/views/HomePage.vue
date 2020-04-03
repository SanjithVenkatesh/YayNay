<template>
  <div>
    <h1>Hi</h1>
    <button v-on:click="addOrg = true">Add Organization</button>
    <div v-if = "addOrg">
      <CreateNewOrganization/>
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
  data(){
    return{
      addOrg: false,
      name: "",
      organizations: [],
      meetings:[],
      votes: []
    };
  },
  created(){
  },
  methods: {
  }
}
</script>

<style scoped></style>
