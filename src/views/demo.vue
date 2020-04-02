<template>
    <div class="demo window">
        <div>
        <el-row :gutter="20">
            <el-col :span="12">
                <div class="chartBox">
                    <ecradar :data="radarData" shape="circle" color="#f8f80b"></ecradar>
                </div>
                <div class="tc"><el-button @click="showRadar">showData</el-button></div>
<el-dialog title="数据格式" :visible.sync="ecradar_show" width="50%">
<pre>
<code>&lt;ecradar :data="radarData" shape="circle" color="#f8f80b"&gt;&lt;/ecradar&gt;</code>


{
    "indicator": [
        {
            "name": "老有所养",
            "max": 50
        },
        {
            "name": "老有所医",
            "max": 30
        },
        {
            "name": "老有所安",
            "max": 30
        },
        {
            "name": "老有所学",
            "max": 20
        },
        {
            "name": "老有所乐",
            "max": 20
        },
        {
            "name": "老有所为",
            "max": 10
        }
    ],
    "value": [32,20,15,8,8,6],
    "total": 600
}
</pre>
</el-dialog>
            </el-col>
            <el-col :span="12">
                <div class="chartBox">
                    <ecbarline :data="comData" :colors="comColors" y="2" y1unit="w" y2unit="%"></ecbarline>
                </div>
<div class="tc"><el-button @click="show">showData</el-button></div>
<el-dialog title="数据格式" :visible.sync="ec_show" width="50%">
<pre>
<code>&lt;ecbarline :data="comData" :colors="comColors" y="2" y1unit="w" y2unit="%"&gt;&lt;/ecbarline&gt;</code>


{
    "xAxis": [
        "机构名称1",
        "机构名称2",
        "机构名称3",
        "机构名称4",
        "机构名称5",
        "机构名称6"
    ],
    "series": [
        {
            "name": "养老床位数",
            "type": "bar",
            "stack": "aaa",
            "yAxisIndex": 0,
            "data": [150,200,70,150,200,70]
        },
        {
            "name": "入住率",
            "type": "bar",
            "stack": "aaa",
            "yAxisIndex": 0,
            "data": [80,30,50,80,30,50]
        },
        {
            "name": "满意度",
            "type": "line",
            "stack": "",
            "yAxisIndex": 1,
            "data": [90,50,80,90,50,80]
        }
    ],
    "total": 600
}
</pre>
</el-dialog>
            </el-col>
            <el-col :span="12">
                <div class="chartBox">
                    <ecbarline :data="comData1" :colors="comColors"></ecbarline>
                </div>
<div class="tc"><el-button @click="show1">showData</el-button></div>
<el-dialog title="数据格式" :visible.sync="ec_show1" width="50%">
<pre>
<code>&lt;ecbarline :data="comData1" :colors="comColors"&gt;&lt;/ecbarline&gt;</code>


{
    "xAxis": [
        "机构名称1",
        "机构名称2",
        "机构名称3",
        "机构名称4",
        "机构名称5",
        "机构名称6"
    ],
    "series": [
        {
            "name": "养老床位数",
            "type": "bar",
            "stack": "",
            "yAxisIndex": 0,
            "data": [150,200,70,150,200,70]
        },
        {
            "name": "入住率",
            "type": "bar",
            "stack": "",
            "yAxisIndex": 0,
            "data": [80,30,50,80,30,50]
        },
        {
            "name": "满意度",
            "type": "line",
            "stack": "",
            "yAxisIndex": 0,
            "data": [90,50,80,90,50,80]
        }
    ],
    "total": 600
}
</pre>
</el-dialog>
            </el-col>
            <el-col :span="12">
                <div class="chartBox">
                    <ecbarline :data="comData2" :colors="comColors" y1unit="%"></ecbarline>
                </div>
<div class="tc"><el-button @click="show2">showData</el-button></div>
<el-dialog title="数据格式" :visible.sync="ec_show2" width="50%">
<pre>
<code>&lt;ecbarline :data="comData2" :colors="comColors" y1unit="%"&gt;&lt;/ecbarline&gt;</code>


{
    "xAxis": [
        "机构名称1",
        "机构名称2",
        "机构名称3",
        "机构名称4",
        "机构名称5",
        "机构名称6",
        "机构名称7",
        "机构名称8",
        "机构名称9",
        "机构名称10",
        "机构名称11",
        "机构名称12"
    ],
    "series": [
        {
            "name": "养老床位数",
            "type": "bar",
            "stack": "",
            "yAxisIndex": 0,
            "data": [150,200,70,150,200,70,150,200,70,150,200,70]
        }
    ],
    "total": 600
}
</pre>
</el-dialog>
            </el-col>
            <el-col :span="12">
                <div class="chartBox">
                    <ecbarline :data="comData6" :colors="comColors" bartype="horizontal"></ecbarline>
                </div>
<div class="tc"><el-button @click="show6">showData</el-button></div>
<el-dialog title="数据格式" :visible.sync="ec_show6" width="50%">
<pre>
<code>&lt;ecbarline :data="comData6" :colors="comColors" bartype="horizontal"&gt;&lt;/ecbarline&gt;</code>


{
    "xAxis": [
        "机构名称1",
        "机构名称2",
        "机构名称3",
        "机构名称4",
        "机构名称5",
        "机构名称6",
    ],
    "series": [
        {
            "name": "养老床位数",
            "type": "bar",
            "stack": "",
            "yAxisIndex": 0,
            "data": [150,200,70,150,200,70]
        }
    ],
    "total": 600
}
</pre>
</el-dialog>
            </el-col>
            <el-col :span="12">
                <div class="chartBox">
                    <ecbarline :data="comData3" :colors="comColors" axisPointer="line"></ecbarline>
                </div>
<div class="tc"><el-button @click="show3">showData</el-button></div>
<el-dialog title="数据格式" :visible.sync="ec_show3" width="50%">
<pre>
<code>&lt;ecbarline :data="comData3" :colors="comColors" axisPointer="line"&gt;&lt;/ecbarline&gt;</code>


{
    "xAxis": [
        "机构名称1",
        "机构名称2",
        "机构名称3",
        "机构名称4",
        "机构名称5",
        "机构名称6",
        "机构名称7",
        "机构名称8",
        "机构名称9",
        "机构名称10"
    ],
    "series": [
        {
            "name": "养老床位数",
            "type": "line",
            "stack": "",
            "yAxisIndex": 0,
            "data": [150,200,70,150,200,70,150,200,70,150]
        },
        {
            "name": "入住率",
            "type": "line",
            "stack": "",
            "yAxisIndex": 0,
            "data": [80,30,50,80,30,50,80,30,50,80]
        },
        {
            "name": "满意度",
            "type": "line",
            "stack": "",
            "yAxisIndex": 0,
            "data": [90,50,80,90,50,80,90,50,80,90]
        }
    ],
    "total": 600
}
</pre>
</el-dialog>
            </el-col>
            <el-col :span="12">
                <div class="chartBox">
                    <ecbarline :data="comData4" :colors="comColors" axisPointer="line"></ecbarline>
                </div>
<div class="tc"><el-button @click="show4">showData</el-button></div>
<el-dialog title="数据格式" :visible.sync="ec_show4" width="50%">
<pre>
<code>&lt;ecbarline :data="comData4" :colors="comColors" axisPointer="line"&gt;&lt;/ecbarline&gt;</code>


{
    "xAxis": [
        "机构名称1",
        "机构名称2",
        "机构名称3",
        "机构名称4",
        "机构名称5",
        "机构名称6",
        "机构名称7",
        "机构名称8",
        "机构名称9",
        "机构名称10"
    ],
    "series": [
        {
            "name": "养老床位数",
            "type": "line",
            "stack": "",
            "yAxisIndex": 0,
            "data": [150,200,70,150,200,70,150,200,70,150]
        }
    ],
    "total": 600
}
</pre>
</el-dialog>
            </el-col>
            <el-col :span="12">
                <div class="chartBox">
                    <ecbarline :data="comData5" :colors="comColors" :areaColors="comAreaColors" axisPointer="line" boundaryGap="false"></ecbarline>
                </div>
<div class="tc"><el-button @click="show5">showData</el-button></div>
<el-dialog title="数据格式" :visible.sync="ec_show5" width="60%">
<pre>
<code>&lt;ecbarline :data="comData5" :colors="comColors" :areaColors="comAreaColors" axisPointer="line" boundaryGap="false"&gt;&lt;/ecbarline&gt;</code>

{
    "xAxis": [
        "机构名称1",
        "机构名称2",
        "机构名称3",
        "机构名称4",
        "机构名称5",
        "机构名称6",
        "机构名称7",
        "机构名称8",
        "机构名称9",
        "机构名称10"
    ],
    "series": [
        {
            "name": "养老床位数",
            "type": "line",
            "stack": "aa",
            "yAxisIndex": 0,
            "data": [150,200,70,150,200,70,150,200,70,150]
        },
        {
            "name": "入住率",
            "type": "line",
            "stack": "aa",
            "yAxisIndex": 0,
            "data": [80,30,50,80,30,50,80,30,50,80]
        },
        {
            "name": "满意度",
            "type": "line",
            "stack": "aa",
            "yAxisIndex": 0,
            "data": [90,50,80,90,50,80,90,50,80,90]
        }
    ],
    "total": 600
}
</pre>
</el-dialog>
            </el-col>
            <el-col :span="12">
                <div class="chartBox">
                    <ecbarpolar :data="comData9" :colors="comColors"></ecbarpolar>
                </div>
<div class="tc"><el-button @click="show11">showData</el-button></div>
<el-dialog title="数据格式" :visible.sync="ec_show11" width="60%">
<pre>
<code>&lt;ecbarpolar :data="comData9" :colors="comColors"&gt;&lt;/ecbarpolar&gt;</code>


{
    "xAxis": [
        "机构名称1",
        "机构名称2",
        "机构名称3",
        "机构名称4",
        "机构名称5",
        "机构名称6"
    ],
    "series": [
        {
            "name": "养老床位数",
            "type": "bar",
            "stack": "aa",
            "yAxisIndex": 0,
            "data": [150,200,70,150,200,70]
        },
        {
            "name": "入住率",
            "type": "bar",
            "stack": "aa",
            "yAxisIndex": 0,
            "data": [80,30,50,80,30,50]
        },
        {
            "name": "满意度",
            "type": "bar",
            "stack": "aa",
            "yAxisIndex": 0,
            "data": [90,50,80,90,50,80]
        }
    ],
    "total": 600
}
</pre>
</el-dialog>
            </el-col>
            <el-col :span="12">
                <div class="chartBox">
                    <ecpie :data="comData7" :colors="comColors"></ecpie>
                </div>
<div class="tc"><el-button @click="show7">showData</el-button></div>
<el-dialog title="数据格式" :visible.sync="ec_show7" width="60%">
<pre>
<code>&lt;ecpie :data="comData7" :colors="comColors"&gt;&lt;/ecpie&gt;</code>


{
    "series": [
        {
            "name": "教飞信置",
            "value": 497
        },
        {
            "name": "入里完么",
            "value": 374
        },
        {
            "name": "但生战打",
            "value": 463
        },
        {
            "name": "近安什名",
            "value": 306
        },
        {
            "name": "图程还适",
            "value": 263
        },
        {
            "name": "感整有事",
            "value": 421
        },
        {
            "name": "办较书接",
            "value": 374
        },
        {
            "name": "队再划被",
            "value": 292
        },
        {
            "name": "第深强他",
            "value": 390
        },
        {
            "name": "委易标委",
            "value": 425
        }
    ],
    "total": 600
}
</pre>
</el-dialog>
            </el-col>
            <el-col :span="12">
                <div class="chartBox">
                    <ecpiecircle :data="comData10" :colors="comColors"></ecpiecircle>
                </div>
<div class="tc"><el-button @click="show12">showData</el-button></div>
<el-dialog title="数据格式" :visible.sync="ec_show12" width="60%">
<pre>
<code>&lt;ecpiecircle :data="comData10" :colors="comColors"&gt;&lt;/ecpiecircle&gt;</code>


{
    "series":[
        {
            "value":"335",
            "name":"直达",
            "children":[]
        },
        {
            "value":"679",
            "name":"营销广告",
            "children":[
                {
                    "value":"310",
                    "name":'邮件营销'
                },
                {
                    "value":"234",
                    "name":'联盟广告'
                },
                {
                    "value":"135",
                    "name":'视频广告'
                }
            ]
        },
        {
            "value":"1548",
            "name":"搜索引擎",
            "children":[
                {
                    "value":"1048",
                    "name":'百度'
                },
                {
                    "value":"251",
                    "name":'谷歌'
                },
                {
                    "value":"147",
                    "name":'必应'
                },
                {
                    "value":"102",
                    "name":'其他'
                }
            ]
        }
    ]
}
</pre>
</el-dialog>
            </el-col>
            <el-col :span="12">
                <div class="chartBox">
                    <ecpie :data="comData7" :colors="comColors" radius="50%,70%"></ecpie>
                </div>
<div class="tc"><el-button @click="show8">showData</el-button></div>
<el-dialog title="数据格式" :visible.sync="ec_show8" width="60%">
<pre>
<code>&lt;ecpie :data="comData7" :colors="comColors" radius="50%,70%"&gt;&lt;/ecpie&gt;</code>


{
    "series": [
        {
            "name": "教飞信置",
            "value": 497
        },
        {
            "name": "入里完么",
            "value": 374
        },
        {
            "name": "但生战打",
            "value": 463
        },
        {
            "name": "近安什名",
            "value": 306
        },
        {
            "name": "图程还适",
            "value": 263
        },
        {
            "name": "感整有事",
            "value": 421
        },
        {
            "name": "办较书接",
            "value": 374
        },
        {
            "name": "队再划被",
            "value": 292
        },
        {
            "name": "第深强他",
            "value": 390
        },
        {
            "name": "委易标委",
            "value": 425
        }
    ],
    "total": 600
}
</pre>
</el-dialog>
            </el-col>
            <el-col :span="12">
                <div class="chartBox">
                    <ecpie :data="comData7" :colors="comColors" radius="30,110" type="rose" lable="false" legend_position="false"></ecpie>
                </div>
<div class="tc"><el-button @click="show9">showData</el-button></div>
<el-dialog title="数据格式" :visible.sync="ec_show9" width="60%">
<pre>
<code>&lt;ecpie :data="comData7" :colors="comColors" radius="30,110" type="rose" lable="false" legend_position="false"&gt;&lt;/ecpie&gt;</code>


{
    "series": [
        {
            "name": "教飞信置",
            "value": 497
        },
        {
            "name": "入里完么",
            "value": 374
        },
        {
            "name": "但生战打",
            "value": 463
        },
        {
            "name": "近安什名",
            "value": 306
        },
        {
            "name": "图程还适",
            "value": 263
        },
        {
            "name": "感整有事",
            "value": 421
        },
        {
            "name": "办较书接",
            "value": 374
        },
        {
            "name": "队再划被",
            "value": 292
        },
        {
            "name": "第深强他",
            "value": 390
        },
        {
            "name": "委易标委",
            "value": 425
        }
    ],
    "total": 600
}
</pre>
</el-dialog>
            </el-col>
            <el-col :span="12">
                <div class="chartBox">
                    <ecgauge :data="comData8" showtitle="true" unit="%"></ecgauge>
                </div>
<div class="tc"><el-button @click="show10">showData</el-button></div>
<el-dialog title="数据格式" :visible.sync="ec_show10" width="60%">
<pre>
<code>&lt;ecgauge :data="comData8" showtitle="true" unit="%"&gt;&lt;/ecgauge&gt;</code>


{
    "series": [
        {
            "name":"老人",
            "value":"39.5"
        }
    ],
    "max":"100"
}
</pre>
</el-dialog>
            </el-col>
            

            <el-col :span="12">
                <div class="chartBox">
                    <ecdotted :data="comData11" colors="#e6c757,#2aa7c8,#e79176"></ecdotted>
                </div>
<div class="tc"><el-button @click="show13">showData</el-button></div>
<el-dialog title="数据格式" :visible.sync="ec_show13" width="60%">
<pre>
<code>&lt;ecdotted :data="comData11" colors="#e6c757,#2aa7c8,#e79176"&gt;&lt;/ecdotted&gt;</code>


{
    "legend":['朝阳区'],
    "name":['养老院1','养老院2','养老院3'],
    "series":[
        [
            ['50','100','100'],
            ['77','200','200'],
            ['68','150','150'],
        ]
    ]
}
</pre>
</el-dialog>
            </el-col>

            <el-col :span="12">
                <div class="chartBox">
                    <ecsunburst :data="comData12"></ecsunburst>
                </div>
<div class="tc"><el-button @click="show14">showData</el-button></div>
<el-dialog title="数据格式" :visible.sync="ec_show14" width="60%">
<pre>
<code>&lt;ecsunburst :data="comData12"&gt;&lt;/ecsunburst&gt;</code>


{
    'series':[
        {
            name: '分类1',
            children:[
                {
                    name: '分类1-1',
                    value: 1,
                    children:[
                        {
                            name: '分类1-1-1',
                            value: 1
                        },
                        {
                            name: '分类1-1-2',
                            value: 1
                        },
                        {
                            name: '分类1-1-3',
                            value: 1
                        }
                    ]
                },
                {
                    name: '分类1-2',
                    value: 1,
                    children:[
                        {
                            name: '分类1-2-1',
                            value: 1
                        }, {
                            name: '分类1-2-2',
                            value: 1
                        }
                    ]
                }
            ]
        },
        {
            name: '分类2',
            children:[
                {
                    name: '分类2-1',
                    children: [
                        {
                            name: '分类2-1-1',
                            value: 1
                        }, {
                            name: '分类2-1-2',
                            value: 1
                        }
                    ]
                }
            ]
        },
        {
            name: '分类3',
            children:[
                {
                    name: '分类3-1',
                    children: [
                        {
                            name: '分类3-1-1',
                            value: 1
                        }, {
                            name: '分类3-1-2',
                            value: 1
                        }
                    ]
                }
            ]
        }
    ]
}
</pre>
</el-dialog>
            </el-col>

            <el-col :span="12">
                <div class="chartBox">
                    <ecpieprogress :number="progress.num" :total="progress.total" colors="#ff9f7f,#021837"></ecpieprogress>
                </div>
                <div class="tc"><el-button @click="show15">showData</el-button></div>
<el-dialog title="数据格式" :visible.sync="ec_show15" width="60%">
<pre>

<code>&lt;ecpieprogress :number="progress.num" :total="progress.total" colors="#ff9f7f,#021837"&gt;&lt;/ecpieprogress&gt;</code>

</pre>
</el-dialog>
            </el-col>
            <div style="height:100px; clear:both;"></div>
            <el-col :span="12">
                <swiper :options="swiperOption" ref="mySwiper" class="myswiper" id="myswiper">
                    <!-- slides -->
                    <swiper-slide>I'm Slide 1</swiper-slide>
                    <swiper-slide>I'm Slide 2</swiper-slide>
                    <swiper-slide>I'm Slide 3</swiper-slide>
                    <swiper-slide>I'm Slide 4</swiper-slide>
                    <swiper-slide>I'm Slide 5</swiper-slide>
                    <swiper-slide>I'm Slide 6</swiper-slide>
                    <swiper-slide>I'm Slide 7</swiper-slide>
                    <!-- Optional controls -->
                    <div class="swiper-pagination"  slot="pagination"></div>
                    <div class="swiper-button-prev" slot="button-prev"></div>
                    <div class="swiper-button-next" slot="button-next"></div>
                </swiper>
            </el-col>
            <el-col :span="12">
                <swiper v-if="swiperSlides.length > 1" :options="swiperAsyncOption" class="myswiper" id="myswiperAsync">
                    <swiper-slide v-for="(slide, index) in swiperSlides" :key="index">I'm Slide {{ slide }}</swiper-slide>
                    <div class="swiper-pagination" slot="pagination"></div>
                </swiper>
            </el-col>
            <div style="height:100px; clear:both;"></div>

            <el-col :span="24">
                <div class="chartBox">
                    <ecbarline :data="comData2" :colors="comColors" y1unit="%" long="true"></ecbarline>
                </div>
<div class="tc"><el-button @click="show2">showData</el-button></div>
<el-dialog title="数据格式" :visible.sync="ec_show2" width="50%">
<pre>
<code>&lt;ecbarline :data="comData2" :colors="comColors" y1unit="%" long="true"&gt;&lt;/ecbarline&gt;</code>


{
    "xAxis": [
        "机构名称1",
        "机构名称2",
        "机构名称3",
        "机构名称4",
        "机构名称5",
        "机构名称6",
        "机构名称7",
        "机构名称8",
        "机构名称9",
        "机构名称10",
        "机构名称11",
        "机构名称12"
    ],
    "series": [
        {
            "name": "养老床位数",
            "type": "bar",
            "stack": "",
            "yAxisIndex": 0,
            "data": [150,200,70,150,200,70,150,200,70,150,200,70]
        }
    ],
    "total": 600
}
</pre>
</el-dialog>
            </el-col>
        </el-row>
        </div>
    </div>
</template>

<script>
import ecradar from "@/components/echarts/radar.vue"
import ecbarline from "@/components/echarts/bar-line.vue"
import ecbarpolar from "@/components/echarts/bar-polar.vue"
import ecpie from "@/components/echarts/pie.vue"
import ecpiecircle from "@/components/echarts/pie-circle.vue"
import ecgauge from "@/components/echarts/gauge.vue"
import ecdotted from "@/components/echarts/dotted.vue"
import ecsunburst from "@/components/echarts/sunburst.vue"
import ecpieprogress from "@/components/echarts/pie-progress.vue"


import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'


export default {
    components: {
        
        ecradar,
        ecbarline,
        ecbarpolar,
        ecpie,
        ecpiecircle,
        ecgauge,
        ecdotted,
        ecsunburst,
        ecpieprogress,


        swiper,
        swiperSlide

    },
    data () {
        return {
            pieData:[],
            barData:{},
            Y2Data:{},
            radarData:{
                "indicator": [
                    {
                        "name": "老有所养",
                        "max": 50
                    },
                    {
                        "name": "老有所医",
                        "max": 30
                    },
                    {
                        "name": "老有所安",
                        "max": 30
                    },
                    {
                        "name": "老有所学",
                        "max": 20
                    },
                    {
                        "name": "老有所乐",
                        "max": 20
                    },
                    {
                        "name": "老有所为",
                        "max": 10
                    }
                ],
                "value": [32,20,15,8,8,6],
                "total": 600
            },



            comData:{
                "xAxis": [
                    "机构名称1",
                    "机构名称2",
                    "机构名称3",
                    "机构名称4",
                    "机构名称5",
                    "机构名称6"
                ],
                "series": [
                    {
                        "name": "养老床位数",
                        "type": "bar",
                        "stack": "aaa",
                        "yAxisIndex": 0,
                        "data": [150,200,70,150,200,70]
                    },
                    {
                        "name": "入住率",
                        "type": "bar",
                        "stack": "aaa",
                        "yAxisIndex": 0,
                        "data": [80,30,50,80,30,50]
                    },
                    {
                        "name": "满意度",
                        "type": "line",
                        "stack": "",
                        "yAxisIndex": 1,
                        "data": [90,50,80,90,50,80]
                    }
                ],
                "total": 600
            },

            comData1:{
                "xAxis": [
                    "机构名称1",
                    "机构名称2",
                    "机构名称3",
                    "机构名称4",
                    "机构名称5",
                    "机构名称6"
                ],
                "series": [
                    {
                        "name": "养老床位数",
                        "type": "bar",
                        "stack": "",
                        "yAxisIndex": 0,
                        "data": [150,200,70,150,200,70]
                    },
                    {
                        "name": "入住率",
                        "type": "bar",
                        "stack": "",
                        "yAxisIndex": 0,
                        "data": [80,30,50,80,30,50]
                    },
                    {
                        "name": "满意度",
                        "type": "line",
                        "stack": "",
                        "yAxisIndex": 0,
                        "data": [90,50,80,90,50,80]
                    }
                ],
                "total": 600
            },

            comData2:{
                "xAxis": [
                    "机构名称1",
                    "机构名称2",
                    "机构名称3",
                    "机构名称4",
                    "机构名称5",
                    "机构名称6",
                    "机构名称7",
                    "机构名称8",
                    "机构名称9",
                    "机构名称10",
                    "机构名称1",
                    "机构名称2",
                    "机构名称3",
                    "机构名称4",
                    "机构名称5",
                    "机构名称6",
                    "机构名称7",
                    "机构名称8",
                    "机构名称9",
                    "机构名称10",
                    "机构名称1",
                    "机构名称2",
                    "机构名称3",
                    "机构名称4",
                    "机构名称5",
                    "机构名称6",
                    "机构名称7",
                    "机构名称8",
                    "机构名称9",
                    "机构名称10",
                    "机构名称1",
                    "机构名称2",
                    "机构名称3",
                    "机构名称4",
                    "机构名称5",
                    "机构名称6",
                    "机构名称7",
                    "机构名称8",
                    "机构名称9",
                    "机构名称10",
                    "机构名称1",
                    "机构名称2",
                    "机构名称3",
                    "机构名称4",
                    "机构名称5",
                ],
                "series": [
                    {
                        "name": "养老床位数",
                        "type": "bar",
                        "stack": "",
                        "yAxisIndex": 0,
                        "data": [150,200,70,150,200,70,150,200,70,150,  150,200,70,150,200,70,150,200,70,150, 150,200,70,150,200,70,150,200,70,150, 150,200,70,150,200,70,150,200,70,150, 150,200,70,150,200]
                    }
                ],
                "total": 600
            },

            comData3:{
                "xAxis": [
                    "机构名称1",
                    "机构名称2",
                    "机构名称3",
                    "机构名称4",
                    "机构名称5",
                    "机构名称6",
                    "机构名称7",
                    "机构名称8",
                    "机构名称9",
                    "机构名称10"
                ],
                "series": [
                    {
                        "name": "养老床位数",
                        "type": "line",
                        "stack": "",
                        "yAxisIndex": 0,
                        "data": [150,200,70,150,200,70,150,200,70,150]
                    },
                    {
                        "name": "入住率",
                        "type": "line",
                        "stack": "",
                        "yAxisIndex": 0,
                        "data": [80,30,50,80,30,50,80,30,50,80]
                    },
                    {
                        "name": "满意度",
                        "type": "line",
                        "stack": "",
                        "yAxisIndex": 0,
                        "data": [90,50,80,90,50,80,90,50,80,90]
                    }
                ],
                "total": 600
            },

            comData4:{
                "xAxis": [
                    "机构名称1",
                    "机构名称2",
                    "机构名称3",
                    "机构名称4",
                    "机构名称5",
                    "机构名称6",
                    "机构名称7",
                    "机构名称8",
                    "机构名称9",
                    "机构名称10"
                ],
                "series": [
                    {
                        "name": "养老床位数",
                        "type": "line",
                        "stack": "",
                        "yAxisIndex": 0,
                        "data": [150,200,70,150,200,70,150,200,70,150]
                    }
                ],
                "total": 600
            },

            comData5:{
                "xAxis": [
                    "机构名称1",
                    "机构名称2",
                    "机构名称3",
                    "机构名称4",
                    "机构名称5",
                    "机构名称6",
                    "机构名称7",
                    "机构名称8",
                    "机构名称9",
                    "机构名称10"
                ],
                "series": [
                    {
                        "name": "养老床位数",
                        "type": "line",
                        "stack": "aa",
                        "yAxisIndex": 0,
                        "data": [150,200,70,150,200,70,150,200,70,150]
                    },
                    {
                        "name": "入住率",
                        "type": "line",
                        "stack": "aa",
                        "yAxisIndex": 0,
                        "data": [80,30,50,80,30,50,80,30,50,80]
                    },
                    {
                        "name": "满意度",
                        "type": "line",
                        "stack": "aa",
                        "yAxisIndex": 0,
                        "data": [90,50,80,90,50,80,90,50,80,90]
                    }
                ],
                "total": 600
            },

            comData6:{
                "xAxis": [
                    "机构名称1",
                    "机构名称2",
                    "机构名称3",
                    "机构名称4",
                    "机构名称5",
                    "机构名称6",
                ],
                "series": [
                    {
                        "name": "养老床位数",
                        "type": "bar",
                        "stack": "",
                        "yAxisIndex": 0,
                        "data": [150,200,70,150,200,70]
                    }
                ],
                "total": 600
            },

            comData7:{
                "series": [
                    {
                        "name": "教飞信置",
                        "value": 497
                    },
                    {
                        "name": "入里完么",
                        "value": 374
                    },
                    {
                        "name": "但生战打",
                        "value": 463
                    },
                    {
                        "name": "近安什名",
                        "value": 306
                    },
                    {
                        "name": "图程还适",
                        "value": 263
                    },
                    {
                        "name": "感整有事",
                        "value": 421
                    },
                    {
                        "name": "办较书接",
                        "value": 374
                    },
                    {
                        "name": "队再划被",
                        "value": 292
                    },
                    {
                        "name": "第深强他",
                        "value": 390
                    },
                    {
                        "name": "委易标委",
                        "value": 425
                    }
                ],
                "total": 600
            },

            comData8:{
                "series": [
                    {
                        "name":"老人",
                        "value":"39.5"
                    }
                ],
                "max":"100"
            },

            comData9:{
                "xAxis": [
                    "机构名称1",
                    "机构名称2",
                    "机构名称3",
                    "机构名称4",
                    "机构名称5",
                    "机构名称6"
                ],
                "series": [
                    {
                        "name": "养老床位数",
                        "type": "bar",
                        "stack": "aa",
                        "yAxisIndex": 0,
                        "data": [150,200,70,150,200,70]
                    },
                    {
                        "name": "入住率",
                        "type": "bar",
                        "stack": "aa",
                        "yAxisIndex": 0,
                        "data": [80,30,50,80,30,50]
                    },
                    {
                        "name": "满意度",
                        "type": "bar",
                        "stack": "aa",
                        "yAxisIndex": 0,
                        "data": [90,50,80,90,50,80]
                    }
                ],
                "total": 600
            },

            comData10:{
                "series":[
                    {
                        "value":"335",
                        "name":"直达",
                        "children":[]
                    },
                    {
                        "value":"679",
                        "name":"营销广告",
                        "children":[
                            {
                                "value":"310",
                                "name":'邮件营销'
                            },
                            {
                                "value":"234",
                                "name":'联盟广告'
                            },
                            {
                                "value":"135",
                                "name":'视频广告'
                            }
                        ]
                    },
                    {
                        "value":"1548",
                        "name":"搜索引擎",
                        "children":[
                            {
                                "value":"1048",
                                "name":'百度'
                            },
                            {
                                "value":"251",
                                "name":'谷歌'
                            },
                            {
                                "value":"147",
                                "name":'必应'
                            },
                            {
                                "value":"102",
                                "name":'其他'
                            }
                        ]
                    }
                ]
            },

            comData11:{
                "legend":['朝阳区'],
                "name":['养老院1','养老院2','养老院3'],
                "series":[
                    [
                        ['50','100','100'],
                        ['77','200','200'],
                        ['68','150','150'],
                    ]
                ]
            },

            comData12:{
                'series':[
                    {
                        name: '分类1',
                        children:[
                            {
                                name: '分类1-1',
                                value: 1,
                                children:[
                                    {
                                        name: '分类1-1-1',
                                        value: 1
                                    },
                                    {
                                        name: '分类1-1-2',
                                        value: 1
                                    },
                                    {
                                        name: '分类1-1-3',
                                        value: 1
                                    }
                                ]
                            },
                            {
                                name: '分类1-2',
                                value: 1,
                                children:[
                                    {
                                        name: '分类1-2-1',
                                        value: 1
                                    }, {
                                        name: '分类1-2-2',
                                        value: 1
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '分类2',
                        children:[
                            {
                                name: '分类2-1',
                                children: [
                                    {
                                        name: '分类2-1-1',
                                        value: 1
                                    }, {
                                        name: '分类2-1-2',
                                        value: 1
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '分类3',
                        children:[
                            {
                                name: '分类3-1',
                                children: [
                                    {
                                        name: '分类3-1-1',
                                        value: 1
                                    }, {
                                        name: '分类3-1-2',
                                        value: 1
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },

            comColors:['#9d96f5','#8378ea','#cf6181','#eba422','#5e7e54','#e44f2f','#81b6b2','#eba422','#5e7e54','#e44f2f'],
            comAreaColors:['#b5afff','#8c80fd','#ff789f','#eba422','#5e7e54','#e44f2f','#81b6b2','#eba422','#5e7e54','#e44f2f'],




            progress:{
                num:9,
                total:10
            },
            queryParam:{},

            swiperOption: {
                slidesPerView: 3,
                spaceBetween: 30,
                slidesPerGroup: 3,
                autoplay: {
                    delay:5000,
                    stopOnLastSlide:false,
                    disableOnInteraction:false,
                },
                loop: false,
                loopFillGroupWithBlank: true,
                pagination: {
                    el: '.swiper-pagination',
                    clickable: true
                },
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev'
                }
            },

            swiperAsyncOption: {
                slidesPerView: 3,
                spaceBetween: 30,
                slidesPerGroup: 3,
                autoplay: {
                    delay:5000,
                    stopOnLastSlide:false,
                    disableOnInteraction:false,
                },
                loop: false,
                loopFillGroupWithBlank: true,
                pagination: {
                    el: '.swiper-pagination',
                    clickable: true
                },
                /* navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev'
                } */
            },
            swiperSlides: [1, 2, 3, 4, 5],


            ecradar_show:false,
            ec_show:false,
            ec_show1:false,
            ec_show2:false,
            ec_show3:false,
            ec_show4:false,
            ec_show5:false,
            ec_show6:false,
            ec_show7:false,
            ec_show8:false,
            ec_show9:false,
            ec_show10:false,
            ec_show11:false,
            ec_show12:false,
            ec_show13:false,
            ec_show14:false,
            ec_show15:false
        }
    },
    methods:{
        fetchData() {

            setInterval(() => {
                if (this.swiperSlides.length < 10) {
                    this.swiperSlides.push(this.swiperSlides.length + 1)
                }
            }, 3000)

        },
        showRadar(){
            this.ecradar_show = true;
        },
        show(){
            this.ec_show = true;
        },
        show1(){
            this.ec_show1 = true;
        },
        show2(){
            this.ec_show2 = true;
        },
        show3(){
            this.ec_show3 = true;
        },
        show4(){
            this.ec_show4 = true;
        },
        show5(){
            this.ec_show5 = true;
        },
        show6(){
            this.ec_show6 = true;
        },
        show7(){
            this.ec_show7 = true;
        },
        show8(){
            this.ec_show8 = true;
        },
        show9(){
            this.ec_show9 = true;
        },
        show10(){
            this.ec_show10 = true;
        },
        show11(){
            this.ec_show11 = true;
        },
        show12(){
            this.ec_show12 = true;
        },
        show13(){
            this.ec_show13 = true;
        },
        show14(){
            this.ec_show14 = true;
        },
        show15(){
            this.ec_show15 = true;
        }
    },
    computed: {
        swiper() {
            return this.$refs.mySwiper.swiper
        }
    },
    mounted: function(){
        this.fetchData();

        var comtainer = document.getElementById('myswiper');
        comtainer.onmouseenter = function () {
            this.swiper.autoplay.stop();
        };
        comtainer.onmouseleave = function () {
            this.swiper.autoplay.start();
        };

    }
}
</script>
<style>
pre,code { font-family:Verdana;}
pre { background-color:#f4f4f4; padding:20px; margin-top:0; margin-bottom:0; max-height:1000px; overflow:auto;}
.chartBox { width:100%; height:400px; position:relative;}
.myswiper .swiper-slide { height:200px; line-height:200px; text-align:center; background-color:#f4f4f4;}
.demo#app { background-size:100% 100%; height:auto; padding:50px; box-sizing:border-box;}
.demo .el-col { margin-bottom:50px;}
</style>
