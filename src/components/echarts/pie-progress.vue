<template>
    <div class="myChart progress">
        <div :id="chartName" class="myChart"></div>
        <!-- <div class="total tc">满分：{{total}}</div> -->
    </div>
</template>

<script>
import * as util from '@/assets/util';
const echarts = window.echarts
export default {
    props: {
        number:{
            default:function(){
                return "0"
            }
        },
        total:{
            default:function(){
                return "10"
            }
        },
        color:{
            type: String,
            default:function(){
                return "#6ebdff"
            }
        },
        bcolor:{
            type: String,
            default:function(){
                return "#466a8e"
            }
        },
        unit:{
            type: String,
            default:function(){
                return ""
            }
        },
        fontsize:{
            type: Number,
            default:function(){
                return 30
            }
        },
        radiotype: {
            type: String,
            required: false
        },
        radius:{
            type: Array,
            default:function(){
                return ['60%', '70%']
            }
        }
    },
    data () {
        return {
            eChart:null,
            chartName:'chartPieProgress' + Math.random()*1000000
        }
    },
    watch:{
        'number':function(){
            this.drawCharts();
        }
    },
    methods: {
        drawCharts(){
            this.eChart.hideLoading();

            let labelTop = {//上层样式
                normal : {
                    color :this.color,
                    label : {
                        show : true,
                        position : 'center',
                        formatter : '{b}',
                        textStyle: {
                            baseline : 'bottom',
                            fontSize:20
                        }
                    },
                    labelLine : {
                        show : false
                    },
                    borderWidth:2,
                    borderColor:this.bcolor
                },
                emphasis: {//悬浮式样式
                    color:this.color,
                    borderWidth:2,
                    borderColor:this.bcolor
                }
            };
            let labelBottom = {//底层样式
                normal : {
                    color:this.bcolor,
                    label : {
                        show : true,
                        position : 'center',
                        fontSize:2
                    },
                    labelLine : {
                        show : false
                    },
                    borderWidth:2,
                    borderColor:this.bcolor
                },
                emphasis: {//悬浮式样式
                    color:this.bcolor,
                    borderWidth:2,
                    borderColor:this.bcolor
                }
            };
            let cTitle = {
                    text:this.number+this.unit,
                    left: 'center',
                    top: 'center',
                    textStyle:{
                        fontSize:this.fontsize,
                        fontFamily:'sans-serif',
                        color:this.color
                    }
                }
            if(this.fontsize == 0){
                cTitle = {}
            }

            let radiusSet = this.radius;

            if(this.radiotype ==='bold'){
                radiusSet = ['50%', '70%'];
            }
            let ChartOption = {
                title: cTitle,
                animation:false,
                cursor:'default',
                series : [
                    {
                        type : 'pie',
                        center : ['50%', '50%'],//圆心坐标（div中的%比例）
                        radius : radiusSet,//半径
                        label: {
                            normal: {
                                show: false
                            }
                        },
                        data : [
                            {value:this.number,itemStyle:labelTop},
                            {value:this.total-this.number,itemStyle:labelBottom}
                        ],
                        labelLine: {
                            smooth: 1
                        },
                        clockwise: false
                    }
                ]
            }
            this.eChart.setOption(ChartOption,true)
            util.on('resize', () => { this.eChart.resize()})
        }
    },
    mounted(){
        if (!this.eChart) {
            this.eChart = echarts.init(document.getElementById(this.chartName),'chalk');
            this.eChart.showLoading({
                text : '',
                color: '#ffffff',
                textColor: '#ffffff',
                maskColor:'transparent',
            });
            this.drawCharts();
        }
    }
}
</script>

<style scoped>
.myChart.progress .total { width:100%; color:#5abaff; position:absolute; left:0; bottom:5%; font-size:14px;}
</style>