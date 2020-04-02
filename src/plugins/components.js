import header1 from "@/components/header1";
import nodata from "@/components/nodata";
import bdmap from '@/components/bdmap';
import sidemenu from '@/components/sidemenu';
import loadcover from '@/components/loading';
import loadsm from '@/components/loading-sm';

/* echarts */
import radar from '@/components/echarts/radar';
import pieprogress from '@/components/echarts/pie-progress';
import barline from '@/components/echarts/bar-line';
import pie from '@/components/echarts/pie';
import polar from '@/components/echarts/bar-polar';
import gauge from '@/components/echarts/gauge';

/* datacenter */
import ExportOutData from "@/components/datacenter/widgets/ExportOutData";

const components = {
    header1,
    nodata,
    bdmap,
    sidemenu,
    loadcover,
    loadsm,
    
    radar,
    pieprogress,
    barline,
    pie,
    polar,
    gauge,

    ExportOutData
}

export default (Vue)=>{
    Object.keys(components).forEach(key => {
        Vue.component(key, components[key])
    })
}
