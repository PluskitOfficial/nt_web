import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ElementUI from "element-ui";
import locale from "../node_modules/element-ui/lib/locale/lang/en";

import axios from "axios";

// import echarts from 'echarts';
// Vue.prototype.$echarts = echarts;

Vue.prototype.uploadList = [];
window.app_key = -1;
Vue.config.productionTip = false;

import '@/styles/element-variables.scss';
import '@/styles/public.scss';
import '@/styles/index.scss';
import '@/styles/table.css';

Vue.use(ElementUI,{locale});
Vue.prototype.$axios = axios;

new Vue({
    router,
    store,
    render: (h) => h(App),
}).$mount("#app");
