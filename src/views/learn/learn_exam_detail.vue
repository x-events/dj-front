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
        <el-row v-for="(item, index) in question" :key="index">
          <el-row class="type-title" type="flex" justify="space-between"
            v-if="question[index].children.length > 0">
            <p class="list-type">
              {{item.txbjnr}}
              <span>(共{{item.score}}分 共{{item.amount}}道题)</span>
            </p>
          </el-row>
          <div v-for="list in question[index].children"
            :key="list.id"  class="list-item">
            <div class="flex-row" :id="list.id">
              <div>{{list.pxh}}、</div>
              <div class="list-title flex-1" v-html="list.title"></div>
              <div style="width:70px;">({{list.score}}分)</div>
            </div>
            <div class="question-content">
              <div class="list-info" v-html="list.option"></div>
              <el-radio-group v-model="list.answer" v-if="list.type == '0' || list.type == '2'">
                <el-radio v-for="(check, index) in checkData.slice(0, list.option_count)" :key="check"
                :label="index+1">
                  <b class="radio">{{check}}</b>
                </el-radio>
              </el-radio-group>
              <el-checkbox-group v-model="list.answer" v-if="list.type == '1'">
                <el-checkbox v-for="(check,index) in checkData.slice(0, list.option_count)" :key="check" :label="index+1">
                  <b class="radio _checkbox">{{check}}</b>
                </el-checkbox>
              </el-checkbox-group>
            </div>
          </div>
        </el-row>
      </div>
    </div>

    <div class="answer-card scrollbar">
      <div class="answer-title"><h3>答题卡</h3></div>
      <div class="count-down" v-if="$route.query.type != 2">
        <i class="ion">&#xe6ef;</i>倒计时
        <span class="time">{{countdown}}</span>
      </div>

      <div v-for="(item, index) in question" :key="index">
        <div class="result-title" v-if="item.children.length > 0">{{item.txbjnr}}</div>
        <el-row class="result-list" type="flex" >
          <p
          v-for="(list, idx) in item.children" :key="list.id" 
          :class="{active: list.answer.length > 0 || list.answer > 0}">
            <a :href="'#' + list.id">{{idx+1}}</a>
          </p>
        </el-row>
      </div>

      <el-row class="btn-content" v-if="$route.query.type != 2">
        <el-button type="primary" @click="submit" class="submit">提交试卷</el-button>
        <el-button @click="back" class="cancel">退出</el-button>
      </el-row>
    </div>

    <el-dialog
      :visible.sync="dialogVisible"
      width="30%"
      class="dialog-content">
      <div class="dialog-info">
        <p v-if="!isAllCheck">您还有题目没有做完，</p>
        确定要提交答案吗？
      </div>
      <span slot="footer" class="btn-content">
        <el-button class="sureSubmit" type="primary" @click="sureSubmit">确 定</el-button>
        <el-button class="cancel" @click="dialogVisible = false">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import * as learn from "@/api/learn.js";
export default {
  data() {
    return {
      paperInfo: {},
      question: [],
      checkData: ['A', 'B', 'C', 'D' ,'E' ,'F', 'G','H','I','J','K','L','M','N'],
      answer: [],
      isAllCheck: false,
      countdown: '',
      endtime: '',
      spendtime: '',
      dialogVisible: false
    };
  },
  methods: {
    back() {
      this.$router.go(-1)
    },
    getDetail() {
      learn.enterExam({sjid: this.$route.query.id}).then( res => {
        this.paperInfo = res.data.data.papers_info
        this.endtime = res.data.data.endtime
        this.spendtime = res.data.data.endtime
        let question = res.data.data.paper_question_parent_list
        question.forEach( item => {
          item.children.forEach( child => {
            child.answer = []
          })
        })
        this.question = question
      })
    },
    count() {
      if(this.$route.query.type != 2) { // type = 2 为结束没答题查看详情
        if(this.endtime > 0) {
          let countdown = this.endtime
          let hour = parseInt(countdown / 60 / 60 )
          let min = parseInt(countdown / 60 % 60)
          let sec = parseInt(countdown % 60)
          hour = hour > 9 ? hour : '0' + hour
          min = min > 9 ? min : '0' + min
          sec = sec > 9 ? sec : '0' + sec
          this.countdown = `${hour}:${min}:${sec}`
          this.endtime--
        } else {
          this.submit()
          clearInterval(this.timer)
        }
      }
    },
    submit() {
      var answer = []
      this.question.forEach( item => {
        item.children.forEach(child => {
          answer.push(child.answer)
        })
      })
      this.isAllCheck = answer.every( item => {
        return item.toString().length > 0
      })
      this.dialogVisible = true
    },
    sureSubmit() {
      this.dialogVisible = false
      this.submitExam(0)
    },
    submitExam(isauto) {
      // 0 自己提交 1 自动提交
      if(this.spendtime > this.endtime) {
        this.spendtime -= this.endtime
      }
      this.concatResult()
      let submit_time = Date.parse(new Date())/1000;
      learn.saveExam({
        status: isauto,
        sjid: this.$route.query.id,
        submit_time: submit_time,
        spend_time: this.spendtime,
        exam_answers: this.answer 
      }).then( res => {
        clearTimeout(this.timer)
        this.$message({
          message: res.data.statusCode,
          type: 'success',
          duration: 2000,
          onClose: () => {
            this.$router.push({name: '线上考试'})
          }
        });
      })
    },
    concatResult() {
      let question = this.question
      question.forEach(item => {
        item.children.forEach( child => {
          if(!Array.isArray(child.answer)) {
            var arr = []
            arr.push(child.answer) 
            child.answer = arr
          }
          this.answer.push({
            id: child.id,
            answer: child.answer,
            pxh: child.pxh,
            score: child.score
          })
        })
      })
    }
  },
  created() {
    this.getDetail();
    this.timer = setInterval(() => {
      this.count()
      if(this.$route.query.type != 2 && this.endtime == 0) {
        this.submitExam(1)
      }
    }, 1000)
  }
};
</script>

<style scoped>
.exam-list .type-title {background-color: #F5F5F5;padding: 5px 10px;}
.exam-list .type-title p:first-of-type {font-weight: bold;color: #333;}
.exam-list .type-title .list-type span {color: #555555;font-weight: normal;}
.exam-list .type-title .type-score span {padding-left: 20px;}
.paper-main .exam-list .list-item:last-of-type {border-bottom: none;}
.paper-main .exam-list .list-item .list-title {word-wrap: break-word;word-break: break-all;
  overflow: hidden;}
.exam-detail {width: 1190px;margin: 20px auto;display: flex; justify-content: space-between;background:none; flex-direction:row;}
.paper-main {width: 845px;background-color: #fff;border: #efefef 1px solid;box-shadow: 0 0 5px #eee;
padding: 20px; box-sizing:border-box;}
.paper-main h1 {text-align: center;font-size: 24px;font-weight: bold;margin-bottom: 10px;
  word-break: break-all;padding: 0 80px;color: #333;}
.paper-main .table {width: 350px;margin: 10px auto;text-align: center;border: 1px solid #dbdbdb;}
.paper-main .table .info-header {border-bottom: 1px solid #dbdbdb;background-color: #f8f8f8;}
.paper-main .table .el-col {border-right: 1px solid #dbdbdb;}
.paper-main .table .el-col:last-of-type {border-right:none;}
.paper-main ._option label {cursor: pointer;margin-right: 15px;}
.question-content b {display: inline-block;width: 26px;height: 26px;text-align: center;
    line-height: 26px;border: #9b9b9b 1px solid;border-radius: 50%;font-weight: normal;}
.paper-main ._option label input {display: none;}
.question-content b.active {border-color: #f03a33;color: #f03a33;}
.paper-main .exam-list .question-content {padding:3px 20px;}
.paper-main .exam-list .question-content .list-info {margin: 8px 0;}
.question-content b._checkbox {border-radius: 5px;}
.paper-main .exam-list .list-item {padding: 20px 0 10px;border-bottom: 1px dotted #ccc;}

.answer-card {width: 330px; background-color: #fff;border: #efefef 1px solid;box-shadow: 0 0 5px #eee;
  min-height: 150px;}
.answer-card .answer-title {padding: 15px 20px;border-bottom: 1px solid #ddd;}
.answer-card .answer-title h3 {font-weight: bold;position: relative;padding-left: 15px;
border-left: 5px solid #4170F6;line-height: 20px;}
.answer-card .count-down {padding: 12px 0;color: #333;font-weight: bold;
display: flex;align-items: center;justify-content: center;}
.answer-card .count-down .ion {vertical-align: top;padding-right: 6px; color:#999; font-size: 16px;}
.answer-card .count-down .time {color: #f53129;font-size: 16px;padding-left: 6px;}
.answer-card .result-title {background-color: #f5f5f5;padding: 5px 13px;}
.answer-card .result-list {padding: 10px 0 6px 12px;flex-wrap: wrap;}
.answer-card .result-list p {width: 25px;height: 25px;line-height: 24px;text-align: center;
border: #bcbcbc 1px solid;margin-right: 6px;margin-bottom: 5px;font-size: 13px;cursor: pointer;}
.answer-card .result-list p:hover {color: #f53129;}
.answer-card .result-list p.active {background-color: #2fad88;color: #fff;border-color: #2fad88;}
.btn-content {text-align: center;}
.btn-content .el-button {width: 150px;}
/* .btn-content .el-button:first-of-type {background-color: #4170F6;border-color: #4170F6;color: #fff;}*/
.btn-content .el-button:last-of-type {border-color: #4170F6;color: #4170F6;}
.btn-content .el-button.cancel {background: #fff;} 
.dialog-info {text-align: center;font-size: 16px;font-weight: bolder;color: #333;}
</style>
<style>
.paper-main .exam-list .el-radio.is-checked .el-radio__label b{border-color: #f03a33;color: #f03a33;}
.paper-main .exam-list .el-radio .el-radio__input {display: none;}
.paper-main .el-checkbox-group .is-checked b._checkbox {border-color: #f03a33;color: #f03a33;}
.paper-main .el-checkbox-group .el-checkbox__input {display: none;}
.dialog-content .el-dialog__footer {text-align: center;}
</style>