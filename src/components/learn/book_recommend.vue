<template>
  <div>
    <el-row class="type">
      <span class="type-item" v-for="item in category" :key="item.id"
      :class="{actived: item.id === params.category_id}"
      @click="chooseCategory(item.id)">{{item.name}}（{{item.count}}）</span>
    </el-row>

    <div>
      <el-row type="flex" :gutter="28" class="recomment-content" v-if="bookList.length > 0">
        <el-col :span="4" class="recommend-item" v-for="item in bookList" :key="item.id">
          <router-link :to="{ name: '阅读详情', query: {id: item.id}}" :title="item.title">
            <div class="image"><img :src="item.image" :alt="item.title"></div>
            <h3 class="_title">{{item.title}}</h3>
          </router-link>
          <!-- <p :title="item.author" class="el">作者：{{item.author}}</p>
          <p class="el">出版日期：{{item.create_time.split(' ')[0]}}</p>
          <p :title="item.press" class="el">出版社：{{item.press}}</p>
          <p class="el">所属分类：{{item.category}}</p> -->
          <span v-if="item.progress == 0" class="status learning">正在阅读</span>
          <span v-if="item.progress == 1" class="status end">已阅读</span>
        </el-col>
      </el-row>
      <div v-if="bookList.length == 0"><nodata color="#333333" /></div>
      <el-row class="pagination-content" type="flex" v-if="totalRows > 0">
        <span>共{{totalPages}}页</span>
        <el-pagination
          background v-if="bookList.length > 0"
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
      bookList: [],
      params: {
        category_id: '0',
        p: 1,
        pagesize:18
      },
      totalPages: 1,
      totalRows:0
    };
  },
  methods: {
    chooseCategory(id) {
      this.params.p = 1
      this.params.category_id = id;
      this.getBookList();
    },
    getCategory() {
      learn.bookCategory().then(res => {
        this.category = res.data.data;
      });
    },
    getBookList() {
      learn.partyreadlist(this.params).then(res => {
        this.bookList = res.data.data;
        this.totalPages = res.data.totalPages
        this.totalRows = res.data.totalRows
      });
    },
    currentChange(value) {
      this.params.p = value
      this.getBookList()
    }
  },
  created() {
    this.getCategory();
    this.getBookList();
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
}
.content .recommend-item .image {
  width:100%;
  height: 150px;
  border:#cfcfcf 1px solid;
  margin-bottom:5px;
  border-radius:5px;
  overflow:hidden;
}
.content .recommend-item ._title {
  height:42px;
  overflow:hidden;
  line-height:21px;
  font-weight:normal;
  font-size:14px;
}
.content .recommend-item .image img {
  width: 100%;
  height: 100%;
  border-radius: 0px;
}

.content .recommend-item p {color: #949494;}
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
