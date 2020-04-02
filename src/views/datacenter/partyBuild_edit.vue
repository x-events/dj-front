<template>
    <div class="flex-1 flex-col">
        <div class="data-edit flex-col flex-1" :class="{'editStatus':!disabledTag}">
            <div class="title-box"><i class="ion">&#xe77a;</i>{{ $route.meta.title }}
                <div class="tool">
                    <el-button type="primary" @click="back">返回</el-button>
                    <el-button type="primary" v-if="btnTag == 0" @click="submitForm('formForm')">添加</el-button>
                    <el-button type="primary" v-if="btnTag == 1 && $root.datacenter_op_auth.edit == 1" @click="editOpt">编辑</el-button>
                    <!-- <el-button type="primary" v-if="btnTag == 2" @click="cancelOpt">取消</el-button> -->
                    <el-button type="primary" v-if="btnTag == 2" @click="submitForm('formForm')">保存</el-button>
                </div>
            </div>
            <el-form class="flex-1 scrollbar" :model="formData" :rules="formRule" ref="formForm" :label-width="labelw" :show-message="false" size="medium" label-suffix=":">
                <el-row class="form-row">
                    <el-col :span="12">
                        <el-form-item class="col-name" label="名称" prop="name">
                            <el-input v-model="formData.name" placeholder="请输入党建阵地名称" maxlength="50" v-if="!disabledTag"></el-input>
                            <span class="sblock" :title="formData.name" v-else>{{formData.name || ""}}</span>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item class="col-name" label="类型" prop="type">
                            <el-select v-model="formData.type" placeholder="请选择党建阵地类型" style="width:100%;" v-if="!disabledTag">
                                <!-- <el-option label="请选择党建阵地类型" value="0"></el-option> -->
                                <el-option :label="item.value" :value="item.id" :key="index" v-for="(item, index) in typeData"></el-option>
                            </el-select>
                            <span class="sblock" :title="formData.type_name" v-else>{{formData.type_name || ""}}</span>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item class="col-name" label="地址">
                            <el-input v-model="formData.addr" placeholder="请输入地址" maxlength="200" v-if="!disabledTag"></el-input>
                            <span class="sblock" :title="formData.addr" v-else>{{formData.addr || ""}}</span>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item class="col-name" label="联系电话">
                            <el-input v-model="formData.tel" placeholder="请输入联系电话" maxlength="20" v-if="!disabledTag"></el-input>
                            <span class="sblock" :title="formData.tel" v-else>{{formData.tel || ""}}</span>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item class="col-name" label="开放时间">
                            <el-input v-model="formData.open_time" placeholder="请输入开放时间" maxlength="40" v-if="!disabledTag"></el-input>
                            <span class="sblock" :title="formData.open_time" v-else>{{formData.open_time || ""}}</span>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item class="col-name" label="面积（m²）">
                            <el-input v-model="formData.area" placeholder="请输入面积" type="text" maxlength="10" oninput="value=value.replace(/[^0-9.]/g,'')" v-if="!disabledTag"></el-input>
                            <span class="sblock" :title="formData.area" v-else>{{formData.area || ""}}</span>
                        </el-form-item>
                    </el-col>
                    <el-col :span="24">
                        <el-form-item class="col-name" label="所属党组织">
                            <el-input v-model="formData.org_name" readonly placeholder="请选择所属党组织" @focus="pickerDialog=true" v-if="!disabledTag"></el-input>
                            <span class="sblock" :title="formData.org_name" v-else>{{formData.org_name || ""}}</span>
                        </el-form-item>
                    </el-col>
                    <el-col :span="24">
                        <el-form-item class="col-name" label="所属社区">
                            <el-select v-model="formData.community_id" placeholder="请选择所属社区" style="width:100%;" v-if="!disabledTag">
                                <el-option :label="item.name" :value="item.id" :key="index" v-for="(item, index) in communityData"></el-option>
                            </el-select>
                            <span class="sblock" :title="formData.community_name" v-else>{{formData.community_name || ""}}</span>
                        </el-form-item>
                    </el-col>
                    <el-col class="secretary" :span="24" v-if="!disabledTag">
                        <el-form-item label="简介">
                            <el-input v-model="formData.remark" type="textarea" :rows="5" placeholder="请输入简介" maxlength="300"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="24" v-else>
                        <el-form-item class="col-name" label="简介">
                            <span class="sblock" :title="formData.remark">{{formData.remark || ""}}</span>
                        </el-form-item>
                    </el-col>
                    <el-col :span="24" class="height_auto" v-if="!disabledTag">
                        <el-form-item label="功能">
                            <el-checkbox-group v-model="formData.func">
                                <el-checkbox :label="item.id" v-for="(item, index) in funcData" :key="index">{{ item.name }}</el-checkbox>
                            </el-checkbox-group>
                        </el-form-item>
                    </el-col>
                    <el-col :span="24" class="img_p_div height_auto" v-else>
                        <el-form-item label="功能" v-if="formData.func.length != 0">
                            <div class="img_text_div">
                                <dl v-for="(item, index) in formData.func" :key="index">
                                    <dt><img :src="item.url"></dt>
                                    <dd>{{ item.name }}</dd>
                                </dl>
                            </div>
                        </el-form-item>
                        <el-form-item class="col-name" label="功能" v-else>
                            <span style="line-height:60px;" class="sblock"></span>
                        </el-form-item>
                    </el-col>
                    <el-col :span="24" class="map-content">
                        <el-form-item label="位置">
                            <bdmap class="map" :data="formData.address" :getPoint="!disabledTag" :centerPoint="centerPoint" @callPoint="getMapPoint"></bdmap>
                        </el-form-item>
                    </el-col>
                    <el-col :span="24">
                        <el-form-item label="坐标点">
                            <el-input v-model="formData.zuobiao" @input="mapInputChange" :readonly="disabledTag" placeholder="请输入坐标点"></el-input>
                        </el-form-item>
                    </el-col>
                    <div class="detail-subtext">图片</div>
                    <div class="img-list" v-if="!disabledTag">
                        <uploadImgList :limit="10" :propvalue="formData.img_url" @change="uploadSuccess"/>
                    </div>
                    <swiper3List :span="24" :data="formData.imgs_look" v-else />
                </el-row>
            </el-form>
            <!-- <div class="submit-div">
                <el-button type="primary" @click="back">返回</el-button>
                <el-button type="primary" @click="submitForm('formForm')" v-if="!disabledTag">{{ Object.keys($route.query).length != 0 ? '保存':'添加' }}</el-button>
            </div> -->
        </div>
        <org-picker :visible="pickerDialog" @close="pickerDialog=false" @choosen="choosenPicker" />
    </div>
</template>

<script>
  import * as datacenter from '../../api/datacenter.js'
  import datadialog from './dialog.vue'
  import inputUserId from '@/components/work/widgets/input_user_ids'
import orgPicker from '@/components/orgPicker_power_for_datacenter'
import uploadImgList from '@/components/upload_image'
import swiper3List from '@/components/datacenter/widgets/swiper3List'
import selectOpt from '@/components/datacenter/common/selectOpt'

  export default {
    beforeRouteLeave (to, from, next) {
        if(this.disabledTag == false && this.isSave == null) {
            if(!this.confirmShow){
                this.confirmShow = true
                this.$confirm('当前页面数据未保存，确定要离开？', '提示', { confirmButtonText: '确定', cancelButtonText: '取消', type: 'warning' }).then(() => {
                    next()
                }).catch(() => {
                    this.confirmShow = false
                    history.pushState(null, null, document.URL);
                    next(false)
                });
            }else{
                next()
            }
        }else {
            next()
        }
    },
    components: {
        selectOpt,
        swiper3List,
        uploadImgList,
        orgPicker,
        inputUserId,
        datadialog,
        "member-picker": resolve => require(["@/components/memberPicker"], resolve)
    },
    data() {
      return {
        isSave: null,
        confirmShow: false,
        loading: false,
        formData: {
            name: '',
            type: '',
            addr: '',
            tel: '',
            open_time: '',
            area: '',
            org_id: '',
            org_name: '',
            community_id: '',
            community_name: '',
            remark: '',
            func: [],
            img: '',        // 编辑时图片id
            img_url: [],
            imgs_look: [],  // 查看时图片列表
            lat: "",
            lng: "",
            address: [],
            zuobiao: '',
        },
        formRule: {
            name: [ { required: true, trigger: 'blur' }],
            type: [ { required: true, trigger: 'blur' }],
        },
        user_list: [],
        typeData: [// 1-党群活动中心,2-商务楼宇服务站,3-社区党群活动室
            {
                id: '1',
                value: '党群活动中心'
            },{
                id: '2',
                value: '商务楼宇服务站'
            },{
                id: '3',
                value: '社区党群活动室'
            }
        ],
        funcData: [],   // 功能
        communityData: [],
        labelw: '190px',
        centerPoint: this.$root.mapcenter,
        btnTag: 0,          // 0添加 1编辑  2取消、保存
        disabledTag: false,
        pickerDialog: false,
      };
    },
    methods: {
        oninput(len,field) {
            if(this.formData[field].length> len) this.formData[field]=this.formData[field].slice(0, len)
        },
        submitForm(formName) {
            this.$refs[formName].validate((valid, vinfo) => {
                if (valid) {
                    if(this.formData.type == '0') {
                        this.$message({ message: '请选择党建阵地类型!', type: 'error' });
                        return
                    }
                    if(this.$route.query.id) {// 修改
                        this.formData.id = this.$route.query.id
                    }else {
                        this.formData.id = ''
                    }
                    datacenter.party_edit(this.formData).then( res => {
                        if(res.data.status  == '200') {
                            this.isSave = true;
                            this.$message({ message: res.data.statusCode, type: 'success' });
                            this.back()
                        }else {
                            this.$message({ message: res.data.statusCode, type: 'error' });
                        }
                    })
                } else {
                    if(vinfo.name) {
                        this.$message({ message: '请输入党建阵地名称!', type: 'error' });
                    }else {
                        this.$message({ message: '请选择党建阵地类型!', type: 'error' });
                    }
                    return false;
                }
            });
        },
        back() {
            this.$router.push({name: '党建阵地', params: this.$route.query})
        },
        // 党组织库选择 单选
        choosenPicker(obj) {
            console.log('sess',obj);
            this.formData.org_name = obj.name
            this.formData.org_id = obj.id
        },
        // 上传成功
        uploadSuccess(ids) {
            let idArr = []
            ids.map(item=>{
                return idArr.push(item.id)
            })
            this.formData.img = idArr.join(',')
        },
        getDicData() {
            // 功能 party_func
            datacenter.party_func().then( res => {
                this.funcData = res.data.data
            })
            // 所属社区
            datacenter.get_community().then( res => {
                this.communityData = res.data.data
            })
        },
        // 点击编辑按钮
        editOpt() {
            this.btnTag = 2;
            this.disabledTag = false
            this.getData();
        },
        // 点击取消按钮
        cancelOpt() {
            this.btnTag = 1;
            this.disabledTag = true
            this.getData();
        },
        // 地图获取坐标
        getMapPoint(data) {
            // lng,lat
            this.formData.lng = data[0]
            this.formData.lat = data[1]
            this.$set( this.formData, 'zuobiao', data.join(','))
        },
        // 监听坐标点input赋值并给地图赋值
        mapInputChange(val) {
            let data = val.split(',')
            this.formData.lng = data[0]
            this.formData.lat = data[1]
            this.mapSet(data)
        },
        mapSet(data) {
            this.formData.address = [{
                lng: data[0],
                lat: data[1]
            }]
            this.centerPoint = data
        },
        getData() {
            if(this.$route.query.id) {
                let url = ''    
                if(this.btnTag == 1) {  // 编辑按钮（查看）
                    url = 'party_field_info'
                }else if(this.btnTag == 2){
                    url = 'party_edit_info'
                }
                datacenter[url]({id: this.$route.query.id}).then( res => {
                    this.formData = res.data.data
                    this.formData.community_id == '0'? this.formData.community_id = '': this.formData.community_id
                    this.formData.type == '0'? this.formData.type = '': this.formData.type
                    if(this.$route.query.tag == 'look' || this.btnTag == 1){
                        this.formData.imgs_look = res.data.data.img_url
                    }else {
                        this.formData.imgs_look = []
                    }
                    if((res.data.data.lng == '' && res.data.data.lat == '') || +res.data.data.lng == 0 && +res.data.data.lat == 0) {
                        return
                    }
                    let addr = [res.data.data.lng, res.data.data.lat]
                    this.mapSet(addr)
                    this.$set(this.formData, 'zuobiao', addr.join(','))
                }) 
            }
        }
    },
    created() {
        if (window.history && window.history.pushState) {
            history.pushState(null, null, document.URL);
            window.addEventListener('popstate', this.back, false);
        }
        if(this.$route.query.id) {
            if(this.$route.query.tag == 'look') {
                this.btnTag = 1
                this.disabledTag = true
            }else{
                this.btnTag = 2
            }
            this.getData();
        }
        this.getDicData();
    },
    destroyed(){
        window.removeEventListener('popstate', this.back, false);
    }
  }
</script>

<style scoped>
* {
box-sizing: border-box;
}
.img-list { float: left; background: #fff; width: 100%; position: relative; margin: -1px 0 0 -1px;}
.img_text_div { padding: 10px; }
.img_text_div dl { display: inline-block; width: 100px; vertical-align: bottom; padding: 5px 0; }
.img_text_div dl dt,.img_text_div dl dd { display: inline-block; vertical-align: middle; }
.img_text_div dl dt,
.img_text_div dl dd { height: 20px; line-height: 20px; }
.img_text_div dl dt img { height:20px; width:auto;}

/* .height_auto .el-checkbox:nth-of-type(1) {margin-left: 30px; } */
.height_auto .el-checkbox-group { padding: 12px 20px; }
.detail-subtext { border-bottom: 0!important; }
/* .upload-div { margin-left: -1px; border: 0!important; background: #fff; } */
.upload-div { position: relative; border-top: 1px solid #ddd; }
</style>