<template>
  <div>
    <h2>{{ questionText }}</h2>
    <div class="wholeScreen">
      <section class="voting">
        <div v-if="validVoting">
          <div class="giveName" v-if="!showVotingOptions">
            <form @submit.prevent="startVoting">
              <h3>Vote Requires Your Name</h3>
              <input v-model="name" type="text" required />
              <button type="submit">Enter Name</button>
            </form>
          </div>
          <div class="voteOptions" v-if="showVotingOptions">
            <button @click="votedYay">Yay</button>
            <button v-on:click="votedNay">Nay</button>
            <button v-on:click="votedAbstain">Abstain</button>
          </div>
        </div>
        <div v-if="!validVoting">
            <p>Thank you for voting. Your vote has already been casted.</p>
        </div>
      </section>
      <section class="voteCount">
        <h1>Yay {{ yay }}</h1>
        <ul id="yayNames">
          <li v-for="name in yayNames" :key="name.id">
            {{ name }}
          </li>
        </ul>
        <h1>Nay {{ nay }}</h1>
        <ul id="yayNames">
          <li v-for="name in nayNames" :key="name.id">
            {{ name }}
          </li>
        </ul>
        <h1>Abstain {{ abstain }}</h1>
        <ul id="yayNames">
          <li v-for="name in abstainNames" :key="name.id">
            {{ name }}
          </li>
        </ul>
      </section>
    </div>
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
      name: "",
      showVotingOptions: false,
      password: "",
      validVoting: true,
    };
  },
  created() {
    const vm = this;
    var questionQuery = new AV.Query("Question");
    questionQuery.get(vm.questionId).then(function(question) {
      vm.questionText = question.get("question");
      vm.requireName = question.get("requireName");
      vm.requirePassword = question.get("passwordProtected");
      vm.requireAdminPassword = question.get("adminPasswordRequired");
      vm.password = question.get("password");
    });
    vm.getVoteCount();
  },
  methods: {
    getVoteCount() {
      const vm = this;
      vm.yay = 0;
      vm.nay = 0;
      vm.abstain = 0;
      vm.yayNames = [];
      vm.nayNames = [];
      vm.abstainNames = [];
      var voteQuery = new AV.Query("Responses");
      var questionPointer = AV.Object.createWithoutData(
        "Question",
        vm.questionId
      );
      voteQuery.equalTo("questionId", questionPointer);
      voteQuery.find().then(function(responses) {
        for (const response of responses) {
          var res = response.get("response");
          if (res == "yay") {
            vm.yay += 1;
            vm.yayNames.push(response.get("name"));
          } else if (res == "nay") {
            vm.nay += 1;
            vm.nayNames.push(response.get("name"));
          } else {
            vm.abstain += 1;
            vm.abstainNames.push(response.get("name"));
          }
        }
      });
    },
    votedYay() {
      const vm = this;
      console.log("yay");
      var yayResponse = new AV.Object("Responses");
      var questionPointer = AV.Object.createWithoutData(
        "Question",
        vm.questionId
      );
      yayResponse.set("questionId", questionPointer);
      yayResponse.set("name", vm.name);
      yayResponse.set("response", "yay");
      yayResponse.save().then(
        function(yr) {
          alert("Your vote has been recorded: " + yr.id);
          vm.getVoteCount();
        },
        function(error) {
          alert(error);
        }
      );
    },
    votedNay() {
      const vm = this;
      console.log("nay");
      var nayResponse = new AV.Object("Responses");
      var questionPointer = AV.Object.createWithoutData(
        "Question",
        vm.questionId
      );
      nayResponse.set("questionId", questionPointer);
      nayResponse.set("name", vm.name);
      nayResponse.set("response", "nay");
      nayResponse.save().then(
        function(nr) {
          alert("Your vote has been recorded: " + nr.id);
          vm.getVoteCount();
        },
        function(error) {
          alert(error);
        }
      );
    },
    votedAbstain() {
      const vm = this;
      console.log("abstain");
      var abstainResponse = new AV.Object("Responses");
      var questionPointer = AV.Object.createWithoutData(
        "Question",
        vm.questionId
      );
      abstainResponse.set("questionId", questionPointer);
      abstainResponse.set("name", vm.name);
      abstainResponse.set("response", "abstain");
      abstainResponse.save().then(
        function(ar) {
          alert("Your vote has been recorded: " + ar.id);
          vm.getVoteCount();
        },
        function(error) {
          alert(error);
        }
      );
    },
    startVoting() {
      const vm = this;
      vm.showVotingOptions = true;
      console.log(vm.name);
      console.log(vm.yayNames.includes(vm.name));
      if(vm.yayNames.includes(vm.name) == true || vm.nayNames.includes(vm.name) == true || vm.abstainNames.includes(vm.name) == true){
          vm.validVoting = false;
      }
    },
  },
};
</script>

<style scoped>
.wholeScreen {
  order: 1;
  width: auto;
  display: flex;
}

.voteCount {
  margin-left: 350px;
  text-decoration: underline;
  text-align-last: justify;
  display: block;
  width: auto;
  text-justify: center;
}

button {
  width: 200px;
  height: 30px;
  background-color: grey;
  display: block;
  margin-left: 100px;
  margin-right: 100px;
  margin-top: 25px;
}
</style>
