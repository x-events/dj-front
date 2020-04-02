<template>
  <div class="exam-list">
    <template v-if="data.data.length > 0">
    <el-row class="exam-list-item" v-for="(item,index) in data.data" :key="'exam'+index" >
      <el-row type="flex" justify="space-between" class="exam-item">
        <p>
          <span class="formal-exam exam" v-if="item.sjlx == '1'">正式考试</span>
          <span class="simulate-exam exam" v-else>模拟考试</span>
          <span class="exam-title">{{item.sjmc}}</span>
        </p>
        <p class="info">
          <span>总分：{{item.sjzf}}</span>
          <span>及格分：{{item.pass_score}}</span>
          <span>时长：{{item.kssc}}分钟</span>
        </p>
      </el-row>
      <el-row type="flex" justify="space-between" class="exam-status">
        <p v-if="item.sjlx == '1'" class="exam-time">
          <i class="ion">&#xe602;</i>
          <span>考试时间：{{item.kskssj | formatDate}} ~ {{item.jskssj | formatDate}}</span>
        </p>
        <p v-else-if="item.sjlx == 0" class="exam-time">
          <i class="ion">&#xe6ef;</i>
          <span  v-if="item.sjtjsj != 0">上次考试：{{item.sjtjsj.split('-').join('/')}}</span>
          <span v-if="item.sjtjsj == 0">上次考试：--</span>          
        </p>

        <!-- 右边考试状态显示 -->
        <!-- 未开始未作答 -->
        <p class="info" v-if="item.time_status == 0">
          <span v-if="item.time_start.day == 0 && item.time_start.hour == 1">
            小于 <span class="exam-detail">1</span> 小时后考试开始
          </span>
          <span v-else> 
            <span class="exam-detail">{{item.time_start.day}}</span> 天
            <span class="exam-detail">{{item.time_start.hour}}</span>
            小时后考试开始
          </span>
        </p>
        <!-- 考试开始未作答 -->
        <p class="info" v-else-if="item.answer_flag == 1">
          <span class="exam-detail">
            <router-link :to="{name: '考试详情', query: {id: item.sjid, type: item.sjlx}}">开始考试</router-link>
          </span>
        </p>
        <!-- 正式考试进行中已作答 -->
        <p class="info" v-else-if="item.time_status == 1 && item.sjlx == 1 && item.is_answered == 1">
          <span>成绩：<span class="score">{{item.sjdf}}分</span></span>
          <span @click="goResult(item.sjid, item.record_id)" class="exam-detail">查看详情</span>
        </p>
        <!-- 模拟考试进行中已作答 再考一次 -->
        <p class="info" v-else-if="item.sjlx == 0 && item.answer_flag == 2">
          <span>最近考试成绩：<span class="score">{{item.sjdf}}分</span></span>
          <span @click="goResult(item.sjid, item.record_id)" class="exam-detail">查看最近考试详情</span>
          <router-link :to="{name: '考试详情', query: {id: item.sjid, type: item.sjlx}}"><span class="exam-detail">再考一次</span></router-link>
        </p>
        <!-- 模拟考试进行中已作答 无再考一次 -->
        <p class="info" v-else-if="item.sjlx == 0 && item.answer_flag == 3 && item.time_status == 1">
          <span>最近考试成绩：<span class="score">{{item.sjdf}}分</span></span>
          <span @click="goResult(item.sjid, item.record_id)" class="exam-detail">查看最近考试详情</span>
        </p>
        <!-- 考试已结束未作答 -->
        <p class="info" v-if="item.is_answered == 0 && item.time_status == 2">
          <span class="exam-end">考试已结束</span>
          <span class="exam-detail">
            <router-link :to="{name: '考试详情', query: {id: item.sjid, type: 2}}">查看详情</router-link>
          </span>
        </p>
        <!-- 正式考试已结束已作答 -->
        <p class="info" v-else-if="item.sjlx == 1 && item.time_status == 2 && item.is_answered == 1">
          <span class="exam-end">考试已结束</span>
          <span>成绩：<span class="score">{{item.sjdf}}分</span></span>
          <span @click="goResult(item.sjid, item.record_id)" class="exam-detail">查看详情</span>
        </p>
        <!-- 模拟考试已结束已作答 -->
        <p class="info" v-else-if="item.sjlx == 0 && item.time_status == 2 && item.is_answered == 1">
          <span class="exam-end">考试已结束</span>
          <span>最近考试成绩：<span class="score">{{item.sjdf}}分</span></span>
          <span @click="goResult(item.sjid, item.record_id)" class="exam-detail">查看最近考试详情</span>
        </p>
      </el-row>
    </el-row>

    <el-row class="pagination-content" type="flex" v-if="data.totalRows > 0">
      <span>共{{data.totalPages}}页</span>
      <el-pagination background @current-change="currentChange" layout="prev, pager, next" :total="data.totalRows"
        class="pagination">
      </el-pagination>
    </el-row>
    </template>
    <template v-else>
      <nodata mode="pic" />
    </template>
  </div>
</template>

<script>
  export default {
    props: {
      data: {
        type: Object,
        default: function () {
          return {
              data:[],
              totalPages:0,
              totalRows:0
          }
        }
      }
    },
    methods: {
      currentChange(value) {
        this.$emit('pageChange', value)
      },
      goResult(id, record_id) {
        this.$router.push({name: '考试结果', query: {id: id, record_id: record_id}})
      }
    }
  }
</script>

<style scoped>
  .exam-list .exam-item {
    width: 100%;
    margin-bottom: 5px;
  }

  .exam-list .exam-list-item {
    padding: 10px;
    border-bottom: 1px solid #E5E5E5;
    margin-top: 10px;
  }

  .exam-item .exam {
    padding: 3px 6px;
    color: #fff;
    border-radius: 3px;
    margin-right: 8px;
  }

  .exam-item .exam.formal-exam {
    background-color: #1244D2;
  }

  .exam-item .exam.simulate-exam {
    background-color: #25AE87;
  }

  .exam-item .exam-title {
    font-weight: bold;
    color: #434343;
  }

  .exam-item .info {
    color: #333;
  }

  .exam-item .info span,
  .exam-status .info>span,
  .exam-status .info>a span {
    padding-left: 30px;
  }

  .exam-status .exam-time {
    color: #666;
  }

  .exam-status .exam-time i {
    font-weight: bold;
    margin-right: 10px;
  }

  .exam-status .exam-end {
    color: #C0C0C0;
  }

  .exam-status .score {
    color: #25AE87;
    font-weight: bold;
  }

  .exam-status .exam-detail {
    color: #1244D2;
    cursor: pointer;
  }

  .exam-status .info span.time {
    color: #F53A32;
    font-weight: bold;
    padding: 0 3px;
  }

  .pagination-content {
    align-items: center;
    justify-content: flex-end;
  }

  .pagination-content .pagination {
    margin: 10px 0;
  }
</style>