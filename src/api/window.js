import {instance} from './index';

//党建工作指数
export const getworkpoint = params => {
    return instance.get(`/index.php/api/exponent/getworkpoint`, {params})
}

// 重点关注
export const focus_on = params => {
    return instance.get(`/index.php/api/View/focus_on`, {params})
}

//指数构成
export const standards = params => {
    return instance.get(`/index.php/api/view/exponent`, {params})
}

//组织力四级右边列表
export const exponent_detail_show = params => {
    return instance.get(`/index.php/api/exponent_detail/show`, {params})
}

//党员活跃度
export const getMemberActive = params => {
    return instance.get(`/index.php/api/exponent/getMemberActive`, {params})
}

//书记有为值
export const getMemberDoneFive = params => {
    return instance.get(`/index.php/api/exponent/getMemberDoneFive`, {params})
}
//书记有为值
export const getMemberDone = params => {
    return instance.get(`/index.php/api/exponent/getMemberDone`, {params})
}
//书记有为值详情
export const doneDetail = params => {
    return instance.get(`/index.php/api/exponent/doneDetail`, {params})
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
//可视窗口-为人民办实事-折线图
export const line_chart = params => {
    return instance.get(`/index.php/api/Work/line_chart`, {params})
}
//可视窗口-主题党日活动
export const activityview = params => {
    return instance.get(`/index.php/api/win/activityview`, {params})
}
//主题党日活动-本月开展情况（左上）
export const activitydata = params => {
    return instance.get(`/index.php/api/win/activitydata`, {params})
}
//主题党日活动-活动类型（左下）
export const activitytype = params => {
    return instance.get(`/index.php/api/win/activitytype`, {params})
}
//主题党日活动-开展主题活动数（中下）
export const activitymonth = params => {
    return instance.get(`/index.php/api/win/activitymonth`, {params})
}
//主题党日活动-最新主题活动（右）
export const activitylist = params => {
    return instance.get(`/index.php/api/win/activitylist`, {params})
}


//党费-本月缴纳情况
export const feedata = params => {
    return instance.get(`/index.php/api/win/feedata`, {params})
}
//党费-党费缴纳基数
export const feebase = params => {
    return instance.get(`/index.php/api/win/feebase`, {params})
}
//党费-年度党费统计
export const feeyear = params => {
    return instance.get(`/index.php/api/win/feeyear`, {params})
}
//党费-党费收缴进度排行
export const payrank = params => {
    return instance.get(`/index.php/api/win/payrank`, {params})
}

//专题学习-左上数据
export const studydata = params => {
    return instance.get(`/index.php/api/win/studydata`, {params})
}
//专题学习-党员专题学习参与率（左下）
export const studyjoinrate = params => {
    return instance.get(`/index.php/api/win/studyjoinrate`, {params})
}
//专题学习学时统计
export const studycredit = params => {
    return instance.get(`/index.php/api/win/studycredit`, {params})
}
//专题学习参与人数
export const studyselect = params => {
    return instance.get(`/index.php/api/win/studyselect`, {params})
}
//专题学习支部排行
export const studyorgrank = params => {
    return instance.get(`/index.php/api/win/studyorgrank`, {params})
}
//专题学习党员排行
export const studymemberrank = params => {
    return instance.get(`/index.php/api/win/studymemberrank`, {params})
}

//个人选学 各类课程占比
export const coursetype = params => {
    return instance.get(`/index.php/api/WinCourse/coursetype`, {params})
}
//个人选学 个人选学覆盖率
export const pie_chart = params => {
    return instance.get(`/index.php/api/WinCourse/pie_chart`, {params})
}
//个人选学 其他
export const courseNum = params => {
    return instance.get(`/index.php/api/WinCourse/courseNum`, {params})
}
//个人选学
export const CourseStudy = params => {
    return instance.get(`/index.php/api/WinCourse/CourseStudy`, {params})
}
//支部排行
export const orgRank = params => {
    return instance.get(`/index.php/api/win_course/orgRank`, {params})
}
//最热选学课程
export const hotCourseRank = params => {
    return instance.get(`/index.php/api/win_course/hotCourseRank`, {params})
}
//最热选学读物
export const hotReadRank = params => {
    return instance.get(`/index.php/api/win_course/hotReadRank`, {params})
}
//个人选学-四项统计数
export const computeNum = params => {
    return instance.get(`/index.php/api/win_course/computeNum`, {params})
}
//个人选学 在线学习人数和时长
export const num_duration = params => {
    return instance.get(`/index.php/api/WinCourse/num_duration`, {params})
}

//必修课-在线学习人数及时长
export const gov_learning_line_chart = params => {
    return instance.get(`/index.php/api/WinCourse/gov_learning_line_chart`, {params})
}
//必修课-在线学习计划完成进度
export const learning_plan_completion = params => {
    return instance.get(`/index.php/api/WinCourse/learning_plan_completion`, {params})
}
//必修课-在线学习计划完成进度
export const computeMustStudyCourseNum = params => {
    return instance.get(`/index.php/api/WinCourse/computeMustStudyCourseNum`, {params})
}
//必修课-排行及统计数据
export const govCourse = params => {
    return instance.get(`/index.php/api/WinCourse/govCourse`, {params})
}
//必修课-党员排行
export const mustStudyMemberRank = params => {
    return instance.get(`/index.php/api/WinCourse/mustStudyMemberRank`, {params})
}
//必修课-四项统计数
export const computeMustStudyNum = params => {
    return instance.get(`/index.php/api/win_course/computeMustStudyNum`, {params})
}
//必修课-支部排行
export const mustStudyOrgRank = params => {
    return instance.get(`/index.php/api/win_course/mustStudyOrgRank`, {params})
}

//党组织
export const org = params => {
    return instance.get(`/index.php/api/view/org`, {params})
}
//党组织弹窗
export const orgcount = params => {
    return instance.get(`/index.php/api/View/orgcount`, {params})
}
export const orglist = params => {
    return instance.get(`/index.php/api/View/orglist`, {params})
}

//党员
export const partymem = params => {
    return instance.get(`/index.php/api/view/partymem`, {params})
}
// 党员列表
export const partymem_list = params => {
    return instance.get(`/index.php/api/view/partymem_list`, {params})
}

export const member_info = params => {
    return instance.get(`/index.php/api/party/member_info`, {params})
}

//党务工作者
export const worker = params => {
    return instance.get(`/index.php/api/View/worker`, {params})
}


// 党员学习-必修课-学习覆盖率
export const gov_learning_coverage = params => {
    return instance.get(`/index.php/api/WinCourse/gov_learning_coverage`, {params})
}

// 党员活跃度-活跃度比例
export const getCircleMap = params => {
    return instance.get(`/index.php/api/Exponent/getCircleMap`, {params})
}

// 党员活跃度-活跃度走势
export const activeLine = params => {
    return instance.get(`/index.php/api/Exponent/activeLine`, {params})
}

// 党员活跃度-支部排行
export const activeRank = params => {
    return instance.get(`/index.php/api/Exponent/activeRank`, {params})
}

// 为人民办实事-统计
export const lists_count = params => {
    return instance.get(`/index.php/api/Work/lists_count`, {params})
}

// 为人民办实事-列表
export const lists_year = params => {
    return instance.get(`/index.php/api/Work/lists_year`, {params})
}

// 为人民办实事-排行榜
export const rank_lists = params => {
    return instance.get(`/index.php/api/Work/rank_lists`, {params})
}


// 党建工作指数(雷达图)
export const workindex = params => {
    return instance.get(`/index.php/api/exponent/workindex`, {params})
}
// 指数趋势(双折线)
export const indextrend = params => {
    return instance.get(`/index.php/api/exponent/indextrend`, {params})
}
// 指数二级-机关党建、社区党建、非公党建
export const workCommitteeSub = params => {
    return instance.get(`/index.php/api/statistics/workCommitteeSub`, {params})
}
// 指数二级-机关党建、社区党建、非公党建
export const workCommitteeRank = params => {
    return instance.get(`/index.php/api/Statistics/workCommitteeRank`, {params})
}
// 党建指数页面-排行
export const ranklist = params => {
    return instance.get(`/index.php/api/exponent/ranklist`, {params})
}

// 指数展示菜单
export const workDetailMenu = params => {
    return instance.get(`/index.php/api/exponent/workDetailMenu`, {params})
}
// 指数展示内容
export const getDetailByItemId = params => {
    return instance.get(`/index.php/api/exponent/getDetailByItemId`, {params})
}

//可视化新接口
//为民办实事
export const dogood = params => {
    return instance.get(`/index.php/api/win/dogood`, {params})
}

//主题党日
export const activity = params => {
    return instance.get(`/index.php/api/win/activity`, {params})
}

//主题党日活动详情
export const activityinfo = params => {
    return instance.get(`/index.php/api/win/activityinfo`, {params})
}

//专题学习次数走势
export const studyline = params => {
    return instance.get(`/index.php/api/win/studyline`, {params})
}

//专题学习次数统计
export const studytype = params => {
    return instance.get(`/index.php/api/win/studytype`, {params})
}

//专题学习参加人数统计
export const studymember = params => {
    return instance.get(`/index.php/api/win/studymember`, {params})
}

//专题学习工作记录
export const studyrecord = params => {
    return instance.get(`/index.php/api/win/studyrecord`, {params})
}

//学习强国
export const power = params => {
    return instance.get(`/index.php/api/win/power`, {params})
}

//书记有为值弹窗-左侧分类
export const getOrgType = params => {
    return instance.get(`/index.php/api/exponent/getOrgType`, {params})
}

//书记有为值弹窗-右侧列表
export const getOrgManager = params => {
    return instance.get(`/index.php/api/exponent/getOrgManager`, {params})
}

//党组织弹窗
export const org_detail = params => {
    return instance.get(`/index.php/api/View/org_detail`, {params})
}

//为民办实事（党工委）基本信息
export const work_cmt_info = params => {
    return instance.get(`/index.php/api/win/dogoodcommdata`, {params})
}

//为民办实事（党工委）月度
export const work_cmt_month = params => {
    return instance.get(`/index.php/api/win/dogoodmonth`, {params})
}

//为民办实事（党工委）年度
export const work_cmt_year = params => {
    return instance.get(`/index.php/api/win/dogoodyear`, {params})
}

//直属党组织得分排行
export const MyOrgRank = params => {
    return instance.get(`/index.php/api/exponent/MyOrgRank`, {params})
}

//直属党组织月份得分-折线图
export const workCommitteeLine = params => {
    return instance.get(`/index.php/api/Statistics/workCommitteeLine`, {params})
}

//党员活跃度详情
export const activeDetail = params => {
    return instance.get(`/index.php/api/exponent/activeDetail`, {params})
}
//党员活跃度三级-缴纳党费
export const activefee = params => {
    return instance.get(`/index.php/api/win/activefee`, {params})
}

//首页工作纪实
export const work_record = params => {
    return instance.get(`/index.php/api/view/work_record`, {params})
}

//主题党日活动参与人数统计
export const activitymember = params => {
    return instance.get(`/index.php/api/win/activitymember`, {params})
}

//主题党日活动次数统计
export const activitynum = params => {
    return instance.get(`/index.php/api/win/activitynum`, {params})
}

//主题党日活动依托资源统计
export const activityresource = params => {
    return instance.get(`/index.php/api/win/activityresource`, {params})
}

//主题党日活动记录
export const activityrecord = params => {
    return instance.get(`/index.php/api/win/activityrecord`, {params})
}

//为民办实事-饼图-总数 + 可视化首页进度条
export const doGoodCountPie = params => {
    return instance.get(`/index.php/api/win/doGoodCountPie`, {params})
}

//为民办实事记录
export const doGoodList = params => {
    return instance.get(`/index.php/api/win/doGoodList`, {params})
}

//为民办实事-详情弹窗
export const doGoodInfo = params => {
    return instance.get(`/index.php/api/win/doGoodInfo`, {params})
}


//为民办实事受益人总数
export const doGoodObjCountPie = params => {
    return instance.get(`/index.php/api/win/doGoodObjCountPie`, {params})
}

// 为民办实事（党支部）数据
export const dogoodbranch = params => {
    return instance.get(`/index.php/api/win/dogoodbranch`, {params})
}

// 人员弹框
export const memberList = params => {
    return instance.get(`/index.php/api/exponent_detail/memberList`, {params})
}