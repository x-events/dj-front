<template>
  <div>
    <template v-if="data.data && data.data.length > 0">
    <div v-for="item in data.data" :key="item.id" class="flex-row align-center course-item">
      <div class="image">
        <img :src="item.image" alt="">
        <!-- <span>学时：{{item.credit | scoreFloat}}</span> -->
      </div>
      <div class="info flex-1">
        <h3 class="el">{{item.title}}</h3>
        <div class="_cont">{{item.intro}}</div>
        <div class="infos">
            <p>作者：{{item.author}}</p>
            <p>出版日期：{{item.publish_time}}</p>
            <p>出版社：{{item.press}}</p>
        </div>
        
        <p class="_cat">分类：{{item.category}}</p>
        <!-- <p>总时长：{{item.time}}</p> -->
      </div>
      <el-button @click="goLearn(item.id)" type="primary" class="go-detail">继续阅读</el-button>
    </div>
    <el-row class="pagination-content" type="flex" v-if="data.totalRows > 0">
      <span>共{{data.totalPages}}页</span>
      <el-pagination
        background
        @current-change="currentChange"
        layout="prev, pager, next"
        :page-size="10"
        :total="data.totalRows" class="pagination">
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
      default:function(){
        return {}
      }
    }
  },
  methods: {
    currentChange(value) {
      this.$emit('pageChange', value)
    },
    goLearn(id) {
      this.$router.push({name: '阅读详情', query: {id: id}})
    }
  },
}
</script>

<style scoped>
.learn-content .pane-content {padding: 10px;box-shadow: 1px 3px 1px #e9e5e5;border-radius: 10px;}

.pane-content .image {border-radius:0px;width:120px;height:150px;overflow: hidden;position: relative;
margin-right: 20px; border:#cfcfcf 1px solid; border-radius:5px;}
.pane-content .image img {width: 100%;height: 100%;}
.pane-content .image span {position: absolute;background-color: #265CDA;color: #fff;padding: 4px 8px;
left: 6px;top: 6px;border-radius: 6px;}
.pane-content .info {flex-grow: 1;}
/* .pane-content .info h3 {color: #4A4A4A;} */
.pane-content .go-detail {background-color: #1244D2;color: #fff;margin-right: 30px;}
.pane-content .course-item {padding: 15px 10px;border-bottom: 1px solid #E4E4E5;}
.pagination-content {align-items: center;justify-content: flex-end;}
.pagination-content .pagination {margin: 10px 0;}
.pane-content .infos { padding:2px 0;}
.pane-content .infos p { display:inline-block; white-space:nowrap; font-size:12px; margin-right:20px;}
.pane-content ._cont { margin-bottom:5px!important;}
</style>
