export default {
    path: 'datacenter',
    name: '数据中心',
    icon: 'datacenter',
    redirect: '/datacenterinfo',
    component: (resolve) => require(['../views/datacenter/index'], resolve),
    children: [{
        path: '/datacenterIndex',
        component: (resolve) => require(['../views/datacenter/datacenterIndex'], resolve),
        children: [{
            path: '/datacenterinfo',
            name: '党组织信息',
            meta: {
                title: '党组织信息'
            },
            component: (resolve) => require(['../views/datacenter/datacenter'], resolve),
        },{
            path: '/datacenter/memberInfo',
            name: '党员信息',
            meta: {
                title: '党员信息'
            },
            component: (resolve) => require(['../views/datacenter/memberInfo.vue'], resolve),
            children:[
                {
                    path: '/datacenter/memberInfo/history',
                    name: '历史党员管理',
                    meta: {
                        title: '历史党员管理'
                    },
                    component: (resolve) => require(['../views/datacenter/memberInfo_history.vue'], resolve)
                }
            ]
        }, {
            path: '/datacenter/unitInfo',
            name: '单位信息',
            meta: {
                title: '单位信息'
            },
            component: (resolve) => require(['../views/datacenter/unitInfo.vue'], resolve)
        }, {
            path: '/datacenter/partyBuild',
            name: '党建阵地',
            meta: {
                title: '党建阵地'
            },
            component: (resolve) => require(['../views/datacenter/partyBuild.vue'], resolve)
        }, {
            path: '/datacenter/union',
            name: '工会',
            meta: {
                title: '工会'
            },
            component: (resolve) => require(['../views/datacenter/union.vue'], resolve)
        }, {
            path: '/datacenter/womenOrg',
            name: '妇联',
            meta: {
                title: '妇联'
            },
            component: (resolve) => require(['../views/datacenter/womenOrg.vue'], resolve)
        }, {
            path: '/datacenter/groupOrg',
            name: '团组织',
            meta: {
                title: '团组织'
            },
            component: (resolve) => require(['../views/datacenter/groupOrg.vue'], resolve)
        }, {
            path: '/datacenter/businessBuild',
            name: '商务楼宇',
            meta: {
                title: '商务楼宇'
            },
            component: (resolve) => require(['../views/datacenter/businessBuild.vue'], resolve)
        }, {
            path: '/datacenter/enterprise',
            name: '非公企业',
            meta: {
                title: '非公企业'
            },
            component: (resolve) => require(['../views/datacenter/enterprise.vue'], resolve)
        }, {
            path: '/datacenter/socialOrg',
            name: '社会组织',
            meta: {
                title: '社会组织'
            },
            component: (resolve) => require(['../views/datacenter/socialOrg.vue'], resolve)
        }, {
            path: '/datacenter/specialTeam',
            name: '特色队伍',
            meta: {
                title: '特色队伍'
            },
            component: (resolve) => require(['../views/datacenter/specialTeam.vue'], resolve)
        }, {
            path: '/datacenter/partyWork',
            name: '党务工作者',
            meta: {
                title: '党务工作者'
            },
            component: (resolve) => require(['../views/datacenter/partyWork.vue'], resolve)
        }, {
            path: '/datacenter_rescind',
            name: '已撤销党组织',
            meta: {
                title: '党组织信息'
            },
            component: (resolve) => require(['../views/datacenter/datacenter_rescind'], resolve),
        }]
    }, {
        path: 'datacenter_edit',
        name: '党组织信息编辑',
        meta: {
            title: '党组织信息'
        },
        component: (resolve) => require(['../views/datacenter/datacenter_edit'], resolve),
    }, {
        path: 'memberEditIndex',
        name: '党员信息编辑页面index',
        meta: {
            title: '党员信息'
        },
        redirect: '/datacenter/mem_baseinfo',
        component: (resolve) => require(['../views/datacenter/memberEditIndex.vue'], resolve),
        children: [{
            path: '/datacenter/mem_baseinfo',
            name: '党员编辑-基本信息',
            meta: {
                title: '党员信息'
            },
            component: (resolve) => require(['../components/datacenter/baseinfo.vue'], resolve),
        }, {
            path: '/datacenter/mem_applyParty',
            name: '党员编辑-申请入党信息',
            meta: {
                title: '党员信息'
            },
            component: (resolve) => require(['../components/datacenter/apply_party_info.vue'], resolve),
        }, {
            path: '/datacenter/mem_jobTitle',
            name: '党员编辑-职称信息',
            meta: {
                title: '党员信息'
            },
            component: (resolve) => require(['../components/datacenter/job_title_info.vue'], resolve),
        }, {
            path: '/datacenter/mem_family_info',
            name: '党员编辑-家庭成员信息',
            meta: {
                title: '党员信息'
            },
            component: (resolve) => require(['../components/datacenter/family_member_info.vue'], resolve),
        }, {
            path: '/datacenter/mem_degree_info',
            name: '党员编辑-学历学位信息',
            meta: {
                title: '党员信息'
            },
            component: (resolve) => require(['../components/datacenter/degree_info.vue'], resolve),
        }, {
            path: '/datacenter/mem_ship_info',
            name: '党员编辑-党籍信息',
            meta: {
                title: '党员信息'
            },
            component: (resolve) => require(['../components/datacenter/membership_info.vue'], resolve),
        }, {
            path: '/datacenter/mem_partyDuty',
            name: '党员编辑-党内职务信息',
            meta: {
                title: '党员信息'
            },
            component: (resolve) => require(['../components/datacenter/party_position_info.vue'], resolve),
        }, {
            path: '/datacenter/mem_admin_duty',
            name: '党员编辑-行政职务信息',
            meta: {
                title: '党员信息'
            },
            component: (resolve) => require(['../components/datacenter/administrative_duties.vue'], resolve),
        }, {
            path: '/datacenter/mem_oran_relation',
            name: '党员编辑-组织关系信息',
            meta: {
                title: '党员信息'
            },
            component: (resolve) => require(['../components/datacenter/organizational_relationship.vue'], resolve),
        }, {
            path: '/datacenter/mem_abroad',
            name: '党员编辑-出国党员信息',
            meta: {
                title: '党员信息'
            },
            component: (resolve) => require(['../components/datacenter/members_abroad.vue'], resolve),
        }, {
            path: '/datacenter/mem_commendation',
            name: '党员编辑-表彰信息',
            meta: {
                title: '党员信息'
            },
            component: (resolve) => require(['../components/datacenter/commendation.vue'], resolve),
        }, {
            path: '/datacenter/mem_discipline',
            name: '党员编辑-惩戒信息',
            meta: {
                title: '党员信息'
            },
            component: (resolve) => require(['../components/datacenter/discipline.vue'], resolve),
        }, {
            path: '/datacenter/mem_retreat',
            name: '党员编辑-离退信息',
            meta: {
                title: '党员信息'
            },
            component: (resolve) => require(['../components/datacenter/retreat.vue'], resolve),
        }, {
            path: '/datacenter/mem_difficult',
            name: '党员编辑-困难党员信息',
            meta: {
                title: '党员信息'
            },
            component: (resolve) => require(['../components/datacenter/difficult_member.vue'], resolve),
        }, {
            path: '/datacenter/mem_help',
            name: '党员编辑-困难党员享受帮扶信息',
            meta: {
                title: '党员信息'
            },
            component: (resolve) => require(['../components/datacenter/help_memeber.vue'], resolve),
        }, {
            path: '/datacenter/mem_alleviation',
            name: '党员编辑-困难党员脱贫脱困信息',
            meta: {
                title: '党员信息'
            },
            component: (resolve) => require(['../components/datacenter/poverty_alleviation.vue'], resolve),
        }, {
            path: '/datacenter/mem_supplement',
            name: '党员编辑-党员补充信息',
            meta: {
                title: '党员信息'
            },
            component: (resolve) => require(['../components/datacenter/supplement_memeber.vue'], resolve),
        }]
    }, {
        path: 'unitInfo_edit',
        name: '单位信息编辑',
        meta: {
            title: '单位信息'
        },
        component: (resolve) => require(['../views/datacenter/unitInfo_edit'], resolve),
    }, {
        path: 'partyBuild_edit',
        name: '党建阵地编辑',
        meta: {
            title: '党建阵地'
        },
        component: (resolve) => require(['../views/datacenter/partyBuild_edit'], resolve),
    }, {
        path: 'unionEditIndex',
        name: '工会信息编辑页面index',
        meta: {
            title: '工会'
        },
        redirect: '/datacenter/unionEdit_baseinfo',
        component: (resolve) => require(['../views/datacenter/unionEditIndex.vue'], resolve),
        children: [{
            path: '/datacenter/unionEdit_baseinfo',
            name: '工会信息编辑-基本信息',
            meta: {
                title: '工会信息'
            },
            component: (resolve) => require(['../views/datacenter/unionEdit_baseinfo.vue'], resolve),
        },{
            path: '/datacenter/unionEdit_member',
            name: '工会信息编辑-工会党员',
            meta: {
                title: '工会信息'
            },
            component: (resolve) => require(['../views/datacenter/unionEdit_member.vue'], resolve),
        }]
    }, {
        path: 'union_edit',
        name: '工会编辑',
        meta: {
            title: '工会'
        },
        component: (resolve) => require(['../views/datacenter/union_edit'], resolve),
    }, {
        path: 'womenOrg_edit',
        name: '妇联信息编辑',
        meta: {
            title: '妇联'
        },
        component: (resolve) => require(['../views/datacenter/womenOrg_edit'], resolve),
    }, {
        path: 'groupOrg_edit',
        name: '团组织编辑',
        meta: {
            title: '团组织'
        },
        component: (resolve) => require(['../views/datacenter/groupOrg_edit'], resolve),
    }, {
        path: 'businessBuild_edit',
        name: '商务楼宇编辑',
        meta: {
            title: '商务楼宇'
        },
        component: (resolve) => require(['../views/datacenter/businessBuild_edit'], resolve),
    }, {
        path: 'socialOrg_edit',
        name: '社会组织编辑',
        meta: {
            title: '社会组织'
        },
        component: (resolve) => require(['../views/datacenter/socialOrg_edit'], resolve),
    }, {
        path: 'enterprise_edit',
        name: '非公企业信息编辑',
        meta: {
            title: '非公企业信息'
        },
        component: (resolve) => require(['../views/datacenter/enterprise_edit'], resolve),
    }, {
        path: 'partyWork_edit',
        name: '党务工作者编辑',
        meta: {
            title: '党务工作者'
        },
        component: (resolve) => require(['../views/datacenter/partyWork_edit'], resolve),
    }, {
        path: 'teamEditIndex',
        name: '特色队伍编辑页面index',
        meta: {
            title: '特色队伍'
        },
        redirect: '/datacenter/teamEdit_baseinfo',
        component: (resolve) => require(['../views/datacenter/teamEditIndex.vue'], resolve),
        children: [{
            path: '/datacenter/teamEdit_baseinfo',
            name: '特色队伍编辑-基本信息',
            meta: {
                title: '特色队伍'
            },
            component: (resolve) => require(['../views/datacenter/teamEdit_baseinfo.vue'], resolve),
        },{
            path: '/datacenter/teamEdit_member',
            name: '特色队伍信息编辑-党员',
            meta: {
                title: '特色队伍'
            },
            component: (resolve) => require(['../views/datacenter/teamEdit_member.vue'], resolve),
        }]
    }, ]
}