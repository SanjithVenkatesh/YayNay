<template>
  <div>
    <div>
      <CreateQuestion></CreateQuestion>
    </div>
    <div>
      <BercowQuote></BercowQuote>
    </div>
  </div>
</template>

<script>
// import AV from "leancloud-storage";
// import CreateNewOrganization from "@/components/CreateNewOrganization.vue";
import BercowQuote from "@/components/BercowQuote.vue";
import CreateQuestion from "../components/CreateQuestion.vue";
import AV from "leancloud-storage";
export default {
  name: "HomePage",
  components: {
    BercowQuote,
    CreateQuestion
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
  created() {
    const vm = this;
    vm.$store.commit("setName", AV.User.current().get("fullName"));
  },
  methods: {
    callback() {
      const vm = this;
      vm.addOrg = false;
    }
  }
};
</script>

<style scoped></style>
