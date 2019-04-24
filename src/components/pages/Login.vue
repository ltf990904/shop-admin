<template>
  <div class="login-form">
    <el-form :model="form" label-width="45px">
      <el-form-item>
        <div class="login-title">系统后台登录</div>
      </el-form-item>
      <el-form-item label="账号">
        <el-input v-model="form.username" placeholder="请输入账号"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="form.password" type="password" placeholder="请输入密码"></el-input>
      </el-form-item>
      <el-form-item>
        <div class="login-title">
          <el-button type="primary" @click="onSubmit">登录</el-button>
          <el-button>重置</el-button>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        username: "",
        password: ""
      }
    };
  },
  methods: {
    onSubmit() {
      // this.axios
      console.log("submit!");
    }
  }
};
</script>

<style scoped lang="scss">
.login-form {
  width: 400px;
  position: absolute;
  left: 50%;
  top: 50%;
  margin: -200px 0 0 -225px;
}
.login-title {
  text-align: center;
  color: #409eff;
  font-size: 16px;
}
</style>