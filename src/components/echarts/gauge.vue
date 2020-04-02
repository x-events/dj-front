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
        showtitle:{
            type: Boolean,
            default: function(){
                return false
            }
        },
        unit:"",
        numsize:{
            type: Number,
            default: function(){
                return 16
            }
        },
        titlesize:{
            type: Number,
            default: function(){
                return 16
            }
        },
    },
    data () {
        return {
            eChart: null,
            chartName:'chartGauge' + Math.random()*1000000
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
            let standard_data = [[0.2, "#68e0e3"], [0.8, "#31c5e9"], [1, "#37a2da"]];
            let max_data = this.data.max || 100;
            let unitSet = "%";

            if(this.unit){
                unitSet = this.unit
            }

            let titleSet = false;
            if(this.showtitle){
                titleSet = true
            }

            let ChartOption = {
                series: [
                    {
                        name: name,
                        type: 'gauge',
                        radius:'90%',
                        axisLabel: {
                            show: false
                        },
                        axisLine: {
                            lineStyle: {  
                                width:12,
                                color:standard_data
                            }
                        },
                        max:max_data,
                        axisTick:{
                            show:false
                        },
                        splitLine:{
                            length:12
                        },
                        pointer:{
                            width:5
                        },
                        title:{
                            show:titleSet,
                            offsetCenter:[0, '95%'],
                            color:'#37a2da',
                            fontSize:this.titlesize

                        },
                        detail:{
                            offsetCenter:[0, '60%'],
                            color:'#31c5e9',
                            fontSize:this.numsize,
                            formatter: function (value) {
                                return value + unitSet;
                            }
                        },
                        data:this.data.series
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