<template>
  <el-dialog
    class="comDialog"
    title="选择组织"
    :append-to-body="true"
    :visible="visible"
    width="800px"
    @open="fetchData(true)"
    @close="handleClose">
    <div v-loading="loading">
      <el-tree 
        node-key="value"
        :data="org" 
        :props="defaultProps"
        :show-checkbox="!radio"
        check-on-click-node
        check-strictly
        :default-expanded-keys="['1']"
        @check="handleNodeCheck"
        @node-click="handleNodeClick"></el-tree>
    </div>
      
    <span slot="footer" class="dialog-footer">
      <el-button @click="handleClose">取 消</el-button>
      <el-button type="primary" @click="submit">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import * as work from '@/api/work'

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
      default: true
    },
    // 2019-5-20 lxr
    ableOpt: {
        type: [String, Number],
        default: ''
    },
    ableIds: {
        type: Array,
        default:() => {
            return []
        }
    },
    disableIds: {
        type: Array,
        default:() => {
            return []
        }
    },
    disableTip: {
        type: String,
        default: '无法转入该组织!'
    },
    except: {
      type: String,
      required: false,
      default: ''
    },
    issub: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  data() {
    return {
      loading: false,
      selection: null,
      org: [],
      defaultProps: {
        children: 'children',
        label: 'text'
      }
    }
  },
  computed: {
    command: function(){
      return work.team
    }
  },
  methods: {
    handleNodeClick: function(data,node){
      if(this.radio){
        if( this.disableIds.indexOf(data.value) !== -1){
          //黑名单
          this.selection = null
          this.$message({ message: this.disableTip, type: 'warning',  duration: 800 });
        }else if((this.ableOpt !== '' && (data.status != this.ableOpt)) || (this.ableIds.length && (this.ableIds.indexOf(data.id) != -1))) {
          //白名单
          this.selection = null
          this.$message({ message: this.disableTip, type: 'warning',  duration: 800 });
        }else {
          this.selection = data
        }
      }
    },
    handleNodeCheck: function(node, list){
      if(!this.radio){
        this.selection = list.checkedNodes
      }
    },
    handleClose: function(){
      this.$emit('close')
    },
    submit: function(){
      let result = this.selection || (this.radio ? {} : [])
      if(Array.isArray(result)){
        result = result.map(e => {
          return {
            id: e.value,
            name: e.text
          }
        })
      }
      this.$emit('choosen', result)
      this.handleClose()
    },
    fetchData: function(init){
      if(init){
        this.selection = null
      }
      this.loading = true
      // 懒加载模式
      this.command().then(res => {
        this.org = res.data.data
        this.loading = false
      })
      
    }
  },
  created: function(){
    if(this.$root.user){
      this.fetchData()
    }
    
  }
};
</script>

<style>

</style>
