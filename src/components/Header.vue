<template>
  <el-row type="flex" justify="space-between" align="middle" class="header">
    <i class="el-icon-s-fold" @click="handleToggle" title="展开左侧栏"></i>
    <div class="user-info">
      {{username}} {{realname}}
      <span class="logout" @click="handleLogout">退出</span>
    </div>
  </el-row>
</template>

<script>
export default {
  data() {
    return {
      username: "",
      realname: ""
    };
  },
  methods: {
    handleToggle() {
      this.$emit("updateCollapse");
    },
    // 退出登录
    handleLogout() {
      this.$axios({
        url: "/admin/account/logout"
      }).then(res => {
        const { status } = res.data;
        if (status === 0) {
          // replace是处理跳转，直接替换掉当前的页面
          this.$router.replace("/login");
          // 清除本地存储的数据
          localStorage.removeItem("username");
          localStorage.removeItem("realname");
        }
      });
    }
  },
  mounted() {
    // 从本地存储获取用户信息
    this.username = localStorage.getItem("username");
    this.realname = localStorage.getItem("realname");
  }
};
</script>

<style>
.el-icon-s-fold {
  width: 30px;
  height: 30px;
  line-height: 30px;
  cursor: pointer;
  border: 1px solid #eee;
  border-radius: 5px;
}
.el-icon-s-fold:hover {
  background-color: #eee;
}
.user-info span {
  cursor: pointer;
}
.user-info a {
  text-decoration: none;
  color: black;
}
.logout {
  display: inline-block;
  margin-left: 10px;
}
.logout:hover {
  border-bottom: 3px solid #5fb878;
}
</style>
