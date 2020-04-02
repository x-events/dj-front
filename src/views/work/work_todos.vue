<template>
  <div class="flex-col worklist">
    <work-channel-bar />
    <breadcrumb />
    <div class="flex-1 mainCont scrollbar" v-loading="loading">
      <!-- 分类筛选器 -->
      <div class="typeHeader flex-row">
        <div v-for="(item,index) in typeFilters" :key="'type'+index" 
          class="item pr flex-1" 
          @click="queryParam.status=item.key;fetchData(true)">
          <div class="_wrap flex-row align-center">
            <img :src="item.ico" class="ion_pic" />
            <div class="flex-1">{{item.label}}</div>
            <span class="_count"><strong>{{item.count}}</strong>个</span>
          </div>
        </div>
      </div>
      <div class="block_wrap_min">
        <!-- list -->
        <template v-if="list && list.length > 0">
            <ul class="todoList">
                <li v-for="(item,index) in list" :key="'item'+index" class="flex-row">
                    <div class="_type _cell flex-row align-center">
                        <div class="_ion" :class="item.type == '1' ? 'type1':'type2'"></div>
                    </div>
                    <div class="flex-1 _cell box-cell" :title="item.name">
                        <span class="block-span ">
                            {{item.name}}
                            <span class="time" v-if="item.type == '1'">
                                ({{item.start_time | formatDate('yyyy-MM-dd hh:mm')}})
                            </span>
                        </span>
                    </div>
                    <div class="flex-1 withIcon _cell">
                        <div class="w-content" v-if="item.process_step_name != ''">
                            <div class="_ion" :class="item.type == '1' ? 'step1':'step2'"></div>
                            <div class="_label">{{item.type_name}}</div>
                            <div class="el" :title="item.process_step_name">
                            <template v-if="item.type != '1' && (item.transmit_type!=4)">
                                第{{numToZh(item.step)}}步：
                            </template>
                            {{item.process_step_name}}
                            <span class="time" v-if="item.type != '1'">
                                ({{item.start_time | formatDate('yyyy-MM-dd hh:mm')}})
                            </span>
                            </div>
                        </div>
                    </div>
                    <div class="col_middle withIcon _cell">
                        <template v-if="item.hope_at != 0">
                            <div class="_ion status1" v-if="item.time_icon == '1' || item.time_icon == '0'"></div>
                            <div class="_ion status2" v-if="item.time_icon == '2'"></div>
                            <div class="_ion status3" v-if="item.time_icon == '3'"></div>
                            
                            <div class="_label">期望完成时间</div>
                            {{item.hope_at | formatDate('yyyy-MM-dd hh:mm')}}
                        </template>
                    </div>
                    <div class="col_small _cell" style="text-align:right">
                        <el-button size="small" @click="doTask(item)">办理</el-button>
                    </div>
                </li>
            </ul>
            <!-- page -->
            <el-pagination
                v-if="list.length"
                class="pagination"
                background
                layout="prev, pager, next"
                :page-size="queryParam.pagesize"
                :current-page="queryParam.p"
                :total="totalRows"
                @current-change="handleCurrentChange"
            ></el-pagination>
        </template>
        <template v-else>
            <nodata mode="pic" />
        </template>

      </div>
    </div>
  </div>
</template>

<script>
import * as work from "@/api/work";
import * as util from "@/assets/util";
import workChannelBar from "@/components/work/workChannelBar"
import breadcrumb from "@/components/breadcrumb"

export default {
  components: {
    workChannelBar,
    breadcrumb
  },
  data() {
    return {
      loading: false,
      typeFilters: [
        {
          key: "",
          ico: require('../../assets/img/work/filter-icon1.png'),
          label: "全部",
          count: 0
        },
        {
          key: 7,
          ico: require('../../assets/img/work/filter-icon2.png'),
          label: "即将到期",
          count: 0
        },
        {
          key: 8,
          ico: require('../../assets/img/work/filter-icon3.png'),
          label: "已超时",
          count: 0
        }
      ],
      status: [
        {
          id: "",
          label: "流程状态"
        },
        {
          id: 1,
          label: "已完结"
        },
        {
          id: 2,
          label: "进行中"
        },
        {
          id: 3,
          label: "已驳回"
        },
        {
          id: 7,
          label: "即将到期"
        },
        {
          id: 8,
          label: "已超时"
        }
      ],
      category: [],
      queryParam: {
        p: 1,
        pagesize: 10,
        category: "",
        status: "",
        start_at: "",
        end_at: "",
        keywords: ""
      },
      daterange: null,
      currentCategory: [""],
      list: [],
      totalRows: 0
    };
  },
  watch: {
    daterange: function(daterange) {
      if (Array.isArray(daterange) && daterange.length === 2) {
        let end_tail = 24 * 60 * 60 - 1;
        this.queryParam.start_at = daterange[0] / 1000;
        this.queryParam.end_at = daterange[1] / 1000 + end_tail;
      } else {
        this.queryParam.start_at = "";
        this.queryParam.end_at = "";
      }
    },
    currentCategory: function() {
      if (Array.isArray(this.currentCategory)) {
        let currentCategory = util.deepcopy(this.currentCategory);
        this.queryParam.category = currentCategory.pop();
      }
    }
  },
  methods: {
    doTask: function(task){
      
      if(task.type=='1'){
        sessionStorage.setItem('work-detail-tabs', '')
        //新建
        this.$router.push({name: '新建任务', query: {name: task.name, type: task.form_category_type,id: task.id}})
      }else{
        //流程详情
        this.$router.push({name: '工作详情', query: util.paramEncode({category_name: task.category_name, id: task.process_log_id, form_category_id: task.id})})
      }
    },
    paramEncode: util.paramEncode,
    numToZh: util.numToZh,
    handleCurrentChange: function(currentPage) {
      this.queryParam.p = currentPage;
      this.fetchData();
    },
    fetchData: function(init) {
      if (init) {
        this.queryParam.p = 1;
      }
      this.loading = true;
      work.scheduleList(this.queryParam).then(res => {
        this.loading = false;
        this.list = res.data.data;
        this.totalRows = res.data.totalRows;
        // 更新总数
        this.typeFilters.forEach(e => {
          switch (e.key) {
            case 7:
              e.count = res.data.sum_will;
              break;
            case 8:
              e.count = res.data.sum_timeout;
              break;
            default:
              e.count = res.data.sum_all;
          }
        });
      });
    },
    fetchCat: function() {
      work.typeTree().then(res => {
        this.category = [
          {
            id: "",
            name: "流程类型"
          }
        ].concat(res.data.data);
      });
    }
  },
  created: function() {
    this.fetchCat();
    this.fetchData();
    
  }
};
</script>

<style scoped>
.todoList{padding:15px;}
.todoList li{border:1px solid #dee3e8;border-radius: 6px;margin-bottom:12px;}
.todoList ._cell{padding: 10px 15px;line-height: 18px;height: 36px;overflow: hidden;}
.todoList ._type{border-right: 1px solid #dee3e8;}
.todoList ._ion{width:26px;height: 26px;background-repeat: no-repeat;background-position: center center;}
.todoList ._label{display: block; color:#999;}
.todoList .col_middle{width:200px;}
.todoList .col_small{width:100px;}
.todoList .withIcon{padding-left:35px;position: relative;}
.todoList .withIcon ._ion{position: absolute;left:0;top:50%;margin-top:-13px;}
.todoList .type1{background-image: url(../../assets/img/work/list-type1.png)}
.todoList .type2{background-image: url(../../assets/img/work/list-type2.png)}
.todoList .step1{background-image: url(../../assets/img/work/list-step1.png)}
.todoList .step2{background-image: url(../../assets/img/work/list-step2.png)}
.todoList .status1{background-image: url(../../assets/img/work/list-status1.png)}
.todoList .status2{background-image: url(../../assets/img/work/list-status2.png)}
.todoList .status3{background-image: url(../../assets/img/work/list-status3.png)}
.time { display:inline-block; white-space:nowrap;}
.box-cell {  box-sizing: border-box;   line-height: 33px!important; height: 56px!important; }
.block-span { display: inline-block; max-height:38px; line-height:18px; overflow:hidden; vertical-align:middle; }
</style>