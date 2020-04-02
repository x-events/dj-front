<template>
  <div class="flex-col worklist">
    <work-channel-bar/>
    <breadcrumb/>

    <div class="flex-1 mainCont widthSideBlock flex-row" v-loading="loading">
      <div class="workSideBlock scrollbar">
        <div class="hd tc" @click="queryParam.id = treeAct.cate_id = treeAct.sub_id = '';clearFilter();fetchData(true);searchPlaceholder = ''" title="全部"><i class="wti"></i>全部</div>
        <el-collapse v-model="treeAct.cate_id" accordion @change="handleChange">
          <el-collapse-item :name="e.id.toString()" v-for="(e,i) in workTree" :key="i">
            <template slot="title">
              <i class="wti" :class="'wti'+(i+1)"></i>
              <span class="name el" :title="e.name">{{e.name}}</span>
            </template>
            <div v-for="(ee,ii) in e.sub" :key="ii">
              <a :id="ee.id" :temp="ee.template" class="link el" :class="{'active':treeAct.sub_id == ee.id}" :title="ee.name" @click="workClick(ee)">{{ee.name}}</a>
            </div>
          </el-collapse-item>
        </el-collapse>
      </div>
      <div class="flex-1 scrollbar _main">

        <div class="third_nav" v-if="queryParam.id != ''">
          <ul class="fix" v-if="subNav.length > 0">
            <li v-for="(e,i) in subNav" :key="i" :id="e.id" :class="{'active':queryParam.id == e.id}" @click="processSubIndex = i;change_third_nav(e)">{{e.name}}</li>
          </ul>
          <ul class="fix" v-else>
              <li class="active">{{listTitle}}</li>
          </ul>
        </div>

        <div class="typeHeader fourCol flex-row" v-if="queryParam.id == ''">
          <div v-for="(item,index) in typeFilters" :key="'type'+index" 
            class="item pr flex-1" 
            style="cursor:default;">
            <div class="_wrap flex-row align-center">
              <img :src="item.icon" class="ion_pic">
              <div class="flex-1">{{item.label}}</div>
              <span class="_count">
                <strong>{{item.count}}</strong>个
              </span>
            </div>
          </div>
        </div>
        <div class="block_wrap_min">
            <div class="head_bar flex-row">
                <div class="flex-1"></div>
                <!-- search -->
                <el-form :inline="true" :model="queryParam">
                    <el-form-item :label="search_text">
                      <el-date-picker v-model="daterange" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" value-format="timestamp"></el-date-picker>
                    </el-form-item>
                    <el-form-item label>
                      <el-input v-model.trim="queryParam.keywords" :placeholder="searchPlaceholder || '名称'"></el-input>
                    </el-form-item>
                    <el-button icon="el-icon-search" type="primary" @click="fetchData(true)">查询</el-button>
                </el-form>
                <el-button type="primary" style="margin-left:10px;" 
                v-if="queryParam.id != ''" 
                @click="toCreate({id:queryParam.id,type:queryParam.type,name: listTitle})">新建工作</el-button>
            </div>
            
            <template v-if="queryParam.id == ''">
            <!--全部列表-->
                <el-table ref="multipleTable" :data="list" style="width: 100%" stripe>
                    <el-table-column label="编号" type="index" width="50" align="center"></el-table-column>
                    <el-table-column prop="name" label="工作名称" :show-overflow-tooltip="true"></el-table-column>
                    <el-table-column prop="end_time" label="完成时间">
                    </el-table-column>
                    <el-table-column prop="category_name" label="工作类型"></el-table-column>
                    <el-table-column label="操作" width="140" align="left">
                        <template slot-scope="scope">
                            <el-button type="text" class="check" @click="openDetail(scope.row)">查看</el-button>
                            <el-button type="text" class="check" @click="delList(scope.row)" v-if="scope.row.can_del == 1">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </template>
            <template v-else>
                <!--非全部表格列表-->
                <el-table ref="multipleTable" :data="otherList.data" style="width: 100%" stripe v-if="otherList.type == 'table'">
                    <el-table-column label="编号" type="index" width="50" align="center"></el-table-column>

                    <template v-if="otherList.keys.length > 0">
                        <el-table-column :prop="e.prop" :label="e.label" v-for="(e,i) in otherList.keys" :key="i" :show-overflow-tooltip="true"></el-table-column>
                    </template>
                    <template v-else>
                        <el-table-column label></el-table-column>
                    </template>

                    <el-table-column label="操作" :width="ope_width" align="left">
                        <template slot-scope="scope">
                            <el-button v-if="ope.download == 1" type="text" class="check" @click="downloadFile(scope.row)">下载</el-button>
                            <el-button v-if="ope.look == 1" type="text" class="check" @click="openDetail(Object.assign({category_name: listTitle}, scope.row))">查看</el-button>
                            <el-button v-if="ope.del == 1" type="text" class="del" @click="delList(scope.row)">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>

                <!--非全部图文列表-->
                <div class="imgList" :class="{'nodata':otherList.data.length == 0}" v-if="otherList.type == 'img'">
                    <template v-if="otherList.data.length > 0">
                        <div class="list flex-row" v-for="(e,i) in otherList.data" :key="i">
                            <div class="img" v-if="e.img_url"><img :src="e.img_url" :alt="e.name"></div>
                            <div class="intro flex-1 flex-col">
                                <h3 class="name el" :title="e.name">{{e.name}}</h3>
                                <div class="flex-1"></div>
                                <div class="text_show">
                                    <div class="el" v-for="(ee, ii) in e.text_show" :key="ii" :title="ee">{{ee}}</div>
                                </div>
                            </div>
                            <div class="options">
                                <template v-if="ope.audit == 1">
                                    <template v-if="e.status == 0">
                                        <!-- 未审核 -->
                                        <el-button type="text" class="check" @click="audit(e,1)">通过</el-button>
                                        <el-button type="text" class="check" @click="audit(e,2)">驳回</el-button>
                                    </template>
                                    <template v-if="e.status == 1"><span class="status green">已通过</span></template>
                                    <template v-if="e.status == 2"><span class="status red">已驳回</span></template>
                                </template>

                                <el-button v-if="ope.download == 1" type="text" class="check" @click="downloadFile(e)">下载</el-button>

                                <el-button v-if="ope.look == 1" type="text" class="check" @click="openDetail(Object.assign({category_name: listTitle},e))">查看</el-button>

                                <el-button v-if="ope.edit == 1" type="text" class="check" @click="openDetail(Object.assign({category_name: listTitle},e))">编辑</el-button>
                                <el-button v-if="ope.del == 1" type="text" class="del" @click="delList(e)">删除</el-button>
                            </div>
                        </div>
                    </template>
                    <template v-else>
                        <nodata mode="pic" />
                    </template>
                </div>

            </template>

          <!-- page -->
          <el-pagination v-if="totalRows > 0" class="pagination" background layout="prev, pager, next" :page-size="queryParam.pagesize" :current-page="queryParam.p" :total="totalRows" @current-change="handleCurrentChange"></el-pagination>
        </div>
      </div>
    </div>
    

  </div>
</template>

<script>
import * as work from "@/api/work";
import * as util from "@/assets/util";
import * as index from "@/api/index";
import workChannelBar from "@/components/work/workChannelBar";
import breadcrumb from "@/components/breadcrumb";

let { fixBySelector, fixImgFile } = require("@/assets/fixer")

export default {
  name: 'work_task',
  components: {
    workChannelBar,
    breadcrumb
  },
  data() {
    return {
      loading: false,
      dateFormat: util.dateFormat,
      typeFilters: [
        {
          key: "",
          icon: require("../../assets/img/work/filter-icon3-1.png"),
          label: "工作总数",
          count: 0
        },
        {
          key: 4,
          icon: require("../../assets/img/work/filter-icon3-2.png"),
          label: "创建",
          count: 0
        },
        {
          key: 5,
          icon: require("../../assets/img/work/filter-icon3-3.png"),
          label: "经办",
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
          label: "已中止"
        },
        {
          id: 4,
          label: "创建"
        },
        {
          id: 5,
          label: "经办"
        }
      ],
      category: [],
      searchPlaceholder:"",
      queryParam: {
        id:"",
        type:"",
        p: 1,
        pagesize: 10,
        // category: "",
        // status: "",
        start_at: "",
        end_at: "",
        keywords: ""
      },
      daterange: null,
      currentCategory: [""],
      list: [],
      totalRows: 0,
      workTree: [],
      treeAct: {
        cate_id: "",
        sub_id: ""
      },
      otherList: {
        data:[],
        keys:[],
        type:""
      },
      ope:{
        look:0,
        del:0,
        edit:0,
        download:0,
        audit:0
      },
      subNav: [],
      processSubIndex: 0,
      listTitle:"",
      search_text:""
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
  computed: {
      ope_width(){
          let ope = this.ope
          if(ope.del == 1 && ope.look == 1 && ope.download == 1){
              return '180'
          }
          if(ope.del == 1 && ope.look == 1 && ope.download == 0){
              return '130'
          }
          if(ope.del == 1 && ope.look == 0 && ope.download == 0){
              return '100'
          }
      }
  },
  methods: {
    toCreate: function(node) {
      if(this.processSubIndex){
        node.processSubIndex = this.processSubIndex
      }
      
      if(window.sessionStorage){
        sessionStorage.setItem('work-detail-tabs', this.subNav.length ? JSON.stringify(this.subNav) : '')
      }
      this.$nextTick(() => {
        this.$router.push({name: '新建任务', query: node})
      })
    },
    openDetail: function(item){
      const workType = item.work_type || item.type;
      if(window.sessionStorage){
        sessionStorage.setItem('work-detail-tabs', this.subNav.length ? JSON.stringify(this.subNav) : '')
      }
      if(workType=='2'){
        this.$router.push({name: '工作详情', query: util.paramEncode(Object.assign({}, {process_step_log_id: 0}, item))})
      }else{
        this.$router.push({name: '记录详情', query: util.paramEncode(item)})
      }
      
    },
    handleCurrentChange: function(currentPage) {
      this.queryParam.p = currentPage;
      this.fetchData();
    },
    handleChange(val) {
      //左侧菜单点击一级菜单
      //console.log(val);
    },
    workClick(e) {
        //左侧菜单点击二级菜单
        //console.log(e);
        this.processSubIndex = 0
        this.listTitle = e.name;
        this.treeAct.cate_id = e.parent_id;
        this.treeAct.sub_id = e.id;
        this.subNav = [];
        if (!e.sub) {
            this.queryParam.id = e.id;
            this.queryParam.type = e.type;
        } else {
            this.subNav = e.sub;
            this.queryParam.id = e.sub[0].id;
            this.queryParam.type = e.sub[0].type;
        }
        //console.log(this.subNav);

        this.clearFilter();
        this.fetchData(true)
    },
    change_third_nav(e){
        //点击三级菜单
        //console.log(e);
        this.queryParam.id = e.id;
        this.queryParam.type = e.type;
        this.clearFilter();
        this.fetchData(true)
    },
    clearFilter(){
        this.daterange = null;
        this.queryParam.start_at = ""
        this.queryParam.end_at = ""
        this.queryParam.keywords = ""
    },
    delList(item){
        //console.log(item);
        this.$confirm('确认删除, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
        }).then(() => {
            work.workdel({id:item.id,form_category_id:item.form_category_id}).then(res => {
                this.$message({
                    type: 'success',
                    message: res.data.statusCode,
                    onClose: () => {
                        this.fetchData();
                    }
                });
            })
        })
    },
    downloadFile(item){
        //下载文件
        //console.log(item);
        window.open(index.baseURL+'/index.php/api/task/downfile?id='+item.file_id)
        /* work.downfile({id:item.file_id}).then(res => {
            this.$message({
                type: 'success',
                message: res.data.statusCode
            });
        }) */
    },
    audit(item,status){
        this.$confirm('确认操作, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
        }).then(() => {
            work.honoraudit({id:item.id,status:status}).then(res => {
                this.$message({
                    type: 'success',
                    message: res.data.statusCode,
                    onClose: () => {
                        this.fetchData();
                    }
                });
            })
        })
    },
    fetchData: function(init) {
      if (init) {
        this.queryParam.p = 1;
      }
      this.loading = true;
      this.ope = {
        look:0,
        del:0,
        edit:0,
        download:0,
        audit:0
      };
      if (this.queryParam.id == "") {
        //全部
        work.myWork(this.queryParam).then(res => {
          this.loading = false;
          this.list = res.data.data;
          this.totalRows = res.data.totalRows;
          this.search_text = '';
          // 更新总数
          this.typeFilters.forEach(e => {
            switch (e.key) {
              case 4:
                e.count = res.data.my_create;
                break;
              case 5:
                e.count = res.data.my_handle;
                break;
              default:
                e.count = res.data.sum_all;
            }
          });
        }).catch(() =>{
            this.loading = false;
        });
      } else {
        //非全部
        work.catelist(this.queryParam).then(res => {
          this.loading = false;
          let data = res.data;
          this.otherList.data = data.data;
          this.totalRows = data.totalRows;
          this.search_text = data.search_text;
          this.searchPlaceholder = data.title_text;
          this.ope = data.ope

          this.otherList.keys = [];
          if (!data.col) {
            //图片列表
            this.otherList.type = 'img'
            return;
          }else{
            //表格列表
            this.otherList.type = 'table'
          }
          for (var key in data.col) {
            let e = {
              prop: key,
              label: data.col[key]
            };
            this.otherList.keys.push(e);
          }
          //console.log(this.otherList);
          setTimeout(() => {
            fixBySelector('.imgList .img img')
          }, 1000)
        }).catch(() =>{
            this.loading = false;
        });
      }
    },
    fetchTree() {
      work.createTaskRights().then(rightRes => {
        const rights = rightRes.data.data;
        this.rights = rights;
        this.loading = true
        work.myWorkTree().then(res => {
          const all = res.data.data.filter(a => {
            return rights.indexOf(a.id)!==-1;
          })
          this.workTree = all.map(cat => {
            if(cat.sub){
              cat.sub = cat.sub.filter(sub => {
                const hasRight = rights.indexOf(sub.id)!==-1;
                if(hasRight){
                  if(Array.isArray(sub.sub)){
                    const subsub = sub.sub.filter(s => {
                      return rights.indexOf(s.id)!==-1;
                    })
                    sub.type = subsub.length ? subsub[0].type : sub.type;
                    sub.sub = subsub
                  }
                }
                return hasRight
              })
            }
            
            return cat
          });
          this.loading = false;
        });
      })
      
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
    //this.fetchCat();
    this.fetchTree();
  },
  activated: function(){
     this.fetchData();
  }
};
</script>

<style scoped>
.head_bar { padding-bottom:20px;}
.head_bar .el-form--inline .el-form-item { margin-bottom:0;}
.third_nav { border-bottom:#dce2e7 1px solid; height:54px; line-height:54px; position:relative; margin-bottom:20px;}
.third_nav li { float:left; position:relative; margin-right:10px; font-size:16px; padding:0 10px; cursor:pointer;}
.third_nav li::after { content:''; display:block; width:0; height:3px; overflow:hidden; background-color:#087ad9; position:absolute; left:50%; bottom:0; transition: all 0.3s ease;}
.third_nav li:hover,.third_nav li.active { color:#087ad9;}
.third_nav li.active { font-weight:bold; cursor:default;}
.third_nav li.active::after { width:100%; left:0;}

.imgList { border-bottom:#dce2e7 1px solid;}
.imgList.nodata { border-bottom-width:0;}
.imgList .list { border-top:#dce2e7  1px solid; padding:15px 10px;}
.imgList .list:hover { background-color:#f5f7fa;}
.imgList .img,.imgList .img img { width:160px; height:100px; overflow:hidden;}
.imgList .img { background-color:#eee; margin-right:15px; border-radius:5px;}
.imgList .intro .name { font-size:16px;}
.imgList .intro .text_show { font-size:13px;}
.options .status { display:inline-block; font-size:12px; margin-right:10px;}
.options .status.green { color:seagreen;}
.options .status.red { color:tomato;}
</style>