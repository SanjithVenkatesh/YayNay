<template>
  <div>
    <h1>Settings</h1>
    <div class="changePassword">
      <label>Change Password</label>
      <form @submit.prevent="authenticateNewPassword">
        <div>
          <span>Current Password</span>
          <input v-model="currentPassword" type="password" required />
        </div>
        <div>
          <span>New Password</span>
          <input v-model="newPassword" type="password" required />
        </div>
        <div>
          <span>Confirm New Password</span>
          <input v-model="confirmPassword" type="password" required />
        </div>
        <button type="submit">Reset Password</button>
      </form>
    </div>
    <div class="changePassword">
      <label>Change Display Name</label>
      <form @submit.prevent="changeDisplayName">
        <div>
          <span>New Display Name</span>
          <input v-model="newDisplayName" type="text" required />
        </div>
        <button type="submit">Change Name</button>
      </form>
    </div>
  </div>
</template>

<script>
import AV from "leancloud-storage";
export default {
  name: "Settings",
  props: {},
  data() {
    return {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
      newDisplayName: "",
    };
  },
  methods: {
    authenticateNewPassword() {
      const vm = this;
      if (vm.newPassword != vm.confirmPassword) {
        alert("New Passwords do not match!!! Please enter them again.");
      }
      AV.User.current()
        .updatePassword(vm.currentPassword, vm.newPassword)
        .then(
          () => {
            vm.$store.commit("closeSettings");
            vm.$router.push("/");
          },
          (error) => {
            alert(error);
          }
        );
    },
    changeDisplayName() {
      const vm = this;
      const ifExistsQuery = new AV.Query("DisplayName");
      ifExistsQuery.equalTo("displayName", vm.newDisplayName).first(
        (result) => {
          if (!result) {
            AV.User.getCurrentUser()
              .set("displayName", vm.newDisplayName)
              .save()
              .then(
                () => {
                  vm.$store.commit("closeSettings");
                },
                (error) => {
                  alert(error);
                }
              );
          } else {
            alert("Display name already in use!!");
          }
        },
        (error) => {
          alert(error);
        }
      );
    },
  },
  created() {
    const vm = this;
    vm.$store.commit("closeSettings");
  },
};
</script>

<style scoped>
* {
  text-align: center;
  justify-content: center;
  align-content: center;
}

form {
  display: flex;
  flex-direction: column;
  margin-top: 10px;
}

form button {
  width: 100px;
  height: 20px;
  margin: 0 auto;
  margin-top: 20px;
}

form div {
  margin-top: 10px;
}

.changePassword input {
  margin-left: 10px;
}

.changePassword {
  margin-bottom: 25px;
}
</style>
