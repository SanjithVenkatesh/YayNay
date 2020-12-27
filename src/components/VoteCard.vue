<template>
  <div>
    <div class="titleLine">
      <div class="titleWords">
        <h2>{{ questionText }}</h2>
      </div>
    </div>
    <div class="wholeScreen">
      <div class="voting" v-if="!completeStatus">
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
                style="background-color: #36c25b; border-color: #36c25b"
                @click="votedYay"
              >
                Yay
              </button>
              <button
                class="primary"
                style="background-color: #cf3027; border-color: #cf3027"
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
      <div class="voting" v-if="completeStatus">
        <h2>Question is no longer</h2>
        <h2>taking responses</h2>
      </div>
      <section class="voteCount">
        <h1 class="title">Yay {{ yay }}</h1>
        <ul id="yayNames">
          <li v-for="name in yayNames" :key="name.id">
            <div v-if="name.displayName">@{{ name.displayName }}</div>
            <div v-else>
              {{ name }}
            </div>
          </li>
        </ul>
        <h1 class="title">Nay {{ nay }}</h1>
        <ul id="yayNames">
          <li v-for="name in nayNames" :key="name.id">
            <div v-if="name.displayName">@{{ name.displayName }}</div>
            <div v-else>
              {{ name }}
            </div>
          </li>
        </ul>
        <h1 class="title">Abstain {{ abstain }}</h1>
        <ul id="yayNames">
          <li v-for="name in abstainNames" :key="name.id">
            <div v-if="name.displayName">@{{ name.displayName }}</div>
            <div v-else>
              {{ name }}
            </div>
          </li>
        </ul>
      </section>
    </div>
    <div class="shareLink">
      <h1>Share this poll</h1>
      <button type="button" v-clipboard:copy="toCopy" style="margin-top: 0px">
        Share Link
      </button>
      <div v-if="!editingQuestionState">
        <button
          type="button"
          @click="modifyEditSettings"
          v-if="!editingQuestion"
        >
          Edit Question
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
      <div v-if="editingQuestionState">
        <form @submit.prevent="editQuestion" v-if="editingQuestionState">
          <input
            v-model="newQuestion"
            type="text"
            placeholder="Enter New Question"
          />
          <button type="submit">Modify</button>
        </form>
        <div class="checkbox">
          <input
            type="checkbox"
            @click="changeCompleteStatus"
            id="questionComplete"
          />
          <label for="questionComplete">Question Complete</label>
        </div>
      </div>
      <div class="deleteButton" v-if="editingQuestionState">
        <button type="button" @click="deleteQuestion">Delete Question</button>
      </div>
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
      completeStatus: false,
    };
  },
  created() {
    const vm = this;
    vm.retrieveQuestion();
  },
  methods: {
    getVoteCount() {
      const vm = this;
      vm.yayNames = [];
      vm.nayNames = [];
      vm.abstainNames = [];
      var questionPointer = AV.Object.createWithoutData(
        "Question",
        vm.questionId
      );
      const responseQuery = new AV.Query("Responses");
      responseQuery.equalTo("questionId", questionPointer);
      responseQuery.find().then((responses) => {
        for (const r of responses) {
          const answer = r.get("response");
          const rName = "bob";
          if (answer == "yay") {
            vm.yayNames.push(rName);
            vm.yay += 1;
          } else if (answer == "nay") {
            vm.nayNames.push(rName);
            vm.nay += 1;
          } else if (answer == "abstain") {
            vm.abstainNames.push(rName);
            vm.abstain += 1;
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
      const currentUser = AV.User.current();
      if (currentUser) {
        yayResponse.set("user", currentUser);
      }
      yayResponse.set("response", "yay");
      yayResponse.save().then(
        function () {
          vm.getVoteCount();
          vm.validVoting = false;
        },
        function (error) {
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
      const currentUser = AV.User.current();
      if (currentUser) {
        nayResponse.set("user", currentUser);
      }
      nayResponse.set("response", "nay");
      nayResponse.save().then(
        function () {
          vm.getVoteCount();
          vm.validVoting = false;
        },
        function (error) {
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
      const currentUser = AV.User.current();
      if (currentUser) {
        abstainResponse.set("user", currentUser);
      }
      abstainResponse.set("response", "abstain");
      abstainResponse.save().then(
        function () {
          vm.getVoteCount();
          vm.validVoting = false;
        },
        function (error) {
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
    editQuestion() {
      const vm = this;
      if (vm.newQuestion != "") {
        const newQuestion = AV.Object.createWithoutData(
          "Question",
          vm.questionId
        );
        newQuestion.set("question", vm.newQuestion);
        newQuestion
          .save()
          .then(() => {
            vm.questionText = vm.newQuestion;
          })
          .catch((e) => {
            alert(e);
          });
      }
      vm.editingQuestionState = false;
      vm.editingQuestion = false;
      // vm.retrieveQuestion();
    },
    retrieveQuestion() {
      const vm = this;
      var questionQuery = new AV.Query("Question");
      questionQuery.get(vm.questionId).then(
        function (question) {
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
          vm.completeStatus = question.get("complete");
          vm.toCopy = "yaynay.avosapps.us/" + vm.questionId;
          vm.getVoteCount();
        },
        (error) => {
          alert(error);
        }
      );
    },
    changeCompleteStatus() {
      const vm = this;
      const newQuestion = AV.Object.createWithoutData(
        "Question",
        vm.questionId
      );
      newQuestion.set("complete", !vm.completeStatus);
      newQuestion
        .save()
        .then(() => {
          vm.completeStatus = !vm.completeStatus;
        })
        .catch((e) => {
          alert(e);
        });
    },
    deleteQuestion() {
      const vm = this;
      const question = AV.Object.createWithoutData("Question", vm.questionId);
      question.destroy();
      vm.$router.push("/");
    },
  },
};
</script>

<style scoped>
.wholeScreen {
  order: 1;
  width: auto;
  display: flex;
  /* text-align: center; */
  justify-content: center;
  flex-direction: column;
  padding-left: 10px;
  padding-right: 10px;
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
  width: 150px;
  height: 30px;
  background-color: "#aaadb3";
  margin-top: 25px;
  box-shadow: none;
  margin-left: 20px;
  border-radius: 200px;
}

.shareLink button {
  margin-left: 0px;
  margin-bottom: 10px;
}
/* 
.voting button {
  display: block;
} */

.voting {
  display: flex;
  flex-direction: column;
  text-align: center;
}

.titleLineButtons button {
  /* margin-left: 50px; */
  float: right;
  /* margin-right: 10px; */
}

.titleLineButtons {
  display: flex;
  float: center;
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

.checkbox {
  padding-top: 0px;
  margin-top: 0px;
}

.checkbox input {
  margin-top: 0px;
  padding-top: 0px;
  /* margin-right: 0px;
  padding-right: 0px; */
}

.shareLink {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.deleteButton button {
  background-color: #cf3027;
  border-color: #cf3027;
}

@media screen and (max-width: 1024px) {
  .voteCount {
    padding-left: 15%;
    padding-right: 15%;
  }

  .titleLineButtons {
    display: flex;
    justify-content: center;
    align-items: center;
  }
}

@media screen and (min-width: 1025px) {
  .voteCount {
    padding-left: 15%;
    padding-right: 15%;
  }

  .titleLineButtons {
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
