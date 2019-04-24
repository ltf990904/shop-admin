<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "app",
  data() {
    return {};
  },
  mounted() {
    this.$axios.get("").then(res => {});
  }
};
</script>

<style>
</style>
