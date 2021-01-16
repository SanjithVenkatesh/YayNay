<template>
  <div
    :class="{ dark: $store.state.darkTheme, light: $store.state.lightTheme }"
  >
    <h1>{{ fullName }}'s Profile</h1>
    <h3>Email: {{ email }}</h3>
    <h2>Questions Created</h2>
    <table class="center">
      <thead>
        <tr>
          <th>Question</th>
          <th>Yays</th>
          <th>Nays</th>
          <th>Abstains</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="question in questions" v-bind:key="question">
          <td>
            <a :href="question.questionId">{{ question.questionText }}</a>
          </td>
          <td>{{ question.yays }}</td>
          <td>{{ question.nays }}</td>
          <td>{{ question.abstains }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import AV from "leancloud-storage";
export default {
  name: "UserProfile",
  props: {
    userId: String,
  },
  components: {},
  data() {
    return {
      questions: [],
      responses: [],
      fullName: "",
      email: "",
    };
  },
  created() {
    const vm = this;
    vm.retrieveUserInfo();
    vm.retrieveQuestions();
    vm.retieveResponses();
  },
  methods: {
    callback() {},
    retrieveUserInfo() {
      const vm = this;
      const userQuery = new AV.Query("_User");
      userQuery.get(vm.userId).then(
        (user) => {
          vm.fullName = user.get("fullName");
          vm.email = user.get("username");
        },
        (error) => {
          alert(error);
        }
      );
    },
    retrieveQuestions() {
      const vm = this;
      const userObject = new AV.Object.createWithoutData("_User", vm.userId);
      const questionQuery = new AV.Query("Question");
      // questionQuery.equalTo("createdBy", userObject);
      questionQuery
        .equalTo("createdBy", userObject)
        .find()
        .then(
          (questions) => {
            for (const question of questions) {
              const responseQuery = new AV.Query("Responses");
              responseQuery.equalTo(
                "questionId",
                AV.Object.createWithoutData("Question", question.id)
              );
              responseQuery.find().then(
                (responses) => {
                  var yays = 0;
                  var nays = 0;
                  var abstains = 0;
                  for (const response of responses) {
                    const res = response.get("response");
                    if (res == "yay") {
                      yays += 1;
                    }
                    if (res == "nay") {
                      nays += 1;
                    } else {
                      abstains += 1;
                    }
                  }
                  var questionResponse = {
                    questionText: question.get("question"),
                    yays: yays,
                    nays: nays,
                    abstains: abstains,
                    questionId: "/" + question.get("objectId"),
                  };
                  vm.questions.push(questionResponse);
                },
                (error) => {
                  alert(error);
                }
              );
            }
          },
          (error) => {
            alert(error);
          }
        );
    },
    retieveResponses() {
      const vm = this;
      const responseQuery = new AV.Query("Responses");
      responseQuery.equalTo(
        "user",
        AV.Object.createWithoutData("_User", vm.userId)
      );
      responseQuery.find().then(
        (responses) => {
          for (const response of responses) {
            const questionQuery = new AV.Query("Question");
            questionQuery.get(response.get("questionId").id).then(
              (question) => {
                var newResponse = {
                  questionText: question.get("question"),
                  response: response.get("response"),
                };
                vm.responses.push(newResponse);
              },
              (error) => {
                alert(error);
              }
            );
          }
        },
        (error) => {
          alert(error);
        }
      );
    },
  },
};
</script>

<style scoped>
* {
  margin-left: 20px;
  margin-right: 10px;
  text-align: center;
  justify-content: center;
  align-content: center;
  margin-top: 30px;
}

table.center {
  margin-left: auto;
  margin-right: auto;
  border: 1px solid black;
}

td,
tr,
th {
  font-size: 18px;
  padding: 10px;
}

.dark table.center,
tr,
td,
th {
  border: 2px inset white;
}

.light table.center,
tr,
td,
th {
  border: 2px inset black;
}

table,
th,
td {
  /* border: 1px solid black; */
  border-collapse: collapse;
  overflow-x: auto;
}
</style>
