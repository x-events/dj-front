<template>
  <el-container class="digistBlock newWindow" v-loading="loading">
    <el-header>
      <!-- head -->
      <ul class="flex-row">
        <li class="block flex-row" v-for="(item,index) in hdList" :key="'num'+index">
          <div class="title"></div>
          <div class="num digital flex-1">
            <span class="dicount">{{ item.num || 0 }}</span>
            <p class="fz16">{{ item.name }}</p>
          </div>
        </li>
      </ul>
    </el-header>
    <el-main class="table-div flex-1 flex-row">
      <div class="table-left t_blue flex-1 flex-col block_wrap_opc">
        <div class="channelBar">
          <div class="_title">
            <i class="wico wi21"></i>
            <strong>直属党组织得分排行</strong>
          </div>
        </div>
        <div class="flex-1 flex-col">
          <el-table :data="list" height="100%" stripe>
            <el-table-column type="index" :index="indexMethod" label="排名" width="150" align="center"></el-table-column>
            <el-table-column prop="name" label="名称" ></el-table-column>
            <el-table-column prop="score" label="得分" align="center"></el-table-column>
          </el-table>
          <div class="page-div fix" v-if="totalRows > 0">
            <el-pagination
              background
              layout="prev, pager, next"
              :page-size="queryParam.pagesize"
              :current-page="Number(queryParam.p)"
              @current-change="pageChange"
              :total="totalRows"
            ></el-pagination>
          </div>
        </div>
      </div>
      <div class="table-right t_blue flex-1 flex-col block_wrap_opc">
        <div class="channelBar">
          <div class="_title">
            <i class="wico wi22"></i>
            <strong>直属党组织得分后十名</strong>
          </div>
        </div>
        <div class="flex-1 flex-col">
          <el-table :data="lastList" height="100%" stripe>
            <el-table-column type="index" label="排名" width="150" align="center"></el-table-column>
            <el-table-column prop="name" label="名称"></el-table-column>
            <el-table-column prop="score" label="得分" align="center"></el-table-column>
          </el-table>
        </div>
      </div>
    </el-main>
  </el-container>
</template>

<script>
import * as util from "@/assets/util";
import * as window from "@/api/window";
let counterHash = [];

export default {
  data() {
    return {
      animate: false,
      timer: null,
      hdList: [
        {
          name: "工作总数",
          icon: require("@/assets/img/work/icon5.png")
        },
        {
          name: "参加党员数",
          icon: require("@/assets/img/work/icon6.png")
        },
        {
          name: "党员总数",
          icon: require("@/assets/img/work/icon7.png")
        },
        {
          name: "参与比例",
          icon: require("@/assets/img/work/icon5.png")
        }
      ],
      queryParam: {
        org_id:"",
        item_id: null,
        p: 0,
        pagesize:13
      },
      list: [],
      lastList: [],
      loading: false,
      totalRows: 0
    };
  },
  watch: {
        "$route.params.org_id"(new_id){
            this.queryParam.org_id = new_id;
            this.getData();
        }
    },
  methods: {
      indexMethod(index) {
        return (index + 1) + (this.queryParam.p-1)* this.queryParam.pagesize;
      },
    pageChange(p) {
      this.queryParam.p = p;
      this.getData();
    },
    getData() {
      this.loading = true;
      window.activeDetail(this.queryParam).then(res => {
        const resData = res.data.data;
        this.loading = false;
        if (resData.score_rank_asc) {
          this.list = resData.score_rank_asc.data;
          this.totalRows = Number(resData.score_rank_asc.totalRows);
        } else {
          this.hdList = [
            resData.work_num,
            resData.attend_members,
            resData.all_members,
            resData.percent
          ];

          this.lastList = resData.score_rank_desc.splice(0,10);
        }
      });
    }
  },
  created: function() {
    
    if(this.$route.params.org_id == 0){
        this.queryParam.org_id = ""
    }else{
        this.queryParam.org_id = this.$route.params.org_id
    }

    if (this.$route.query.id) {
        this.queryParam.item_id = this.$route.query.id;
        this.getData();
    }
    setTimeout(() => {
      this.animate = 1;
      this.queryParam.p = 1;
      this.getData();
    }, 0);
    util.on("leaveWindow", () => {
      this.animate = 2;
    });

    if(this.$route.query.title){
        util.emit("breadTitle",this.$route.query.title);
    }
  }
};
</script>

<style scoped>
.digistBlock {
  overflow: hidden;
  padding: 25px 22px;
  width: 100%;
  box-sizing: border-box;
}
.el-header {
  margin: 0 auto;
  height: 110px !important;
  margin-bottom: 15px;
  width:1010px;
}
.block,
.block::after {
  background: url(../assets/img/window_blocl_bg.png) no-repeat;
}
.block {
  height: 102px;
  width: 240px;
  position: relative;
}
.block::after {
  content: "";
  display: block;
  width: 23px;
  height: 75px;
  background-position: right -11px;
  position: absolute;
  right: 0;
  top: 11px;
}
.digistBlock .num {
  font-weight: normal;
  font-size: 24px;
  line-height: 25px;
  padding: 25px 0;
  margin-right: 20px;
  text-align: center;
  color: #ffeb08;
}
.digistBlock .num p {
  font-size: 16px;
  color: #00ecfc;
}
.digistBlock .title {
  width: 50px;
  height: auto;
  line-height: 1.2;
  font-size: 16px;
  color: #00ecfc;
  text-align: center;
  padding: 35px 28px 0px 25px;
  background-repeat: no-repeat;
  background-size: 35px auto;
  background-position: center 32px;
}

.digistBlock .block:nth-child(1) .title {
  background-image: url(../assets/img/work/icon10.png);
}
.digistBlock .block:nth-child(2) .title {
  background-image: url(../assets/img/work/icon6.png);
}
.digistBlock .block:nth-child(3) .title {
  background-image: url(../assets/img/work/icon7.png);
}
.digistBlock .block:nth-child(4) .title {
  background-image: url(../assets/img/work/icon5.png);
}

.channelBar {
  margin-bottom: 15px;
  cursor: default;
  background: linear-gradient(
    to right,
    rgba(13, 58, 105, 1) 0%,
    rgba(13, 58, 105, 0.4) 100%
  );
}
.table-div {
  padding: 0;
}
.table-div .el-button {
  line-height: 10px;
}
.table-left {
  margin-right: 30px;
}
.page-div {
  margin-top: 5px;
  padding-right: 15px;
  line-height: 40px;
}
.page-div > span,
.page-div .el-pagination {
  float: right;
}
.page-div > span {
  color: #fff;
  margin-right: 5px;
}

.min-height {
  min-height: 698px;
}
.table-div /deep/ .col_g:not(.is-leaf) {
  color: #72fd30;
}
.table-div /deep/ .col_y:not(.is-leaf) {
  color: #efde34;
}
.table-div /deep/ .col_r:not(.is-leaf) {
  color: #fc722d;
}
</style>
