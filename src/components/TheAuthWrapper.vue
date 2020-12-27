<template>
  <div>
    <router-view id="page" :key="$route.path"></router-view>
  </div>
</template>

<script>
export default {
  name: "TheAuthWrapper",
};
</script>

<style scoped></style>
