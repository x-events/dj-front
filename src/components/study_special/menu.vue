<template>
    <div class="study_tab block_wrap_opc">
        <ul class="fix">
            <router-link tag="li" :to="{name:e.name}" v-for="(e,i) in tabData" :key="i" exact-active-class="act">{{e.title}}</router-link>
        </ul>
    </div>
</template>

<script>
export default {
    data() {
        return {
            tabData:[],
            tab:[
                {
                    name:'专题学习',
                    title:'专题学习'
                },
                {
                    name:'必修课',
                    title:'必修课'
                },
                {
                    name:'个人选学',
                    title:'个人选学'
                }
            ],
            tab_committee:[
                {
                    name:'专题学习-党支部',
                    title:'专题学习'
                },
                {
                    name:'必修课-党支部',
                    title:'必修课'
                },
                {
                    name:'个人选学-党支部',
                    title:'个人选学'
                }
            ],
            fromPage:""
        }
    },
    created() {
        this.fromPage = this.$route.matched[1].name || ""
        if(this.fromPage == '可视窗口'){
            this.tabData = this.tab
        }
        if(this.fromPage == '党支部'){
            this.tabData = this.tab_committee
        }
    }
}
</script>

<style scoped>
.study_tab ul { padding:6px 10px;}
.study_tab li { float:left; cursor:pointer; height:32px; line-height:32px; padding:0 18px; color:#b6c4d7; border-radius:5px; margin-right:5px;}
.study_tab li.act { background-color:#2798fe; color:#ffffff;}
</style>