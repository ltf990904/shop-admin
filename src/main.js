import Vue from 'vue'
import App from './App.vue'
import axios from "axios"
import VueRouter from "vue-router"
import ElementUI from "element-ui";
import 'element-ui/lib/theme-chalk/index.css';

// 导入组件
import Login from "./pages/Login"
import Admin from "./pages/Admin"
import GoodsList from "./pages/goods/GoodsList"
import GoodsAdd from "./pages/goods/GoodsAdd"
import GoodsEdit from "./pages/goods/GoodsEdit"
import CategoryList from "./pages/category/CategoryList"
import CategoryAdd from "./pages/category/CategoryAdd"
import AccountList from "./pages/account/AccountList"
import OrderList from "./pages/order/OrderList"
import OrderEdit from "./pages/order/OrderEdit"
import OrderDetail from "./pages/order/OrderDetail"

import store from './store';

// element - 注册
Vue.use(ElementUI)
// 注册路由
Vue.use(VueRouter);

// 路由的配置
const routes = [
  { path: "/", redirect: "/admin" },
  { path: "/login", component: Login },
  {
    path: "/admin", component: Admin, redirect: "/admin/goods-list", meta: "管理后台", children: [
      { path: "goods-list", component: GoodsList, meta: "商品管理" },
      { path: "goods-add", component: GoodsAdd, meta: "新增商品" },
      { path: "goods-edit/:id", component: GoodsEdit, meta: "编辑商品" },
      { path: "category-list", component: CategoryList, meta: "栏目管理" },
      { path: "category-add", component: CategoryAdd, meta: "新增栏目" },
      { path: "account-list", component: AccountList, meta: "会员列表" },
      { path: "order-list", component: OrderList, meta: "订单管理" }
      ,
      { path: "order-detail/:id", component: OrderDetail, meta: "订单详情" },
      { path: "order-edit/:id", component: OrderEdit, meta: "编辑订单" }
    ]
  }
]

// 创建路由对象
const router = new VueRouter({ routes })
// 拦截路由的请求，先判断用户是否是登录
router.beforeEach((to, from, next) => {
  if (to.path === "/login") {
    return next();
  }
  // 没有登录，跳转到登录页
  if (!sessionStorage.getItem("username")) {
    next("/login");
  } else {
    next()
  }
})

// 是否是生成环境
Vue.config.productionTip = false;

Vue.prototype.$axios = axios;
axios.defaults.baseURL = "http://127.0.0.1:8899"
axios.defaults.withCredentials = true //在axios发送请求时设置全局跨域

new Vue({
  store,
  router,
  render: h => h(App),
  // $mount作用相当于el，根实例挂载到节点
}).$mount('#app')
