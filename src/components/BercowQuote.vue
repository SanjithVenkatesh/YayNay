<template>
  <div class="quote">
    <p>{{ quote }}</p>
  </div>
</template>

<script>
import {random} from "mathjs";
import {round} from "mathjs";
export default {
  name: "BercowQuote",
  data() {
    return {
      quote: "Hi",
      quotesToChooseFrom: ["A legislature cannot be effective while suffering from public scorn."
                            ,"If someone is being very cheeky, it can be quite fun to deal with that situation."
                            ,"I've never been much given to little social cliques."
                            ,"Fairness is not about statistical equality."
                            ,"I'm not psychic. I cannot know what is in the mind of particular public figures."
                            ,"I'm not in the business of warning people.","I'm supremely uninterested as to what is written in many of the newspapers."
                            ,"I do very gently say that to sit on the bench... fiddling ostentatiously with an electronic device defies the established convention of the house that such devices should be used without impairing parliamentary decorum. They are impairing parliamentary decorum. It's a point so blindingly obvious that only an extraordinarily clever and sophisticated person could fail to grasp it."
                            ,"Mr Gove! You really are a rather over-excited individual! You need to write out 1,000 times 'I will behave myself at Prime Minister's Questions'."]
    };
  },
  created() {
    const vm = this;
    var myRandom = round(random(0,vm.quotesToChooseFrom.length));
    vm.quote = vm.quotesToChooseFrom[myRandom];
    vm.quote += "- John Bercow";
  },
  methods: {}
};
</script>

<style scoped>
p {
  font-size: 8pt;
  color: red;
}

.quote {
  margin-left: 300px;
  margin-right: 200px;
  padding-top: 50px;
  padding-bottom: 10px;
}
</style>
