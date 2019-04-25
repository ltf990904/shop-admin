<template>
  <el-row type="flex" justify="space-between" align="middle">
    <i class="el-icon-back" @click="handleToggle" title="收起/展开"></i>
    <div class="user-info">
      admin 超级管理员
      <a href="javascript:void(0)" @click="handleLogout">退出</a>
    </div>
  </el-row>
</template>

<script>
export default {
  methods: {
    handleToggle() {
      this.$emit("updateCollapse");
    },
    handleLogout() {
     console.log("退出");
    }
  }
};
</script>

<style>
.el-icon-back {
  cursor: pointer;
  font-weight: 600;
}
.user-info span {
  cursor: pointer;
}
.user-info a {
  text-decoration: none;
  color: black;
}
</style>
