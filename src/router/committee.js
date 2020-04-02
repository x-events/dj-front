export default {
    path: 'window_committee/:org_id',
    name: '党支部',
    icon:'window',
    meta: {
        title: '可视窗口'
    },
    component: (resolve) => require(['../views/window_committee'], resolve),
    children: [
        // {
        //     path: 'standards',
        //     name: '指数构成-党支部',
        //     meta: {
        //         title: '指数构成'
        //     },
        //     component: (resolve) => require(['../views/window_standards'], resolve)
        // },
        {
            path: 'exponent_index',
            name: '组织力指数考核体系-党支部',
            meta: {
                title: '组织力指数考核体系'
            },
            component: (resolve) => require(['../views/window_exponent_index_dzb'], resolve),
            children:[
                {
                    path: 'exponent_show',
                    name: '指标展示-党支部',
                    meta: {
                        title: '组织力指数工作展示'
                    },
                    component: (resolve) => require(['../views/window_exponent_show'], resolve)
                }
            ]
        },
        // {
        //     path: 'exponent_work',
        //     name: '党建指数-工委-党支部',
        //     meta: {
        //         title: '组织力指数'
        //     },
        //     component: (resolve) => require(['../views/window_exponent_work'], resolve)
        // },
        // {
        //     path: 'exponent_show',
        //     name: '指标展示-党支部',
        //     meta: {
        //         title: '指标展示'
        //     },
        //     component: (resolve) => require(['../views/window_exponent_show'], resolve)
        // },
        {
            path: 'member_active',
            name: '党员活跃度-党支部',
            meta: {
                title: '党员活跃度'
            },
            component: (resolve) => require(['../views/window_member_active_dzb'], resolve),
            children: [
                {
                    path: 'active_detail',
                    name: '党员活跃度详情-党支部',
                    meta: {
                        title: '党员活跃度详情'
                    },
                    component: (resolve) => require(['../views/window_member_active_detail'], resolve)
                },
                // {
                //     path: 'member_pay',
                //     name: '党费缴纳-党支部',
                //     meta: {
                //         title: '党费缴纳'
                //     },
                //     component: (resolve) => require(['../views/window_member_pay'], resolve)
                // },
                // {
                //     path: 'study_bixiu',
                //     name: '必修课-党支部',
                //     meta: {
                //         title: '必修课'
                //     },
                //     component: (resolve) => require(['../views/window_study_bixiu'], resolve)
                // },
            ]
        },
        {
            path: 'study_special',
            name: '专题学习-党支部',
            meta: {
                title: '专题学习'
            },
            component: (resolve) => require(['../views/window_study_special'], resolve)
        },
        {
            path: 'study_xuanxiu',
            name: '个人选学-党支部',
            meta: {
                title: '个人选学'
            },
            component: (resolve) => require(['../views/window_study_xuanxiu'], resolve)
        },
        {
            path: 'activity',
            name: '主题党日活动-党支部',
            meta: {
                title: '主题党日活动'
            },
            component: (resolve) => require(['../views/window_activity'], resolve)
        },
        {
            path: 'committee_working',
            name: '为民办实事-党支部',
            meta: {
                title: '为民办实事'
            },
            component: (resolve) => require(['../views/window_working_committee'], resolve)
        },
        {
            path: 'user_detail',
            name: '书记信息-党支部',
            meta: {
                title: '书记有为值'
            },
            component: (resolve) => require(['../components/window/block3_user_detail'], resolve)
        }
    ]
}