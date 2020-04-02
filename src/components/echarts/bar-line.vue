<template>
  <div :id="chartName" class="myChart"></div>
</template>

<script>
import * as util from "@/assets/util";
const echarts = window.echarts;
export default {
  props: {
    data: {
      type: Object,
      default: function() {
        return {};
      }
    },
    dataZoom: "",
    y: "",
    y1unit: "",
    y2unit: "",
    colors: {
      type: Array,
      default: function() {
        return [];
      }
    },
    areaColors: {
      type: Array,
      default: function() {
        return [];
      }
    },
    areaColors_status:{
      type: Boolean,
      default: function() {
        return false;
      }
    },
    axisPointer: "",
    boundaryGap: "",
    bartype: "",
    linestyle: {
        type: String,
        required: false,
        default: 'solid'
    },
    long: "",
    grid_left: "",
    grid_right: "",
    datazoom: "",
    datazoomend: "",
    orient: {
      type: String,
      default: "horizontal"
    },
    barWidth: {
        type: String,
        required: false,
        default: ''
    },
    legendShow: {
      type: Boolean,
      default: function() {
        return false;
      }
    }
  },
  data() {
    return {
      eChart: null,
      chartName: "chartBarLine" + Math.random() * 1000000,
      legend:true
    };
  },
  watch: {
    data: function() {
      this.drawCharts();
    }
  },
  methods: {
    drawCharts() {
      if (!this.data.series) {
        return false;
      }
      this.eChart.hideLoading();
      let seriesData = [];
      let data_length = this.data.series.length;
      let xAxis_length = this.data.xAxis.length;
      for (let i = 0; i < data_length; i++) {
        const e = this.data.series[i];
        e.barMaxWidth = 30;
        e.itemStyle = {
          normal: {
            color: this.colors[i]
          }
        };
        if(e.type==='line'){
            e.linestyle = {
                type: this.linestyle,
                width:1
            }
        }
        if(this.areaColors_status){
            e.areaStyle = {
              color: this.areaColors[i] || "transparent"
            };
        }
        e.smooth = true;
        e.barWidth = this.barWidth;

        seriesData.push(e);
      }
        //console.log(seriesData)
      let grid_left = this.grid_left || 65,
        grid_right = this.grid_right || 50,
        grid_top = 40,
        grid_bottom = 60;

      let dataZoomShow = false,
        dataZoomEnd = 100;
      if (data_length == 1 && !this.legendShow) {
            this.legend = false;
            grid_top = 15;
      }

      //console.log(xAxis_length);
      let showCount = 12;
      if (this.long == "true") {
        showCount = 20;
      }
      if (xAxis_length > showCount) {
        dataZoomShow = true;
        dataZoomEnd = 100 / Math.ceil(xAxis_length / showCount);
      } else {
        grid_bottom = 30;
      }

      if (this.datazoom) {
        dataZoomShow = true;
        grid_bottom = 60;
      }
      if (this.datazoomend) {
        dataZoomEnd = this.datazoomend;
      }

      let boundaryGapSet = true;
      if (this.boundaryGap == "false") {
        boundaryGapSet = false;
      }

      let y1unit = this.y1unit || "";
      let y2unit = this.y2unit || "";
      let yAxisSet = [
        {
          type: "value",
          name: "",
          axisLabel: {
            formatter: "{value}" + y1unit
          },
          minInterval:1
        }
      ];
      if (this.y == "2") {
        yAxisSet = [
          {
            type: "value",
            name: "",
            axisLabel: {
              formatter: "{value}" + y1unit
            },
            minInterval:1
          },
          {
            type: "value",
            name: "",
            axisLabel: {
              formatter: "{value}" + y2unit
            },
            minInterval:1
          }
        ];
      } else {
        grid_right = 10;
      }
      // 兼容右侧图例
      if (this.orient === "vertical") {
        grid_top = 8;
        grid_right = 120;
      }

      let xAxisSet = [
        {
          type: "category",
          data: this.data.xAxis,
          axisPointer: {
            type: this.axisPointer || "shadow"
          },
          axisLabel: {
            //interval:0,
            rotate: 0
          },
          boundaryGap: boundaryGapSet
        }
      ];

      let xset, yset;
      if (this.bartype) {
        xset = yAxisSet;
        yset = xAxisSet;
      } else {
        xset = xAxisSet;
        yset = yAxisSet;
      }

      let ChartOption = {
        grid: {
          left: grid_left,
          right: grid_right,
          top: grid_top,
          bottom: grid_bottom
        },
        tooltip: {
          trigger: "axis"
          //formatter:'{a}：{c}<br />{a1}：{c1}%<br />{a2}：{c2}%'
        },
        legend: {
          type: "scroll",
          /* pageIconColor:'#aaaaaa',
                    pageIconInactiveColor:'#334754',
                    pageTextStyle:{
                        color:'#ffffff'
                    }, */
          show: this.legend,
          data: this.data.series.map(e => {
            return e.name;
          }),
          orient: this.orient,
          right: "center",
          top:5
        },
        dataZoom: [
          {
            show: dataZoomShow,
            type: "slider",
            end: dataZoomEnd,
            height: 20,
            showDataShadow: false,
            textStyle: {
              color: "#fff",
              fontSize: "0"
            },
            zoomLock: true
          }
          /* {
                        show:dataZoomShow,
                        type: 'inside',
                        end:dataZoomEnd
                    } */
        ],
        xAxis: xset,
        yAxis: yset,
        series: seriesData
      };
      this.eChart.setOption(ChartOption, true);
      util.on("resize", () => {
        this.eChart.resize();
      });
    }
  },
  mounted() {
    if (!this.eChart) {
      this.eChart = echarts.init(
        document.getElementById(this.chartName),
        "chalk"
      );
      this.eChart.showLoading({
        text: "",
        color: "#ffffff",
        textColor: "#ffffff",
        maskColor: "transparent"
      });
      this.drawCharts();
    }
  }
};
</script>