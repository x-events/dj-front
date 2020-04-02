<template>
  <div v-loading="loading">
    <el-dialog
      class="comDialog"
      title="选择办理组织或人员"
      :append-to-body="true"
      :visible="visible"
      width="1000px"
      @open="handleOpen"
      @close="handleClose">
      <div class="flex-row borderLayout" v-loading="loading">
        <div class="picker-side scrollbar">
          <div style="padding:1em;">
            已选党组织：<span style="color:#046BCE">{{selectOrg && selectOrg.organization_name}}</span>
          </div>
          <el-tabs v-model="orgMode" stretch>
            <el-tab-pane label="直系组织" name="1">
              <el-tree ref="myOrg"
                node-key="id"
                style="width:800px"
                :data="myOrgTree" 
                :props="defaultProps"
                :current-node-key="selectOrg.organization_id || ''"
                :default-expanded-keys="[selectOrg.organization_id]"
                auto-expand-parent
                highlight-current
                @current-change="handleOrgChange" class="comTreeGray">
              </el-tree>
            </el-tab-pane>
            <el-tab-pane label="全部组织" name="2">
              <el-tree ref="fullOrg"
                node-key="id"
                style="width:800px"
                :data="orgFull" 
                :props="defaultProps"
                :default-expanded-keys="[1]"
                highlight-current
                :load="fetchFullOrg"
                :lazy="true"
                @current-change="handleOrgChange" class="comTreeGray">
              </el-tree>
            </el-tab-pane>
          </el-tabs>
          
        </div>
        <div class="flex-1 scrollbar">
          <div style="padding:1em;">
            指定办理人
            <el-switch
              v-model="assignLeaderData"
              >
            </el-switch>
            <span style="font-size:12px">（提示：指定办理人只有指定人员可以办理，不指定则所有管理员都可以办理）</span>
          </div>
          <!-- list -->
          <el-table ref="multipleTable"
              :data="list"
              row-key="uid"
              style="width: 100%"
              @row-click="handleListClick"
              @selection-change="handleSelectionChange">
              <el-table-column type=selection width="55" v-if="assignLeaderData"></el-table-column>
              <el-table-column prop="name"
                label="姓名"
                align="center">
              </el-table-column>
              <el-table-column prop="duty_name"
                label="职务">
              </el-table-column>
              
            </el-table>
        </div>
      </div>
        
      <span slot="footer" class="dialog-footer">
        <el-button icon="el-icon-circle-check-outline" type="primary" @click="submit">确 定</el-button>
        <el-button icon="el-icon-circle-close-outline" @click="handleClose">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import * as util from "@/assets/util"
import * as common from '@/api/common'
import * as work from '@/api/work'

export default {
  props: {
    visible: {
      type: Boolean,
      required: true
    },
    assignLeader: {
      type: Boolean,
      required: false,
      default: true
    },
    currentOrg: {
      type: Object,
      required: true,
      default: function(){
        return {}
      }
    }
  },
  data() {
    return {
      loading: false,
      orgMode: 0,
      selection: [],
      selectOrg: {},
      assignLeaderData: true,
      list: [],
      queryParam: {
        id: '',
        role_id: ''
      },
      myOrg: [],
      orgFull: [],
      defaultProps: {
        children: 'children',
        label: 'name',
        isLeaf: 'no_child'
      }
    }
  },
  computed: {
    myOrgTree: function(){
      return util.buildMenu(this.myOrg)
    }
  },
  watch: {
    assignLeader: {
      handler: function(assignLeader){
        this.assignLeaderData = assignLeader
      },
      immediate: true
    },
    assignLeaderData: function(assignLeaderData){
      if(!assignLeaderData && this.$refs.multipleTable){
        this.$refs.multipleTable.clearSelection()
      }
    },
    currentOrg: {
      handler: function(currentOrg){
        if(currentOrg.organization_id){
          this.selectOrg = Object.assign({}, currentOrg)
        }else{
          const user = this.$root.user;
          this.selectOrg = {
            organization_id: user.org_id,
            organization_name: user.organization_name
          }
        }
      },
      immediate: true,
      deep: true
    },
    queryParam: {
      handler: function(){
        this.fetchData(true)
      },
      deep: true
    },
    orgMode: function(orgMode){
      
      switch(parseInt(orgMode)){
        case 1:
          if(this.$refs.myOrg){
            if(this.$refs.myOrg.getCurrentKey()){
              this.$refs.myOrg.setCurrentKey(null)
            }
            
          }
          
          break;
        case 2:
          if(this.$refs.fullOrg){
            if(this.$refs.fullOrg.getCurrentKey()){
              this.$refs.fullOrg.setCurrentKey(null)
            }
            
          }
          break;
        default:
          console.warn(orgMode)
      }
    },
    selectOrg: {
      handler: function(selectOrg){
        this.selection = [];
        this.queryParam.id = selectOrg.organization_id;
      
      },
      deep: true
    }
  },
  methods: {
    handleListClick: function(row){
      if(this.assignLeaderData && row && row.uid){
        this.$refs.multipleTable.toggleRowSelection(row)
      }
    },
    handleOrgChange: function(data,node){
      this.selectOrg = {
        organization_id: data.id,
        organization_name: data.name
      }
      
    },
    handleSelectionChange: function(selection){
      this.selection = selection
    }, 
    fetchData: function(init) {
      if(init){
        this.list = []
      }
      this.loading = true
      common.members(this.queryParam).then(res => {
        const result = res.data.data.filter(e => e.type!=='1')
        this.list = result;
        this.loading = false
      }).catch(() => {
        this.loading = false
      });
    },
    handleOpen: function(){
      this.orgMode = "1";
      this.fetchMyOrg()
      
    },
    handleClose: function(){
      this.$refs.multipleTable.clearSelection()
      this.$emit('close')
    },
    fetchMyOrg: function(){
      this.loading = true
      
      work.partyMemberShipList().then(res => {
        this.myOrg = res.data.data
        this.loading = false
        this.$nextTick(() => {
          //初始化加载党员数据
          this.queryParam.id = this.selectOrg.organization_id;
        })
      }).catch(() => {
        this.loading = false
      });
    },
    // 懒加载方法
    fetchFullOrg(node, resolve) {
        common.orglist({id: node.data.id}).then(res => {
            if(res.data.status == '200') {
                return resolve(res.data.data)
            }
        })
    },
    submit: function(){
      if(this.assignLeaderData && !this.selection.length){
        return this.$message({
          message: '请选择办理人！',
          type: 'warning'
        });
      }
      this.$emit('choosen', {
        org: this.selectOrg,
        leader: this.selection,
        assignLeader: this.assignLeaderData
      })
      this.handleClose()
    }
  },
  created: function(){
    
  }
};
</script>

<style scoped>
.picker-side{width:350px;overflow: auto;border-right:1px solid #dfdfdf;height: 100%; box-sizing:border-box;}

.borderLayout{border:1px solid #dfdfdf;height: 500px;border-radius: 4px;}
.memberFilter {padding:15px;border-bottom: 1px solid #dfdfdf}
.memberFilter .el-form-item{margin-bottom:0;}

</style>
