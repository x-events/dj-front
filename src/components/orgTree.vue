<template>
  <div v-loading="loading">
    <el-tree 
      :data="org" 
      :props="defaultProps"
      :default-expand-all="true"
      @node-click="handleNodeClick" class="comTreeGray"></el-tree>
  </div>
</template>

<script>
import * as common from '@/api/common'

export default {
  props: {
    roleTree: {
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
        label: 'name'
      }
    }
  },
  methods: {
    handleNodeClick: function(data,node){
      this.selection = data;
      this.$emit('select', data, node)
    },
    fetchData: function(init){
      if(init){
        this.selection = null
      }
      this.loading = true;
      const requestApi = this.roleTree ? common.getRoleTree : common.org;

      requestApi().then(res => {
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

<style scoped>

</style>
