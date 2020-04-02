<template>
  <div class="mainCont flex-col" v-loading="loading">
    <div v-if="$route.query" class="block_wrap flex-1 scrollbar">
      <div class="noticeDetailHd">
        <div class="_title">通知标题：{{$route.query.title}}</div>
        <div class="_sub">
          发送时间：{{$route.query.created_at | formatDate}}
          优先级：{{$route.query.level | labelTextByValue(level)}}
        </div>
      </div>
      <el-table 
        :data="list" 
        class="blockTable"
        style="width: 100%">
        <el-table-column prop="user_name" label="接收人姓名" ></el-table-column>
        <el-table-column prop="part_name" label="所属党组织"></el-table-column>
        <el-table-column label="是否查阅" width="180" align="center">
          <template slot-scope="scope">{{ scope.row.is_read==='1' ? '是' : '否' }}</template>
        </el-table-column>
        <el-table-column label="查阅时间" width="200" align="center">
          <template slot-scope="scope">
            <template v-if="scope.row.is_read==='1'">{{ scope.row.updated_at | formatDate }}</template>
            <template v-else>{{"--"}}</template>
          </template>
        </el-table-column>
      </el-table>
      <!-- page -->
      <el-pagination
        class="pagination"
        background
        layout="prev, pager, next"
        :page-size="queryParam.pageSize"
        :current-page="queryParam.p"
        :total="totalRows"
        @current-change="handleCurrentChange"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import * as util from "@/assets/util";
import * as notice from "@/api/notice";
import * as common from "@/api/common";

export default {
  filters: {
    labelTextByValue: util.labelTextByValue
  },
  data() {
    return {
      loading: false,
      list: null,
      queryParam: {
        id: '',
        p: 1,
        pageSize: 10
      },
      totalRows: 0,
      level: []
    };
  },
  watch: {
    level: {
      handler: function(level) {
        console.log(level)
        if (this.$route.query.id) {
          this.queryParam.id = this.$route.query.id;
          this.fetchData();
        }
      },
      deep: true
    }
  },
  methods: {
    handleCurrentChange: function(currentPage) {
      this.queryParam.p = currentPage;
      this.fetchData();
    },
    fetchData: function() {
      this.loading = true;
      notice.receipt(this.queryParam).then(res => {
        this.loading = false;
        this.list = res.data.data;
        this.totalRows = res.data.totalRows;
      });
    },
    fetchLevel: function() {
      this.loading = true;
      common.level().then(res => {
        this.level = res.data.data;
        this.loading = false;
      });
    }
  },
  created: function() {
    this.fetchLevel();
  }
};
</script>

<style scoped>
.noticeDetailHd {
  border-bottom: 1px solid #eee;
  padding: 10px;
  margin-bottom: 10px;
}
.noticeDetailHd ._title {
  font-size: 16px;
  color: #000;
  line-height: 1.7em;
  margin-bottom: 10px;
}
.noticeDetailHd ._sub {
  font-size: 12px;
  color: #ccc;
  line-height: 2em;
}

</style>
