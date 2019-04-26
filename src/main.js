import Vue from 'vue'
import App from './App.vue'
import axios from "axios"
import VueRouter from "vue-router"
import ElementUI from "element-ui";
import 'element-ui/lib/theme-chalk/index.css';

// 导入组件
import Login from "./pages/Login.vue"
import Admin from "./pages/Admin.vue"
import GoodsList from "./pages/GoodsList.vue"

// element - 注册
Vue.use(ElementUI)
// 注册路由
Vue.use(VueRouter);

// 路由的配置
const routes = [
  { path: "/", redirect: "/admin" },
  { path: "/login", component: Login },
  {
    path: "/admin", component: Admin, meta: "管理后台", children: [
      { path: "goods-list", component: GoodsList, meta: "商品管理", }
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
  if (!localStorage.getItem("username")) {
    next("/login");
  } else {
    next()
  }
})

// 是否是生成环境
Vue.config.productionTip = false;

Vue.prototype.$axios = axios;
axios.defaults.baseURL = "http://127.0.0.1:8899"

new Vue({
  router,
  render: h => h(App),
  // $mount作用相当于el，根实例挂载到节点
}).$mount('#app')
