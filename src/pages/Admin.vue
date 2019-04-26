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
        <el-main>
          <!-- 面包屑组件 -->
          <el-breadcrumb separator="＞" class="breadcrumb">
            <el-breadcrumb-item v-for="(item, index) in routerInfo" :key="index">{{item}}</el-breadcrumb-item>
          </el-breadcrumb>
          <!-- 展示子页面 -->
          <router-view></router-view>
        </el-main>
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
  },
  computed: {
    routerInfo() {
      const arr = this.$route.matched.map(v => {
        return v.meta;
      });
      return arr;
    }
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
}

/* 首页布局的高度需要修改为100% */
.container > .el-container {
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
.breadcrumb {
  padding: 10px 0 15px;
  border-bottom: 1px #ccc solid;
}
</style>
