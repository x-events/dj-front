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
                    <el-row class="upload-row" v-loading="loading">
                        <el-row>
                            <el-col :span="20" class="calc-w-20">
                                <el-form-item class="col-name" label="楼宇全称" prop="name">
                                    <el-input v-model="formData.name" placeholder="请输入楼宇服务站全称" maxlength="50" v-if="!disabledTag"></el-input>
                                    <span class="sblock" :title="formData.name" v-else>{{formData.name || ""}}</span>
                                </el-form-item>
                            </el-col>
                            <el-col :span="20" class="calc-w-20">
                                <el-form-item class="col-name" label="所属党组织">
                                    <el-input v-model="formData.org_name" readonly placeholder="请选择所属党组织" @focus="pickerDialog=true" v-if="!disabledTag"></el-input>
                                    <span class="sblock" :title="formData.org_name" v-else>{{formData.org_name || ""}}</span>
                                </el-form-item>
                            </el-col>
                            <el-col :span="20" class="calc-w-20">
                                <el-form-item class="col-name" label="服务站地址">
                                    <el-input v-model="formData.address" placeholder="请输入服务站地址" maxlength="50" v-if="!disabledTag"></el-input>
                                    <span class="sblock" :title="formData.address" v-else>{{formData.address || ""}}</span>
                                </el-form-item>
                            </el-col>
                            <el-col :span="10">
                                <el-form-item class="col-name" label="站长姓名">
                                    <el-input v-model="formData.building_leader" placeholder="请输入站长姓名" maxlength="10" v-if="!disabledTag"></el-input>
                                    <span class="sblock" :title="formData.building_leader" v-else>{{formData.building_leader || ""}}</span>
                                </el-form-item>
                            </el-col>
                            <el-col :span="8" class="calc-w-8">
                                <el-form-item class="col-name" label="建立时间">
                                    <el-date-picker type="date" placeholder="请选择建立时间" value-format="yyyy-MM-dd" v-model="formData.setup_time" style="width: 100%;" v-if="!disabledTag"></el-date-picker>
                                    <span class="sblock" :title="formData.setup_time" v-else>{{formData.setup_time || ""}}</span>
                                </el-form-item>
                            </el-col>
                            <uploadIcon :image="formData.manager_pic_url" :lookTag="disabledTag" imgText="站长照片" @on-Success="uploadIconSuccess" />
                        </el-row>
                    </el-row>
                    <el-col :span="10">
                        <el-form-item class="col-name" label="联系人">
                            <el-input v-model="formData.contact" placeholder="请输入联系人姓名" maxlength="10" v-if="!disabledTag"></el-input>
                            <span class="sblock" :title="formData.contact" v-else>{{formData.contact || ""}}</span>
                        </el-form-item>
                    </el-col>
                    <el-col :span="14">
                        <el-form-item class="col-name" label="联系电话">
                            <el-input v-model="formData.contact_phone" placeholder="请输入联系电话" maxlength="20" v-if="!disabledTag"></el-input>
                            <span class="sblock" :title="formData.contact_phone" v-else>{{formData.contact_phone || ""}}</span>
                        </el-form-item>
                    </el-col>

                    <div class="detail-subtext">指导员信息</div>
                    <uploadInput pholder="请输入指导员姓名" ref="managerUp" :limit="12" :disabled="disabledTag" :propvalue="formData.deputy_manager_pic" @change="managerPicChange" />

                    <div class="detail-subtext">党务专干信息</div>
                    <uploadInput pholder="请输入党务专干姓名" ref="manager2Up" :limit="12" :disabled="disabledTag" :propvalue="formData.full_time_manager_pic" :numIndex="1" @change="manager2PicChange" />

                    <div class="detail-subtext">楼宇照片</div>
                    <div class="img-list" v-if="!disabledTag">
                        <uploadImgList :limit="10" :propvalue="formData.building_url" @change="uploadSuccess"/>
                    </div>
                    <swiper3List class="swiper3" :span="24" :data="formData.imgs_look" v-else />

                    <div class="detail-subtext">位置</div>
                    <el-col :span="24" class="map-content">
                        <el-form-item label="位置">
                            <bdmap class="map" :data="formData.address_map" :getPoint="!disabledTag" :centerPoint="centerPoint" @callPoint="getMapPoint"></bdmap>
                        </el-form-item>
                    </el-col>
                    <el-col :span="24">
                        <el-form-item label="坐标点">
                            <el-input v-model="formData.zuobiao" @input="mapInputChange" :readonly="disabledTag" placeholder="请输入坐标点"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
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
import uploadIcon from '@/components/datacenter/widgets/uploadIcon'
import upload_images_input from '@/components/datacenter/widgets/upload_images_input'

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
        'uploadInput': upload_images_input,
        uploadIcon,
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
            org_id: '',
            org_name: '',
            address: '',
            setup_time: '',
            contact: '',
            contact_phone: '',
            building_leader: '',
            manager_pic: '',
            building_url: [],
            deputy_manager_pic: [],     // 指导员图片id
            full_time_manager_pic: [],  // 党务专干信息
            // deputy_manager_url: [],     // 指导员信息图片
            building_pic: '',        // 编辑时图片id
            building_url: [],
            imgs_look: [],          // 查看时图片列表
            
            community_id: '',
            community_name: '',
            func: [],
            lat: "",
            lng: "",
            address_map: [],
            zuobiao: '',
        },
        formRule: {
            name: [ { required: true, trigger: 'blur' }],
            type: [ { required: true, trigger: 'blur' }],
        },
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
            if(!this.$refs.managerUp.submitValid() || !this.$refs.manager2Up.submitValid()) {       // 调用组件方法（验证必填）
                return
            }
            this.$refs[formName].validate((valid, vinfo) => {
                if (valid) {
                    if(this.$route.query.id) {// 修改
                        this.formData.id = this.$route.query.id
                    }else {
                        this.formData.id = ''
                    }
                    datacenter.building_edit(this.formData).then( res => {
                        if(res.data.status  == '200') {
                            this.isSave = true;
                            this.$message({ message: res.data.statusCode, type: 'success' });
                            this.back()
                        }else {
                            this.$message({ message: res.data.statusCode, type: 'error' });
                        }
                    })
                } else {
                    this.$message({ message: '请输入楼宇服务站全称!', type: 'error' });
                    return false;
                }
            });
        },
        back() {
            this.$router.push({name: '商务楼宇', params: this.$route.query})
        },
        // 党组织库选择 单选
        choosenPicker(obj) {
            console.log('sess',obj);
            this.formData.org_name = obj.name
            this.formData.org_id = obj.id
        },
        uploadIconSuccess(res) {
            this.formData.manager_pic_url = res.data.url
            this.formData.manager_pic = res.data.id
        },
        // 楼宇照片上传成功
        uploadSuccess(list) {
            let idArr = []
            list.map(item=>{
                return idArr.push(item.id)
            })
            this.formData.building_pic = idArr.join(',')
        },
        // 指导员照片
        managerPicChange(list) {
            this.formData.deputy_manager_pic = list
        },
        // 党务专干照片
        manager2PicChange(list) {
            this.formData.full_time_manager_pic = list
        },
        getDicData() {
            
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
            this.formData.address_map = [{
                lng: data[0],
                lat: data[1]
            }]
            this.centerPoint = data
        },
        getData() {
            if(this.$route.query.id) {
                datacenter['building_info']({id: this.$route.query.id}).then( res => {
                    this.formData = res.data.data
                    // typeof(this.formData.deputy_manager_pic)  === string?[]:this.formData.deputy_manager_pic
                    if(this.$route.query.tag == 'look' || this.btnTag == 1){
                        this.formData.imgs_look = res.data.data.building_url
                    }else {
                        this.formData.imgs_look = []
                    }
                    // console.log('bulll',this.formData.deputy_manager_pic);
                    
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
.img_text_div dl dt img { height: 100%; }

/* .height_auto .el-checkbox:nth-of-type(1) {margin-left: 30px; } */
.height_auto .el-checkbox-group { padding: 12px 20px; }
.detail-subtext { border-bottom: 0!important; }
/* .upload-div { margin-left: -1px; border: 0!important; background: #fff; } */
/* .upload-div { position: relative; border-top: 1px solid #ddd; } */
.form-row { border-left: 0!important; }
.swiper3 { border: 1px solid #ddd; }
.form-row > .upload-div { clear: both; position: relative; }
/deep/ .imgs-list { border-left: 1px solid #fff; margin-left: -1px; }

.data-edit .el-row .el-col { border-left:1px solid #ddd;}
</style>