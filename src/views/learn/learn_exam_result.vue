<template>
  <div class="exam-detail">
    <div class="paper-main scrollbar">
      <h1>{{paperInfo.sjmc}}</h1>
      <div class="table">
        <el-row class="info-header">
          <el-col :span="6">总分</el-col>
          <el-col :span="6">及格分比例</el-col>
          <el-col :span="6">试题</el-col>
          <el-col :span="6">答卷时长</el-col>
        </el-row>
        <el-row class="info-content">
          <el-col :span="6">{{paperInfo.sjzf}}</el-col>
          <el-col :span="6">{{paperInfo.jgxbfb}}%</el-col>
          <el-col :span="6">{{paperInfo.question_amount}}</el-col>
          <el-col :span="6">{{paperInfo.kssc}}分钟</el-col>
        </el-row>
      </div>

      <div class="exam-list">
        <div v-for="(item, index) in question" v-if="question[index].children.length > 0" :key="index">
          <el-row class="type-title" type="flex" justify="space-between">
            <div class="list-type">
              {{item.txbjnr}}
              <span>(共{{item.score}}分 共{{item.amount}}道题)</span>
            </div>
            <div class="type-score">
              <span>分数：{{item.df}}</span>
              <span>对：{{item.objective_right_amount}}</span>
              <span>错：{{item.objective_error_amount}}</span>
            </div>
          </el-row>
          <div class="list-item" v-for="(child, idx) in item.children"
            v-if="question[index].children.length > 0"
            :key="idx">
            <div class="list-title">{{idx+1}}、<span v-html="child.title"></span>（ ）。({{child.score}}分)</div>
            <div class="question-content">
              <div class="list-info" v-html="child.option"></div> 
              <div class="result">
                <div>我的答案：{{child.yhda}}</div>
                <div v-if="child.zqbs === '0'">答题结果：<span class="wrong"><i class="ion">&#xe60a;</i>错误</span></div>
                <div v-if="child.zqbs === '1'">答题结果：<span class="right"><i class="ion">&#xe685;</i>正确</span></div>
                <div v-if="paperInfo.end_show == 1">正确答案：{{child.zqda | chooseFormat}}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="answer-card">
      <div class="answer-title"><h3>答题详情</h3></div>
      <div class="content">
        <el-row class="answer-info" type="flex"><p>成绩</p> <p class="score">{{detail.sjdf}}分</p></el-row>
        <el-row class="answer-info" type="flex"><p>作答时间</p> <p class="time">{{detail.use_time}}</p></el-row>
        <el-button type="primary" v-if="answer_flag == 1" @click="repeat" class="submit">再答一次</el-button>
        <el-button @click="back" class="cancel">退出</el-button>
      </div>
    </div>
  </div>  
</template>

<script>
import * as learn from "@/api/learn.js";

export default {
  data() {
    return {
      paperInfo: {},
      question: [],
      detail: {},
      answer_flag: ''
    }
  },
  methods: {
    back() {
      this.$router.go(-1)
    },
    getDetail() {
      learn.examResult({sjid: this.$route.query.id, record_id: this.$route.query.record_id}).then( res => {
        this.paperInfo = res.data.data.papers_info
        this.question = res.data.data.paper_question_parent_list
        this.detail = res.data.data.paper_record
        this.answer_flag = res.data.data.answer_flag
      })
    },
    repeat() {
      this.$router.push({name: '考试详情', query: {id: this.$route.query.id}})
    }
  },
  created() {
    this.getDetail()
    console.log(this.$route.query.id);
    
  }
}
</script>

<style scoped>
*{box-sizing: border-box;}
.exam-detail {width: 1190px;margin: 20px auto;display: flex; justify-content: space-between;background:none; flex-direction:row;}
.paper-main {width: 845px;background-color: #fff;border: #efefef 1px solid;box-shadow: 0 0 5px #eee;
padding: 20px;}
.paper-main h1 {text-align: center;font-size: 24px;font-weight: bold;margin-bottom: 10px;
  word-break: break-all;padding: 0 80px;color: #333;}
.paper-main .table {width: 350px;margin: 10px auto;text-align: center;border: 1px solid #dbdbdb;}
.paper-main .table .info-header {border-bottom: 1px solid #dbdbdb;background-color: #f8f8f8;}
.paper-main .table .el-col {border-right: 1px solid #dbdbdb;}
.paper-main .table .el-col:last-of-type {border-right:none;}
.exam-list .type-title {background-color: #F5F5F5;padding: 5px 10px;}
.exam-list .type-title p:first-of-type {font-weight: bold;color: #333;}
.exam-list .type-title .list-type span {color: #555555;font-weight: normal;}
.exam-list .type-title .type-score span {padding-left: 20px;}
.exam-list .list-item .result {font-weight: bold;color:#333;}
.exam-list .list-item .result p {line-height: 26px;}
.exam-list .list-item .result i {margin-right: 10px;}
.exam-list .list-item .result .wrong {color: #FB7B70;}
.exam-list .list-item .result .right {color: #41A979;}
.exam-list .list-item .list-title {padding-left: 6px;}
.paper-main .exam-list .question-content {padding:3px 20px;}
.paper-main .exam-list .list-item:last-of-type {border-bottom: none;}
.paper-main .exam-list .question-content .list-info {margin: 8px 0;}
.paper-main .exam-list .list-item {padding: 20px 0 10px;border-bottom: 1px dotted #ccc;}

.answer-card {width: 330px; background-color: #fff;border: #efefef 1px solid;box-shadow: 0 0 5px #eee;
  min-height: 150px;}
.answer-card .answer-title {padding: 15px 20px;border-bottom: 1px solid #ddd;}
.answer-card .answer-title h3 {font-weight: bold;position: relative;padding-left: 15px;
border-left: 5px solid #4170F6;line-height: 20px;}
.answer-card .content {padding: 10px;}
.answer-card .answer-info {padding: 8px 12px;background-color: #F5F5F5;margin-bottom: 6px;
align-items: center;}
.answer-card .answer-info p:first-of-type {width: 60px;}
.answer-card .answer-info p:last-of-type {flex-grow: 1;text-align: center;font-weight: bold;}
.answer-card .answer-info p.score {color: #F23432;font-size: 16px;}
.answer-card .answer-info p.time {color: #333;font-size: 16px;}

.answer-card .el-button{width: 100%;}
.answer-card .el-button:first-of-type {background-color: #4170F6;border-color: #4170F6;color: #fff;}
.answer-card .el-button:last-of-type {border-color: #4170F6;color: #4170F6;margin-top: 10px;margin-left: 0;}
.answer-card .el-button.cancel {background: #fff;}
</style>
