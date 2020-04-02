<template>
  <div class="flex-1 scrollbar" v-loading="loading">
    <!-- 群列表 -->
    <div class="subTitle">我的群组</div>
    <ul class="conacter">
      <li
        v-for="(item,index) in conversationList"
        :key="'friend'+index"
        class="el"
        :title="item.name"
        @click="$emit('group-click', {conversation_id: item.conversation_id, group_id: item.group_id})"
      >
        <div class="avat">
          <img :src="item.img_url || groupavat">
        </div>
        <span v-html="item.name"></span>
      </li>
    </ul>
    <!-- 党员列表 -->
    <div class="subTitle">党员列表</div>
    <div class="scrollbar" style="width:100%;overflow:auto;">
      <div style="width:850px" class="scrollWrap scrollbar">
        <el-tree
          ref="tree"
          :data="orgList"
          :props="defaultProps"
          default-expand-all
          @node-click="handleNodeClick"
        >
          <span class="custom-tree-node" slot-scope="{ node, data }">
            <span v-if="data.avatar" class="_avat">
              <img :src="data.avatar || holdavat" style="width:100%;height:100%;">
            </span>
            <span>{{ node.label }}</span>
          </span>
        </el-tree>
      </div>
    </div>
  </div>
</template>

<script>
import * as common from "@/api/common";
import * as im from "@/api/im";

export default {
  data() {
    return {
      loading: false,
      conversationList: [],
      orgList: [],
      holdavat: require("@/assets/img/talk-avat.png"),
      groupavat: require("@/assets/img/group-avat.png"),
      defaultProps: {
        children: "children",
        label: "name"
      }
    };
  },
  watch: {
    visible: function(visible) {
      if (visible && this.group_id) {
        this.list = [];
        this.fetchData(this.group_id);
      }
    }
  },
  methods: {
    fetchConversation: function() {
      im.request().then(res => {
        this.conversationList = res.data.data;
        this.loading = false;
      });
    },
    fetchOrgNodes: function() {
      common.org().then(res => {
        this.orgList = res.data.data;
      });
    },
    handleNodeClick: function(data, node) {
      if (data.status === "1" && node.expanded) {
        common.members(data).then(res => {
          //  过滤添加
          if (res.data.data && res.data.data.length) {
            let newNodes;
            if(data.children){
              newNodes =  res.data.data.filter(e => {
                return data.children.findIndex(c => {
                  return c.uid===e.uid
                })===-1
              })
            }else{
              newNodes = res.data.data
            }
            newNodes.forEach(e => {
              this.$refs.tree.append(e, node);
            });
          }
          
        });
      } else if (data.uid) {
        this.$emit("node-click", data);
      }
    }
  },
  created: function() {
    this.fetchConversation();
    this.fetchOrgNodes();
  }
};
</script>

<style scoped>
.subTitle {
  height: 40px;
  line-height: 40px;
  color: #999;
  padding-left: 1em;
  overflow: hidden;
}

.conacter li {
  padding: 10px;
  cursor: pointer;
}
.conacter .avat {
  display: inline-block;
  width: 3em;
  height: 3em;
  line-height: 3em;
  margin-right: 1em;
  vertical-align: middle;
  overflow: hidden;
  border-radius: 1.5em;
}
.conacter .avat img {
  width: 100%;
}

.custom-tree-node ._avat {
  display: inline-block;
  width: 26px;
  height: 26px;
  vertical-align: middle;
  overflow: hidden;
  border-radius: 13px;
  margin-right: 5px;
}
</style>
