export default {
    path: 'work',
    name: '工作记实',
    icon: 'work',
    component: (resolve) => require(['../views/work/work'], resolve),
    children: [{
            path: 'todos',
            name: '待办工作',
            meta: {
                icon: '&#xe6b9;'
            },
            component: (resolve) => require(['../views/work/work_todos'], resolve)
        },
        {
            path: 'tasks',
            name: '我的工作',
            meta: {
                icon: '&#xe77a;'
            },
            component: (resolve) => require(['../views/work/work_task'], resolve)
        }, {
            path: 'model',
            name: '新建工作',
            meta: {
                icon: '&#xe604;'
            },
            component: (resolve) => require(['../views/work/work_model'], resolve)
        }, {
            path: 'create',
            name: '新建任务',
            meta: {
                title: '新建工作',
                hidden: true
            },
            component: (resolve) => require(['../views/work/work_create_task'], resolve),
        }, {
            path: 'manage',
            name: '工作管理',
            meta: {
                title: '工作全览',
                icon: '&#xe63f;',
                hideRole: ['1']
            },
            component: (resolve) => require(['../views/work/work_manage'], resolve)
        }, 
        {
            path: 'evaluate',
            name: '综合评价',
            meta: {
                icon: '&#xe604;'
            },
            component: (resolve) => require(['../views/work/work_evaluate'], resolve),
            children:[
                {
                    path: 'daily',
                    name: '日常评价',
                    meta: {
                        title: '日常评价'
                    },
                    component: (resolve) => require(['../views/work/work_evaluate_daily'], resolve)
                },
                {
                    path: 'satisfy',
                    name: '满意度测评',
                    meta: {
                        title: '满意度测评记录'
                    },
                    component: (resolve) => require(['../views/work/work_evaluate_satisfy'], resolve)
                },
                {
                    path: 'yearend',
                    name: '年终考评',
                    meta: {
                        title: '年终考评记录'
                    },
                    component: (resolve) => require(['../views/work/work_evaluate_yearend'], resolve)
                }
            ]
        }, 
        {
            path: 'news',
            name: '党建资讯',
            meta: {
                hidden: true
            },
            component: (resolve) => require(['../views/work/work_news_list'], resolve)
        }, {
            path: 'news/:id',
            name: '资讯详情',
            meta: {
                hidden: true
            },
            component: (resolve) => require(['../views/work/work_news_detail'], resolve)
        }, {
            path: 'task-dynamic',
            name: '工作动态',
            meta: {
                hidden: true
            },
            component: (resolve) => require(['../views/work/work_dynamic_list'], resolve)
        }, {
            path: 'dynamic-detail',
            name: '动态详情',
            meta: {
                hidden: true
            },
            component: (resolve) => require(['../views/work/work_dynamic_detail'], resolve)
        }, {
            path: 'task-detail',
            name: '工作详情',
            meta: {
                hidden: true
            },
            component: (resolve) => require(['../views/work/work_task_detail'], resolve)
        }, {
            path: 'record-detail',
            name: '记录详情',
            meta: {
                hidden: true
            },
            component: (resolve) => require(['../views/work/work_record_detail'], resolve)
        },
        // {
        //     path: 'task-preview',
        //     name: '流程预览',
        //     meta: {
        //         hidden: true
        //     },
        //     component: (resolve) => require(['../views/work/work_task_view'], resolve)
        // }, 
        {
            path: 'info',
            name: '个人信息',
            meta: {
                hidden: true
            },
            component: (resolve) => require(['../views/work/work_info'], resolve)
        }, {
            path: 'changepw',
            name: '修改密码',
            meta: {
                hidden: true
            },
            component: (resolve) => require(['../views/work/work_changepw'], resolve)
        }
    ]
}