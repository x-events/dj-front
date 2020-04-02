import {instance} from './index';

//支部班子成员
export const members = params => {
    return instance.get(`/index.php/api/Organization/members`, {params})
}

//班子成员详细信息
export const memberinfo = params => {
    return instance.get(`/index.php/api/Organization/memberinfo`, {params})
}

// 动态信息统计
export const lists_count = params => {
    return instance.get(`/index.php/api/Article/lists_count`, {params})
}

//党员活跃度
export const getMemberActive = params => {
    return instance.get(`/index.php/api/exponent/getMemberActive`, {params})
}

//组织力指数
export const getworkpoint = params => {
    return instance.get(`/index.php/api/exponent/getworkpoint`, {params})
}
//组织力指数
export const focus_on_view = params => {
    return instance.get(`/index.php/api/View/focus_on_view`, {params})
}

//可视窗口-党组织基本信息
export const view = params => {
    return instance.get(`/index.php/Api/organization/view`, {params})
}
//可视窗口-专题学习（折线图）
export const studycredit_view = params => {
    return instance.get(`/index.php/api/win/studycredit`, {params})
}
//可视窗口-必修课（饼图）
export const study_course_time = params => {
    return instance.get(`/index.php/api/Course/study_course_time`, {params})
}
//可视窗口-个人选学（排行榜）
export const party_book_studynum = params => {
    return instance.get(`/index.php/api/partyRead/party_book_studynum`, {params})
}
//可视窗口-工作纪实统计
export const processLog = params => {
    return instance.get(`/index.php/api/statistics/processLog`, {params})
}
// 为人民办实事-折线图
export const line_chart = params => {
    return instance.get(`/index.php/api/Work/line_chart`, {params})
}
//可视窗口-主题党日活动
export const activityview = params => {
    return instance.get(`/index.php/api/win/activityview`, {params})
}

//可视窗口-主题党日活动
export const getSomeNum = params => {
    return instance.get(`/index.php/api/base_data/getSomeNum`, {params})
}



//党员学习-必修课-学习覆盖率
export const gov_learning_coverage = params => {
    return instance.get(`/index.php/api/WinCourse/gov_learning_coverage`, {params})
}
//个人选学 其他
export const courseNum = params => {
    return instance.get(`/index.php/api/WinCourse/courseNum`, {params})
}


//可视化新接口
//主题党日
export const activity = params => {
    return instance.get(`/index.php/api/win/activity`, {params})
}

//专题学习
export const studyline = params => {
    return instance.get(`/index.php/api/win/studyline`, {params})
}

//学习强国
export const power = params => {
    return instance.get(`/index.php/api/win/power`, {params})
}

//个人选学
export const CourseStudy = params => {
    return instance.get(`/index.php/api/WinCourse/CourseStudy`, {params})
}

//为民办实事
export const dogood = params => {
    return instance.get(`/index.php/api/win/dogood`, {params})
}

// 为民办实事（党支部）
export const run_things = params => {
    return instance.get(`/index.php/api/win/dogoodbranch`, {params})
}

// 书记有为值（党支部）
export const ManagerDoneDetail = params => {
    return instance.get(`/index.php/api/exponent_detail/ManagerDoneDetail`, {params})
}

//首页工作纪实
export const work_record = params => {
    return instance.get(`/index.php/api/view/work_record`, {params})
}