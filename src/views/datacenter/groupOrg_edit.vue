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
            <el-form class="flex-1 scrollbar" :model="formData" :rules="formRule" ref="formForm" label-width="190px" :show-message="false" size="medium" label-suffix=":">
                <el-row class="form-row fix">
                    <el-row class="upload-row">
                        <el-row>
                            <el-col :span="20" class="calc-w-20">
                                <el-form-item class="col-name" label="团组织名称" prop="name">
                                    <el-input v-model="formData.name" placeholder="请输入团组织名称" maxlength="50" v-if="!disabledTag"></el-input>
                                    <span class="sblock" :title="formData.name" v-else>{{formData.name || ""}}</span>
                                </el-form-item>
                            </el-col>
                            <el-col :span="10">
                                <el-form-item class="col-name" label="团组织书记">
                                    <el-input v-model="formData.secretary" placeholder="请输入书记姓名" maxlength="10" v-if="!disabledTag"></el-input>
                                    <span class="sblock" :title="formData.secretary" v-else>{{formData.secretary || ""}}</span>
                                </el-form-item>
                            </el-col>
                            <el-col :span="8" class="calc-w-8">
                                <el-form-item class="col-name" label="任期(年)">
                                    <el-input v-model="formData.tenure" placeholder="请输入任期" type="text" maxlength="5" oninput="value=value.replace(/[^0-9.]/g,'')" v-if="!disabledTag"></el-input>
                                    <span class="sblock" :title="formData.tenure" v-else>{{formData.tenure || ""}}</span>
                                </el-form-item>
                            </el-col>
                            <el-col :span="20" class="calc-w-20">
                                <el-form-item class="col-name" label="联系电话">
                                    <el-input v-model="formData.tel" placeholder="请输入联系电话" maxlength="20" v-if="!disabledTag"></el-input>
                                    <span class="sblock" :title="formData.tel" v-else>{{formData.tel || ""}}</span>
                                </el-form-item>
                            </el-col>
                            <el-col :span="10">
                                <el-form-item class="col-name" label="所属社区">
                                    <el-select v-model="formData.community_id" placeholder="请选择所属社区" style="width:100%;" v-if="!disabledTag">
                                        <el-option :label="item.name" :value="item.id" :key="index" v-for="(item, index) in communityData"></el-option>
                                    </el-select>
                                    <span class="sblock" :title="formData.community_name" v-else>{{formData.community_name || ""}}</span>
                                </el-form-item>
                            </el-col>
                            <el-col :span="8" class="calc-w-8">
                                <el-form-item class="col-name" label="团组织建立时间">
                                    <el-date-picker type="date" placeholder="请选择时间" value-format="yyyy-MM-dd" v-model="formData.setup_time" style="width: 100%;" v-if="!disabledTag"></el-date-picker>
                                    <span class="sblock" :title="formData.setup_time" v-else>{{formData.setup_time || ""}}</span>
                                </el-form-item>
                            </el-col>
                            <uploadIcon :image="formData.legal_img_url" :lookTag="disabledTag" imgText="团组织书记照片" @on-Success="uploadSuccess" />
                        </el-row>
                    </el-row>
                    <el-col :span="10">
                        <el-form-item class="col-name" label="团组织换届时间">
                            <el-date-picker type="date" placeholder="请选择时间" v-model="formData.change_time" value-format="yyyy-MM-dd" style="width: 100%;" v-if="!disabledTag"></el-date-picker>
                            <span class="sblock" :title="formData.change_time" v-else>{{formData.change_time || ""}}</span>
                        </el-form-item>
                    </el-col>
                    <el-col :span="14">
                        <el-form-item class="col-name company" label="单位" prop="company">
                            <el-input v-model="formData.company" readonly placeholder="请选择单位" v-if="!disabledTag">
                                <el-button slot="suffix" size="mini" @click="unitSDialog = true">单位库选择</el-button>
                                <el-button slot="suffix" size="mini" @click="addDialog = true">手动添加</el-button>
                            </el-input>
                            <span class="sblock" :title="formData.company" v-else>{{formData.company || ""}}</span>
                        </el-form-item>
                    </el-col>
                    <el-col :span="24" v-if="hand_addr">
                        <el-form-item class="col-name" label="单位地址">
                            <el-input v-model="formData.addr" placeholder="请输入单位地址" maxlength="50" v-if="!disabledTag"></el-input>
                            <span class="sblock" :title="formData.addr" v-else>{{formData.addr || ""}}</span>
                        </el-form-item>
                    </el-col>
                    <div class="detail-subtext">团员数</div>
                    <el-col :span="10">
                        <el-form-item class="col-name" label="18周岁以下">
                            <el-input v-model="formData.lt18_member_num" placeholder="请输入团员数量" type="number" maxlength="10" :oninput="oninput(10,'lt18_member_num')" v-if="!disabledTag"></el-input>
                            <span class="sblock" :title="formData.lt18_member_num" v-else>{{formData.lt18_member_num || ""}}</span>
                        </el-form-item>
                    </el-col>
                    <el-col :span="14">
                        <el-form-item class="col-name" label="19-28周岁">
                            <el-input v-model="formData.gt18_member_num" placeholder="请输入团员数量" type="number" maxlength="10" :oninput="oninput(10,'gt18_member_num')" v-if="!disabledTag"></el-input>
                            <span class="sblock" :title="formData.gt18_member_num" v-else>{{formData.gt18_member_num || ""}}</span>
                        </el-form-item>
                    </el-col>
                    <div class="detail-subtext">青年数</div>
                    <el-col :span="10">
                        <el-form-item class="col-name" label="14-28周岁">
                            <el-input v-model="formData.lt28_youth_num" placeholder="请输入青年数量" type="number" maxlength="10" :oninput="oninput(10,'lt28_youth_num')" v-if="!disabledTag"></el-input>
                            <span class="sblock" :title="formData.lt28_youth_num" v-else>{{formData.lt28_youth_num || ""}}</span>
                        </el-form-item>
                    </el-col>
                    <el-col :span="14">
                        <el-form-item class="col-name" label="29-35周岁">
                            <el-input v-model="formData.gt28_youth_num" placeholder="请输入青年数量" type="number" maxlength="10" :oninput="oninput(10,'gt28_youth_num')" v-if="!disabledTag"></el-input>
                            <span class="sblock" :title="formData.gt28_youth_num" v-else>{{formData.gt28_youth_num || ""}}</span>
                        </el-form-item>
                    </el-col>
                    <el-col :span="10">
                        <el-form-item class="col-name" label="发展团员数">
                            <el-input v-model="formData.developed_member_num" placeholder="请输入发展团员数" type="number" maxlength="10" :oninput="oninput(10,'developed_member_num')" v-if="!disabledTag"></el-input>
                            <span class="sblock" :title="formData.developed_member_num" v-else>{{formData.developed_member_num || ""}}</span>
                        </el-form-item>
                    </el-col>
                    <el-col :span="14">
                        <el-form-item class="col-name" label="团员数">
                            <el-input v-model="formData.member_num" placeholder="请输入团员数" type="number" maxlength="10" :oninput="oninput(10,'member_num')" v-if="!disabledTag"></el-input>
                            <span class="sblock" :title="formData.member_num" v-else>{{formData.member_num || ""}}</span>
                        </el-form-item>
                    </el-col>
                    <el-col :span="10">
                        <el-form-item class="col-name" label="保留团籍的党员数">
                            <el-input v-model="formData.own_youth_party_member_num" placeholder="请输入保留团籍的党员数" type="number" maxlength="10" :oninput="oninput(10,'own_youth_party_member_num')" v-if="!disabledTag"></el-input>
                            <span class="sblock" :title="formData.own_youth_party_member_num" v-else>{{formData.own_youth_party_member_num || ""}}</span>
                        </el-form-item>
                    </el-col>
                    <el-col :span="14">
                        <el-form-item class="col-name" label="28周岁以下青年入党人数">
                            <el-input v-model="formData.lt28_party_member_num" placeholder="请输入入党人数" type="number" maxlength="10" :oninput="oninput(10,'lt28_party_member_num')" v-if="!disabledTag"></el-input>
                            <span class="sblock" :title="formData.lt28_party_member_num" v-else>{{formData.lt28_party_member_num || ""}}</span>
                        </el-form-item>
                    </el-col>
                    <div class="detail-subtext">团委核定编制人数</div>
                    <el-col :span="8">
                        <el-form-item class="col-name" label="书记">
                            <el-input v-model="formData.approved_secretray_num" placeholder="请输入人数" type="number" maxlength="10" :oninput="oninput(10,'approved_secretray_num')" v-if="!disabledTag"></el-input>
                            <span class="sblock" :title="formData.approved_secretray_num" v-else>{{formData.approved_secretray_num || ""}}</span>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item class="col-name" label="副书记">
                            <el-input v-model="formData.approved_secondary_secretray_num" placeholder="请输入人数" type="number" maxlength="10" :oninput="oninput(10,'approved_secondary_secretray_num')" v-if="!disabledTag"></el-input>
                            <span class="sblock" :title="formData.approved_secondary_secretray_num" v-else>{{formData.approved_secondary_secretray_num || ""}}</span>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item class="col-name" label="一般党员">
                            <el-input v-model="formData.approved_general_staff_num" placeholder="请输入人数" type="number" maxlength="10" :oninput="oninput(10,'approved_general_staff_num')" v-if="!disabledTag"></el-input>
                            <span class="sblock" :title="formData.approved_general_staff_num" v-else>{{formData.approved_general_staff_num || ""}}</span>
                        </el-form-item>
                    </el-col>
                    <div class="detail-subtext">实际配备人数</div>
                    <el-col :span="8">
                        <el-form-item class="col-name" label="书记">
                            <el-input v-model="formData.secretray_num" placeholder="请输入人数" type="number" maxlength="10" :oninput="oninput(10,'secretray_num')" v-if="!disabledTag"></el-input>
                            <span class="sblock" :title="formData.secretray_num" v-else>{{formData.secretray_num || ""}}</span>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item class="col-name" label="副书记">
                            <el-input v-model="formData.secondary_secretray_num" placeholder="请输入人数" type="number" maxlength="10" :oninput="oninput(10,'secondary_secretray_num')" v-if="!disabledTag"></el-input>
                            <span class="sblock" :title="formData.secondary_secretray_num" v-else>{{formData.secondary_secretray_num || ""}}</span>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item class="col-name" label="一般党员">
                            <el-input v-model="formData.general_staff_num" placeholder="请输入人数" type="number" maxlength="10" :oninput="oninput(10,'general_staff_num')" v-if="!disabledTag"></el-input>
                            <span class="sblock" :title="formData.general_staff_num" v-else>{{formData.general_staff_num || ""}}</span>
                        </el-form-item>
                    </el-col>
                    <div class="detail-subtext">工作经费（元）</div>
                    <el-col :span="6">
                        <el-form-item class="col-name" label="所在单位拨款">
                            <el-input v-model="formData.unit_grant" placeholder="请输入金额" type="text" maxlength="10" oninput="value=value.replace(/[^0-9.]/g,'')" v-if="!disabledTag"></el-input>
                            <span class="sblock" :title="formData.unit_grant" v-else>{{formData.unit_grant || ""}}</span>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item class="col-name" label="团费">
                            <el-input v-model="formData.group_fee" placeholder="请输入金额" type="text" maxlength="10" oninput="value=value.replace(/[^0-9.]/g,'')" v-if="!disabledTag"></el-input>
                            <span class="sblock" :title="formData.group_fee" v-else>{{formData.group_fee || ""}}</span>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item class="col-name" label="自筹">
                            <el-input v-model="formData.self_raising" placeholder="请输入金额" type="text" maxlength="10" oninput="value=value.replace(/[^0-9.]/g,'')" v-if="!disabledTag"></el-input>
                            <span class="sblock" :title="formData.self_raising" v-else>{{formData.self_raising || ""}}</span>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item class="col-name" label="合计">
                            <el-input v-model="formData.total" placeholder="请输入金额" type="text" maxlength="10" oninput="value=value.replace(/[^0-9.]/g,'')" v-if="!disabledTag"></el-input>
                            <span class="sblock" :title="formData.total" v-else>{{formData.total || ""}}</span>
                        </el-form-item>
                    </el-col>
                    <el-col :span="10">
                        <el-form-item class="col-name" label="团委是否独立设置">
                            <el-radio-group v-model="formData.independent" v-if="!disabledTag">
                                <el-radio label="1">是</el-radio>
                                <el-radio label="0">否</el-radio>
                            </el-radio-group>
                            <span class="sblock" :title="(formData.independent=='1'?'是':'否')" v-else>{{(formData.independent=='1'?'是':'否') || ""}}</span>
                        </el-form-item>
                    </el-col>
                    <el-col :span="14">
                        <el-form-item class="col-name" label="团委与何部门合署">
                            <el-input v-model="formData.with_other_depart" placeholder="请输入合署部门" maxlength="50" v-if="!disabledTag"></el-input>
                            <span class="sblock" :title="formData.with_other_depart" v-else>{{formData.with_other_depart || ""}}</span>
                        </el-form-item>
                    </el-col>
                    <el-col :span="10">
                        <el-form-item class="col-name" label="是否有独立活动室">
                            <el-radio-group v-model="formData.is_activity" v-if="!disabledTag">
                                <el-radio label="1">是</el-radio>
                                <el-radio label="0">否</el-radio>
                            </el-radio-group>
                            <span class="sblock" :title="(formData.is_activity=='1'?'是':'否')" v-else>{{(formData.is_activity=='1'?'是':'否') || ""}}</span>
                        </el-form-item>
                    </el-col>
                    <el-col :span="14">
                        <el-form-item class="col-name" label="活动室面积(㎡)">
                            <el-input v-model="formData.activity_room_area" placeholder="请输入活动室面积" type="text" maxlength="10" oninput="value=value.replace(/[^0-9.]/g,'')" v-if="!disabledTag"></el-input>
                            <span class="sblock" :title="formData.activity_room_area" v-else>{{formData.activity_room_area || ""}}</span>
                        </el-form-item>
                    </el-col>
                    <el-col :span="10">
                        <el-form-item class="col-name" label="是否建立独立网站或网址">
                            <el-radio-group v-model="formData.is_web" v-if="!disabledTag">
                                <el-radio label="1">是</el-radio>
                                <el-radio label="0">否</el-radio>
                            </el-radio-group>
                            <span class="sblock" :title="(formData.is_web=='1'?'是':'否')" v-else>{{(formData.is_web=='1'?'是':'否') || ""}}</span>
                        </el-form-item>
                    </el-col>
                    <el-col :span="14">
                        <el-form-item class="col-name" label="网站地址">
                            <el-input v-model="formData.web_url" placeholder="请输入网站地址" maxlength="50" v-if="!disabledTag"></el-input>
                            <span class="sblock" :title="formData.web_url" v-else>{{formData.web_url || ""}}</span>
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
        <unitDialog :visible="unitSDialog" @close="unitSDialog=false" @choosen="unitSResult" />
        <addInputText :visible="addDialog" @close="addDialog=false" title="单位" @choosen="addResult" />
    </div>
</template>

<script>
import * as datacenter from '../../api/datacenter.js'
import datadialog from './dialog.vue'
import inputUserId from '@/components/work/widgets/input_user_ids'
import unitDialog from '@/components/datacenter/widgets/unit_dialog'
import addInputText from '@/components/datacenter/widgets/add_input_text'
import uploadIcon from '@/components/datacenter/widgets/uploadIcon'
import router from '@/router'
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
        uploadIcon,
        addInputText,
        unitDialog,
        inputUserId,
        datadialog,
        "member-picker": resolve => require(["@/components/memberPicker"], resolve)
    },
    data() {
      return {
        isSave: null,
        confirmShow:false,
        loading: false,
        hand_addr: false,
        unitSDialog: false,
        addDialog: false,
        formData: {
            name: '',
            secretary: '',
            tenure: '',
            tel: '',
            community_id: '',
            community_name: '',
            setup_time: '',
            change_time: '',
            legal_img: '',
            legal_img_url: '',
            company: '',
            addr: '',
            lt18_member_num: '',
            gt18_member_num: '',
            lt28_youth_num: '',
            gt28_youth_num: '',
            developed_member_num: '',
            member_num: '',
            own_youth_party_member_num: '',
            lt28_party_member_num: '',
            approved_secretray_num: '',
            approved_secondary_secretray_num: '',
            approved_general_staff_num: '',
            secretray_num: '',
            secondary_secretray_num: '',
            general_staff_num: '',
            unit_grant: '',
            group_fee: '',
            self_raising: '',
            total: '',
            independent: '1',
            with_other_depart: '',
            is_activity: '1',
            activity_room_area: '',
            is_web: '1',
            web_url: '',
            lat: "",
            lng: "",
            address: [],
            zuobiao: '',
        },
        formRule: {
            name: [ { required: true, trigger: 'blur' }],
        },
        centerPoint: this.$root.mapcenter,
        btnTag: 0,          // 0添加 1编辑  2取消、保存
        communityData: [],
        disabledTag: false
      };
    },
    methods: {
        oninput(len,field) {
            if(this.formData[field].length> len) this.formData[field]=this.formData[field].slice(0, len)
        },
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    if(this.$route.query.id) {// 修改
                        this.formData.id = this.$route.query.id
                    }else {
                        this.formData.id = ''
                    }
                    datacenter.group_edit(this.formData).then( res => {
                        if(res.data.status  == '200') {
                            this.isSave = true;
                            this.$message({ message: res.data.statusCode, type: 'success' });
                            this.back()
                        }else {
                            this.$message({ message: res.data.statusCode, type: 'error' });
                        }
                    })
                } else {
                    this.$message({ message: '请输入团组织名称！', type: 'error' });
                    return false;
                }
            });
        },
        back() {
            this.$router.push({name: '团组织', params: this.$route.query})
        },
        // 单位库选择结果
        unitSResult(item) {
            this.formData.company = item.short_name
            this.formData.unit_id = item.id
            this.hand_addr = false;
        },
        addResult(text) {
            console.log('text',text);
            this.formData.company = text
            this.formData.unit_id = ''
            this.hand_addr = true;
        },
        // 上传成功
        uploadSuccess(res, file, fileList) {
            this.formData.legal_img_url = res.data.url
            this.formData.legal_img = res.data.id
        },
        getDicData() {
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
                    url = 'youth_detail'
                }else if(this.btnTag == 2){
                    url = 'group_edit_info'
                }
                datacenter[url]({id: this.$route.query.id}).then( res => {
                    this.formData = res.data.data
                    if(this.formData.unit_id == '0') {
                        this.hand_addr = true;
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
        this.getDicData()
        if(this.$route.query.id) {
            if(this.$route.query.tag == 'look') {
                this.btnTag = 1
                this.disabledTag = true
            }else{
                this.btnTag = 2
            }
            this.getData();
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
/* .form-row { position: relative; }
.masking { position: absolute; left: 0;top: 0; width: 100%; height: 100%; cursor: not-allowed; } */
.avatar-uploader { height: 243px; line-height: 200px; }
</style>