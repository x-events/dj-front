<template>
  <section class="content schedule" v-loading="loading">
    <ul class="todoList">
      <li v-for="(item,index) in list" :key="'item'+index" class="flex-row">
        <div class="_type _cell flex-row align-center">
          <div class="_ion" :class="item.type == '1' ? 'type1':'type2'"></div>
        </div>
        <div class="flex-1 _cell box-cell" :title="item.name">
          <span class="block-span ">
                {{item.name}}
                <span
                    class="time"
                    v-if="item.type == '1'"
                >({{item.start_time | formatDate('yyyy-MM-dd hh:mm')}})</span>
          </span>
        </div>
        <div class="flex-1 withIcon _cell">
          <div class="w-content" v-if="item.process_step_name != ''">
                <div class="_ion" :class="item.type == '1' ? 'step1':'step2'"></div>
                <div class="_label el">{{item.type_name}}</div>
                <div class="el" :title="item.process_step_name">
                    <template v-if="item.type != '1' && (item.transmit_type!=4)">
                    第{{numToZh(item.step)}}步：
                    </template>
                    {{item.process_step_name}}
                    <span
                    class="time"
                    v-if="item.type != '1'"
                    >({{item.start_time | formatDate('yyyy-MM-dd hh:mm')}})</span>
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
    <template v-if="!list.length">
        <nodata mode="pic" />
    </template>
  </section>
</template>

<script>
import * as util from "@/assets/util";
import * as work from "../../api/work.js";

export default {
  data() {
    return {
      loading: false,
      list: []
    };
  },
  methods: {
    numToZh: util.numToZh,
    doTask: function(task){
      if(task.type==1){
        sessionStorage.setItem('work-detail-tabs', '')
        //新建
        this.$router.push({name: '新建任务', query: {name: task.name, type: task.form_category_type,id: task.id}})
      }else{
        //流程详情
        this.$router.push({name: '工作详情', query: util.paramEncode({category_name: task.category_name, id: task.process_log_id, form_category_id: task.id})})
      }
    },
    getList() {
      this.loading = true;
      work
        .scheduleList({
          p:1,
          pagesize:8
        })
        .then(res => {
          this.loading = false;
          this.list = res.data.data;
        });
    }
  },
  created() {
    this.getList();
  }
};
</script>

<style scoped>
.todoList {
  padding-top: 5px;
}
.todoList li {
  border: 1px solid #dee3e8;
  border-radius: 6px;
  margin-bottom: 12px;
}
.todoList ._cell {
  padding: 10px 15px;
  line-height: 18px;
  height: 36px;
  overflow: hidden;
}
.todoList ._type {
  border-right: 1px solid #dee3e8;
}
.todoList ._ion {
  width: 26px;
  height: 26px;
  background-repeat: no-repeat;
  background-position: center center;
}
.todoList ._label {
  display: block;
  color: #999;
}
.todoList .col_middle {
  width: 200px;
}
.todoList .withIcon {
  padding-left: 35px;
  position: relative;
}
.todoList .withIcon ._ion {
  position: absolute;
  left: 0;
  top: 50%;
  margin-top: -13px;
}
.todoList .type1 {
  background-image: url(../../assets/img/work/list-type1.png);
}
.todoList .type2 {
  background-image: url(../../assets/img/work/list-type2.png);
}
.todoList .step1 {
  background-image: url(../../assets/img/work/list-step1.png);
}
.todoList .step2 {
  background-image: url(../../assets/img/work/list-step2.png);
}
.todoList .status1 {
  background-image: url(../../assets/img/work/list-status1.png);
}
.todoList .status2 {
  background-image: url(../../assets/img/work/list-status2.png);
}
.todoList .status3 {
  background-image: url(../../assets/img/work/list-status3.png);
}
.time {
  display: inline-block;
  white-space: nowrap;
}
.box-cell {  box-sizing: border-box;   line-height: 33px!important; height: 56px!important; }
.block-span { display: inline-block; max-height:38px; line-height:18px; overflow:hidden; vertical-align:middle; }
</style>

