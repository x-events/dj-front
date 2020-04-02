<template>
    <div class="data-edit right-form flex-col h100" v-if="formData" :class="{'editStatus':!disabledTag}">
        <div class="title-box">
            <div class="tool">
                <el-button type="primary" @click="back">返回</el-button>
                <el-button type="primary" v-if="btnTag == 0" @click="submitForm('formForm')">添加</el-button>
                <el-button type="primary" v-if="btnTag == 1 && $root.datacenter_op_auth.edit == 1" @click="editOpt">编辑</el-button>
                <!-- <el-button type="primary" v-if="btnTag == 2" @click="cancelOpt">取消</el-button> -->
                <el-button type="primary" v-if="btnTag == 2" @click="submitForm('formForm')">保存</el-button>
            </div>
        </div>
        <el-form class="flex-1 scrollbar" :model="formData" :rules="formRule" ref="formForm" label-width="190px" :show-message="false" size="medium" label-suffix=":">
            <el-row class="form-row fix" v-loading="loading">
                <el-col :span="24">
                    <el-form-item class="col-name" label="单位" prop="company">
                        <el-input v-model="formData.company" readonly placeholder="请选择单位" v-if="!disabledTag">
                            <el-button slot="suffix" size="mini" @click="unitSDialog = true">单位库选择</el-button>
                            <el-button slot="suffix" size="mini" @click="addDialog = true">手动添加</el-button>
                        </el-input>
                        <span class="sblock" :title="formData.company" v-else>{{formData.company || ""}}</span>
                    </el-form-item>
                </el-col>
                <el-row class="upload-row" v-if="hand_addr">
                    <el-row>
                        <el-col :span="20" class="calc-w-20">
                            <el-form-item class="col-name" label="经营地址">
                                <el-input v-model="formData.addr" placeholder="请输入经营地址" maxlength="50" v-if="!disabledTag"></el-input>
                                <span class="sblock" :title="formData.addr" v-else>{{formData.addr || ""}}</span>
                            </el-form-item>
                        </el-col>
                        <el-col :span="20" class="calc-w-20">
                            <el-form-item class="col-name hight-item" label="经营范围">
                                <el-input v-model="formData.business_scope" type="textarea" :rows="4" placeholder="请输入经营范围" maxlength="200" v-if="!disabledTag"></el-input>
                                <span class="sblock" :title="formData.business_scope" v-else>{{formData.business_scope || ""}}</span>
                            </el-form-item>
                        </el-col>
                        <el-col :span="20" class="calc-w-20">
                            <el-form-item class="col-name" label="单位法人">
                                <el-input v-model="formData.legal_person" placeholder="请输入单位法人姓名" maxlength="10" v-if="!disabledTag"></el-input>
                                <span class="sblock" :title="formData.legal_person" v-else>{{formData.legal_person || ""}}</span>
                            </el-form-item>
                        </el-col>
                        <uploadIcon :image="formData.legal_img_url" :lookTag="disabledTag" imgText="单位法人照片" @on-Success="uploadSuccess_unit" />
                    </el-row>
                </el-row>
                <el-row class="upload-row">
                    <el-row>
                        <el-col :span="10">
                            <el-form-item class="col-name" label="申请建会时间">
                                <el-date-picker type="date" placeholder="请选择建会时间" value-format="yyyy-MM-dd" v-model="formData.setup_time" style="width: 100%;" v-if="!disabledTag"></el-date-picker>
                                <span class="sblock" :title="formData.setup_time" v-else>{{formData.setup_time || ""}}</span>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8" class="calc-w-8">
                            <el-form-item class="col-name" label="换届时间">
                                <el-date-picker type="date" placeholder="请选择换届时间" value-format="yyyy-MM-dd" v-model="formData.change_time" style="width: 100%;" v-if="!disabledTag"></el-date-picker>
                                <span class="sblock" :title="formData.change_time" v-else>{{formData.change_time || ""}}</span>
                            </el-form-item>
                        </el-col>
                        <el-col :span="20" class="calc-w-20">
                            <el-form-item class="col-name" label="联系电话">
                                <el-input v-model="formData.tel" placeholder="请输入联系电话" maxlength="20" v-if="!disabledTag"></el-input>
                                <span class="sblock" :title="formData.tel" v-else>{{formData.tel || ""}}</span>
                            </el-form-item>
                        </el-col>
                        <el-col :span="10">
                            <el-form-item class="col-name" label="工会主席">
                                <el-input v-model="formData.chairman" placeholder="请输入工会主席名称" maxlength="10" v-if="!disabledTag"></el-input>
                                <span class="sblock" :title="formData.chairman" v-else>{{formData.chairman || ""}}</span>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8" class="calc-w-8">
                            <el-form-item class="col-name" label="任期(年)">
                                <el-input v-model="formData.tenure" placeholder="请输入任期" type="number" maxlength="5" :oninput="oninput(5,'tenure')" v-if="!disabledTag"></el-input>
                                <span class="sblock" :title="formData.tenure" v-else>{{formData.tenure || ""}}</span>
                            </el-form-item>
                        </el-col>
                        <el-col :span="10">
                            <el-form-item class="col-name" label="职工数">
                                <el-input v-model="formData.employee_num" placeholder="请输入职工数" type="number" maxlength="10" :oninput="oninput(10,'employee_num')" v-if="!disabledTag"></el-input>
                                <span class="sblock" :title="formData.employee_num" v-else>{{formData.employee_num || ""}}</span>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8" class="calc-w-8">
                            <el-form-item class="col-name" label="是否建立党组织">
                                <el-radio-group v-model="formData.party_branch" v-if="!disabledTag">
                                    <el-radio label="1">是</el-radio>
                                    <el-radio label="0">否</el-radio>
                                </el-radio-group>
                                <span class="sblock" :title="(formData.party_branch=='1'?'是':'否')" v-else>{{(formData.party_branch=='1'?'是':'否') || ""}}</span>
                            </el-form-item>
                        </el-col>
                        <uploadIcon :image="formData.chairman_img_url" :lookTag="disabledTag" imgText="工会主席照片" @on-Success="uploadSuccess_union" />
                    </el-row>
                </el-row>
                <el-col :span="10">
                    <el-form-item class="col-name" label="登记类型">
                        <selectOpt v-model="formData.registration_type" placeholder="请选择登记类型" :option="regTypeData" @input="formData.registration_type=$event" v-if="!disabledTag" />
                        <span class="sblock" :title="formData.registration_type_name" v-else>{{formData.registration_type_name || ""}}</span>
                    </el-form-item>
                </el-col>
                <el-col :span="14">
                    <el-form-item class="col-name" label="使用劳务派遣人数">
                        <el-input v-model="formData.labor_dispatch" placeholder="请输入劳务派遣人数" type="number" maxlength="10" :oninput="oninput(10,'labor_dispatch')" v-if="!disabledTag"></el-input>
                        <span class="sblock" :title="formData.labor_dispatch" v-else>{{formData.labor_dispatch || ""}}</span>
                    </el-form-item>
                </el-col>
                <el-col :span="10">
                    <el-form-item class="col-name" label="女职工数">
                        <el-input v-model="formData.women_employee_num" placeholder="请输入女职工数" type="number" maxlength="10" :oninput="oninput(10,'women_employee_num')" v-if="!disabledTag"></el-input>
                        <span class="sblock" :title="formData.women_employee_num" v-else>{{formData.women_employee_num || ""}}</span>
                    </el-form-item>
                </el-col>
                <el-col :span="14">
                    <el-form-item class="col-name" label="职工代表数">
                        <el-input v-model="formData.employee_representative" placeholder="请输入职工代表数" type="number" maxlength="10" :oninput="oninput(10,'employee_representative')" v-if="!disabledTag"></el-input>
                        <span class="sblock" :title="formData.employee_representative" v-else>{{formData.employee_representative || ""}}</span>
                    </el-form-item>
                </el-col>
                <el-col :span="10">
                    <el-form-item class="col-name" label="会员数">
                        <el-input v-model="formData.member_num" placeholder="请输入会员数" type="number" maxlength="10" :oninput="oninput(10,'member_num')" v-if="!disabledTag"></el-input>
                        <span class="sblock" :title="formData.member_num" v-else>{{formData.member_num || ""}}</span>
                    </el-form-item>
                </el-col>
                <el-col :span="14">
                    <el-form-item class="col-name" label="劳务派遣会员数">
                        <el-input v-model="formData.labor_dispatch_member" placeholder="请输入劳务派遣会员数" type="number" maxlength="10" :oninput="oninput(10,'labor_dispatch_member')" v-if="!disabledTag"></el-input>
                        <span class="sblock" :title="formData.labor_dispatch_member" v-else>{{formData.labor_dispatch_member || ""}}</span>
                    </el-form-item>
                </el-col>
                <el-col :span="10">
                    <el-form-item class="col-name" label="女会员数">
                        <el-input v-model="formData.women_member_num" placeholder="请输入女会员数" type="number" maxlength="10" :oninput="oninput(10,'women_member_num')" v-if="!disabledTag"></el-input>
                        <span class="sblock" :title="formData.women_member_num" v-else>{{formData.women_member_num || ""}}</span>
                    </el-form-item>
                </el-col>
                <el-col :span="14">
                    <el-form-item class="col-name" label="会员代表数">
                        <el-input v-model="formData.member_representtive" placeholder="请输入会员代表数" type="number" maxlength="10" :oninput="oninput(10,'member_representtive')" v-if="!disabledTag"></el-input>
                        <span class="sblock" :title="formData.member_representtive" v-else>{{formData.member_representtive || ""}}</span>
                    </el-form-item>
                </el-col>
                <el-col :span="10">
                    <el-form-item class="col-name" label="是否签订集体合同">
                        <el-radio-group v-model="formData.collective_contract" v-if="!disabledTag">
                            <el-radio label="1">是</el-radio>
                            <el-radio label="0">否</el-radio>
                        </el-radio-group>
                        <span class="sblock" :title="(formData.collective_contract=='1'?'是':'否')" v-else>{{(formData.collective_contract=='1'?'是':'否') || ""}}</span>
                    </el-form-item>
                </el-col>
                <el-col :span="14">
                    <el-form-item class="col-name" label="是否建立职代会制度">
                        <el-radio-group v-model="formData.workers_congress" v-if="!disabledTag">
                            <el-radio label="1">是</el-radio>
                            <el-radio label="0">否</el-radio>
                        </el-radio-group>
                        <span class="sblock" :title="(formData.workers_congress=='1'?'是':'否')" v-else>{{(formData.workers_congress=='1'?'是':'否') || ""}}</span>
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
                <!-- <div class="detail-subtext">工会党员</div>
                <div class="masking" v-if="disabledTag"></div>
                <el-col :span="24" class="secretary">
                    <userIdsListInput labelname="党员数" :labelwidth="190" @change="numTableList" />
                </el-col> -->
            </el-row>
        </el-form>
        <!-- <org-picker :visible="pickerDialog" @close="pickerDialog=false" ableOpt="1" disableTip="无法选择!" @choosen="choosenPicker" /> -->
        <!-- 单位库 -->
        <unitDialog :visible="unitSDialog" @close="unitSDialog=false" @choosen="unitSResult" />
        <!-- 手动添加 -->
        <addInputText :visible="addDialog" @close="addDialog=false" title="单位" @choosen="addResult" />
    </div>
</template>

<script>
import * as common from '../../api/common.js'
import * as datacenter from '@/api/datacenter.js'
import orgPicker from '@/components/orgPicker_power_for_datacenter'
import unitDialog from '@/components/datacenter/widgets/unit_dialog'
import addInputText from '@/components/datacenter/widgets/add_input_text'
import uploadIcon from '@/components/datacenter/widgets/uploadIcon'
import selectOpt from '@/components/datacenter/common/selectOpt'
export default {
    beforeRouteLeave (to, from, next) {
        if(this.disabledTag == false && this.isSave == null) {
            if(!this.confirmShow){
                this.confirmShow = true
                let sessionUid = sessionStorage.getItem('add_union_uid') || ''
                if(!this.$route.query.id && !sessionUid && this.isBack == null && this.$root.dcUnionMenu == '1') {
                    this.$alert('请先保存基本信息！', '提示', {
                    confirmButtonText: '确定', type: 'warning',
                        callback: action => {
                            this.confirmShow = false
                            history.pushState(null, null, document.URL);
                            this.$root.dcUnionMenu = null
                            next(false)
                        }
                    });
                }else {
                    this.$confirm('当前页面数据未保存，确定要离开？', '提示', { confirmButtonText: '确定', cancelButtonText: '取消', type: 'warning' }).then(() => {
                        next()
                    }).catch(() => {
                        this.isBack = null
                        this.confirmShow = false
                        history.pushState(null, null, document.URL);
                        next(false)
                    });
                }
            }else{
                next()
            }
        }else {
            next()
        }
    },
    props: {
        personId: {
            type: [String, Number],
            default: '',
            //   required: true,
        },
        /* read: {
            type: Boolean,
            default: false
        } */
    },
    components: {
        selectOpt,
        orgPicker,
        addInputText,
        unitDialog,
        uploadIcon
    },
    data() {
        return {
            loading: false,
            isSave: null,
            confirmShow:false,
            isBack: null,
            imgVisible: false,
            imgSrc: '',
            disabledTag: false,
            pickerDialog: false,            // 党组织弹窗
            unitSDialog: false,
            addDialog: false,
            hand_addr: false,
            formData: {
                id: '', 
                company: '',
                addr: '',
                business_scope: '',
                legal_person: '',
                setup_time: '',
                change_time: '',
                tel: '',
                chairman: '',
                tenure: '',
                employee_num: '',
                party_branch: '1',
                registration_type: '',
                registration_type_name:'',
                labor_dispatch: '',
                women_employee_num: '',
                employee_representative: '',
                member_num: '',
                labor_dispatch_member: '',
                women_member_num: '',
                member_representtive: '',
                collective_contract: '1',
                workers_congress: '1',
                community_id: '',
                community_name:'',
                chairman_img_url:'',
                chairman_img:'',
                legal_img_url: '',
                legal_img: '',
                lat: "",
                lng: "",
                address: [],
                zuobiao: '',
            },
            formRule: {
                company: [ { required: true, message:'请选择单位!', trigger: 'blur' }],
            },
            centerPoint: this.$root.mapcenter,
            communityData: [],
            regTypeData: [],        // 登记类型
            btnTag: 0,          // 0添加 1编辑  2取消、保存
        }
    },
    watch: {
        personId: function () {
            this.getData()
        }
    },
    methods: {
        oninput(len,field) {
            if(this.formData[field].length> len) this.formData[field]=this.formData[field].slice(0, len)
        },
        enlarge(src) {
            this.imgVisible = true
            this.imgSrc = src
        },
        back() {
            this.isBack = true
            this.$router.push({name: '工会', params: this.$route.query})
        },
        submitForm(formName) {
            this.$refs[formName].validate((valid, vinfo) => {
                if (valid) {
                    if(this.$route.query.id) {// 修改
                        this.formData.uid = this.$route.query.id
                    }else {
                        let sessionUid = sessionStorage.getItem('add_union_uid') || ''
                        this.formData.uid = sessionUid
                    }
                    datacenter.union_edit(this.formData).then( res => {
                        if(res.data.status  == '200') {
                            this.isSave = true;
                            this.$message({ message: res.data.statusCode, type: 'success' });
                            this.btnTag = 1;
                            // this.disabledTag = true
                            if(!this.$route.query.id) {
                                sessionStorage.setItem('add_union_uid', res.data.data.id)
                            }
                            this.getData();
                        }else {
                            this.$message({ message: res.data.statusCode, type: 'error' });
                        }
                    })
                } else {
                    if(vinfo.company) {
                        this.$message({ message: vinfo.company[0].message, type: 'error' });
                    }
                    return false;
                }
            });
        },
        // 单位库选择结果
        unitSResult(item) {
            let obj_name = item.short_name
            if(!obj_name) { obj_name = item.name }
            this.formData.company = obj_name
            this.formData.unit_id = item.id
            this.hand_addr = false;
        },
        addResult(text) {
            // console.log('text',text);
            this.formData.company = text
            this.formData.unit_id = ''
            this.hand_addr = true;
        },
        // 党组织库选择 单选
        /* choosenPicker(obj) {
            console.log('org',obj);
            
            if(!obj) {
                this.formData.org_name = ''
                this.formData.org_id = ''
                return 
            }
            this.formData.org_name = obj.name
            this.formData.org_id = obj.id
        }, */
        // 上传成功-单位法人
        uploadSuccess_unit(res, file, fileList) {
            this.formData.legal_img_url = res.data.url
            this.formData.legal_img = res.data.id
        },
        // 上传成功-工会主席
        uploadSuccess_union(res, file, fileList) {
            this.formData.chairman_img_url = res.data.url
            this.formData.chairman_img = res.data.id
        },
        theyChange(arr) {
            this.formData.majorthey = arr.join(',')
        },
        parkChange(arr) {
            this.formData.partyremark = arr.join(',')
        },
        getDicData() {
            // 所属社区
            datacenter.get_community().then( res => {
                this.communityData = res.data.data
            })
            // 登记类型
            common.getDictData_tree({id: 'registration_type'}).then( res => {
                this.regTypeData = res.data.data
            })
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
        // 点击编辑按钮
        editOpt() {
            this.btnTag = 2;
            this.isSave = null;
            // this.disabledTag = false
            this.getData();
        },
        // 点击取消按钮
        cancelOpt() {
            this.btnTag = 1;
            this.disabledTag = true
            this.getData();
        },
        getData() {
            let sessionUid = sessionStorage.getItem('add_union_uid') || ''
            let uid = ''
            if(this.$route.query.id) {
                uid = this.$route.query.id
            }else {
                uid = sessionUid
                if(uid == '') {
                    return
                }
            }
            if(this.btnTag == 1 || this.btnTag == 0) {
                this.btnTag = 1;
                this.disabledTag = true
            }else {
                this.btnTag = 2;
                this.disabledTag = false
            }
            this.loading = true
            datacenter['union_info']({id: uid}).then( res => {
                this.loading = false
                this.formData = res.data.data
                this.set0Val(['community_id','registration_type'])
                if(this.formData.unit_id == '0') {
                    this.hand_addr = true;
                }else {
                    this.formData.addr = ''
                    this.formData.business_scope = ''
                    this.formData.legal_person = ''
                    this.formData.legal_img = ''
                    this.formData.legal_img_url = ''
                }
                if((res.data.data.lng == '' && res.data.data.lat == '') || +res.data.data.lng == 0 && +res.data.data.lat == 0) {
                    return
                }
                let addr = [res.data.data.lng, res.data.data.lat]
                this.mapSet(addr)
                this.$set(this.formData, 'zuobiao', addr.join(','))
            }) 
        },
        // 清空为0的数据
        set0Val(fieldArr) {
            for (const key in fieldArr) {
                this.formData[fieldArr[key]] = this.formData[fieldArr[key]] == '0'?'':this.formData[fieldArr[key]];
            }
        }
    },
    created() {
        // this.getData();
        // return
        if (window.history && window.history.pushState) {
            history.pushState(null, null, document.URL);
            window.addEventListener('popstate', this.back, false);
        }
        this.getDicData();
        if(this.$route.query.id) {
            if(this.$route.query.tag == 'look') {
                this.btnTag = 1
                this.disabledTag = true
            }else{
                this.btnTag = 2
            }
        }
        this.getData();
    },
    destroyed(){
        window.removeEventListener('popstate', this.back, false);
    }
}
</script>

<style scoped>
 .right-content .dialog-info .dialog-table {width: 100%;border-left: 1px solid #ddd;}
 .right-content .dialog-info .dialog-table img {cursor: pointer;}
.dialog-table { width: 100%; border-top: 1px solid #ddd; border-left: 1px solid #ddd; }
.dialog-table .col-name { padding: 8px; }
</style>
