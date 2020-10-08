import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import VueI18n from 'vue-i18n';
import zh from './config/zh';
import en from './config/en';// 创建vue-i18n实例i18n

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import "./assets/icon/iconfont.css"
import "./assets/css/public.scss"


import api from './utils/api' // 导入api接口
import Vuex from 'vuex'
import store from './store'

import hljs from 'highlight.js'
import 'highlight.js/styles/googlecode.css' // 样式文件

Vue.use(VueI18n);
Vue.use(Vuex)
Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.prototype.$api = api;


const i18n = new VueI18n({
  // 设置默认语言
  locale: store.state.lang || 'zh', //语言标识
  messages: {
    zh,
    en
  },
  fallbackLocale: 'zh', //如果在message中找不到相应的键值将回退到原本的语言
  formatFallbackMessages: true //如果在message中找不到相应的键值将回退到原本的语言
})

Vue.directive('highlight',async function (el) {
  await hljs;
  let blocks = el.querySelectorAll('pre code')
  blocks.forEach((block) => {
    hljs.highlightBlock(block)
  })
})

hljs.highlightCode = function () { 
	//自定义highlightCode方法，将只执行一次的逻辑去掉
	let blocks = document.querySelectorAll('pre code');
	[].forEach.call(blocks, hljs.highlightBlock);
};


new Vue({
  router,
  store,
  i18n,
  render: h => h(App),
}).$mount('#app')