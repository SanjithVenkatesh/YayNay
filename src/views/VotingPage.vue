<template>
  <div>
    <div>
      <VoteCard :questionId="id"></VoteCard>
    </div>
    <!-- <div>
      <BercowQuote></BercowQuote>
    </div> -->
  </div>
</template>

<script>
// import AV from "leancloud-storage";
// import CreateNewOrganization from "@/components/CreateNewOrganization.vue";
// import BercowQuote from "@/components/BercowQuote.vue";
import VoteCard from "../components/VoteCard.vue";
export default {
  name: "VotingPage",
  components: {
    // BercowQuote,
    VoteCard,
  },
  data() {
    return {
      id: "",
    };
  },
  created() {
    const vm = this;
    vm.id = vm.$route.params.id;
  },
  methods: {
    callback() {},
  },
};
</script>

<style scoped>
/* *{
  margin-top: 50px;
  margin-left: 100px;
} */
</style>
