<template>

</template>


<script>
import * as util from "@/assets/util.js";
let AV = require("leancloud-storage");
let { Realtime, Event } = require("leancloud-realtime");
let { TypedMessagesPlugin } = require("leancloud-realtime-plugin-typed-messages");
// 应用配置
let APP_CONFIG = {
  appId: "rgOcHqIReXnDbXTQhpapoLcd-gzGzoHsz",
  appKey: "ytfbFB1uma4RuvJ8CTyitSVw"
};

export default {
  props: {
    userID: {
      type: String,
      required: true
    }
  },
  computed: {
    CONFIG: function(){
      return Object.assign(APP_CONFIG, {
        userID: this.userID
      })
    }
  },
  methods: {
    initClient: function() {
      AV.init(this.CONFIG)
      let realtime = new Realtime(
        Object.assign(
          {
            plugins: [TypedMessagesPlugin]
          },
          this.CONFIG
        )
      );
      realtime.createIMClient(this.CONFIG.userID).then(client => {
        this.$root.clientUser = client;
        console.log("IM客户端初始化成功");
        util.emit('im-ready')
        // 收到消息
        client.on(Event.MESSAGE, (message, conversation) => {
          util.emit('im-message', {
            message,
            conversation
          })
          
        })
        // 未读消息
        client.on(Event.UNREAD_MESSAGES_COUNT_UPDATE, conversations => {
          this.$root.unreadConversations = conversations;
          util.emit('im-unread', conversations)
        });
      }).catch(err => {
        console.warn(err.message);
        // this.$message({
        //   message: "IM初始化失败",
        //   type: 'error'
        // });
      });
    }
  },
  created: function() {
    this.initClient();
  }
};
</script>
