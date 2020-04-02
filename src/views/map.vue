<template>
    <div class="flex-col">
        <header1 />
        <div class="flex-1 flex-row paddingWrap map_cont">
            <div class="flex-col map_left">
                <div class="flex-col flex-1">
                    <!-- tab -->
                    <ul class="comTab flex-row block_wrap_opc">
                        <li class="flex-1" :class="{'active':e.type == orgParam.type}" v-for="(e,i) in tab" :key="i" @click="tabChange(e.type)">
                        <i class="mapico" :class="['mapico'+(i+1)]"></i>
                        {{e.name}}
                        </li>
                    </ul>
                    <!-- menu -->
                    <div class="org_list flex-1 flex-col block_wrap_opc" v-loading="loading">
                        <span class="dots"></span>
                        <div class="flex-1 scrollbar">
                            <ul>
                                <li v-for="(item,i) in orgData" :key="i">
                                    <div :id="item.value" class="layer el" :class="{'active':actposi === i}" 
                                    :title="item.name" 
                                    @click="actposi=i;showMap(item)">
                                        <i class="mapico" :class="['mapico'+(i+4)]"></i>{{item.name}}
                                    </div>
                                    <ul v-if="item._child">
                                        <li v-for="(sub,si) in item._child" :key="'sub'+i + si" >
                                            <div class="layer" :class="{'active':actposi === ('sub'+i + si)}" 
                                            @click.stop="actposi = ('sub'+i + si);showMap(sub)">
                                            <i class="mapico mapico8"></i>{{sub.name}}
                                            </div>
                                        </li>
                                    </ul>
                                </li>
                                <div v-if="orgData.length == 0">
                                    <nodata color="#ffffff" />
                                </div>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div class="flex-col flex-1 map">
                <span class="dots"></span>
                <div class="flex-col flex-1 block_wrap_opc">
                    <div class="flex-1 mapContainer" v-loading="mapLoading">
                        <bdmap :data="mapdata" :pointtype="1" :showtype="orgParam.type" :centerPoint="centerPoint" :zoom="15"></bdmap>
                        <div class="totalCount" :title="totalCount">
                            <div class="box"><div class="num el">{{totalCount}}</div>数量</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import * as common from "@/api/common";
import * as map from "@/api/map";

export default {
    data() {
        return {
            loading:true,
            tab:[
                {
                    name:"党组织",
                    type:"0"
                },
                {
                    name:"群团组织",
                    type:"1"
                },
                {
                    name:"党建阵地",
                    type:"2"
                }
            ],
            orgParam:{
                type:"0"
            },
            actposi: 0,
            orgData:[],

            mapLoading:true,
            mapParam:{
                type:"",
                pid:"",
                id:""
            },
            mapdata:[],
            totalCount:0,
            mapPoint:1,
            queryName:'',
            centerPoint:[116.508479,39.929238]
        };
    },
    methods: {
        tabChange(type) {
            this.actposi = 0
            this.orgParam.type = type;
            this.mapPoint = 1;
            this.fetchData();
        },
        showMap(e){
            //console.log(e);
            this.mapParam.type = e.value;
            this.mapParam.pid = e.pid;
            this.mapParam.id = e.id;
            this.mapPoint = Number(e.num);
            this.getMapData();
        },
        getMapData(){
            this.mapLoading = true;
            let api = null;
            switch (this.orgParam.type) {
                case '1':
                    api = map.grouporglist
                    break;
                case '2':
                    api = map.partyfieldlist
                    break;
                default:
                    api = map.partyorglist
                    break;
            }
            api(this.mapParam).then(res => {
                this.mapLoading = false;
                let data = res.data.data;
                this.mapdata = data.list;
                this.totalCount = data.count;
            })
        },
        fetchData(){
            this.loading = true;
            common.orgtype(this.orgParam).then(res => {
                this.loading = false;
                let data = res.data.data;
                let newData = [];
                for (let i = 0; i < data.length; i++) {
                    const e = data[i];
                    let count = (i/10).toFixed(1).toString().split(".")
                    e.num = Number(count[1])+1
                    newData.push(e);
                }
                this.orgData = newData;
                
                this.mapParam.type = newData[0].value;
                this.mapParam.pid = newData[0].pid;
                this.mapParam.id = newData[0].id;
                
                //console.log(this.orgData);
                for (let i = 0; i < this.orgData.length; i++) {
                    const e = this.orgData[i];
                    if(e.name == this.queryName){
                        this.mapParam.type = e.value;
                        this.actposi = i
                    }
                }
                this.$nextTick(()=>{
                    this.getMapData();
                })

            })
        }
    },
    created: function() {
        this.queryName = this.$route.query.name;
        if(this.queryName == '工会' || this.queryName == '妇联' || this.queryName == '团组织'){
            this.orgParam.type = '1'
        }else if(this.queryName == '党建阵地'){
            this.orgParam.type = '2'
        }
        this.$nextTick(() => {
            this.fetchData();
        })
    }
}
</script>

<style scoped>
.map_cont { background-color:transparent; color:#fff;}
.map_cont .block_wrap_opc{border-radius: 0;border-color:#0f476d;}
.map_left { width:400px;}
.map .block_wrap_opc { padding:20px;}

.mapContainer { position:relative;}
.totalCount { position:absolute; left:15px; top:15px; z-index:5; cursor:default; font-size:12px; border:10px solid rgba(13,106,232,.2);}
.totalCount,.totalCount .box { width:64px; height:64px; border-radius:50%;}
.totalCount .box { background:linear-gradient(to bottom, rgba(58,159,254,1) 0%,rgba(13,106,232,1) 100%); text-align:center; }
.totalCount .num { font-size:18px; height:22px; line-height:22px; padding-top:10px;}

/* tab */
.comTab { text-align:center;}
.comTab li {position:relative;  height:46px; line-height:46px;color:#fff; cursor:pointer;}
.comTab li::after{content: "";position: absolute;right:0;height:1em;top:50%;margin-top:-.5em;border-left:1px solid #fff;}
.comTab li:last-child:after{border:0;}
.comTab li.active,.comTab li:hover { color:#00ffff;}
/* list */
.org_list { margin-bottom:10px;color:#00ffff;}
.org_list .layer { border-bottom:#091937 1px solid; border-top:1px solid #1a4470; line-height: 25px; padding: 10px 0; cursor:pointer; background:rgba(36,73,157,.13);}
.org_list .layer:hover,.org_list .layer.active { background:rgba(114,164,228,.3)}
.org_list .mapico { margin: 0 5px 0 55px;}
.org_list li li .mapico{margin-left: 70px;}

/* ico */
.mapico{display: inline-block;width:40px;height: 40px;vertical-align: middle;background:url(../assets/img/map/map_icos.png) no-repeat;}
.mapico1{background-position:0 -40px;}
.mapico2{background-position: -40px -40px;}
.mapico3{background-position: -80px -40px;}
.mapico4{background-position: -120px 0;}
.mapico5{background-position: -160px 0;}
.mapico6{background-position: -200px 0;}
.mapico7{background-position: -240px 0;}
.mapico8{background-position: -280px 0;}

.active .mapico1,.comTab li:hover .mapico1 {background-position:0 0px;}
.active .mapico2,.comTab li:hover .mapico2 {background-position: -40px 0px;}
.active .mapico3,.comTab li:hover .mapico3 {background-position: -80px 0px;}

.comTab { position:relative; border:0; background:linear-gradient(to right, rgba(13,58,105,1) 0%,rgba(13,58,105,.3) 100%);}
.comTab::before,.comTab::after,.org_list::before,.org_list::after,.org_list > .dots::before,.org_list > .dots::after,.map::before,.map::after,.map > .dots::before,.map > .dots::after { content:''; display:block; width:3px; height:3px; background:#00d7ff; position:absolute; z-index:5;}
.comTab::before,.comTab::after { left:0;}
.comTab::before { top:0;}
.comTab::after { bottom:0}

.org_list { position:relative; background:none;}
.org_list::before,.org_list::after,.map::before,.map::after { top:0;}
.org_list > .dots::before,.org_list > .dots::after,.map > .dots::before,.map > .dots::after { bottom:0;}
.org_list::before,.org_list > .dots::before,.map::before,.map > .dots::before { left:0;}
.org_list::after,.org_list > .dots::after,.map::after,.map > .dots::after { right:0;}

.map { position:relative; margin:8px 6px 10px;}
.map .block_wrap_opc { background:none; margin:0;}
.map::before,.map > .dots::before,.map::after,.map > .dots::after {}
</style>
