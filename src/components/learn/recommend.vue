<template>
  <div>
    <el-row class="type">
      <span class="type-item" v-for="item in category" :key="item.id"
      :class="{actived: item.id === params.category_id}"
      @click="chooseCategory(item.id)">{{item.name}}（{{item.count}}）</span>
    </el-row>

    <div>
      <el-row type="flex" :gutter="20" class="recomment-content" v-if="courseList.length > 0">
        <el-col :span="6" class="recommend-item" v-for="item in courseList" :key="item.id">
          <router-link :to="{ name: '课程详情', query: {id: item.id}}">
            <div class="image"><img :src="item.image" alt=""></div>
            <h3 class="el" :title="item.title">{{item.title}}</h3>
          </router-link>
          <p class="score">学分：{{item.credit | scoreFloat}}</p>
          <p>总时长：{{item.time}}</p>
          <span v-if="item.progress == 0" class="status learning">正在学</span>
          <span v-if="item.progress == 1" class="status end">已完成</span>
        </el-col>
      </el-row>
      <div v-if="courseList.length == 0"><nodata mode="pic" /></div>
      <el-row class="pagination-content" type="flex" v-if="totalRows > 0">
        <span>共{{totalPages}}页</span>
        <el-pagination
          background v-if="courseList.length > 0"
          @current-change="currentChange"
          layout="prev, pager, next"
          :page-size="params.pagesize"
          :total="totalRows" class="pagination">
        </el-pagination>
      </el-row>
    </div>
    
  </div>
</template>

<script>
import * as learn from "../../api/learn.js";

export default {
  data() {
    return {
      category: [],
      courseList: [],
      params: {
        category_id: '0',
        p: 1,
        pagesize: 16
      },
      totalPages: 1,
      totalRows:0
    };
  },
  methods: {
    chooseCategory(id) {
      this.params.p = 1
      this.params.category_id = id;
      this.getCourseList();
    },
    getCategory() {
      learn.category().then(res => {
        this.category = res.data.data;
      });
    },
    getCourseList() {
      learn.courseList(this.params).then(res => {
        this.courseList = res.data.data;
        this.totalPages = res.data.totalPages
        this.totalRows = res.data.totalRows
      });
    },
    currentChange(value) {
      this.params.p = value
      this.getCourseList()
    }
  },
  created() {
    this.getCategory();
    this.getCourseList();
  }
};
</script>

<style scoped>
.learn-content .pane-content {
  padding: 20px 10px;
  box-shadow: 1px 3px 1px #e9e5e5;
  border-radius: 10px;
}
.content .type {
  flex-wrap: wrap;
  margin-bottom: 10px;
}
.content .type-item {
  padding: 4px 12px;
  cursor: pointer;
  display:inline-block;
  white-space:nowrap;
}
.content .type-item.actived {
  color: #1244d2;
}
.content .recomment-content {
  flex-wrap: wrap;
}
.content .recommend-item {
  position: relative;
  margin-bottom: 12px;
  height: 235px;
}
.content .recommend-item .image {
  height: 130px;
}
.content .recommend-item .image img {
  width: 100%;
  height: 100%;
  border-radius: 8px;
}

.content .recommend-item a:hover ,.content .recommend-item .score {
  color: #1244d2;
}
.content .recommend-item .status {
  position: absolute;
  left: 14px;
  top: 4px;
  padding: 4px 8px;
  color: #fff;
  border-radius: 4px;
}
.content .recommend-item .status.learning {
  background-color: #37d0c0;
}
.content .recommend-item .status.end {
  background-color: #8896a3;
}
.content .recomment-content .recommend-item:nth-of-type(4n) {
  margin-right: 0;
}
.pagination-content {align-items: center;justify-content: flex-end;}
.pagination-content .pagination {margin: 10px 0;}
</style>
