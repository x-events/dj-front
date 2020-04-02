<template>
  <div class="flex-col workBox ">
    <div class="channelBar" @click="$router.push({name: '即时通讯'})">
      <div class="_title">
        <i class="ion">&#xe627;</i>
        <strong>未读消息</strong>
      </div>
      <div class="moreLink">
      </div>
    </div>
    <div class="flex-1 scrollbar">
      <template v-if="conversationList.length">
        <ul class="baseList IMList">
          <li
            v-for="(item,index) in groupList"
            :key="'org'+index"
            class="flex-row unread"
            @click="$router.push({name: '即时通讯',params: item})"
          >
            <div class="_avat">
              <img :src="item.img_url || getAvat(item)">
            </div>
            <div class="flex-1 _main">
              <div class="flex-row">
                <div class="flex-1 _title el">{{item.name}}</div>
                <div class="_pub">{{item._lastMessageAt | formatDate}}</div>
              </div>
              <div class="_cont">
                <div class="el">{{item.lastMessage._lctext}}</div>
              </div>
            </div>
          </li>
          <li
            v-for="(item,index) in list"
            :key="'peo'+index"
            class="flex-row unread"
            @click="$router.push({name: '即时通讯',params: item})"
          >
            <div class="_avat">
              <img :src="item.avatar || holdavat">
            </div>
            <div class="flex-1 _main">
              <div class="flex-row">
                <div class="flex-1 _title el">{{item.alise || item.name}}</div>
                <div class="_pub">{{item._lastMessageAt | formatDate}}</div>
              </div>
              <div class="_cont">
                <div class="el">{{item.lastMessage._lctext}}</div>
              </div>
            </div>
          </li>
        </ul>
      </template>
      <template v-else>
        <div class="no_holder"></div>
      </template>
    </div>
  </div>
</template>

<script>
import * as util from "@/assets/util";
import * as common from "@/api/common";

export default {
  data() {
    return {
      conversationList: [],
      holdavat: require("@/assets/img/talk-avat.png"),
      groupavat: require("@/assets/img/group-avat.png")
    };
  },
  computed: {
    list: function() {
      let result = this.conversationList.filter(e => {
        return e._attributes.attr.indexOf('person')>-1
      });
      if (!result.length) {
        return result;
      }
      return result.map(e => {
        e.uid = e.members.filter(m => {
          return m !== this.$root.user.uid;
        })[0];
        e.name = e._attributes.name.split("-").filter(m => {
          return m !== this.$root.user.realname;
        })[0];
        e.avatar = "";
        common.memberinfo({ id: e.uid }).then(res => {
          e.avatar = res.data.data.avatar;
          this.$forceUpdate();
        });
        return e;
      });
    },
    groupList: function() {
      let result = this.conversationList.filter(e => {
        return e._attributes.attr.indexOf('group')>-1
      });
      if (!result.length) {
        return result;
      }
      
      return result.map(e => {
        //e.img_url = await
        return e;
      });
    }
  },
  methods: {
    getAvat: function(conv){
      if(conv._attributes.attr.indexOf('group')>-1){
        return this.groupavat
      }else{
        return this.holdavat
      }
    },
    fetchData: function(conv) {
      let newConv = conv.filter(c => {
        return (
          this.conversationList.findIndex(e => {
            return e.id === c.id;
          }) === -1
        );
      });
      this.conversationList = this.conversationList.concat(newConv);
    }
  },
  created: function() {
    this.conversationList = this.$root.unreadConversations;
    util.on("im-unread", this.fetchData);
  }
};
</script>

<style scoped>
.no_holder {
  height: 100%;
  background: url(../../assets/img/im_holder.png) center no-repeat;
}
</style>
