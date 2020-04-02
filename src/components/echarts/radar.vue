<template>
    <div class="myChart radar">
        <!-- <div class="total digital">{{data.total}}</div> -->
        <div :id="chartName" class="myChart"></div>
    </div>
</template>

<script>
import * as util from '@/assets/util';
const echarts = window.echarts
export default {
    props: {
        data:{
            type:Object,
            default:function(){
                return {}
            }
        },
        shape:{
            type:String,
            default:function(){
                return "polygon"
            }
        },
        color:{
            type:String,
            default:function(){
                return "#00ffff"
            }
        }
    },
    data () {
        return {
            eChart:null,
            chartName:'chartRadar' + Math.random()*1000000
        }
    },
    watch:{
        'data':function(){
            if(this.data.indicator){
                this.drawCharts();
            }
        }
    },
    methods: {
        drawCharts(){
            //console.log(this.data);
            this.eChart.hideLoading();
            if(this.data.indicator.length == 0){
                return false;
            }

            let shapeSet = this.shape;
            let colorSet = this.color;

            let ChartOption = {
                /* title: {
                    text:this.data.total,
                    left: 'center',
                    top: 'center',
                    textStyle:{
                        fontSize:30,
                        color:'#1483fb'
                    }
                }, */
                radar: {
                    indicator: this.data.indicator,
                    center:['50%', '55%'],
                    shape:shapeSet,
                    radius:"60%",
                    name:{
                        color:'#ffffff',
                        fontSize:12,
                        formatter: function (value) {
                            return value;
                        }
                    }
                },
                series:{
                    name: '',
                    type: 'radar',
                    itemStyle: {
                        normal: {
                            color:colorSet, // 图表中各个图区域的边框线拐点颜色
                            lineStyle: {
                                color:colorSet // 图表中各个图区域的边框线颜色
                            }
                        }
                    },
                    data: [
                        {
                            value: this.data.value,
                            areaStyle: {
                                normal: {
                                    opacity: 0.6,
                                    color:colorSet
                                }
                            },
                            label: {
                                normal: {
                                    show: true,
                                    color:'#ffffff',
                                    fontSize:12,
                                    formatter:function(params) {
                                        return params.value;
                                    }
                                }
                            }
                        }
                    ]
                }
            }
            this.eChart.setOption(ChartOption,true)
            this.eChart.on('click', (param) => {
                this.$emit('clicked',param)
            })
            util.on('resize', () => { this.eChart.resize()})
        }
    },
    mounted(){
        if (!this.eChart) {
            this.eChart = echarts.init(document.getElementById(this.chartName));
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