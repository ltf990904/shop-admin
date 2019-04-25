<template>
  <div class="container">
    <el-container>
      <el-aside width="auto">
        <!-- 侧边栏组件 -->
        <Aside :collapse="isCollapse"/>
      </el-aside>

      <el-container>
        <el-header>
          <!-- 头部组件 -->
          <Header @updateCollapse="updateCollapse"/>
        </el-header>
        <el-main>Main</el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import Aside from "../components/Aside.vue";
import Header from "../components/Header.vue";
export default {
  data() {
    return {
      // 侧边栏展开的状态
      isCollapse: false
    };
  },
  methods: {
    // 修改左侧栏的展开和收起
    updateCollapse() {
      this.isCollapse = !this.isCollapse;
    }
  },
  // 注册组件
  components: {
    Aside,
    Header
  }
};
</script>

<style>
.el-header {
  background-color: #fff;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  background-color: #d3dce6;
  position: relative;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  line-height: 160px;
}

/* 首页布局的高度需要修改为100% */
.page-container > .el-container {
  position: absolute;
  width: 100%;
  top: 0;
  bottom: 0;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
</style>
