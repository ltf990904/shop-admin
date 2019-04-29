<template>
  <div class="login-form">
    <el-form :model="form" :rules="rules" ref="form" label-width="60px">
      <el-form-item>
        <div class="login-title">Vue.js管理系统后台登录</div>
      </el-form-item>
      <el-form-item label="账号" prop="uname">
        <el-input v-model="form.uname" placeholder="请输入账号"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="upwd">
        <el-input v-model="form.upwd" type="password" placeholder="请输入密码"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button class="login-button" type="primary" @click="onSubmit">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        uname: "admin",
        upwd: "123456"
      },
      rules: {
        uname: [{ required: true, message: "请输入账号", trigger: "blur" }],
        upwd: [{ required: true, message: "请输入密码", trigger: "blur" }]
      }
    };
  },
  methods: {
    onSubmit() {
      // 找到表单元素，调用表单验证
      this.$refs.form.validate(valid => {
        if (!valid) return;

        // 发起ajax请求
        this.$axios({
          url: "/admin/account/login",
          method: "POST",
          data: this.form
        }).then(res => {
          // console.log(res);
          const { status, message } = res.data;
          if (status == 0) {
            // 把用户的信息存储到本地
            localStorage.setItem("username", message.uname);
            localStorage.setItem("realname", message.realname);

            this.$store.commit("setUser", {
              username: message.uname,
              realname: message.realname
            });

            //登录成功跳转到后台首页
            this.$router.push("/admin");
          } else {
            // 登录失败，提示用户名或密码错误
            this.$message({
              message: message,
              type: "error"
            });
          }
        });
      });
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
  padding: 25px 35px 15px 20px;
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
  width: 340px;
}
</style>