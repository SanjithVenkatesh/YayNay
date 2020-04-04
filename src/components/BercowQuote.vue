<template>
  <div class="quote">
    <p>{{ quote }}</p>
  </div>
</template>

<script>
export default {
  name: "BercowQuote",
  data() {
    return {
      quote: "",
      quotesToChooseFrom: []
    };
  },
  created() {
    const vm = this;
    var fileName = "@/assets/bercowQuotes.txt";
    var sr = new StreamReader(fileName);
    var fileContents = sr.ReadToEnd();
    sr.Close();
    var myData = fileContents.Split("\n"[0]);
    var myRandom = Random.Range(0, myData.length);
    vm.quote = myData[myRandom];
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

.quote{
    margin-left: 300px;
    margin-right: 200px;
    padding-top: 50px;
    padding-bottom: 10px;
}
</style>
