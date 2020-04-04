<template>
  <div>
    <div class="logo">
      <video width="320" height="240" playsinline autoplay muted loop>
        <source src="@/assets/bercow.mp4" type="video/mp4" />
      </video>
    </div>
    <div class="box">
      <h1>Log In</h1>
      <form @submit.prevent="go">
        <div class="access">
          <label>
            <span>Email</span>
            <input v-model="email" type="email" autocomplete="email" required />
          </label>
        </div>
        <div class="access">
          <label>
            <span>Password</span>
            <input
              v-model="password"
              type="password"
              autocomplete="current-password"
              required
            />
          </label>
        </div>
        <div>
          <button type="submit" class="primary">Continue</button>
        </div>
      </form>
    </div>
    <div class = "registerUser" v-if="!addUser">
      <button v-on:click="addUser=true" class="primaryRed">Register New User</button>
    </div>
    <div v-if="addUser">
      <AddUser :callback="callback"/>
    </div>
    <div class="crypto">
      <p>Support this website</p>
      <p>BTC: {{btc}}</p>
      <p>ETH: {{eth}}</p>
      <p>LTC: {{ltc}}</p>
    </div>
    <div>
      <BercowQuote></BercowQuote>
    </div>
  </div>
</template>

<script>
import AV from "leancloud-storage";
import AddUser from "@/components/AddUser.vue";
import BercowQuote from "@/components/BercowQuote.vue";
export default {
  name: "AuthPage",
  components: {
    AddUser,
    BercowQuote
  },
  data() {
    return {
      email: "",
      password: "",
      ltc: "M9UTd2i2tSPPesQ8kevN8RsWGV4u9iPd8F",
      btc: "3LZqJP5gDRSfuxkvw8FWPbrWeC2WJ5an4J",
      eth: "0x3db1f8aF0C438E5768eA3967f70138F9387DB449",
      addUser: false
    };
  },
  methods: {
    go() {
      const vm = this;
      AV.User.logIn(vm.email, vm.password)
        .then(() => {
          vm.$router.push(vm.$route.query.return || "/overview");
        })
        .catch(error => {
          if (error.code === 210) {
            alert("The password you have provided is incorrect.");
          } else if (error.code === 211) {
            alert("The email address provided does not exist.");
          } else {
            alert(error);
          }
        });
    },
    callback(){
      const vm = this;
      vm.addUser=false;
    }
  }
};
</script>

<style scoped>
* {
  text-align: center;
}

label {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  text-align: right;
  width: 400px;
  line-height: 26px;
  margin-bottom: 10px;
  margin-left: 100px;
}

input {
  height: 20px;
  flex: 0 0 200px;
  font-size: 12pt;
  margin-left: 10px;
}

.primary {
  display: inline-block;
  background-color: lightgreen;
  margin-bottom: 20px;
  margin-top: 20px;
  width: 100px;
  height: 40px;
  font-size: 12px;
  border-radius: 100px;
}

.primaryRed{
  display: inline-block;
  background-color: lightsalmon;
  margin-bottom: 20px;
  margin-top: 20px;
  width: 100px;
  height: 40px;
  font-size: 12px;
  border-radius: 100px;
}

.crypto{
  text-align: center;
  margin-top: 10px;
  margin-left: 300px;
  margin-right: 300px;
  border: 2px solid;
  border-radius: 5px;
  border-color: gold;
}

h1 {
  padding: 10pt;
}

.box {
  border: 2px solid;
  border-radius: 5px;
  margin-right: 300px;
  margin-left: 300px;
  border-color: #d9d9d9;
}

.access {
  padding: 10pt;
}
</style>
