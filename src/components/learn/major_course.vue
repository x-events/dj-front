<template>
  <el-tabs v-model="activeName" class="mytabs">
    <el-tab-pane label="正在学习" name="1">
      <template v-if="learnList.data && learnList.data.length > 0">
      <div v-for="item in learnList.data" :key="item.id" class="flex-row align-center course-item">
        <div class="image">
          <img :src="item.image" alt="">
          <span class="_tag">学时：{{item.credit | scoreFloat}}</span>
        </div>
        <div class="info flex-1">
          <h3 class="el">{{item.title}}</h3>
          <div class="_cont">{{item.intro}}</div>
          <div style="overflow:hidden">
            <p class="_time">总时长：{{item.time}}</p>
            <p class="_cat">分类：{{item.category}}</p>
          </div>
          
        </div>
        <el-button type="primary" @click="goLearn(item.id)" class="go-detail">继续学习</el-button>
      </div>
      
      <el-row class="pagination-content" v-if="learnList.totalRows > 0">
        <span>共{{learnList.totalPages}}页</span>
        <el-pagination
          background
          @current-change="currentChange"
          layout="prev, pager, next"
          :page-size="params.pagesize"
          :total="learnList.totalRows" class="pagination">
        </el-pagination>
      </el-row>
      </template>
      <template v-else>
        <nodata mode="pic" />
      </template>
    </el-tab-pane>
    
    <el-tab-pane label="已完成" name="2">
      <template v-if="endList.data && endList.data.length > 0">
      <div v-for="item in endList.data" :key="item.id" class="flex-row align-center course-item">
        <div class="image">
          <img :src="item.image" alt="">
          <span class="_tag">学时：{{item.credit | scoreFloat}}</span>
        </div>
        <div class="info flex-1">
          <h3 class="el">{{item.title}}</h3>
          <div class="_cont">{{item.intro}}</div>
          <div style="overflow:hidden">
            <p class="_time">总时长：{{item.time}}</p>
            <p class="_cat">分类：{{item.category}}</p>
          </div>
          
        </div>
        <el-button type="primary" @click="goLearn(item.id)" class="go-detail end">已完成</el-button>
      </div>
      
      <el-row class="pagination-content" v-if="endList.totalRows > 0">
        <span>共{{endList.totalPages}}页</span>
        <el-pagination
          background
          @current-change="endListChange"
          layout="prev, pager, next"
          :page-size="endParams.pagesize"
          :total="endList.totalRows" class="pagination">
        </el-pagination>
      </el-row>
      </template>
      <template v-else>
        <nodata mode="pic" />
      </template>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
import * as learn from '@/api/learn.js'
export default {
  data() {
    return {
      activeName: '1',
      learnList: [],
      endList: [],
      params: {
        type: 1,
        pagesize: 10,
        p: 1,
      },
      endParams: {
        type: 2,
        pagesize: 10,
        p: 1,
      }
    }
  },
  watch: {
    activeName: {
      handler(val) {
        if(val == '1') {
          this.getCourseList();
        }else if(val == '2') {
          this.getEndList();
        }
      },
      immediate: true
    }
  },
  methods: {
    getCourseList() {
      learn.major(this.params).then(res => {
        this.learnList = res.data
      })
    },
    getEndList() {
      learn.major(this.endParams).then(res => {
        this.endList = res.data
      })
    },
    currentChange(value) {
      this.params.p = value
      learn.major(this.params).then(res => {
        this.learnList = res.data
      })
    },
    endListChange(value) {
      this.endParams.p = value
      learn.major(this.endParams).then(res => {
        this.endList = res.data
      })
    },
    goLearn(id) {
      this.$router.push({name: '课程详情', query: {id: id}})
    }
  }
}
</script>