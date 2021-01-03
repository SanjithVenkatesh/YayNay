<template>
  <div>
    <h1>Recent Popular Questions</h1>
    <table
      class="table"
      :class="{ dark: $store.state.darkTheme, light: $store.state.lightTheme }"
    >
      <thead class="table-head">
        <tr class="row">
          <th class="cell">Question</th>
          <th class="cell">Responses</th>
        </tr>
      </thead>
      <tbody class="table-body">
        <tr v-for="(question, i) in questions" :key="i" class="row">
          <td class="cell">
            <a v-bind:href="'/' + question[1]">{{ question[0] }}</a>
          </td>
          <td class="cell">{{ question[2] }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import AV from "leancloud-storage";
export default {
  name: "PopularQuestions",
  data() {
    return {
      responses: [],
      questionIDs: [],
      qCount: [],
      sortCount: [],
      questions: [],
    };
  },
  created() {
    const vm = this;
    const responseQuery = new AV.Query("Responses");
    responseQuery.limit(100);
    responseQuery.find().then((responses) => {
      vm.responses = responses;
      for (const response of vm.responses) {
        const questionId = response.get("questionId").id;
        vm.questionIDs.push(questionId);
      }
      vm.qCount = {};
      vm.questionIDs.forEach((id) => {
        if (id in vm.qCount) {
          vm.qCount[id] += 1;
        } else {
          vm.qCount[id] = 1;
        }
      });
      vm.sortCount = [];
      for (var qID in vm.qCount) {
        vm.sortCount.push([qID, vm.qCount[qID]]);
      }
      vm.sortCount.sort(function(a, b) {
        return b[1] - a[1];
      });
      vm.getQuestions();
    });
  },
  methods: {
    getQuestions() {
      const vm = this;
      for (const question of vm.sortCount) {
        const questionQuery = new AV.Query("Question");
        questionQuery.get(question[0]).then((q) => {
          vm.questions.push([q.get("question"), question[0], question[1]]);
        });
      }
    },
  },
};
</script>

<style scoped>
* {
  margin-top: 30px;
}

h1 {
  text-align: center;
}

table,
th,
tr,
td {
  text-align: center;
}

th,
tr,
td {
  padding-left: 10px;
  padding-right: 10px;
}

table {
  margin-left: auto;
  margin-right: auto;
  font-size: 14pt;
}

.table {
  border-collapse: collapse;
  border-style: hidden;
}

.dark > .table-head > .row > .cell {
  border-collapse: collapse;
  border: 2px solid purple;
}

.light > .table-head > .row > .cell {
  border-collapse: collapse;
  border: 2px solid black;
}

.dark > .table-body > .row > .cell {
  border-collapse: collapse;
  border: 1px solid purple;
}

.light > .table-body > .row > .cell {
  border-collapse: collapse;
  border: 1px solid black;
}

.dark a {
  color: white;
  text-decoration: none;
}

.light a {
  color: black;
  text-decoration: none;
}
</style>
