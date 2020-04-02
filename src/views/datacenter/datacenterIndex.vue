<template>
    <div class="flex-1 flex-col" v-loading="loading">
        <div class="data-content flex-row flex-1" v-if="!loading && menu_auth.length">
            <div class="type-content scrollbar">
                <div v-for="(e,i) in menu_auth" :key="i" class="type-item" :class="{'actived':e.routeNames.indexOf($route.name) != -1}">
                    <router-link :to="{name:e.name}">
                        <p><i class="ion" v-html="e.ion"></i>{{e.name}}</p>
                    </router-link>
                </div>
            </div>
            <router-view class="flex-1" :menu_auth="menu_auth"></router-view>
        </div>
        <div class="data-content flex-row flex-1" v-if="!loading && !menu_auth.length">
            <nodata class="flex-1" mode="pic" />
        </div>
    </div>
</template>

<script>
import * as datacenter from '@/api/datacenter.js'
export default {
    data() {
        return {
            loading:true,
            queryParams:{
                type:this.$root.user.op_type || ''
            },
            data:{
                menu_auth:[],
                op_auth:[]
            },
            localMenus:[
                {
                    "name": "党组织信息",
                    "ion":"&#xe601;"
                },
                {
                    "name": "党员信息",
                    "ion":"&#xe607;"
                },
                {
                    "name": "单位信息",
                    "ion":"&#xe647;"
                },
                {
                    "name": "党建阵地",
                    "ion":"&#xe614;"
                },
                {
                    "name": "工会",
                    "ion":"&#xe603;"
                },
                {
                    "name": "妇联",
                    "ion":"&#xe64d;"
                },
                {
                    "name": "团组织",
                    "ion":"&#xe646;"
                },
                {
                    "name": "商务楼宇",
                    "ion":"&#xeaab;"
                },
                {
                    "name": "非公企业",
                    "ion":"&#xe60b;"
                },
                {
                    "name": "社会组织",
                    "ion":"&#xe616;"
                },
                {
                    "name": "特色队伍",
                    "ion":"&#xe6cc;"
                },
                {
                    "name": "党务工作者",
                    "ion":"&#xe6cd;"
                }
            ]
        }
    },
    watch: {
        menu_auth(new_val){
            this.$emit('menu_auth',new_val);
            this.changeRouter();
        },
        $route(){
            this.changeRouter();
        }
    },
    computed: {
        menu_auth:function(){
            let newArr1 = [];
            //status:1push
            this.data.menu_auth.forEach((e) => {
                e.routeNames = [];
                e.routeNames.push(e.name)
                if(e.name == '党组织信息'){
                    e.routeNames.push('已撤销党组织');
                }
                if(e.name == '党员信息'){
                    e.routeNames.push('历史党员管理');
                }
                if(e.status == 1){
                    newArr1.push(e);
                }
            });
            //匹配ion
            let newArr2 = [];
            newArr1.forEach((e,i) => {
                this.localMenus.forEach((ee,ii) => {
                    if(e.name == ee.name){
                        e.ion = ee.ion
                        newArr2.push(e);
                        return
                    }
                });
            });
            //newArr2 = []
            return newArr2;
        }
    },
    methods: {
        //权限更改路由
        changeRouter(){
            let new_val = this.menu_auth || [];
            let count = 0;
            if(new_val.length){
                new_val.forEach(e => {
                    if(e.routeNames.indexOf(this.$route.name) == -1){
                        count += 1
                    }
                });
                if(count == new_val.length){
                    this.$router.replace({name:new_val[0].name})
                }
            }
        },
        fetchData: function(){
            this.loading = true
            datacenter.center_auth(this.queryParams).then(res => {
                let result = res.data.data;
                this.loading = false;
                this.data = result;
                this.$root.datacenter_op_auth = result.op_auth;
            })
        }
    },
    created() {
        this.fetchData()
    }
}
</script>

<style scoped>
  * {
    box-sizing: border-box;
  }

  .data-content .type-content {
    width: 170px;
    width:100px;
    border-radius: 10px;
    margin-right: 15px;
    /* flex-shrink: 0; */
  }

  .data-content .type-content .type-item {
    /* height: 52px; */
    height: 65px;
    /* padding: 20px 0 5px; */
    cursor: pointer;
    display: flex;
    align-items: center;
    box-sizing: content-box;
    text-align: center;
    padding: 5px;
    display:block;
  }

  .data-content .type-content .type-item.actived {
    /* height: 70px; */
    background-color: #4170F6;
    color: #fff;
    background:linear-gradient(#1c6ac6, #1e9def);
  }

  .data-content .type-content .type-item a {
    flex-grow: 1;
  }

  .data-content .type-content .type-item p {
    border-bottom: 1px solid #f3f3f3;
    color: #333;
    flex-grow: 1;
  }

  .data-content .type-content .type-item p .ion {
    font-size: 20px;
    vertical-align: middle;
    color: #B8B8B8;
    display: block;
  }

  .data-content .type-content .type-item.actived p,
  .data-content .type-content .type-item.actived p .ion {
    border-bottom: none;
    color: #fff;
  }

  .main-content {
    width: 100%;
    border-radius: 10px;
    /* display: flex; */
  }
</style>
<style>
  .center-box .main-content .org-tree {
    box-shadow: 2px 2px 20px #e1e6ea;
    border-right: 1px solid #e0e5ea;
    padding: 10px;
    display: flex;
    flex-direction: column;
    min-width:235px;
    width:18%;
    height: 100%;
  }
</style>