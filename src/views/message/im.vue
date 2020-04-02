<template>
<div class="mainCont flex-col">
    <channel-bar />
  <div class="flex-1 flex-row block_wrap" v-loading="loading">
    <div class="im-side flex-col">
      <div class="hd flex-row">
        <div class="flex-1" :class="{'active':sideShowEle == 'contacts'}" @click="sideShowEle='contacts'">通讯录</div>
        <div class="flex-1" :class="{'active':sideShowEle == 'recent'}" @click="sideShowEle='recent'">最近联系人</div>
      </div>
      <!-- 联系人 -->
      <contacts v-if="clientUser && sideShowEle==='contacts'" key="contacts"
        @toggle="sideShowEle='recent'"
        @node-click="createpersonconversation"
        @group-click="handleGroupClick" />
      <!-- 最近联系人 -->
      <recent v-if="clientUser && sideShowEle==='recent'" key="recent"
        :clientuser="clientUser"
        @toggle="sideShowEle='contacts'"
        @node-click="createpersonconversation"
        @group-click="handleGroupClick" />
    </div>
    <div class="flex-1 flex-col im-view">
      <template v-if="!currentConversationID || currentConversationID==0">
        <!-- 占位内容 -->
        <div class="flex-1 _holder"></div>
      </template>
      <template v-else>
      <!-- 聊天窗口 -->
      <el-tabs class="flex-1 im-tabs flex-col"
        v-model="currentConversationID" 
        type="card"
        :closable="true" 
        @edit="editTabsHandle">
        <el-tab-pane v-for="(currentConversation, id) in conversationManager"
          :key="'con'+id"
          class="dialogue scrollbar"
          :label="currentConversation.instance.alias || currentConversation.instance.name"
          :name="id">
          <!-- 聊天记录 -->
          <div style="text-align:center">
            <el-button type="text" @click="currentConversation.loadMore">加载历史消息</el-button>
          </div>
          <div v-for="(item,index) in dialogueManager[id]" :key="'dia'+index"
            class="dialogue-item"
            :class="isFromSelf(item)">
            <div class="avat">{{userDisplayName(item).slice(0,1)}}</div>
            <div class="_name"><span class="n el" :title="userDisplayName(item)">{{userDisplayName(item)}}</span> <span class="time">{{item.timestamp | formatDate}}</span></div>
            <div class="msgwrap">
            <template v-if="item.type===TextMessage.TYPE">
              <div class="msgpop _text">{{item.getText()}}</div>
            </template>
            <template v-else-if="item.type===ImageMessage.TYPE">
              <div class="msgpop _img">
                <img 
                  crossOrigin="Anonymous"
                  :src="item.getFile().url()" 
                  :id="'img'+item.getFile().id" 
                  v-on:load="getImgStyle($event, item.getFile())" >
              </div>
            </template>
            <template v-else>
              未知格式消息
            </template>
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
      <!-- 输入组件 -->
      <div class="inputComponent">
        <el-upload class="upload-ele" ref="upload-img" action="/" accept="image/*" :auto-upload="true" :show-file-list="false" :disabled="!currentConversationID || currentConversationID==0" :before-upload="getImg">
          <i class="el-icon-picture"></i>图片
        </el-upload>
        <div class="flex-row">
            <el-input type="textarea" :rows="4" v-model="currentInput" class="inputTextarea flex-1" resize="none" :disabled="!currentConversationID || currentConversationID==0"></el-input>
        
            <div class="flex-row align-center">
                <el-button type="primary" :disabled="!currentInput" @click="sendMsg('text', currentInput)">发 送</el-button>
            </div>
        </div>
      </div>
      <!-- 群组成员按钮 -->
      <div v-if="isGroup" 
        class="group_contacter"
        @click="groupMembersVisible=true">
        <i class="ion">&#xe673;</i>
      </div>
      
      </template>
    </div>

  </div>

  <!-- 群组成员浮窗组件 -->
  <group-members :visible="groupMembersVisible" 
    :group_id="currentConversationID && conversationManager[currentConversationID].instance.group_id" 
    @close="groupMembersVisible=false" 
    @select="createpersonconversation" />
</div>
</template>

<script>
import * as util from "@/assets/util.js";
import * as im from "@/api/im";

import channelBar from "@/components/channelBar";

let EXIF = require("exif-js")

let AV = require("leancloud-storage");
let { TextMessage } = require("leancloud-realtime");
let {
  ImageMessage,
  AudioMessage,
  VideoMessage,
  FileMessage,
  LocationMessage
} = require("leancloud-realtime-plugin-typed-messages");

export default {
  components: {
    "channel-bar": channelBar,
    "group-members": (resolve) => require(['@/components/message/groupMembers'], resolve),
    "contacts": (resolve) => require(['@/components/message/contacts'], resolve),
    "recent": (resolve) => require(['@/components/message/recent'], resolve)
  },
  mixins: [
    {
      data: function() {
        return {
          TextMessage,
          ImageMessage,
          AudioMessage,
          VideoMessage,
          FileMessage,
          LocationMessage
        };
      }
    }
  ],
  data() {
    return {
      sideShowEle: 'recent',
      groupMembersVisible: false,
      loading: false,
      clientUser: null,
      currentInput: null,
      currentConversationID: null,
      conversationManager: {},
      messageIteratorManager: {},
      dialogueManager: {}
      
    };
  },
  // watch: {
  //   currentConversationID: function(currentConversationID) {
  //     console.log(this.conversationManager[currentConversationID].instance)
  //   }
  // },
  computed: {
    isGroup: function(){
      if(this.currentConversationID && this.conversationManager[this.currentConversationID]){
        return this.conversationManager[this.currentConversationID].instance._attributes.attr.match(/"type":"([^"]+)"/)[1]==='group'
      }else{
        return false
      }
      
    }
  },
  methods: {
    getImgStyle: function(evt, imgObj){
      this.$nextTick(() => {
        let img = document.getElementById('img'+imgObj.id);
        if(img){
          //console.log(img.dataset.base64)
          if(img.dataset.base64){
            return null
          }
          
          EXIF.getData(img, function() {
            let orientation = EXIF.getTag(this, "Orientation");
            console.log("Orientation " + orientation)
            if(orientation==6){
              if (typeof history.pushState == "function") {
                const canvas = document.createElement('canvas'),
                ctx = canvas.getContext('2d');
                canvas.width = img.height;
                canvas.height = img.width;
                ctx.translate(canvas.width / 2, canvas.height / 2);
                ctx.rotate(Math.PI / 180 * 90);
                ctx.drawImage(img, -img.width / 2, -img.height / 2, img.width, img.height);

                img.dataset.base64 = true
                img.src = canvas.toDataURL('image/png');
              }else{
                console.log('浏览器不支持修复IOS拍照翻转')
              }
            }
          });
        }else{
          //console.log(imgId+'不存在')
        }
      })
      
    },
    handleGroupClick: function(params){
      this.groupMembersVisible = false;
      this.findConversation(params.conversation_id, {group_id: params.group_id})
    },
    userDisplayName: function(item) {
      return (
        (item.getAttributes() && item.getAttributes().realname) || item.from
      );
    },
    editTabsHandle: function(targetName, action) {
      if (action === "remove") {
        this.closeConversation(targetName);
      }
    },
    isFromSelf: function(item) {
      return {
        fromself: item.from == this.$root.user.uid
      };
    },
    getImg: function(file) {
      let avfile = new AV.File(file.name, file);
      avfile.save().then(avfile => {
        //console.log("文件已保存，即将发送", avfile)
        return this.sendMsg("image", avfile);
      });
      return false;
    },
    closeAll: function() {
      this.currentConversationID = null;
      //循环关闭
      for (let x in this.conversationManager) {
        this.closeConversation(x);
      }
    },
    closeConversation: function(id) {
      //console.log('del:'+id)
      this.$delete(this.conversationManager, id);
      this.$delete(this.messageIteratorManager, id);
      this.$delete(this.dialogueManager, id);
      if (this.currentConversationID === id) {
        this.currentConversationID = Object.keys(this.conversationManager)[0];
      }
    },
    initClient: function() {
      if (!this.clientUser && this.$root.clientUser) {
        this.clientUser = this.$root.clientUser;
        // 处理新消息
        util.on("im-message", payload => {
          let { conversation, message } = payload;
          if (this.conversationManager[conversation.id]) {
            this.pushLocalhMsg(conversation.id, message);
            conversation.read();
          } else {
            // 消息触发新会话
            //console.log('收到新消息: ', message, conversation);
            this.enterConversation(conversation);
          }
        });
        // 进入指定会话
        if (this.$route.params.id) {
          //TODO
          this.findConversation(this.$route.params.id, this.$route.params.ext);
        }
      }
    },
    enterConversation: function(conversation) {
      let vm = this;
      // 已存在会话
      if (vm.dialogueManager[conversation.id]) {
        return (vm.currentConversationID = conversation.id);
      }
      let loadMore = function() {
        if (vm.messageIteratorManager[conversation.id] === false) {
          return vm.$message("没有更多");
        }
        if (!vm.messageIteratorManager[conversation.id]) {
          vm.messageIteratorManager[
            conversation.id
          ] = conversation.createMessagesIterator({ limit: 10 });
        }
        vm.messageIteratorManager[conversation.id].next().then(result => {
          if (!vm.dialogueManager[conversation.id]) {
            vm.dialogueManager[conversation.id] = [];
          }
          vm.$set(
            vm.dialogueManager,
            conversation.id,
            result.value.concat(vm.dialogueManager[conversation.id])
          );
          vm.$nextTick(vm.$forceUpdate);
          if (result.done) {
            vm.messageIteratorManager[conversation.id] = false;
          }
        });
      };
      vm.$set(vm.conversationManager, conversation.id, {
        instance: conversation,
        loadMore
      });
      //初始加载信息
      loadMore();
      this.currentConversationID = conversation.id;
      // 会话置底
      this.setDialogPosition(conversation.id);
      //标记已读
      this.readConversation(conversation)
    },
    readConversation: function(conversation){
      conversation.read();
      this.$root.unreadConversations = this.$root.unreadConversations.filter(e => {
        return e.id!==conversation.id
      })
    },
    findConversation: function(CONVERSATION_ID, ext) {
      /*
      * 查找群聊
      */
      this.clientUser.getConversation(CONVERSATION_ID).then(conversation => {
        if (conversation) {
          //添加扩展参数
          if(ext){
            Object.assign(conversation, ext)
          }
          
          this.enterConversation(conversation);
        } else {
          this.$message("会话异常：" + CONVERSATION_ID);
        }
      }).catch(console.error.bind(console));
    },
    createConversation: function(name, members) {
      /*
      * 创建群聊
      */
      this.clientUser
        .createConversation({
          members: members,
          name: name || "群聊" + parseInt(Math.random() * 1e5),
          unique: true
        })
        .then(conversation => {
          this.enterConversation(conversation);
        });
    },
    setDialogPosition: function(id) {
      setTimeout(() => {
        var dilogBoxDom = document.getElementById("pane-" + id);
        if (dilogBoxDom) {
          dilogBoxDom.scrollTop = 99999;
        } else {
          console.warn("找不到dom:" + "pane-" + id);
        }
      }, 250);
    },
    pushLocalhMsg: function(key, data) {
      let target = this.dialogueManager;
      let newData = target[key].concat(data);
      this.$set(target, key, newData);
      this.$nextTick(() => {
        this.$forceUpdate();
        this.setDialogPosition(key);
      });
    },
    sendMsg: function(type, msg) {
      let conversation = this.conversationManager[this.currentConversationID]
        .instance;
      let message;
      //自定义信息
      let customAttr = {
        realname: this.$root.user.realname
      };

      this.currentInput = "";
      switch (type) {
        case "text":
          message = new TextMessage(msg);
          message.setAttributes(customAttr);

          conversation.send(message).then(message => {
            this.pushLocalhMsg(conversation.id, message);
          });
          break;
        case "image":
          message = new ImageMessage(msg);
          message.setAttributes(customAttr);

          conversation.send(message).then(message => {
            this.pushLocalhMsg(conversation.id, message);
          });
          break;
        case "audio":
          message = new AudioMessage(msg);
          break;
        case "video":
          message = new VideoMessage(msg);
          break;
        case "file":
          message = new FileMessage(msg);
          break;
        default:
          message = new TextMessage("未知格式文件");
      }
    },
    createpersonconversation: function(data) {
      if (data.uid && data.uid !== this.$root.user.uid) {
        im.createpersonconversation({
          user_id: data.uid
        }).then(res => {
          if (res.data.data.conversation_id) {
            this.findConversation(res.data.data.conversation_id, {
              alias: data.name
            });
          }
        });
      }
    }
  },
  created: function() {
    this.initClient();
    util.on("im-ready", this.initClient);
  }
};
</script>

<style scoped>
.im-side {
  background: #ffffff;
  width: 300px;
  overflow: hidden;
  border-right:#dce2e7 1px solid;
}
.im-side .hd {
  position: relative;
  cursor: pointer;
  border-bottom:#dce2e7 1px solid;
  text-align:center;
}
.im-side .hd div { height:48px; line-height:48px; font-size:14px; position:relative;}
.im-side .hd div::after { content:''; display:block; width:0px; height:3px; background-color:#087ad9; overflow:hidden; position:absolute; left:50%; bottom:-1px; transition: all 0.3s ease;}
.im-side .hd div.active { font-size:16px; color:#087ad9;}
.im-side .hd div.active::after { left:0; width:100%;}
.im-side .title {
  background: #e4eaf2;
  font-weight: 700;
  color: #000;
  padding: 10px;
}
.im-side .hd .ion {
  position: absolute;
  top: 5px;
  right: 10px;
  color: #afb3b8;
  font-size: 1.5em;
}

/* .scrollWrap{width:100%;overflow: auto;}
.scrollWrap .el-tree{width:300px;} */

.im-view {
  position: relative;
  background: #fff;
  padding: 0 20px;
  box-sizing: border-box;
  overflow: hidden;
}

 .im-view ._holder{background: url(../../assets/img/im_holder.png) center no-repeat;}
.group_contacter{position: absolute;right:20px;top:10px;font-size:1.5em;color:#ccc;cursor: pointer;}
.group_contacter:hover{color:#277dfe;}

.dialogue {
  overflow-x: hidden;
  overflow-y: scroll;
  box-sizing: border-box;
}
.dialogue-item {
  position: relative;
  padding-left: 50px;
  margin-bottom: 10px;
}
/* .dialogue-item ._date{position: absolute;left:0;right:0; text-align: center;}
.dialogue-item ._date span{display: inline-block;background: #031730;color:#4798d2;padding:0 6px;border-radius: 4px;} */
.dialogue .avat {
  position: absolute;
  width: 34px;
  height: 34px;
  line-height: 34px;
  text-align: center;
  color: #fff;
  background: #277dfe;
  font-size: 28px;
  vertical-align: middle;
  overflow: hidden;
  border-radius: 17px;
  margin-right: 12px;
  left: 0;
}
.dialogue ._name {
  padding: 0.5em 0;
}

.dialogue-item.fromself {
  padding-left: 0;
  padding-right: 50px;
}
.dialogue-item.fromself .avat {
  left: auto;
  right: 0;
}
.fromself .msgwrap,
.fromself ._name {
  text-align: right;
}

.upload-ele {
  display: inline-block;
  cursor: pointer;
  color:#999!important;
  margin-bottom:8px;
  cursor:pointer;
}
.upload-ele  [class^=el-icon-] { display:inline-block; width:25px; height:25px; line-height:25px; text-align:center; font-size:16px; vertical-align:-7px; border-radius:50%; color:#ffffff; overflow:hidden; background-color:#999; margin-right:5px;}

.msgpop {
  display: inline-block;
  padding: 6px;
  vertical-align: top;
  background: #eff3f8;
  margin-bottom: 6px;
  border-radius: 6px;
}
.msgpop._text {
  white-space: pre-wrap;
  color: #333;
  min-width: 2em;
  text-align: left;
}
.msgpop._img {
  max-width: 30%;
}
.msgpop._img img {
  width: 100%;
}

.im-tabs {
  margin: 10px 0;
}

.im-tabs .el-tab-pane {
  height: 100%;
}

.im-side >>> .baseList { margin:0 10px;}
.im-side >>> .baseList ._avat { position:relative; overflow:hidden;}
.im-side >>> .baseList ._avat img { width:100%; height:100%; position:absolute; left:0; top:0;}
.im-side >>> .subTitle { background-color:#f0f0f0;}

.im-view .dialogue-item { padding-left:60px; min-height:78px;}
.im-view .dialogue .avat { width:48px; height:48px; line-height:48px; bottom:2px; border-radius:50%;}
.im-view .msgpop { position:relative;}
.im-view .msgpop::before{content: "";position: absolute;border: 6px solid;border-color: transparent #eef2f9 transparent transparent;right:100%;bottom:12px;}
.dialogue ._name { margin-right:60px; position:relative; min-height:23px;}
.dialogue ._name .n { display:inline-block; width:40%;;}
.dialogue ._name .time { position:absolute; left:50%; transform:translate(-50%, 0); }

.im-view .dialogue-item.fromself { padding-left:0; padding-right:60px;}
.im-view .dialogue-item.fromself .avat { margin-right:0; margin-left:12px;}

.im-view .dialogue-item.fromself .msgpop::before{ border-color: transparent transparent transparent #eef2f9; right:auto; left:100%;}
.im-view .dialogue .dialogue-item.fromself ._name  { margin-right:0; margin-left:60px;}

.inputTextarea { margin-right:10px;}
.inputTextarea >>> textarea { margin-bottom:0;}

.inputComponent { padding-top:10px;}
</style>
