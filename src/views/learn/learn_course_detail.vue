<template>
  <div v-if="data">
    <el-row class="header">
      <h2>
        <i @click="$router.go(-1)" class="ion">&#xe664;</i>
        {{data.title}}
      </h2>
      <el-row>
        <span class="credit">学分：{{data.credit | scoreFloat}}</span>
        <span>总时长：{{data.time}}</span>
      </el-row>
    </el-row>
    <div class="flex-1 scrollbar">
      <div id="video" :is_change="is_change" :type="video_type" class="video"></div>
      <div class="video_error_cover" :is_change="is_change" v-if="is_change == 0">
        <span class="text">你查看的视频正在努力转换中，请稍候...</span>
      </div>
    </div>
  </div>
</template>

<script>
import * as learn from "@/api/learn.js";
export default {
  data() {
    return {
      data: null,
      video_type: "",
      is_change: 1,
      video_url: "",
      map: {
        id: "",
        study_time: 30
        // type:"",
      }
    };
  },
  beforeRouteLeave(to, from, next) {
    //console.log(to)
    //console.log(from)
    this.endCount();
    this.$nextTick(() => {
      next();
    });
  },
  methods: {
    getDetail() {
      learn.courseDetail({ id: this.$route.query.id }).then(res => {
        let data = res.data.data;
        this.data = data;
        this.is_change = data.is_change;
        this.video_url = data.video_url;
        this.$nextTick(() => {
          this.initVideo();
        });
      });
    },
    startCount() {
      // this.map.type = 1;
      this.timer = setInterval(() => {
        this.studyCount();
      }, this.map.study_time * 1000);
    },
    endCount() {
      clearInterval(this.timer);
      // this.map.type = 2;
      //this.studyCount()
    },
    studyCount() {
      this.map.id = this.$route.query.id;
      if (!this.map.id) {
        return false;
      }
      learn.studyCount(this.map).then(() => {});
    },
    initVideo() {
      let vm = this;
      var autoplay_status = false;
      if (this.is_change == 1) {
        // 1转换完成 0正在转换
        autoplay_status = true;
      } else {
        this.video_url = "";
      }

      var videoObject = {
        //playerID:'ckplayer01',//播放器ID，第一个字符不能是数字，用来在使用多个播放器时监听到的函数将在所有参数最后添加一个参数用来获取播放器的内容
        container: "#video", //容器的ID或className
        variable: "player", //播放函数名称
        loaded: "playerReady", //当播放器加载后执行的函数
        loop: false, //播放结束是否循环播放
        autoplay: autoplay_status, //是否自动播放
        //duration: 500, //设置视频总时间
        //cktrack: 'material/srt.srt', //字幕文件
        //poster: 'material/poster.jpg', //封面图片
        //preview: { //预览图片
        //	file: ['material/mydream_en1800_1010_01.png', 'material/mydream_en1800_1010_02.png'],
        //	scale: 2
        //},
        config: "", //指定配置函数
        //debug: true, //是否开启调试模式
        //flashplayer: true, //强制使用flashplayer
        drag: "start", //拖动的属性
        seek: 0, //默认跳转的时间
        playbackrate: -1, //默认速度的编号，只对html5有效,设置成-1则不显示倍速
        volume: 1,
        //advertisements:'website:ad.json',
        //front:'frontFun',//上一集的操作函数
        //next:'nextFun',//下一集的操作函数
        //mobileCkControls:true,//是否在移动端（包括ios）环境中显示控制栏
        //live:true,//是否是直播视频，true=直播，false=点播
        html5m3u8: true,
        video: this.video_url
      };
      var player = new ckplayer(videoObject);

      /* function timeHandler(time) {
							//console.log(time);
							//alert('aaa');
					} */

      //console.log(player.playerType);
      if (player.playerType == "flashplayer") {
        //console.log(player);
        //player.addListener('ended',timeHandler);
      } else {
        window.playerReady = function() {
          //console.log('加载完成')

          player.addListener("play", function() {
            //console.log('播放')
            vm.endCount();
            vm.startCount();
            if (!vm.pauseStatus) {
              clearTimeout(vm.pauseTimer);
            }
          });
          player.addListener("pause", function() {
            //console.log('暂停')
            vm.pauseTimer = setTimeout(() => {
              vm.pauseStatus = true;
              vm.endCount();
              clearTimeout(vm.pauseTimer);
            }, 5 * 1000);
          });

          player.addListener("duration", function(duration) {
            vm.alltime = duration;
          });

          player.addListener("ended", function(duration) {
            //console.log('ended')
            setTimeout(() => {
              player.videoPause();
            }, 200);
          });

          /* player.addListener("time", function(time) {
            if (time > vm.alltime - 1) {
              player.videoPause();
            }
          }); */
        };
      }
    }
  },
  created() {
    this.$loadScript("/ckplayer/ckplayer.js")
      .then(() => {
        this.getDetail();
      })
      .catch(() => {
        // Failed to fetch script
      });
  }
};
</script>

<style scoped>
.header {
  margin-bottom: 12px;
}
.header h2 {
  display: flex;
  align-items: center;
  font-weight: normal;
  color: #333;
}
.header h2 i {
  color: #999999;
  margin-right: 10px;
  cursor: pointer;
}
.header span {
  padding-left: 35px;
}
.header .credit {
  color: #1244d2;
}

.video-content #video {
  width: 100%;
  height: 600px;
}

.video { height:600px;}
</style>