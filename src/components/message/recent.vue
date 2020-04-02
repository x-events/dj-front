<template>
  
      <div class="flex-1 scrollbar" v-loading="loading">
        <!-- 群列表 -->
        <div class="subTitle">群组消息</div>
        <ul class="conacter">
          <li v-for="(item,index) in groupList" :key="'friend'+index"
          class="el"
          :title="item.name"
          @click="$emit('group-click', {conversation_id: item.id, group_id: item._attributes.group_id})">
            <div class="avat">
              <img :src="item.img_url || groupavat" />
            </div>
            {{item.name}}
          </li>
        </ul>
        <!-- 党员列表 -->
        <div class="subTitle">党员消息</div>
        <div class="scrollWrap scrollbar">
          <ul class="baseList">
            <li v-for="(item,index) in list" :key="'org'+index" 
              class="flex-row align-center"
              @click="$emit('node-click', item)">
              <div class="_avat">
                <img :src="item.avatar || holdavat" />
              </div>
              <div class="flex-1 _main">
                <div class="flex-row">
                  <div class="flex-1 _title el" v-html="item.name">
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
</template>

<script>
import * as common from "@/api/common"

export default {
  props: {
    clientuser: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      loading: false,
      conversationList: [],
      holdavat: require("@/assets/img/talk-avat.png"),
      groupavat: require("@/assets/img/group-avat.png"),
    }
  },
  computed: {
    list: function(){
      let result = this.conversationList.filter(e => {
        return e._attributes.attr.indexOf('person')>-1
      });
      return result.map(e => {
        e.uid = e.members.filter(m => {
          return m !== this.$root.user.uid
        })[0];
        e.name = e._attributes.name.split('-').filter(m => {
          return m !== this.$root.user.realname
        })[0];
        e.avatar = ''
        common.memberinfo({id: e.uid}).then(res => {
          e.avatar = res.data.data.avatar;
          this.$forceUpdate()
        })
        return e;
      })
    },
    groupList: function(){
      let result = this.conversationList.filter(e => {
        return e._attributes.attr.indexOf('group')>-1
      })
      return result.map(e => {
        //e.img_url = await
        return e
      })
    }
  },
  methods: {
    fetchConversation: function() {
      if(this.clientuser){
        this.loading = true
        this.clientuser.getQuery().containsMembers([this.clientuser.id]).find().then(conversations => {
          this.loading = false
          this.conversationList = conversations
        }).catch(console.error.bind(console));
      }
    }
  },
  created: function(){
    this.fetchConversation()
  }
}
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

</style>
