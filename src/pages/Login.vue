<template>
  <div class="login-form">
    <el-form :model="form" label-width="40px">
      <el-form-item>
        <div class="login-title">Vue.js管理系统后台登录</div>
      </el-form-item>
      <el-form-item label="账号">
        <el-input v-model="form.username" placeholder="请输入账号"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="form.password" type="password" placeholder="请输入密码"></el-input>
      </el-form-item>
      <el-form-item>
        <div>
          <el-button class="login-button" type="primary" @click="onSubmit">登录</el-button>
          <!-- <el-button @click="resetForm">重置</el-button> -->
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
      console.log("submit");
    }
  }
};
</script>

<style scoped lang="less">
.login-form {
  border-radius: 5px;
  // 背景绘制在衬距方框内
  background-clip: padding-box;
  margin: 150px auto;
  width: 400px;
  padding: 25px 35px 15px 35px;
  background: #fff;
  border: 1px solid #eee;
  box-shadow: 0 0 25px #cac6c6;
}
.login-title {
  text-align: center;
  color: #333;
  font-size: 20px;
}
.login-button {
  width: 360px;
}
</style>