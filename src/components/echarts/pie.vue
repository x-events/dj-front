<template>
    <div class="myChart pie">
        <div :id="chartName" class="myChart"></div>
    </div>
</template>

<script>
import * as util from '@/assets/util';
const echarts = window.echarts
export default {
    props: {
        data:{},
        colors:{
            type: Array,
            default:function(){
                return []
            }
        },
        radius:"",
        type:"",
        label:{
            type:Boolean,
            default:function(){
                return false
            }
        },
        legend_position:{
            type: String,
            default:function(){
                return "right-bottom"
            }
        },
        legend_orient: {
            type: String,
            required: false
        },
        tip_percent:"",
        text_color:{
            type: String,
            default:function(){
                return "#ffffff"
            }
        }
    },
    data () {
        return {
            eChart:null,
            chartName:'chartPie' + Math.random()*1000000
        }
    },
    watch:{
        'data':function(){
            this.drawCharts();
        }
    },
    methods: {
        drawCharts(){
            this.eChart.hideLoading();
            if(!this.data.series){
                return false
            }
            let radiusSet,
                labelSet = {},
                legendSet = true,
                labelLineSet = true,
                roseTypeSet = false;
            
            if(this.radius){
                //ring
                radiusSet = this.radius.split(",")
                labelSet = {
                            normal: {
                                show: true,
                                formatter:'{d}%'
                            },
                            emphasis: {
                                show: true,
                                textStyle: {
                                    fontSize: '20',
                                    fontWeight: 'bold'
                                }
                            }
                        }
                if(this.type){
                    roseTypeSet = this.type;
                }
            }else{
                //normal
                radiusSet = "60%";
                labelSet = {
                            normal: {
                                show: true,
                                formatter:'{d}%'
                            },
                            emphasis: {
                                show: true,
                                textStyle: {
                                    fontSize: '20',
                                    fontWeight: 'bold'
                                }
                            }
                        }
            }

            if(this.label == false){
                labelSet = {
                    normal: {
                        show: false
                    }
                };
                labelLineSet = false
            }

            let lp_left,lp_right,lp_top,lp_bottom;
            lp_left = lp_bottom = 'auto';
            lp_right = lp_top = '0';
            if(this.legend_position == "left-top"){
                lp_left = lp_top = '0';
                lp_right = lp_bottom = 'auto';
            }
            if(this.legend_position == "left-bottom"){
                lp_left = lp_bottom = '0';
                lp_right = lp_top = 'auto';
            }
            if(this.legend_position == "right-bottom"){
                lp_right = lp_bottom = '10px';
                lp_left = lp_top = 'auto';
            }
            if(this.legend_position == "false"){
                legendSet = false
            }

            //去掉label
            // labelSet = {
            //     normal: {
            //         show:false
            //     }
            // };
            // labelLineSet = false;
            /* //显示legend
            legendSet = true; */

            let tipFormatter ="{b} : {c} ({d}%)";
            if(this.tip_percent){
                tipFormatter = "{b} : {c}"+this.tip_percent;
            }
            
            let ChartOption = {
                /* title : {
                    text: '某站点用户访问来源',
                    subtext: '纯属虚构',
                    x:'center'
                }, */
                tooltip : {
                    trigger: 'item',
                    formatter:tipFormatter
                },
                color:this.colors,
                legend: {
                    show:legendSet,
                    type: 'scroll',
                    orient: this.legend_orient || 'horizontal',
                    left:lp_left,
                    right:lp_right,
                    top:lp_top,
                    bottom:lp_bottom,
                    data: this.data.series.map(e=>{return e.name}),
                    pageTextStyle:{
                        color:"#ffffff"
                    },
                    textStyle:{
                        color:this.text_color
                    }
                },
                series : [
                    {
                        type: 'pie',
                        radius : radiusSet,
                        center: ['50%', '45%'],
                        roseType:roseTypeSet,
                        data: this.data.series,
                        //avoidLabelOverlap: false,
                        itemStyle: {
                            emphasis: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        },
                        label: labelSet,
                        labelLine: {
                            normal: {
                                show: labelLineSet
                            }
                        }
                    }
                ]
            }
            this.eChart.setOption(ChartOption,true)
            util.on('resize', () => {this.eChart.resize()})
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