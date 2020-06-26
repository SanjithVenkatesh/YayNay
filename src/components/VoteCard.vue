<template>
  <div>
    <div class="titleLine">
      <div class="titleWords">
        <h2>{{ questionText }}</h2>
      </div>
      <div class="titleLineButtons">
        <button type="button" v-clipboard:copy="toCopy">
          Share Link
        </button>
        <div v-if="!editingQuestionState">
          <button
            type="button"
            @click="modifyEditSettings"
            v-if="!editingQuestion"
          >
            Edit Link
          </button>
          <form @submit.prevent="validateAdminPassword" v-if="editingQuestion">
            <input
              v-model="adminPassword"
              type="password"
              :placeholder="[[adminInputPlaceholder]]"
              required
            />
            <button type="submit">Validate</button>
          </form>
        </div>
        <form @submit.prevent="editQuestion" v-if="editingQuestionState">
          <input
            v-model="newQuestion"
            type="text"
            placeholder="Enter New Question"
            required
          />
          <button type="submit">Modify</button>
        </form>
      </div>
    </div>
    <div class="wholeScreen">
      <div class="voting">
        <div v-if="needPassword">
          <form @submit.prevent="checkPassword">
            <h3>Vote Requires Password</h3>
            <input v-model="enteredPassword" type="password" required />
            <button type="submit">Submit Password</button>
          </form>
        </div>
        <div v-if="!needPassword">
          <div v-if="validVoting">
            <div class="giveName" v-if="!showVotingOptions">
              <form @submit.prevent="startVoting" v-if="requireName">
                <h3>Vote Requires Your Name</h3>
                <input v-model="name" type="text" required />
                <button type="submit" class="primary">Enter Name</button>
              </form>
            </div>
            <div class="voteOptions" v-if="showVotingOptions">
              <button
                class="primary"
                style="background-color: #36c25b;border-color:#36c25b "
                @click="votedYay"
              >
                Yay
              </button>
              <button
                class="primary"
                style="background-color: #cf3027;border-color:#cf3027 "
                v-on:click="votedNay"
              >
                Nay
              </button>
              <button class="primary" v-on:click="votedAbstain">Abstain</button>
            </div>
          </div>
          <div v-if="!validVoting">
            <p>Thank you for voting. Your vote has already been casted.</p>
          </div>
        </div>
      </div>
      <section class="voteCount">
        <h1 class="title">Yay {{ yay }}</h1>
        <ul id="yayNames">
          <li v-for="name in yayNames" :key="name.id">
            {{ name }}
          </li>
        </ul>
        <h1 class="title">Nay {{ nay }}</h1>
        <ul id="yayNames">
          <li v-for="name in nayNames" :key="name.id">
            {{ name }}
          </li>
        </ul>
        <h1 class="title">Abstain {{ abstain }}</h1>
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
      needPassword: false,
      enteredPassword: "",
      toCopy: "",
      editingQuestion: false,
      adminPassword: "",
      adminInputPlaceholder: "Enter Admin Password",
      questionAdminPassword: "",
      editingQuestionState: false,
      newQuestion: "",
    };
  },
  created() {
    const vm = this;
    vm.retrieveQuestion();
    // var questionQuery = new AV.Query("Question");
    // questionQuery.get(vm.questionId).then(function(question) {
    //   vm.questionText = question.get("question");
    //   vm.requireName = question.get("requireName");
    //   if (vm.requireName == true) {
    //     vm.showVotingOptions = false;
    //   } else {
    //     vm.showVotingOptions = true;
    //   }
    //   vm.requirePassword = question.get("passwordProtected");
    //   vm.needPassword = vm.requirePassword;
    //   vm.requireAdminPassword = question.get("adminPasswordRequired");
    //   vm.password = question.get("password");
    //   vm.questionAdminPassword = question.get("adminPassword");
    // });
    vm.toCopy = "localhost:8080/" + vm.questionId;
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
            if (response.get("name") != "") {
              vm.yayNames.push(response.get("name"));
            }
          } else if (res == "nay") {
            vm.nay += 1;
            if (response.get("name") != "") {
              vm.nayNames.push(response.get("name"));
            }
          } else {
            vm.abstain += 1;
            if (response.get("name") != "") {
              vm.abstainNames.push(response.get("name"));
            }
          }
        }
      });
    },
    votedYay() {
      const vm = this;
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
          vm.validVoting = false;
        },
        function(error) {
          alert(error);
        }
      );
    },
    votedNay() {
      const vm = this;
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
          vm.validVoting = false;
        },
        function(error) {
          alert(error);
        }
      );
    },
    votedAbstain() {
      const vm = this;
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
          vm.validVoting = false;
        },
        function(error) {
          alert(error);
        }
      );
    },
    startVoting() {
      const vm = this;
      vm.showVotingOptions = true;
      if (
        vm.yayNames.includes(vm.name) == true ||
        vm.nayNames.includes(vm.name) == true ||
        vm.abstainNames.includes(vm.name) == true
      ) {
        vm.validVoting = false;
      }
    },
    checkPassword() {
      const vm = this;
      if (vm.password == vm.enteredPassword) {
        vm.needPassword = false;
      }
    },
    modifyEditSettings() {
      const vm = this;
      vm.editingQuestion = !vm.editingQuestion;
    },
    validateAdminPassword() {
      const vm = this;
      if (vm.adminPassword == vm.questionAdminPassword) {
        vm.editingQuestionState = true;
      }
    },
    editQuestion(){
      const vm = this;
      const newQuestion = AV.Object.createWithoutData('Question', vm.questionId);
      newQuestion.set('question', vm.newQuestion);
      newQuestion.save().then(()=> {
        vm.questionText = vm.newQuestion;
        vm.editingQuestionState = false;
        vm.editingQuestion = false;
      }).catch((e)=>{
        console.log(e);
      });
      // vm.retrieveQuestion();
    },
    retrieveQuestion(){
      const vm = this;
      var questionQuery = new AV.Query("Question");
      questionQuery.get(vm.questionId).then(function(question) {
      vm.questionText = question.get("question");
      vm.requireName = question.get("requireName");
      if (vm.requireName == true) {
        vm.showVotingOptions = false;
      } else {
        vm.showVotingOptions = true;
      }
      vm.requirePassword = question.get("passwordProtected");
      vm.needPassword = vm.requirePassword;
      vm.requireAdminPassword = question.get("adminPasswordRequired");
      vm.password = question.get("password");
      vm.questionAdminPassword = question.get("adminPassword");
      });
    }
  },
};
</script>

<style scoped>
.wholeScreen {
  order: 1;
  width: auto;
  display: flex;
  /* text-align: center; */
  justify-content: space-evenly;
}

.voteCount {
  /* margin-left: 350px; */
  text-align-last: justify;
  /* float: right; */
  clear: right;
  width: auto;
}

.title {
  text-decoration: underline;
}

.primary {
  background-color: lightgrey;
}

button {
  width: 200px;
  height: 30px;
  background-color: "#aaadb3";
  margin-top: 25px;
  box-shadow: none;
}

.voting button {
  display: block;
}

.titleLineButtons button {
  margin-left: 50px;
  float: right;
  margin-right: 10px;
}

.titleLineButtons {
  display: flex;
  float: right;
}

.titleLine {
  display: flex;
  /* margin: 0 auto; */
  justify-content: center;
}

.titleLineButtons input {
  margin-top: 25px;
  margin-left: 25px;
  width: 150px;
  height: 25px;
}
</style>
