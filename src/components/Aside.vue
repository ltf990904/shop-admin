<template>
  <el-menu
    default-active="1-1"
    class="el-menu-vertical-demo"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#fff"
    :collapse="collapse"
  >
    <div class="logo">
      <img src="../assets/logo.png" alt width="60px">
    </div>
    <el-submenu v-for="(item, index) in menus" :key="index" :index="`${index + 1}`">
      <!-- 自定义模板 -->
      <template slot="title">
        <i :class="item.icon"></i>
        <span>{{item.name}}</span>
      </template>

      <!-- 渲染菜单的子选项 -->
      <el-menu-item
        v-for="(subItem, subIndex) in item.children"
        :key="subIndex"
        :index="`${index + 1}-${subIndex + 1}`"
      >
        <router-link :to="subItem.src">{{subItem.name}}</router-link>
      </el-menu-item>
    </el-submenu>
  </el-menu>
</template>

<script>
export default {
  data() {
    return {
      menus: [
        {
          icon: "el-icon-shopping-bag-1",
          name: "购物商城",
          children: [
            { name: "商品管理", src: "/admin/goods-list" },
            { name: "栏目管理", src: "/admin/category-list" }
          ]
        },
        {
          icon: "el-icon-user",
          name: "会员管理",
          children: [{ name: "会员列表", src: "/admin/account-list" }]
        },
        {
          icon: "el-icon-s-order",
          name: "商城订单",
          children: [{ name: "订单管理", src: "/admin/order-list" }]
        }
      ]
    };
  },
  props: {
    collapse: {
      type: Boolean,
      value: false
    }
  },
  methods: {}
};
</script>

<style>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}

.el-menu {
  border-right: none;
}
.el-menu-vertical-demo {
  height: 100%;
}
.el-submenu__title i {
  color: #fff;
}

.el-menu a {
  display: block;
  width: 160px;
  color: inherit;
  text-decoration: none;
}
.logo {
  height: 60px;
  background: #222;
  text-align: center;
}
</style>
