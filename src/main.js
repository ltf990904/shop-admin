import Vue from 'vue'
import App from './App.vue'
import axios from "axios"
import VueRouter from "vue-router"
import ElementUI from "element-ui";
import 'element-ui/lib/theme-chalk/index.css';

// 导入组件
import Login from "./pages/Login"

// element - 注册
Vue.use(ElementUI)
// 注册路由
Vue.use(VueRouter);

// 路由的配置
const routes = [
  { path: "/login", component: Login }
]

// 创建路由对象
const router = new VueRouter({ routes })

// 是否是生成环境
Vue.config.productionTip = false;

Vue.prototype.$axios = axios;

new Vue({
  router,
  render: h => h(App),
  // $mount作用相当于el，根实例挂载到节点
}).$mount('#app')
