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
        shape:"",
        color:""
    },
    data () {
        return {
            eChart:null,
            chartName:'chartSunburst' + Math.random()*1000000
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

            let ChartOption = {
                tooltip: {
                    trigger: 'item',
                    //formatter:'{a}：{c}<br />{a1}：{c1}%<br />{a2}：{c2}%'
                },
                series: {
                    type: 'sunburst',
                    // highlightPolicy: 'ancestor',
                    data:this.data.series,
                    radius: [0, '90%'],
                    label: {
                        rotate: 'radial'
                    }
                }
            }
            this.eChart.setOption(ChartOption,true)
            util.on('resize', () => { this.eChart.resize()})
        }
    },
    mounted(){
        if (!this.eChart) {
            this.eChart = echarts.init(document.getElementById(this.chartName),'chalk');
            this.eChart.showLoading({
                text:'',
                color:'#ffffff',
                textColor:'#ffffff',
                maskColor:'transparent',
            });
            this.drawCharts();
        }
    }
}
</script>