<template>
    <div>
      <keep-alive :include="['我的工作']" >
        <router-view style="height:100%" />
      </keep-alive>

      <!-- leancloud -->
      <leancloud-im v-if="$root.user" :userID="$root.user.uid || ''" />

      <!-- 身份切换 -->
      <identity />
    </div>
</template>

<script>
import * as util from "@/assets/util";
import leancloudIM from "@/components/leancloud-im.vue";
import identity from "@/components/identity.vue";

export default {
  components: {
    "leancloud-im": leancloudIM,
    identity
  },
  data() {
    return {};
  },
  methods: {},
  created: function() {
    //接收未读消息
    util.on("im-unread", convs => {
      if (this.$route.name !== "即时通讯" && this.$route.name !== "可视窗口" && this.$route.path.indexOf('/window_committee')===-1) {
        //console.log(1)
        convs.forEach(conv => {
          if (conv.unreadMessagesCount > 0){
            window.setTimeout(() => {
              let messageTitle = conv.name;
              let ext = null;
              if(conv._attributes.attr.indexOf('person')>-1){
                messageTitle = conv._attributes.name.split('-').filter(m => {
                    return m !== this.$root.user.realname
                  })[0]
                ext = {
                  alias: messageTitle
                }
              }else if(conv._attributes.attr.indexOf('group')>-1){
                ext = {
                  group_id: conv._attributes.group_id
                }
              }
              conv.ext = ext;
              this.$notify.info(
                {
                  title: ` ${messageTitle}`,
                  message: `${conv.lastMessage.content._lctext || "非文本消息"}`,
                  dangerouslyUseHTMLString: true,
                  onClick: () => {
                    this.$router.push({
                      name: "即时通讯",
                      params: conv
                    });
                  }
                },
                0
              );
            });
          }
        })
        
      }
    });
  }
};
</script>

<style scoped>
</style>
