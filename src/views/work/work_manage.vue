<template>
  <div class="flex-col worklist">
    <work-channel-bar />
    <breadcrumb />
    <div class="flex-1 mainCont widthSideBlock flex-row" v-loading="loading">
      <div class="workSideBlock scrollbar" v-if="showTree">
        <orgTree :roleTree="true" @select="orgSelectHandle" />
      </div>
      <div class="flex-1 scrollbar _main">
        <div class="typeHeader fourCol flex-row">
          <div
            v-for="(item,index) in typeFilters"
            :key="'type'+index"
            class="item pr flex-1"
            @click="queryParam.status=item.key;fetchData(true)"
          >
            <div class="_wrap flex-row align-center">
              <img :src="item.icon" class="ion_pic">
              <div class="flex-1">{{item.label}}</div>
              <span class="_count"><strong>{{item.count}}</strong>个</span>
            </div>
            
          </div>
        </div>
        <div class="block_wrap_min">
          <div class="head_bar flex-row align-center">
              <div class="flex-1"></div>
            <!-- search -->
            <el-form :inline="true" :model="queryParam">
              <el-form-item>
                <el-date-picker v-model="queryParam.year" value-format="yyyy" type="year" placeholder="按年份筛选">
                </el-date-picker>
              </el-form-item>
              <el-form-item label>
                <el-cascader
                  :options="category"
                  :props="{value: 'id',label:'name',children:'sub'}"
                  v-model="currentCategory"
                  style="width:10em"
                ></el-cascader>
              </el-form-item>
              <el-form-item label>
                <el-input v-model="queryParam.keywords" placeholder="名称"></el-input>
              </el-form-item>
              <el-button type="primary" icon="el-icon-search" @click="fetchData(true)">查询</el-button>
            </el-form>
          </div>
          <!-- list -->
          <el-table ref="multipleTable" :data="list" style="width: 100%" >
            <el-table-column label="编号" type="index" width="50" align="center"></el-table-column>
            <el-table-column prop="category_name" label="工作类型" show-overflow-tooltip></el-table-column>
            <el-table-column prop="work_name" label="工作名称" show-overflow-tooltip></el-table-column>
            <el-table-column prop="org_name" label="党组织" show-overflow-tooltip></el-table-column>
            <el-table-column prop="status" label="状态" width="100">
                <template slot-scope="scope">
                    <span class="statusTag" :class="status[scope.row.status].class">{{status[scope.row.status].text}}</span>
                </template>
            </el-table-column>
            <el-table-column label="操作" width="100" align="center">
              <template slot-scope="scope">
                <el-button 
                  v-if="scope.row.type!=2"
                  size="small"
                  @click="openDetail(scope.row)">查看</el-button>
              </template>
            </el-table-column>
          </el-table>
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
        </div>
      </div>
      
    </div>
  </div>
</template>

<script>
import * as common from "@/api/common";
import * as work from "@/api/work";
import * as util from "@/assets/util";
import workChannelBar from "@/components/work/workChannelBar"
import breadcrumb from "@/components/breadcrumb"
import orgTree from "@/components/orgTree"

export default {
  components: {
    workChannelBar,
    breadcrumb,
    orgTree
  },
  data() {
    return {
      loading: false,
      typeFilters: [
        {
          key: "",
          ico: "&#xe77a;",
          icon: require('../../assets/img/work/filter-icon2-1.png'),
          label: "工作总数",
          count: 0
        },
        {
          key: 1,
          ico: "&#xe645;",
          icon: require('../../assets/img/work/filter-icon2-2.png'),
          label: "已完成",
          count: 0
        },
        {
          key: 2,
          ico: "&#xe6ef;",
          icon: require('../../assets/img/work/filter-icon2-3.png'),
          label: "待完成",
          count: 0
        }/* ,
        {
          key: 3,
          ico: "&#xe6ff;",
          icon: require('../../assets/img/work/filter-icon2-4.png'),
          label: "已中止",
          count: 0
        } */
      ],
      status: {
        "1": {
          class: 'complete',
          text: "已完结"
        },
        "2": {
          class: 'doing',
          text: "待完成"
        },
        "3": {
          class: 'stop',
          text: "已中止"
        }
      },
      category: [],
      queryParam: {
        p: 1,
        pagesize: 10,
        category: "",
        status:"",
        org_id: "",
        year: "2019",
        keywords: ""
      },
      daterange: null,
      pickerOptions: {
        shortcuts: [{
          text: '最近一周',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - start.getDay() * 3600 * 1000 * 24);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近一个月',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setDate(1)
            start.setHours(0)
            start.setMinutes(0)
            start.setSeconds(0)
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近一年',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setMonth(0)
            start.setDate(1)
            start.setHours(0)
            start.setMinutes(0)
            start.setSeconds(0)
            picker.$emit('pick', [start, end]);
          }
        }]
      },
      currentCategory: [""],
      currentOrg: [""],
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
    },
    currentOrg: function() {
      if (Array.isArray(this.currentOrg)) {
        let currentOrg = util.deepcopy(this.currentOrg);
        this.queryParam.org_id = currentOrg.pop();
        this.fetchData(true)
      }
    }
  },
  computed: {
    showTree: function(){
      const user = this.$root.user;
      return !(user && user.org_type==3)
    }
  },
  methods: {
    openDetail: function(item){
      const workType = item.type;
      if(workType=='1'){
        this.$router.push({name: '工作详情', query: util.paramEncode(item)})
      }else{
        this.$router.push({name: '记录详情', query: util.paramEncode(item)})
      }
    },
    orgSelectHandle: function(data,node){
      this.currentOrg = [data.id]
    },
    paramEncode: util.paramEncode,
    handleCurrentChange: function(currentPage) {
      this.queryParam.p = currentPage;
      this.fetchData();
    },
    fetchData: function(init) {
      if (init) {
        this.queryParam.p = 1;
      }
      this.loading = true;
      work.workManageList(this.queryParam).then(res => {
        this.loading = false;
        this.list = res.data.data;
        this.totalRows = res.data.totalRows;
        // 更新总数
        this.typeFilters.forEach(e => {
          switch (e.key) {
            case 1:
              e.count = res.data.sum_complete
              break;
            case 2:
              e.count = res.data.sum_doing;
              break;
            case 3:
              e.count = res.data.sum_reject;
              break;
            default:
              e.count = res.data.sum_all;
          }
        });
      });
    },
    fetchCat: function() {
      work.mytree().then(res => {
        this.category = [
          {
            id: "",
            name: "工作类型"
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
</style>