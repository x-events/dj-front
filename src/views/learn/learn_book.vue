<template>
  <div>
    <header>
      <el-row type="flex" class="align-center title">
        <p>本年度阅读情况</p>
        <p>本年度党建读物已阅读：<span class="course">{{bookInfo.num}}</span></p>
      </el-row>
    </header>

    <div class="flex-l flex-col content">
      <el-tabs v-model="activeName" class="headTab flex-1 flex-col">
        <el-tab-pane label="已阅读" name="1">
          <div class="pane-content flex-1 scrollbar">
            <book :data="readingList" @pageChange="pageChange"/>
          </div>
        </el-tab-pane>
        
        <el-tab-pane label="系统推荐" name="3">
          <div class="pane-content flex-1 scrollbar">
            <book-recommend />
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
  import book from "@/components/learn/book";
  import bookRecommend from "@/components/learn/book_recommend";
  import * as learn from '@/api/learn.js'

  export default {
    data() {
      return {
        activeName: "1",
        params: {
          type: 1,
          pagesize: 10,
          p: 1,
        },
        endParams: {
          type: 2,
          pagesize: 10,
          p: 1,
        },
        readingList: {},
        bookInfo: {}
      }
    },
    components: {book, bookRecommend},
    methods: {
      getReadingList() {
        learn.mybook(this.params).then(res => {
          this.readingList = res.data
        })
      },
      pageChange(value) {
        this.params.p = value
        this.getReadingList()
      },
      getBookInfo() {
        learn.yearbookinfo().then( res => {
          this.bookInfo = res.data.data
        })
      }
    },
    created() {
      this.getReadingList()
      this.getBookInfo()
    }
  }
</script>

<style scoped>

</style>