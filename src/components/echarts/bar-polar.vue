<template>
    <div :id="chartName" class="myChart"></div>
</template>

<script>
import * as util from '@/assets/util';
const echarts = window.echarts
export default {
    props: {
        data:{
            type: Object,
            default:function(){
                return {}
            }
        },
        colors:{
            type: Array,
            default:function(){
                return []
            }
        },
        orient: {
            type: String,
            default: 'horizontal'
        },
        type:{
            type: Number,
            default: 1
        }
    },
    data () {
        return {
            eChart: null,
            chartName:'chartBarPolar' + Math.random()*1000000,
            legend:true
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
                return false;
            }
            let seriesData = [];
            let data_length = this.data.series.length;
            //console.log(data_length);
            for (let i = 0; i < data_length; i++) {
                const e = this.data.series[i];
                e.coordinateSystem = 'polar';
                e.itemStyle = {  
                    normal:{
                        color:this.colors[i]
                    }  
                };
                seriesData.push(e);
            }
            //console.log(seriesData);

            let angleAxis_set = {
                    type: 'category',
                    data:this.data.xAxis,
                    z: 10,
                    axisLabel:{
                        textStyle:{
                            color:'#ffffff',
                            fontSize: 10
                        }
                    }
                }
            let radiusAxis_set = {
                    show:true,
                    axisLabel:{
                        show:false
                    },
                    splitLine:{                     //坐标轴在 grid 区域中的分隔线。
                        show:true,                  //是否显示分隔线。默认数值轴显示，类目轴不显示。
                        interval:"auto",            //坐标轴分隔线的显示间隔，在类目轴中有效。默认会采用标签不重叠的策略间隔显示标签。可以设置成 0 强制显示所有标签。如果设置为 1，表示『隔一个标签显示一个标签』，可以用数值表示间隔的数据，也可以通过回调函数控制。回调函数格式如下：
                        lineStyle:{
                            color:'#4c659d'
                        }
                    },
                    type: 'category',
                    data:this.data.xAxis,
                    z: 10,
                }

            if(this.type == 2){
                angleAxis_set = {}
            }else{
                radiusAxis_set = {
                    show:true,
                    axisLabel:{
                        show:false
                    },
                    splitLine:{                     //坐标轴在 grid 区域中的分隔线。
                        show:true,                  //是否显示分隔线。默认数值轴显示，类目轴不显示。
                        interval:"auto",            //坐标轴分隔线的显示间隔，在类目轴中有效。默认会采用标签不重叠的策略间隔显示标签。可以设置成 0 强制显示所有标签。如果设置为 1，表示『隔一个标签显示一个标签』，可以用数值表示间隔的数据，也可以通过回调函数控制。回调函数格式如下：
                        lineStyle:{
                            color:'#4c659d'
                        }
                    }
                }
            }

            let ChartOption = {
                tooltip: {
                    show: true,
                    //trigger: 'axis',
                    //formatter:'{a}：{c}<br />{a1}：{c1}%<br />{a2}：{c2}%'
                },
                legend: {
                    type: 'scroll',
                    show:this.legend,
                    data:this.data.series.map(e=>{return e.name}),
                    /* pageIconColor:'#aaaaaa',
                    pageIconInactiveColor:'#334754',
                    pageTextStyle:{
                        color:'#ffffff'
                    }, */
                    orient: this.orient,
                    right: 0,
                    bottom:0
                },
                angleAxis:angleAxis_set,
                radiusAxis:radiusAxis_set,
                polar:{
                    radius:'70%',
                    center: this.orient==='vertical' ? ['25%', '50%'] : ['50%', '45%']
                },
                series: seriesData
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