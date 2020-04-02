<template>
    <div class="myChart radar">
        <div class="total digital">{{data.total}}</div>
        <div :id="chartName" class="myChart"></div>
    </div>
</template>

<script>
import * as util from '@/assets/util';
const echarts = window.echarts
export default {
    props: {
        data:{},
        colors:""
    },
    data () {
        return {
            eChart:null,
            chartName:'chartDotted' + Math.random()*1000000
        }
    },
    watch:{
        'data':function(){
            this.drawCharts();
        }
    },
    methods: {
        drawCharts(){
            //console.log(this.data);
            this.eChart.hideLoading();

            let colorsArray = []
            if(this.colors){
                colorsArray = this.colors.split(",")
            }
            //console.log(colorsArray);

            let seriesDataArray = [];
            //console.log(this.data);
            for (let i = 0; i < this.data.legend.length; i++) {
                const e = this.data.legend[i];

                let seriesData = this.data.series[i]
                //console.log(seriesData);
                let seriesDataList = [];
                for (let ii = 0; ii < seriesData.length; ii++) {
                    const ee = seriesData[ii];
                    ee.push(this.data.name[ii]);
                    ee.push(e);
                    seriesDataList.push(ee);
                }
                //console.log(seriesDataList);

                let series = {
                    name: e,
                    data: seriesDataList,
                    type: 'scatter',
                    symbolSize: function (data) {
                        return Math.sqrt(data[2])*3;
                    },
                    label: {
                        emphasis: {
                            show: true,
                            formatter: function (param) {
                                return param.data[3];
                            },
                            position: 'top'
                        }
                    },
                    itemStyle: {
                        normal: {
                            shadowBlur: 10,
                            shadowColor: 'rgba(120, 36, 50, 0.5)',
                            shadowOffsetY: 5,
                            color:colorsArray[i%colorsArray.length]
                        }
                    }
                }

                seriesDataArray.push(series);

            }
            //console.log(seriesDataArray);

            let ChartOption = {
                legend: {
                    show:false,
                    right: 10,
                    type: 'scroll',
                    orient:'vertical',
                    data:this.data.legend
                },
                xAxis: {
                    splitLine: {
                        lineStyle: {
                            type: 'dashed',
                            color:'#ffffff',
                            width:1,
                            opacity:1
                        }
                    },
                    axisLabel: {
                        formatter: '{value}'+'%'
                    }
                },
                yAxis: {
                    splitLine: {
                        lineStyle: {
                            type: 'dashed',
                            color:'#ffffff',
                            width:1,
                            opacity:1
                        }
                    },
                    scale: true
                },
                series:seriesDataArray
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