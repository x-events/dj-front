import '@babel/polyfill'

import Vue from 'vue'
import ElementUI from 'element-ui'
import '@/assets/theme/index.css'
import App from './App.vue'
import router from './router'

import animate from 'animate.css'
import LoadScript from 'vue-plugin-load-script'
Vue.use(LoadScript)
Vue.use(ElementUI);

import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
Vue.use(VueAwesomeSwiper)

//全局filter
import * as filters from '@/plugins/filters'
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

//全局组件
import components from '@/plugins/components'
Vue.use(components)

Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
  if(to.name){
    document.title = to.meta.title || to.name;
  }
  if(to.meta.content){
    let head = document.getElementsByTagName('head');
    let meta = document.createElement('meta');
    meta.name = to.meta.name;
    meta.content = to.meta.content;
    head[0].appendChild(meta)
  }
  next()
})

new Vue({
  data(){
    return {
      clientUser: null,
      user: {
        access_token: '',
        role:"",
        org_id:"",
        org_type:"",
        is_manager: ''
      },
      unreadConversations: []
    }
  },
  router,
  render: h => h(App)
}).$mount('#app')
