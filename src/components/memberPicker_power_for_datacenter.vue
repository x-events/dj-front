<template>
  <div v-loading="loading">
    <el-dialog
      class="comDialog"
      title="选择人员"
      :append-to-body="true"
      :visible="visible"
      width="1000px"
      @open="fetchData(true)"
      @close="handleClose">
      <div class="flex-row borderLayout" v-loading="loading">
        <div class="picker-side scrollbar">
          <el-tree 
            node-key="id"
            style="width:800px"
            :data="org" 
            :props="defaultProps"
            :default-expanded-keys="['1']"
            highlight-current
            :load="loadNode"
            :lazy="true"
            @node-click="handleNodeClick" class="comTreeGray"></el-tree>

        </div>
        <div class="flex-1 scrollbar">
          <!-- search -->
          <!-- <el-form :inline="true" :model="queryParam" size="small" class="memberFilter">
            <el-form-item label="已选" v-if="!radio">
              <el-button type="text">{{selection.length}}</el-button>
            </el-form-item>
            <el-form-item label="">
              <el-select v-model="queryParam.role_id" placeholder="请选择">
                <el-option label="所有角色" value=""></el-option>
                <el-option
                  v-for="item in role"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            
          </el-form> -->
          <!-- list -->
          <el-table ref="multipleTable"
              :data="list"
              height="100%"
              row-key="uid"
              style="width: 100%"
              :highlight-current-row="radio"
              @current-change="handleRadioPick"
              @selection-change="handleSelectionChange">
              <el-table-column v-if="!radio" type=selection :reserve-selection="true" width="55"></el-table-column>
              <el-table-column prop="name"
                label="姓名"
                align="center">
              </el-table-column>
              <el-table-column prop="org"
                label="所属党组织">
              </el-table-column>
              
            </el-table>
        </div>
      </div>
        <!-- page -->
        <!-- <el-pagination
          class="pagination"
          background
          layout="prev, pager, next"
          :page-size="queryParam.pageSize"
          :current-page="queryParam.p"
          :total="totalRows"
          @current-change="handleCurrentChange">
        </el-pagination> -->

      <span slot="footer" class="dialog-footer">
        <el-button icon="el-icon-circle-check-outline" type="primary" @click="submit">确 定</el-button>
        <el-button icon="el-icon-circle-close-outline" @click="handleClose">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import * as common from '@/api/common'

export default {
  props: {
    visible: {
      type: Boolean,
      required: true
    },
    currentSelection: {
      type: Array,
      required: false
    },
    radio: {
      type: Boolean,
      required: false,
      default: false
    },
    allorg: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  data() {
    return {
      loading: false,
      selection: [],
      list: null,
      //totalRows: 0,
      queryParam: {
        // p: 1,
        // pageSize: 10,
        id: '',
        role_id: ''
      },
      org: [],
      role: [],
      defaultProps: {
        children: 'children',
        label: 'name',
        isLeaf: 'no_child'
      }
    }
  },
  watch: {
    queryParam: {
      handler: function(){
        this.fetchData(true)
      },
      deep: true
    },
    allorg: function(){
      this.fetchOrg()
    }
  },
  methods: {
    handleNodeClick: function(data,node){
      this.queryParam.id = data.id;
      // if(data.status==='1'){
      //   this.queryParam.id = data.id;
      // }
    },
    handleSelectionChange: function(selection){
      this.selection = selection
    }, 
    handleRadioPick: function(selection){
      if(this.radio){
        this.selection = selection
      }
    },
    fetchOrg: function(){
      let apiCommand = this.allorg ? common.allorg : common.orglist_power;
      apiCommand().then(res => {
        this.org = res.data.data
        this.loading = false
      }).catch(() => {
        this.loading = false
      });
    },
    fetchData: function(init) {
      if(init){
        this.list = []
      }
      this.loading = true
      common.members(this.queryParam).then(res => {
        this.list = res.data.data;
        this.loading = false
        //this.totalRows = res.data.totalRows;
      }).catch(() => {
        this.loading = false
      });
    },
    handleClose: function(){
      this.$refs.multipleTable.clearSelection()
      this.$emit('close')
    },
    // 懒加载方法
    loadNode(node, resolve) {
        common.orglist_power({id: node.data.id}).then(res => {
            if(res.data.status == '200') {
                return resolve(res.data.data)
            }
        })
    },
    submit: function(){
      let result = this.selection;
      if(Array.isArray(this.currentSelection) && this.currentSelection.length){
        let filterKeys = this.currentSelection.map(e => e.uid)
        result = this.currentSelection.concat(result.filter(e => {
          return filterKeys.findIndex(k => {
            return k === e.uid
          }) === -1
        }))
      }
      this.$emit('choosen', result)
      this.handleClose()
    }
  },
  created: function(){
    if(this.$root.user){
      this.loading = true
      //this.fetchOrg()
      common.role().then(res => {
        this.role = res.data.data
        this.loading = false
      }).catch(() => {
        this.loading = false
      });
    }
  }
};
</script>

<style scoped>
.picker-side{width:350px;overflow: auto;border-right:1px solid #dfdfdf;height: 100%;padding-top: 10px;}
.borderLayout{border:1px solid #dfdfdf;height: 500px;border-radius: 4px;}
.memberFilter {padding:15px;border-bottom: 1px solid #dfdfdf}
.memberFilter .el-form-item{margin-bottom:0;}

</style>
