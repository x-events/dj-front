export default {
    path: 'window/:org_id',
    icon:'window',
    name: '可视窗口',
    meta: {
        title: '可视窗口'
    },
    component: (resolve) => require(['../views/window'], resolve),
    children: [
        // {
        //     path: 'standards',
        //     name: '指数构成',
        //     component: (resolve) => require(['../views/window_standards'], resolve)
        // },
        {
            path: 'exponent_work',
            name: '党建指数-工委',
            meta: {
                title: '组织力指数'
            },
            component: (resolve) => require(['../views/window_exponent_work'], resolve),
            children:[
                {
                    path: 'exponent_index',
                    name: '组织力指数考核体系',
                    meta: {
                        title: '组织力指数考核体系'
                    },
                    component: (resolve) => require(['../views/window_exponent_index'], resolve),
                    children:[
                        {
                            path: 'exponent_show',
                            name: '指标展示-工委',
                            meta: {
                                title: '组织力指数工作展示'
                            },
                            component: (resolve) => require(['../views/window_exponent_show'], resolve)
                        }
                    ]
                }
            ]
        },
        {
            path: 'exponent',
            name: '党建指数-党委',
            meta: {
                title: '组织力指数'
            },
            component: (resolve) => require(['../views/window_exponent'], resolve),
            children:[
                {
                    path: 'exponent_index',
                    name: '组织力指数考核体系',
                    meta: {
                        title: '组织力指数考核体系'
                    },
                    component: (resolve) => require(['../views/window_exponent_index'], resolve),
                    children:[
                        {
                            path: 'exponent_show',
                            name: '指标展示-党委',
                            meta: {
                                title: '组织力指数工作展示'
                            },
                            component: (resolve) => require(['../views/window_exponent_show'], resolve)
                        }
                    ]
                }
            ]
        },
        {
            path: 'member_active',
            name: '党员活跃度',
            meta: {
                title: '党员活跃度'
            },
            component: (resolve) => require(['../views/window_member_active'], resolve),
            children: [
                {
                    path: 'active_detail',
                    name: '党员活跃度详情',
                    meta: {
                        title: '党员活跃度详情'
                    },
                    component: (resolve) => require(['../views/window_member_active_detail'], resolve)
                }
                // {
                //     path: 'member_pay',
                //     name: '党费缴纳',
                //     component: (resolve) => require(['../views/window_member_pay'], resolve)
                // },
                // {
                //     path: 'study_bixiu',
                //     name: '必修课',
                //     component: (resolve) => require(['../views/window_study_bixiu'], resolve)
                // },
            ]
        },
        {
            path: 'study_special',
            name: '专题学习',
            meta: {
                title: '专题学习'
            },
            component: (resolve) => require(['../views/window_study_special'], resolve)
        },
        {
            path: 'study_xuanxiu',
            name: '个人选学',
            meta: {
                title: '个人选学'
            },
            component: (resolve) => require(['../views/window_study_xuanxiu'], resolve)
        },
        {
            path: 'activity',
            name: '主题党日活动',
            meta: {
                title: '主题党日活动'
            },
            component: (resolve) => require(['../views/window_activity'], resolve)
        },
        {
            path: 'org_party',
            name: '党组织',
            meta: {
                title: '党组织架构'
            },
            component: (resolve) => require(['../views/window_org_party'], resolve)
        },
        {
            path: 'party_member',
            name: '党员',
            meta: {
                title: '党员'
            },
            component: (resolve) => require(['../views/window_party_member'], resolve),
            children:[
                {
                    path: 'filter',
                    name: '党员-筛选',
                    meta: {
                        title: '党员信息'
                    },
                    component: (resolve) => require(['../views/window_party_member_filter'], resolve)
                }
            ]
        },
        {
            path: 'party_worker',
            name: '党务工作者-可视窗口',
            meta: {
                title: '党务工作者'
            },
            component: (resolve) => require(['../views/window_party_worker'], resolve)
        },
        {
            path: 'user_detail',
            name: '书记信息',
            meta: {
                title: '书记有为值'
            },
            component: (resolve) => require(['../components/window/block3_user_detail'], resolve)
        },
        {
            path: 'working',
            name: '为民办实事-党工委',
            meta: {
                title: '为民办实事'
            },
            component: (resolve) => require(['../views/window_working'], resolve)
        },
        {
            path: 'working_committee',
            name: '为民办实事-党工委-党支部',
            meta: {
                title: '为民办实事'
            },
            component: (resolve) => require(['../views/window_working_committee'], resolve)
        }
    ]
}