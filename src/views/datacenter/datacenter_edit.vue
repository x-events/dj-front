<template>
    <div class="flex-1 flex-col">
        <div class="data-edit flex-col flex-1" :class="{'editStatus':!disabledTag}">
            <div class="title-box"><i class="ion">&#xe77a;</i>{{ $route.meta.title }}
                <div class="tool">
                    <el-button type="primary" @click="back">返回</el-button>
                    <el-button type="primary" v-if="btnTag === 0" @click="submitForm('formForm')">添加</el-button>
                    <el-button type="primary" v-if="btnTag == 1 && $root.datacenter_op_auth.edit == 1" @click="editOpt">编辑</el-button>
                    <!-- <el-button type="primary" v-if="btnTag == 2" @click="cancelOpt">取消</el-button> -->
                    <el-button type="primary" v-if="btnTag == 2" @click="submitForm('formForm')">保存</el-button>
                </div>
            </div>
            <el-form class="flex-1 scrollbar" :model="formData" :rules="formRule" ref="formForm" label-width="190px" :show-message="false" size="medium" label-suffix=":">
                <el-row class="form-row">
                    <el-col :span="12">
                        <el-form-item class="col-name" label="党组织全称" prop="name">
                            <el-input v-model="formData.name" placeholder="请输入党组织全称" maxlength="50" v-if="!disabledTag"></el-input>
                            <span class="sblock" :title="formData.name" v-else>{{formData.name || ""}}</span>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item class="col-name" label="党组织简称" prop="short_name">
                            <el-input v-model="formData.short_name" placeholder="请输入党组织简称" maxlength="50" v-if="!disabledTag"></el-input>
                            <span class="sblock" :title="formData.short_name" v-else>{{formData.short_name || ""}}</span>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item class="col-name" label="党组织隶属关系" prop="relation_name">
                            <el-input v-model="formData.relation_name" readonly placeholder="请选择隶属关系" 
                            @focus="treepickerDialog=true;treeType='org_relation';treeTitle='党组织隶属关系'" v-if="!disabledTag"></el-input>
                            <span class="sblock" :title="formData.relation_name" v-else>{{formData.relation_name || ""}}</span>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item class="col-name" label="上级党组织" prop="pid_name">
                            <span class="sblock" :title="formData.pid_name">{{formData.pid_name || ""}}</span>
                        </el-form-item>
                    </el-col>
                    <!-- <el-col :span="12">
                        <el-form-item class="col-name" label="级别" prop="level">
                            <selectOpt v-model="formData.level" placeholder="请选择级别" :option="leavelData" @input="formData.level=$event" v-if="!disabledTag" />
                            <span class="sblock" :title="formData.level_name" v-else>{{formData.level_name || ""}}</span>
                        </el-form-item>
                    </el-col> -->
                    <el-col :span="24">
                        <el-form-item class="col-name" label="党组织类别" prop="type">
                            <el-input v-model="formData.type_name" readonly placeholder="请选择党组织类别" 
                            @focus="treepickerDialog=true;treeType='org_type';treeTitle='党组织类别'" v-if="!disabledTag"></el-input>
                            <span class="sblock" :title="formData.type_name" v-else>{{formData.type_name || ""}}</span>
                        </el-form-item>
                    </el-col>
                    <!-- <el-col :span="12">
                        <el-form-item class="col-name" label="是否为党支部" prop="status">
                            <el-radio-group v-model="formData.status" v-if="!disabledTag">
                                <el-radio label="1">是</el-radio>
                                <el-radio label="0">否</el-radio>
                            </el-radio-group>
                            <span class="sblock" :title="(formData.status=='1'?'是':'否')" v-else>{{(formData.status=='1'?'是':'否') || ""}}</span>
                        </el-form-item>
                    </el-col> -->
                    <el-col :span="24" v-if="coverTag==1">
                        <el-form-item class="col-name" label="覆盖企业数">
                            <el-input type="number" maxlength="10" :oninput="oninput(10,'cover_com_num')" v-model="formData.cover_com_num" placeholder="请输入覆盖数量" v-if="!disabledTag"></el-input>
                            <span class="sblock" :title="formData.cover_com_num" v-else>{{formData.cover_com_num || ""}}</span>
                        </el-form-item>
                    </el-col>
                    <el-col :span="24" v-if="coverTag==1">
                        <el-form-item class="col-name" label="覆盖企业名称">
                            <el-input v-model="formData.cover_com_name" placeholder="请输入覆盖名称" maxlength="300" v-if="!disabledTag"></el-input>
                            <span class="sblock" :title="formData.cover_com_name" v-else>{{formData.cover_com_name || ""}}</span>
                        </el-form-item>
                    </el-col>
                    <el-col :span="24" v-if="coverTag==2">
                        <el-form-item class="col-name" label="覆盖居民总数">
                            <el-input type="number" maxlength="10" :oninput="oninput(10,'cover_person_num')" v-model="formData.cover_person_num" placeholder="请输入覆盖数量" v-if="!disabledTag"></el-input>
                            <span class="sblock" :title="formData.cover_person_num" v-else>{{formData.cover_person_num || ""}}</span>
                        </el-form-item>
                    </el-col>
                    <el-col :span="24" v-if="coverTag==2">
                        <el-form-item class="col-name" label="覆盖居民楼院">
                            <el-input v-model="formData.cover_building_name" placeholder="请输入覆盖名称" maxlength="300" v-if="!disabledTag"></el-input>
                            <span class="sblock" :title="formData.cover_building_name" v-else>{{formData.cover_building_name || ""}}</span>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item class="col-name" label="党组织编码">
                            <el-input v-model="formData.code" placeholder="请输入党组织编码" maxlength="50" v-if="!disabledTag"></el-input>
                            <span class="sblock" :title="formData.code" v-else>{{formData.code || ""}}</span>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item class="col-name" label="排序">
                            <el-input v-model="formData.sort" placeholder="请输入排序" type="number" max="3" :oninput="oninput(3,'sort')"  v-if="!disabledTag"></el-input>
                            <span class="sblock" :title="formData.sort" v-else>{{formData.sort || ""}}</span>
                        </el-form-item>
                    </el-col>
                    <el-col :span="24" v-if="disabledTag">
                        <el-form-item class="col-name" label="党组织书记">
                            <span class="sblock" :title="formData.secretary">{{formData.secretary || ""}}</span>
                        </el-form-item>
                    </el-col>
                    <el-col :span="24" v-if="disabledTag">
                        <el-form-item class="col-name" label="单位">
                            <span class="sblock" :title="formData.company">{{formData.company || ""}}</span>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item class="col-name" label="批准建立党组织日期">
                            <el-date-picker type="date" placeholder="请选择日期" value-format="yyyy-MM-dd" v-model="formData.approve_at" style="width: 100%;" v-if="!disabledTag"></el-date-picker>
                            <span class="sblock" :title="formData.approve_at" v-else>{{formData.approve_at || ""}}</span>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item class="col-name" label="批准建立党组织文号">
                            <el-input v-model="formData.number" placeholder="请输入批准建立党组织文号" maxlength="50" v-if="!disabledTag"></el-input>
                            <span class="sblock" :title="formData.number" v-else>{{formData.number || ""}}</span>
                        </el-form-item>
                    </el-col>
                    <el-col :span="24">
                        <el-form-item class="col-name" label="建立党组织原因">
                            <el-input v-model="formData.reason" type="textarea" :rows="3" placeholder="请输入建立党组织原因" maxlength="300" v-if="!disabledTag"></el-input>
                            <span class="sblock" :title="formData.reason" v-else>{{formData.reason || ""}}</span>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item class="col-name" label="任期(年)">
                            <el-input v-model="formData.tenure" placeholder="请输入任期" type="number" maxlength="5" :oninput="oninput(5,'tenure')" v-if="!disabledTag"></el-input>
                            <span class="sblock" :title="formData.tenure" v-else>{{formData.tenure || ""}}</span>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item class="col-name" label="换届时间">
                            <el-date-picker type="date" placeholder="请选择日期" value-format="yyyy-MM-dd" v-model="formData.change_time" style="width: 100%;" v-if="!disabledTag"></el-date-picker>
                            <span class="sblock" :title="formData.change_time" v-else>{{formData.change_time || ""}}</span>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item class="col-name" label="所属社区">
                            <el-select v-model="formData.community_id" placeholder="请选择所属社区" style="width:100%;" v-if="!disabledTag">
                                <el-option :label="item.name" :value="item.id" :key="index" v-for="(item, index) in communityData"></el-option>
                            </el-select>
                            <span class="sblock" :title="formData.community_name" v-else>{{formData.community_name || ""}}</span>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item class="col-name" label="工作地址">
                            <el-input v-model="formData.addr" placeholder="请输入地址" maxlength="200" v-if="!disabledTag"></el-input>
                            <span class="sblock" :title="formData.addr" v-else>{{formData.addr || ""}}</span>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item class="col-name" label="联系方式">
                            <el-input v-model="formData.tel" placeholder="请输入联系方式" maxlength="20" v-if="!disabledTag"></el-input>
                            <span class="sblock" :title="formData.tel" v-else>{{formData.tel || ""}}</span>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item class="col-name" label="联系人">
                            <el-input v-model="formData.contacts" placeholder="请输入联系人" maxlength="50" v-if="!disabledTag"></el-input>
                            <span class="sblock" :title="formData.contacts" v-else>{{formData.contacts || ""}}</span>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item class="col-name" label="党小组数">
                            <el-input v-model="formData.group_num" placeholder="请输入党小组数" type="number" maxlength="10" :oninput="oninput(10,'group_num')" v-if="!disabledTag"></el-input>
                            <span class="sblock" :title="formData.group_num" v-else>{{formData.group_num || ""}}</span>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item class="col-name" label="农民专业合作社组织数">
                            <el-input v-model="formData.org_num" placeholder="请输入农民专业合作社组织数" type="number" maxlength="10" :oninput="oninput(10,'org_num')" v-if="!disabledTag"></el-input>
                            <span class="sblock" :title="formData.org_num" v-else>{{formData.org_num || ""}}</span>
                        </el-form-item>
                    </el-col>
                    <el-col :span="24">
                        <el-form-item class="col-name" label="备注">
                            <el-input v-model="formData.remark" type="textarea" :rows="3" placeholder="请输入备注" maxlength="300" v-if="!disabledTag"></el-input>
                            <span class="sblock" :title="formData.remark" v-else>{{formData.remark || ""}}</span>
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
                </el-row>
            </el-form>
            <!-- <div class="submit-div">
                <el-button type="primary" @click="back">返回</el-button>
                <el-button type="primary" @click="submitForm('formForm')" v-if="!disabledTag">{{ Object.keys($route.query).length != 0 ? '保存':'添加' }}</el-button>
            </div> -->
        </div>
        <treePicker :visible="treepickerDialog" @close="treepickerDialog=false" :typeId="treeType" :title="treeTitle" @choosen="treechoosenPicker" />
    </div>
</template>

<script>
import * as datacenter from '@/api/datacenter.js'
import * as common from '@/api/common.js'
import datadialog from './dialog.vue'
import inputUserId from '@/components/work/widgets/input_user_id'
import selectOpt from '@/components/datacenter/common/selectOpt'
import treePicker from '@/components/datacenter/widgets/treePicker'
import router from '@/router'
import { log } from 'util';
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
        treePicker,
        selectOpt,
        inputUserId,
        datadialog,
        "member-picker": resolve => require(["@/components/memberPicker"], resolve)
    },
    data() {
      return {
        loading: false,
        isSave: null,
        confirmShow:false,
        formData: {
            short_name: '',
            name: '',
            relation: '',
            relation_name: '',
            pid: '',
            pid_name: '',
            level: '',
            type: '',
            status: '0',
            type_name: '',
            cover_com_num: '',
            cover_person_num: '',
            cover_com_name: '',
            cover_building_name: '',
            secretary: '',
            company: '',
            approve_at: '',
            number: '',
            reason: '',
            tenure: '',
            community_id: '',
            community_name: '',
            addr: '',
            tel: '',
            contacts: '',
            change_time: '',
            code: '',
            sort: '',
            group_num: '',
            org_num: '',
            remark: '',
            lat: "",
            lng: "",
            address: [{
                lat: "39.92474600",
                lng: "116.48578600"
            }],
            address: [],
            zuobiao: '',
        },
        formRule: {
            name: [ { required: true, message: '请输入党组织全称!', trigger: 'blur' }],
            short_name: [ { required: true, message: '请输入党组织简称!', trigger: 'blur' } ],
            relation_name: [ { required: true, message: '请选择隶属关系!', trigger: 'blur' }],
            level: [ { required: true, message: '请选择级别!', trigger: 'blur' }],
            type: [ { required: true, message: '请选择党组织类别!', trigger: 'blur' }],
            // status: [ { required: true, message: '请选择是否为党支部!', trigger: 'blur' }],
        },
        centerPoint: this.$root.mapcenter,
        btnTag: 0,          // 0添加 1编辑  2取消、保存  ''返回
        user_list: [],
        leavelData: [],
        communityData: [],
        disabledTag: false,
        treepickerDialog: false,        // 树弹窗
        coverTag: 0,
        treeType: '',       // tree下拉框类型
        treeTitle: '',      // tree下拉框title
      };
    },
    methods: {
        oninput(len,field) {
            if(this.formData[field].length> len) this.formData[field]=this.formData[field].slice(0, len)
        },
        submitForm(formName) {
            this.$refs[formName].validate((valid, vinfo) => {
                if (valid) {
                    if(this.formData.relation == '0') {
                        this.$message({ message: '请选择隶属关系!', type: 'error' });
                        return;
                    }
                    /* if(this.formData.level == '0') {
                        this.$message({ message: '请选择级别!', type: 'error' });
                        return;
                    } */
                    if(this.$route.query.id) {// 修改
                        this.formData.id = this.$route.query.id
                    }else {
                        this.formData.id = ''
                    }
                    datacenter.org_edit(this.formData).then( res => {
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
                        this.$message({ message: vinfo.name[0].message, type: 'error' });
                    }else if(vinfo.short_name) {
                        this.$message({ message: vinfo.short_name[0].message, type: 'error' });
                    }else if(vinfo.relation_name) {
                        this.$message({ message: vinfo.relation_name[0].message, type: 'error' });
                    }else if(vinfo.level) {
                        this.$message({ message: vinfo.level[0].message, type: 'error' });
                    }else if(vinfo.type) {
                        this.$message({ message: vinfo.type[0].message, type: 'error' });
                    }else if(vinfo.status) {
                        this.$message({ message: vinfo.status[0].message, type: 'error' });
                    }
                    return false;
                }
            });
        },
        back() {
            if(this.$route.query.tag == 'slook') {
                this.$router.push({name: '已撤销党组织', params: this.$route.query})
            } else {
                this.$router.push({name: '党组织信息', params: this.$route.query})
            }
        },
        // 选择党组织
        groupTypeChange(val) {
            console.log('s-val',val);
            // this.formData.cover_com_num = ''
            // this.formData.cover_com_name = ''
            // this.formData.cover_person_num = ''
            // this.formData.cover_building_name = ''
            this.formData.type = val
            let arr1 = [26, 21, 22, 23, 30]         // 覆盖企业数 1
            let arr2 = [24, 12, 13, 20]             // 覆盖居民楼 2
            if(arr1.indexOf(Number(val)) > -1) {           // 存在企业
                this.coverTag = 1
            }else if(arr2.indexOf(Number(val)) > -1) {     // 存在居民
                this.coverTag = 2
            }else {
                this.coverTag = 0
            }
        },
        // 树下拉列表
        treechoosenPicker(type, obj) {
            console.log('obj',obj);
            let field_id = '';
            let field_name = '';
            if(type == 'org_type') {
                field_id = 'type'
                field_name = 'type_name'
                this.groupTypeChange(!obj?'':obj.id)
            } else if(type == 'org_relation') {
                field_id = 'relation'
                field_name = 'relation_name'
            }
            if(!obj) {
                this.formData[field_id] = ''
                this.formData[field_name] = ''
                return 
            }
            this.formData[field_id] = obj.id
            this.formData[field_name] = obj.value
            console.log('??',this.formData.cover_com_num);
            
        },
        getDicData() {
            // 级别
            common.getDictData_tree({id: 3}).then( res => {
                this.leavelData = res.data.data
            })
            // 企业规模 单位规模
            common.getDictData_tree({id: 'com_scale'}).then( res => {
                this.comScaleData = res.data.data
            })
            // 企业登记注册类型 
            common.getDictData_tree({id: 'unit_reg_type'}).then( res => {
                this.unitRegData = res.data.data
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
                if(this.btnTag == 1 || this.btnTag == '') {  // 编辑按钮（查看）
                    url = 'org_detail'
                }else if(this.btnTag == 2){
                    url = 'org_edit_info'
                }
                datacenter[url]({id: this.$route.query.id}).then( res => {
                    this.formData = res.data.data
                    this.groupTypeChange(this.formData.type)
                    this.set0Val(['community_id','sort'])
                    if((res.data.data.lng == '' && res.data.data.lat == '') || +res.data.data.lng == 0 && +res.data.data.lat == 0) {
                        return
                    }
                    let addr = [res.data.data.lng, res.data.data.lat]
                    this.mapSet(addr)
                    this.$set(this.formData, 'zuobiao', addr.join(','))
                }) 
            }
        },
        // 清空为0的数据
        set0Val(fieldArr) {
            for (const key in fieldArr) {
                this.formData[fieldArr[key]] = this.formData[fieldArr[key]] == '0'?'':this.formData[fieldArr[key]];
            }
        }
    },
    created() {
        console.log(this.$root);
        
        if (window.history && window.history.pushState) {
            history.pushState(null, null, document.URL);
            window.addEventListener('popstate', this.back, false);
        }
        this.getDicData()
        if(this.$route.query.id) {
            if(this.$route.query.tag == 'look') {
                this.btnTag = 1
                this.disabledTag = true
            }else if(this.$route.query.tag == 'slook') {
                this.btnTag = ''
                this.disabledTag = true
            }else{
                this.btnTag = 2
            }
            this.getData();
        }else {
            datacenter.add_first_org({id: this.$route.query.org_id}).then( res => {
                this.formData.pid = res.data.data.id
                this.formData.pid_name = res.data.data.pid_name
            })
        }
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
.form-row { position: relative; }
.masking { position: absolute; left: 0;top: 0; width: 100%; height: 100%; cursor: not-allowed; }
</style>