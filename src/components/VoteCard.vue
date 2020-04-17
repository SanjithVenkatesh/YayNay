<template>
  <div class="wholeScreen">
    <section class="voting">
      <button @click="votedYay">Yay</button>
      <button v-on:click="votedNay">Nay</button>
      <button v-on:click="votedAbstain">Abstain</button>
    </section>
    <section class="voteCount"></section>
  </div>
</template>

<script>
import AV from "leancloud-storage";
export default {
  name: "CreateQuestion",
  props: {
    questionId: String,
  },
  data() {
    return {
      yay: 0,
      nay: 0,
      abstain: 0,
      requireName: false,
      requirePassword: false,
      requireAdminPassword: false,
      questionText: "",
      yayNames: [],
      nayNames: [],
      abstainNames: [],
      hasVoted: false,
      showVoteOptions: false,
    };
  },
  created() {
    const vm = this;
    var questionQuery = new AV.Query("Question");
    questionQuery.get(vm.questionId).then(function(question) {
      console.log(question.toJSON());
    });
    vm.getVoteCount();
  },
  methods: {
    getVoteCount() {
      const vm = this;
      var voteQuery = new AV.Query("Responses");
      var questionPointer = AV.Object.createWithoutData(
        "Question",
        vm.questionId
      );
      voteQuery.equalTo("questionId", questionPointer);
      voteQuery.find().then(function(responses) {
        console.log(responses);
        responses.forEach((response) => console.log(response.toJSON()));
        // for (response of responses) {
        //   var res = response.get("response");
        //   if (res == "yay") {
        //     vm.yay += 1;
        //     vm.yayNames.push(response.get("name"));
        //   } else if (res == "nay") {
        //     vm.nay += 1;
        //     vm.nayNames.push(response.get("name"));
        //   } else {
        //     vm.abstain += 1;
        //     vm.absiatinNames.push(response.get("name"));
        //   }
        // }
      });
    },
    votedYay() {
      console.log("yay");
    },
    votedNay() {
      console.log("nay");
    },
    votedAbstain() {
      console.log("abstain");
    },
  },
};
</script>

<style scoped>
.wholeScreen {
    display: flex;
    order: 1;
}

button{
    width: 200px;
    height: 30px;
    background-color: grey;
}
</style>
