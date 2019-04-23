<template>
  <div id="app">
    <!-- 调用Element UI组件 -->
    <el-row>
      <el-button type="primary">按钮</el-button>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "app",
  mounted() {
    // 请求数据
    this.$axios.get("https://api.github.com/users").then(res => {
      console.log(res.data);
    });
  }
};
</script>

<style>
</style>
