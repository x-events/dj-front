<template>
  <div class="scrollbar">
    <div class="content flex-1 flex-col">
      <el-tabs v-model="activeName" @tab-click="handleClick" class="headTab flex-1 flex-col">
        <el-tab-pane label="全部" name="1">
          <div class="pane-content">
            <exam-list :data="allList" @pageChange="allPageChange"/>
            <el-select class="select" v-model="allParams.exam_status" placeholder="请选择"
            @change="this.getAllExam">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
        </el-tab-pane>
        <el-tab-pane label="正式考试" name="2">
          <div class="pane-content">
            <exam-list :data="formalList" @pageChange="formalPageChange" />
            <el-select class="select" v-model="formalParams.exam_status" placeholder="请选择"
            @change="this.getformalList">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
        </el-tab-pane>
        <el-tab-pane label="模拟考试" name="3">
          <div class="pane-content">
            <exam-list :data="simulateList" @pageChange="simulatePageChange" />
            <el-select class="select" v-model="simulateParams.exam_status" placeholder="请选择"
            @change="this.getsimulateList">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
        </el-tab-pane>
      </el-tabs>

      
    </div>
  </div>
</template>

<script>
import examList from '@/components/learn/exam_list'
import * as learn from '@/api/learn.js'
export default {
  data() {
    return {
      activeName: '1',
      allList: {
          data:[],
          totalPages:0,
          totalRows:0
      },
      formalList: {
          data:[],
          totalPages:0,
          totalRows:0
      },
      simulateList: {
          data:[],
          totalPages:0,
          totalRows:0
      },
      allParams: {
        pageSize: 10,
        pageNo: 1,
        exam_status: 0,
        sjlx: '',   
      },
      formalParams: {
        pageSize: 10,
        pageNo: 1,
        exam_status: 0,
        sjlx: 1,          
      },
      simulateParams: {
        pageSize: 10,
        pageNo: 1,
        exam_status: 0,         
        sjlx: 0
      },
      options: [{
        value: 0,
        label: '全部'
      },{
        value: 1,
        label: '未开始'
      },{
        value: 2,
        label: '进行中'
      },{
        value: 3,
        label: '已结束'
      }]
    }
  },
  components: {examList},
  methods: {
    handleClick() {
      this.exam_status = 0
      if(document.getElementsByClassName('el-tabs__content')[0]){
        document.getElementsByClassName('el-tabs__content')[0].scrollTop = 0
      }
    },
    getAllExam() {
      learn.examList(this.allParams).then( res => {
        this.allList = res.data
      })
    },
    allPageChange(value) {
      // 全部列表页数变化
      this.allParams.pageNo = value
      learn.examList(this.allParams).then( res => {
        this.allList = res.data
      })
    },
    getformalList() {
      learn.examList(this.formalParams).then( res => {
        this.formalList = res.data
      })
    },
    formalPageChange(value) {
      this.formalParams.pageNo = value
      learn.examList(this.formalParams).then( res => {
        this.formalList = res.data
      })
    },
    getsimulateList() {
      learn.examList(this.simulateParams).then( res => {
        this.simulateList = res.data
      })
    },
    simulatePageChange(value) {
      this.simulateParams.pageNo = value
      learn.examList(this.simulateParams).then( res => {
        this.simulateList = res.data
      })
    }
  },
  created() {
    this.getAllExam()
    this.getformalList()
    this.getsimulateList()
  }
}
</script>

<style scoped>
.content {margin-top:0px;position: relative;}
.select {position:absolute; right:10px; top:-46px;width: 100px;z-index: 999;}

.headTab { overflow:hidden;}
.headTab >>> .el-tabs__content .el-tab-pane { overflow:visible!important;}
.headTab >>> .el-tabs__content { -ms-flex: 1; flex: 1; min-width: 0; overflow-y:auto!important;}
</style>
