<template>
    <div :id="chartName" class="myChart"></div>
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
        }
    },
    data () {
        return {
            eChart:null,
            chartName:'chartPieCircle' + Math.random()*1000000
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
            
            let data = this.data.series;
            //console.log(data);

            let legendData = [],
                legendData1 = [],
                legendData2 = [],
                seriesData1 = [],
                seriesData2 = [];
            for (let i = 0; i < data.length; i++) {
                const e = data[i];
                legendData1.push(e.name);
                seriesData1.push({value:e.value,name:e.name})
            }
            for (let i = 0; i < data.length; i++) {
                const e = data[i];
                if(e.children.length == 0){
                    seriesData2.push({value:e.value,name:e.name});
                }
                for (let ii = 0; ii < e.children.length; ii++) {
                    const ee = e.children[ii];
                    legendData2.push(ee.name);
                    seriesData2.push({value:ee.value,name:ee.name});
                }
            }
            legendData = legendData1.concat(legendData2);

            let ChartOption = {
                tooltip : {
                    trigger: 'item',
                    formatter: "{a} <br/>{b}: {c} ({d}%)"
                },
                color:this.colors,
                legend:{
                    type: 'scroll',
                    orient: 'vertical',
                    left: 'left',
                    data:legendData,
                    pageIconColor:'#aaaaaa',
                    pageIconInactiveColor:'#334754',
                    pageTextStyle:{
                        color:'#ffffff'
                    }
                },
                series:[
                    {
                        name:'访问来源',
                        type:'pie',
                        selectedMode: 'single',
                        radius: [0, '30%'],
                        label: {
                            normal: {
                                show: false
                            }
                        },
                        labelLine: {
                            normal: {
                                show: false
                            }
                        },
                        data:seriesData1
                    },
                    {
                        name:'访问来源',
                        type:'pie',
                        radius: ['40%', '55%'],
                        label: {
                            normal: {
                                show: false
                            }
                        },
                        data:seriesData2
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