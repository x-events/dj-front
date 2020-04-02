export default {
    path: 'learn',
    name: '网上党校',
    icon: 'learn',
    component: (resolve) => require(['../views/learn/learn'], resolve),
    children: [{
        path: 'courseDetail',
        name: '课程详情',
        component: (resolve) => require(['../views/learn/learn_course_detail'], resolve),
    }, {
        path: 'book',
        name: '党建读物',
        component: (resolve) => require(['../views/learn/learn_book.vue'], resolve)
    }, {
        path: 'examonline',
        name: '线上考试',
        component: (resolve) => require(['../views/learn/learn_exam.vue'], resolve)
    }, {
        path: 'examDetail',
        name: '考试详情',
        component: (resolve) => require(['../views/learn/learn_exam_detail.vue'], resolve)
    }, {
        path: 'examResult',
        name: '考试结果',
        component: (resolve) => require(['../views/learn/learn_exam_result.vue'], resolve)
    }, {
        path: 'bookDetail',
        name: '阅读详情',
        component: (resolve) => require(['../views/learn/learn_book_detail'], resolve),
    }]
}