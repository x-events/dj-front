<template>
  <div class="flex-col worklist">
    <work-channel-bar/>
    <breadcrumb/>

    <template v-if="$route.path.split('/').length>3">
      <router-view class="flex-1 mainCont scrollbar"/>
    </template>
    <template v-else >
      <div class="flex-1 mainCont widthSideBlock flex-row" v-loading="loading">
        <div class="workSideBlock scrollbar">
          <div class="_hd">
            <div class="_title">新建工作</div>
          </div>
          <!-- 常用工作 -->
          <div
            role="button"
            class="el-collapse-item__header"
            :class="{'is-active': !currentCat}"
            @click="reset()"
          >
            <i class="wti wti9"></i>
            <span class="name el">常用工作</span>
            <i class="el-collapse-item__arrow el-icon-arrow-right"
            :class="{'is-active': !currentCat}"></i>
          </div>
          
          <!-- 流程菜单 -->
          <div
            v-for="(e,i) in category" :key="i"
            class="el-collapse-item__header"
            :class="{'is-active': currentCat && (currentCat.id===e.id)}"
            @click="currentCat=e"
          >
            <i class="wti" :class="'wti'+(i+1)"></i>
            <span class="name el">{{e.name}}</span>
            <i class="el-collapse-item__arrow el-icon-arrow-right"
            :class="{'is-active': currentCat && (currentCat.id===e.id)}"></i>
          </div>
          
        </div>
        
        <div class="flex-1 _main scrollbar">
          <!-- 新建流程列表 -->
          <template v-if="currentCat">
            <el-table :data="currentCat.sub" style="width: 100%">
              <el-table-column prop="name" label="工作名称"></el-table-column>
              <el-table-column align="center" label="工作指引">
                <template slot-scope="scope">
                  <el-button @click="openGuide(scope.row)" type="text" ><i class="ion">&#xe767;</i>工作指引</el-button>
                </template>
              </el-table-column>
              <el-table-column align="center" label="操作">
                <template slot-scope="scope">
                  <el-button @click="toCreate(scope.row)" size="small">新建</el-button>
                </template>
              </el-table-column>
            </el-table>
           
          </template>
          <template v-else>
            <common-process :rights="rights" class="flex-1" @quick="toCreate($event)" />
          </template>
        </div>
      </div>
    </template>
    <!-- 工作指引弹窗 -->
    <guide :visible="guideVisible" :id="guideId" :name="guideName" @close="guideVisible=false" />
  </div>
</template>

<script>
import * as work from "@/api/work";
import workChannelBar from "@/components/work/workChannelBar";
import breadcrumb from "@/components/breadcrumb";
import commonProcess from "@/components/work/commonProcess";
import guide from "@/components/work/work_guide";

export default {
  components: {
    workChannelBar,
    breadcrumb,
    commonProcess,
    guide
  },
  data() {
    return {
      loading: false,
      guideVisible: false,
      guideId: '',
      guideName: '',
      category: [],
      currentCat: null,
      list: [],
      rights: []
    };
  },
  methods: {
    reset: function() {
      this.currentCat = null;
    },
    openGuide: function(item){
      if(window.sessionStorage){
        sessionStorage.setItem('work-detail-tabs', item.sub ? JSON.stringify(item.sub) : '')
      }
      this.guideId=item.id;
      this.guideName=item.name;
      this.guideVisible=true;
    },
    toCreate: function(node, reset) {
      if(reset){
        this.currentCat = null;
      }
      this.$router.push({name: '新建任务', query: node})
      if(window.sessionStorage){
        sessionStorage.setItem('work-detail-tabs', node.sub ? JSON.stringify(node.sub) : '')
      }
    },
    fetchCat: function() {
      this.loading = true;
      work.createTaskRights().then(rightRes => {
        const rights = rightRes.data.data;
        this.rights = rights;
        work.myWorkTree().then(res => {
          const all = res.data.data.filter(a => {
            return rights.indexOf(a.id)!==-1;
          })
          this.category = all.map(cat => {
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
            return cat
          });
          this.loading = false;
          
        });
      })
      
    }
  },
  created: function() { 
    this.fetchCat();
  }
};
</script>

<style scoped>
.showBottom .workSideBlock,
.showBottom .widthSideBlock ._main {
  padding-bottom: 70px;
}

.workSideBlock ._hd{
  position: relative;
  border-bottom:1px solid #dce2e7;
  overflow: hidden;
  margin-bottom: 10px;
}
.workSideBlock ._hd ._title{
  float: left;
  position: relative;
  padding:.5em .5em .5em 1em;
  font-weight: bold;
  font-size: 16px;
  color:#046bce;
}
.workSideBlock ._hd ._title:after{
  content:"";
  position: absolute;
  left: 0;
  bottom:0;
  width:100%;
  border-bottom: 3px solid #046bce;
}
</style>