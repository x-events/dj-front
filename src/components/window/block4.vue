<template>
    <div class="block flex-col material vbHidden" :class="{'animated zoomIn faster':animate == 1,'animated zoomOut faster':animate == 2}">
        <div class="flex-1 flex-col block" id="mapContainer">
            <div class="flex-1 mapWrap tc">
                <div class="mapBox" :class="'map_type'+mapParam.type">
                    <img src="@/assets/img/dashboard/map_new.png" ref="mapImg">
                    <div class="mp" :class="['mp'+(i+1),{'nohand':org_type != 1}]" v-for="(e,i) in points" :key="i" :title="e.name" @mouseenter="hoverPause" @mouseleave="autoShow" @click="switchData(e)">
                        <div class="dot"><b></b></div>
                        <div class="number">
                            <div class="name">{{e.name}}</div>
                            <div class="count">{{type_name}}：{{e.count}}</div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="map_types fix">
                <div class="box r">
                    <div class="_type" v-for="(item,index) in types" :key="'type'+index" :class="{cur: currentType === index}" @click="currentType = index">
                        <!-- <div class="pointClass" :class="'pc'+(index+1)"></div> -->
                        <i class="mico" :class="'mico'+index"></i>
                        {{item.title}}
                    </div>
                </div>
            </div>
        </div>
        <!-- <loadsm :loading="loading" /> -->
    </div>
</template>

<script>
import * as util from "@/assets/util";
import * as map from "@/api/map";


export default {
    data() {
        return {
            loading:true,
            clientHeight:"0px",
            animate: false,
            timer: null,
            currentType: null,
            types: [
                {
                    title: '党组织',
                    value:1,
                    points:[]
                },
                {
                    title: '工会',
                    value:2,
                    points:[]
                },
                {
                    title: '团组织',
                    value:3,
                    points:[]
                },
                {
                    title: '妇联',
                    value:4,
                    points:[]
                },
                {
                    title: '党建阵地',
                    value:5,
                    points:[]
                }
            ],
            mapParam:{
                type:1
            },
            points:[],
            type_name:"",
            queryParam:{
                org_id:""
            },

            counts:[],
            org_counts:[],
            showNum:1,
            showTimer:null,
            tabHeight:47,
            org_type:""
        }
    },
    watch: {
        currentType(typeIndex) {
            this.showType(typeIndex)
        },
        "$route.params.org_id"(new_id){
            if(new_id == 0){
                new_id = ""
            }
            this.queryParam.org_id = new_id;
            this.getData();
            this.animate = 2;
            setTimeout(() => {
                this.animate = 1;
            }, 400);
        }
    },
    methods: {
        switchData(e){
            if(this.org_type == 1){
                //工委才能切换
                this.$router.push({name:'可视窗口',params:{org_id:e.org_id}});
            }
        },
        pausePlay(){
            clearTimeout(this.timer);
        },
        hideEffect(){
            let blocks = document.querySelectorAll('.mp');
            if(!blocks.length){
                return false;
            }
            for(let i=0;i<blocks.length;i++){
                let node = blocks[i]
                node.classList.remove('act')
            }
        },
        effectReady(){
            this.counts = [];
            this.org_counts = [];
            for (let i = 0; i < this.points.length; i++) {
                this.counts.push(i+1);
                this.org_counts.push(i+1);
            }
        },
        showEffect(){
            let blocks = document.querySelectorAll('.mp');
            if(!blocks.length){
                return
            }
            let selected = this.getArrayItems(this.counts,this.showNum);
            //console.log(selected)
            selected.forEach(e => {
                let index = this.counts.indexOf(e); 
                if (index > -1) {
                    this.counts.splice(index, 1); 
                } 
            })
            //console.log(this.counts);
            if(this.counts.length < this.showNum){
                this.counts = util.deepcopy(this.org_counts);
                
                let next = this.currentType + 1
                if (next >= this.types.length) {
                    next = 0
                }
                this.currentType = next
            }
            //debugger
            this.hideEffect();
            setTimeout(() => {
                selected.forEach(e => {
                    blocks[e-1].classList.add('act')
                });
            }, 500);
            this.pauseShow();
            this.autoShow();
        },
        hoverPause(){
            this.hideEffect();
            this.pauseShow();
        },
        pauseShow() {
            clearTimeout(this.showTimer);
        },
        autoShow() {
            clearTimeout(this.showTimer);
            this.showTimer = setTimeout(() => {
                this.showEffect()
            }, 3000)
        },
        getArrayItems(arr, num) {
            //新建一个数组,将传入的数组复制过来,用于运算,而不要直接操作传入的数组;
            let temp_array = new Array();
            for (let index in arr) {
                temp_array.push(arr[index]);
            }
            //取出的数值项,保存在此数组
            let return_array = new Array();
            for (let i = 0; i<num; i++) {
                //判断如果数组还有可以取出的元素,以防下标越界
                if (temp_array.length>0) {
                    //在数组中产生一个随机索引
                    let arrIndex = Math.floor(Math.random()*temp_array.length);
                    //将此随机索引的对应的数组元素值复制出来
                    return_array[i] = temp_array[arrIndex];
                    //然后删掉此索引的数组元素,这时候temp_array变为新的数组
                    temp_array.splice(arrIndex, 1);
                } else {
                    //数组中数据项取完后,退出循环,比如数组本来只有10项,但要求取出20项.
                    break;
                }
            }
            return return_array;
        },
        showType(index) {
            this.mapParam.type = index+1
            this.$nextTick(() => {
                //this.getData();
                this.hideEffect();
                this.points = this.types[index].points;
                this.type_name = this.types[index].title;

                setTimeout(() => {
                    this.$nextTick(()=>{
                        this.showEffect();
                    })
                }, 500);

            })

            //this.pausePlay();
            //this.autoPlay();
        },
        autoPlay() {
            this.pausePlay();
            this.timer = setTimeout(() => {
                let next = this.currentType + 1
                if (next >= this.types.length) {
                    next = 0
                }
                this.currentType = next
                this.autoPlay()
            }, 7000)
        },
        changeFixed(clientHeight){
            this.$refs.mapImg.style.height = clientHeight;
        },
        getData(){
            this.loading = true;
            this.hideEffect();
            map.communityorg(this.queryParam).then(res => {
                let data = res.data.data;
                this.types[0].points = data.org;
                this.types[1].points = data.union;
                this.types[2].points = data.youth;
                this.types[3].points = data.women;
                this.types[4].points = data.field;

                this.points = this.types[0].points;

                this.$nextTick(() => {

                    this.clientHeight =  `${document.querySelector("#mapContainer").clientHeight - this.tabHeight}px`;

                    setTimeout(() => {
                        this.loading = false;
                        /* this.showEffect(); */
                        this.effectReady();
                        this.currentType = 0
                    }, 500);
                })
            })
        }
    },
    mounted() {
        this.org_type = this.$root.user.org_type
        let vm = this;
        // util.on('resize', () => {
        //     let resizeHeight = `${document.querySelector("#mapContainer").clientHeight - this.tabHeight}px`;
        //     vm.changeFixed(resizeHeight)
        // })
    },
    created: function() {
        if(this.$route.params.org_id == 0){
            this.queryParam.org_id = ""
        }else{
            this.queryParam.org_id = this.$route.params.org_id
        }
        //this.currentType = 0
        /* util.on('opened', () => {
            this.currentType = 0
            //this.autoPlay();
        }) */

        this.getData();

        setTimeout(() => {this.animate = 1},0);
        util.on("leaveWindow", () => {
            this.animate = 2;
        });

        /* util.on("routeChange", (from) => {
            if(from.name == this.$route.name){
                window.timerRunning = false;
            }
        }); */

    }
}
</script>

<style scoped>
#mapContainer { font-size:0; overflow:visible;}
.mapWrap{ position:relative; text-align:center;}
.material{position: relative;z-index: 1;overflow:visible; border-radius: 2px;}

.map_types { height:47px; font-size:0;}
.map_types .box { border:#3d67bc 1px solid; border-radius:5px; overflow:hidden;}
.map_types ._type{ position:relative; display:inline-block; margin:0; color:#68d8fe; padding:10px 15px; font-size:14px; cursor:pointer; border-right:#3d67bc 1px solid; height:25px; line-height:25px;}
.map_types ._type:last-child { border-right-width:0;}
.pointClass{position:absolute;left:10px;top:50%;margin-top:-4px; width:7px; height:7px; border-radius:50%; background-color:#3fa7ff;}
.map_types .cur{background:rgba(255,255,255,.1);}
.pc1 { background-color:#3fa7ff;}
.pc2 { background-color:#3bd58e;}
.pc3 { background-color:#f4c125;}
.pc4 { background-color:#ff5252;}
.pc5 { background-color:#c05dd5;}

/* .map_type1 .mp .number { border-top-color:#3fa7ff;}
.map_type2 .mp .number { border-top-color:#3bd58e;}
.map_type3 .mp .number { border-top-color:#f4c125;}
.map_type4 .mp .number { border-top-color:#ff5252;}
.map_type5 .mp .number { border-top-color:#c05dd5;} */

.mp { width:50px; height:50px; cursor:pointer;}
.mp { position:absolute; left:200%; top:200%; color:#fff;}
.mp .dot { width:80px; height:80px; position:absolute; left:50%; top:50%; margin:-40px 0 0 -40px; cursor:pointer; transition: all ease .3s; transform:scale(0,0) translate3d(0, 0, 0) rotateX(60deg);}
.dot b::before { content:''; position:absolute; z-index:2; left:50%; top:50%; width:16px; height:16px; margin:-8px 0 0 -8px; background-color:#cbdbed; border-radius:50%;}
.dot b::after { content:''; position:absolute; z-index:1; left:50%; top:50%; width:80px; height:80px; margin:-40px 0 0 -40px; background-color:#cbdbed; border-radius:50%; box-shadow:0 0 10px rgba(0, 0, 0, .3) inset; animation:waveCircle 1s ease infinite normal;}
@keyframes waveCircle {
    0% { transform:scale(0)}
    100% { opacity:0; transform:scale(1)}
}
.mp .number { width:auto; min-width:80px; height:auto; line-height:1.5; box-sizing:border-box; border:#ffffff 0px solid; /* border-top:#3fa7ff 3px solid; */ border-radius:3px; background:rgba(255,255,255,.9); font-size:14px; padding:8px 15px; position:absolute; left:50%; bottom:43px; margin-left:-40px; /* cursor:default; */ transition: all ease .3s; transform:scale(0,0); transform-origin: 50% 50%; transform-origin:50% 150% 0; white-space:nowrap; color:#ff3919;}
.mp .number::after { content:''; display:block; width:17px; height:18px; background:url(../../assets/img/dashboard/point_corner.png) no-repeat; position:absolute; left:31px; margin-left:0px; bottom:-18px;}
.mp .number::after { width:0; height:0; overflow:hidden; overflow:hidden; border-width:15px 7px; border-color:#ffffff transparent transparent; border-style:solid; bottom:-30px; background:none; left:33px; opacity:.9;}
.mp:hover .number,.mp:hover .dot,.mp.act .number,.mp.act .dot { transform:scale(1,1);}
.mp:hover .dot,.mp.act .dot { transform:scale(1,1) translate3d(0, 0, 0) rotateX(60deg);}
.mp:hover { z-index:10;}

.mp1 { left:15%; top:28%;}
.mp2 { left:14%; top:54%;}
.mp3 { left:26%; top:27%;}
.mp4 { left:26%; top:48%;}
.mp5 { left:38%; top:28%;}
.mp6 { left:37%; top:45%;}
.mp7 { left:49%; top:29%;}
.mp8 { left:51%; top:45%;}
.mp9 { left:61%; top:29%;}
.mp10 { left:64%; top:44%;}
.mp11 { left:72%; top:9%; height:40px;}
.mp12 { left:73%; top:20%; height:40px;}
.mp13 { left:70%; top:29%;}
.mp14 { left:78%; top:30%;}

.mapBox { display:inline-block; font-size:0; position:relative; top:8%; max-width:100%;}
.compass { width:44px; height:44px; position:absolute; right:5px; bottom:-20px;}

.mico { display:inline-block; vertical-align:-7px; width:25px; height:25px; background:url(../../assets/img/dashboard/map_ico.png) no-repeat;}
.mico1 { background-position:-25px 0;}
.mico2 { background-position:-50px 0;}
.mico3 { background-position:-75px 0;}
.mico4 { background-position:-100px 0;}

.mp.nohand,.mp.nohand .dot,.mp.nohand .number { cursor:default;}
</style>
