<template>
    <div class="block_wrap_opc flex-col vbHidden" :class="{'animated zoomIn faster delay2':animate == 1,'animated zoomOut faster':animate == 2}">
        <div class="channelBar red">
            <div class="_title tab">
                <strong v-for="(e,i) in tab" :key="i" :class="{'act':param.type == e.type}" @click="param.type = e.type">
                    <i class="wico" :class="'wi'+(e.type+7)"></i>
                    {{e.name}}
                </strong>
            </div>
            <div class="_ext" @click="showDetail()"><i class="ion">&#xe777;</i></div>
        </div>
        <div class="flex-1 chartBox" style="margin-top:10px;" v-loading="loading" element-loading-background="rgba(0, 0, 0, 0.4)">
            <barline :data="specialData" axisPointer="line" v-if="param.type == 1" />
            <barline :data="onlineData" :colors="['#e03c3c']" v-if="param.type == 2" />
            <div class="rank" v-if="param.type == 3">
                <ul class="flex-row">
                    <li class="flex-1" v-for="(e,i) in personData" :key="i" :title="e.realname">
                        <div class="imgbox">
                            <div class="avatar"><img :src="e.headimg" :alt="e.realname"></div>
                            <div class="xs">学时：{{e.credit}}</div>
                        </div>
                        <div class="name el">{{e.realname}}</div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
import * as util from "@/assets/util";
import * as committee from "@/api/committee";

export default {
    data() {
        return {
            animate:false,
            loading:false,
            tab:[
                {
                    name:'专题学习',
                    type:1
                },
                // {
                //     name:'学习强国',
                //     type:2
                // },
                {
                    name:'个人选学',
                    type:3
                }
            ],
            param:{
                type:1
            },
            specialData:{},
            onlineData:{},
            personData:[],
            queryParam:{
                org_id:""
            }
        }
    },
    watch:{
        "param.type"(){
            this.getData()
        },
        "$route.params.org_id"(new_id){
            this.queryParam.org_id = new_id;
            this.getData();
            this.animate = 2;
            setTimeout(() => {
                this.animate = 1;
            }, 400);
        }
    },
    methods: {
        showDetail(){
            switch (this.param.type) {
                case 1:
                    this.$router.push({name:'专题学习-党支部'});
                    break;
                case 2:
                    this.$router.push({name:'必修课-党支部'});
                    break;
                case 3:
                    this.$router.push({name:'个人选学-党支部'});
                    break;
            }
        },
        getData(){
            let api = "";
            switch (this.param.type) {
                case 1:
                    api = committee.studyline
                    break;
                case 2:
                    api = committee.power
                    break;
                case 3:
                    api = committee.CourseStudy
                    break;
            }

            api(this.queryParam).then(res => {
                let data = res.data.data;

                switch (this.param.type) {
                    case 1:
                        this.specialData = data
                        break;
                    case 2:
                        this.onlineData = data
                        break;
                    case 3:
                        this.personData = data
                        break;
                }
            })
        }
    },
    created: function() {
        if(this.$route.params.org_id == 0){
            this.queryParam.org_id = ""
        }else{
            this.queryParam.org_id = this.$route.params.org_id
        }
        this.getData()

        setTimeout(() => {this.animate = 1},0);
        util.on("leaveWindow",() =>{
            this.animate = 2;
        });
    }
}
</script>

<style scoped>
.rank { margin:0 20px;}
.rank .flex-row { overflow:visible;}
.rank li { text-align:center; margin-left:5px; margin-right:5px; padding-top:35px;}
.rank .imgbox { max-width:90px; display:block; margin-right:auto; margin-left:auto; position:relative;}
.rank .avatar { width:100%; height:0; padding-bottom:100%; border:#fff 2px solid; border-radius:50%; box-sizing:border-box; overflow:hidden; position:relative;}
.rank .avatar img { position:absolute; width:100%; height:100%; left:0; top:0;}
.rank .name { height:44px; line-height:44px;}
.rank .xs { display:inline-block; white-space:nowrap; width:auto; height:24px; line-height:24px; color:#ffffff; background:linear-gradient(to left,#ff0341,#ff654e); position:absolute; right:-10px; top:0; border-radius:12px; padding:0 10px; font-size:12px;}

._title strong { float:left; position:relative; margin-right:5px; padding-right:41px; background:url(../../assets/img/tab_line.png) right no-repeat;}
._title strong:last-child { background:none; padding-right:10px;}

.act { color:#ffeb08;}
.act .wi8 { background-position:-240px -30px;}
.act .wi9 { background-position:-270px -30px;}
.act .wi10 { background-position:-300px -30px;}
</style>