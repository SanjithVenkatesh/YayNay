<template>
  <div>
    <form @submit.prevent="addQuestion">
      <span>Question</span>
      <div>
        <label>
          <input id="questionInput" v-model="question" type="text" required />
        </label>
      </div>

      <div class="passwordProtected">
        <p>
          Password Protected?
          <input type="checkbox" v-model="password" />
        </p>
        <div v-if="password" class="addQuestion">
          <span>Enter Password</span>
          <label>
            <input id="questionInput" v-model="qPassword" type="password" />
          </label>
        </div>
      </div>
      <div class="requireName">
        <p>
          Require Name?
          <input type="checkbox" v-model="requireName" />
        </p>
      </div>
      <span>Admin Password</span>
      <div>
        <label>
          <input
            id="questionInput"
            v-model="aPassword"
            type="password"
            required
          />
        </label>
      </div>
      <button type="submit" class="primary">Add Question</button>
    </form>
  </div>
</template>

<script>
import AV from "leancloud-storage";
export default {
  name: "CreateQuestion",
  data() {
    return {
      question: "",
      password: false,
      qPassword: "",
      requireName: false,
      adminPassword: false,
      aPassword: ""
    };
  },
  methods: {
    addQuestion() {
      const vm = this;
      if (vm.password == false && vm.qPassword != "") {
        vm.qPassword = "";
      }
      if (
        vm.adminPassword == true &&
        vm.password == true &&
        vm.adminPassword == vm.qPassword
      ) {
        alert("Admin password and question password cannot be the same");
        return;
      }
      var newQuestion = new AV.Object("Question");
      newQuestion.set("question", vm.question);
      newQuestion.set("requireName", vm.requireName);
      newQuestion.set("password", vm.qPassword);
      newQuestion.set("adminPassword", vm.aPassword);
      newQuestion.set("passwordProtected", vm.password);
      newQuestion.set("adminPasswordRequired", vm.adminPassword);
      newQuestion.set("complete", false);
      newQuestion.save().then(
        function(newQuestion) {
          alert("Object saved. objectId: " + newQuestion.id);
          vm.$router.push("/" + newQuestion.id);
        },
        function(error) {
          alert(error);
        }
      );
    }
  }
};
</script>

<style scoped>
* {
  text-align: center;
}

input#questionInput {
  width: 300px;
  height: 30px;
  margin: 10px;
  font-size: 18px;
}

.primary {
  width: 70px;
  height: 50px;
  margin-top: 25px;
}
</style>
