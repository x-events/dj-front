export default {
    path: 'message',
    name: '信息通讯',
    icon: 'message',
    component: (resolve) => require(['../views/message/message'], resolve),
    children: [{
        path: 'notice',
        name: '通知公告',
        component: (resolve) => require(['../views/message/message_notice'], resolve),
        children: [{
            path: 'detail',
            name: '通知详情',
            component: (resolve) => require(['../views/message/message_notice_detail'], resolve)
        }, {
            path: 'receipt',
            name: '通知-阅读回执',
            meta: {
                title: '阅读回执',
            },
            component: (resolve) => require(['../views/message/message_notice_receipt'], resolve)
        }]
    }, {
        path: 'files',
        name: '文件接收箱',
        component: (resolve) => require(['../views/message/message_files'], resolve),
        children: [{
            path: 'receipt',
            name: '文件-阅读回执',
            meta: {
                title: '接收回执',
            },
            component: (resolve) => require(['../views/message/message_files_receipt'], resolve)
        }]
    }, {
        path: 'timeline',
        name: '党建朋友圈',
        component: (resolve) => require(['../views/message/message_timeline'], resolve),
        children: [{
            path: 'send',
            name: '发布朋友圈',
            component: (resolve) => require(['../views/message/message_timeline_send'], resolve)
        }]
    }, {
        path: 'im',
        name: '即时通讯',
        component: (resolve) => require(['../views/message/im'], resolve)
    }]
}