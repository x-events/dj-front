import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import index from '@/views/index'
import workRoutes from './work'
import windowRoutes from './window'
import committeeRoutes from './committee'
import messageRoutes from './message'
import learnRoutes from './learn'
import datacenterRoutes from './datacenter'

export default new Router({
    routes: [{
            path: '/',
            name: '首页',
            component: index,
            redirect: '/window/0',
            children: [
            windowRoutes,
            committeeRoutes,
            workRoutes, 
            learnRoutes, 
            datacenterRoutes, 
            {
                path: 'map',
                name: '党建地图',
                icon: 'map',
                component: (resolve) => require(['../views/map'], resolve)
            }, 
            // {
            //     path: 'set',
            //     name: '管理设置',
            //     icon: 'set',
            //     component: (resolve) => require(['../views/blank'], resolve)
            // }, 
            messageRoutes]
        },
        {
            path: '/login',
            name: '登录',
            component: (resolve) => require(['../views/login.vue'], resolve),
            children: [{
                    path: '/first',
                    name: '完善信息',
                    component: (resolve) => require(['../views/login_first.vue'], resolve),
                },
                {
                    path: '/forget',
                    name: '找回密码',
                    component: (resolve) => require(['../views/login_forget.vue'], resolve),
                }
            ]
        }, {
            path: '/powerlogin',
            name: '登录中...',
            component: (resolve) => require(['../views/power_login.vue'], resolve)
        }, {
            path: '/401',
            name: '无权访问',
            component: (resolve) => require(['../views/common/401.vue'], resolve)
        }, {
            path: '/404',
            name: '找不到页面',
            component: (resolve) => require(['../views/common/404.vue'], resolve)
        }, {
            path: '/demo',
            name: 'demo',
            component: (resolve) => require(['../views/demo.vue'], resolve)
        }, {
            path: '/mobile',
            name: 'APP下载',
            meta: {
                name: 'viewport',
                content: 'width=device-width, initial-scale=1.0, minimum-scale=1.0, user-scalable=no'
            },
            component: (resolve) => require(['../views/mobile.vue'], resolve)
        }
    ]
})