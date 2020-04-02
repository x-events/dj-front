import {instance} from './index';

//获取课程列表
export const courseList = params => {
  return instance.get(`/index.php/api/course/courselist`, {params})
}

// 获取课程分类
export const category = params => {
  return instance.get(`/index.php/api/course/category`, {params})
}

// 课程详情
export const courseDetail = params => {
  return instance.get(`/index.php/api/course/detail`, {params})
}

// 学习时间记录
export const studytime = params => {
  return instance.get(`/index.php/api/course/studycount`, {params})
}

// 推荐课程
export const recommend = params => {
  return instance.get(`/index.php/api/course/recommend`, {params})
}

// 必修课
export const major = params => {
  return instance.get(`/index.php/api/course/mygovcourse`, {params})
}

// 选修课
export const elective = params => {
  return instance.get(`/index.php/api/course/mycourse`, {params})
}

// 年度课程学习情况
export const mystudyinfo = params => {
  return instance.get(`/index.php/api/Course/mystudyinfo`, {params})
}

// 课程学习时间记录
export const studyCount = params => {
  return instance.post(`/index.php/api/course/studycount`, params)
}

// 书籍学习时间记录
export const studyReadCount = params => {
  return instance.post(`/index.php/api/PartyRead/studycount`, params)
}

// 我的书籍
export const mybook = params => {
  return instance.get(`/index.php/api/partyRead/mybook`, {params})
}

// 书籍列表
export const partyreadlist = params => {
  return instance.get(`/index.php/api/partyRead/partyreadlist`, {params})
}

// 书籍分类
export const bookCategory = params => {
  return instance.get(`/index.php/api/partyRead/category`, {params})
}

// 书籍详情
export const bookDetail = params => {
  return instance.get(`/index.php/api/PartyRead/detail`, {params})
}

// 书籍阅读情况
export const yearbookinfo = params => {
  return instance.get(`/index.php/api/PartyRead/yearbookinfo`, {params})
}

// 考试列表
export const examList = params => {
  return instance.get(`/index.php/api/Exam/myExamList`, {params})
}

// 进入考试
export const enterExam = params => {
  return instance.get(`/index.php/api/Exam/enterExamForWeb`, {params})
}

// 保存考试答案
export const saveExam = params => {
  return instance.post(`/index.php/api/Exam/saveExam`, params)
}

// 获取考试详情
export const examResult = params => {
  return instance.get(`/index.php/api/Exam/getExamResult`, {params})
}
