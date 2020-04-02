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
                    <el-col :span="24">
                        <el-form-item class="col-name company" label="单位" prop="company">
                            <el-input v-model="formData.company" readonly placeholder="请选择单位" v-if="!disabledTag">
                                <el-button slot="suffix" size="mini" @click="unitSDialog = true">单位库选择</el-button>
                                <el-button slot="suffix" size="mini" @click="addDialog = true">手动添加</el-button>
                            </el-input>
                            <span class="sblock" :title="formData.company" v-else>{{formData.company || ""}}</span>
                        </el-form-item>
                    </el-col>
                    <el-col :span="10" v-if="hand_addr">
                        <el-form-item class="col-name" label="单位地址">
                            <el-input v-model="formData.addr" placeholder="请输入单位地址" maxlength="50" v-if="!disabledTag"></el-input>
                            <span class="sblock" :title="formData.addr" v-else>{{formData.addr || ""}}</span>
                        </el-form-item>
                    </el-col>
                    <el-col :span="14" v-if="hand_addr">
                        <el-form-item class="col-name" label="是否建立党组织">
                            <el-radio-group v-model="formData.party_branch" v-if="!disabledTag">
                                <el-radio label="1">是</el-radio>
                                <el-radio label="0">否</el-radio>
                            </el-radio-group>
                            <span class="sblock" :title="(formData.party_branch=='1'?'是':'否')" v-else>{{(formData.party_branch=='1'?'是':'否') || ""}}</span>
                        </el-form-item>
                    </el-col>
                    <el-row class="upload-row">
                        <el-row>
                            <el-col :span="10">
                                <el-form-item class="col-name" label="妇联主席">
                                    <el-input v-model="formData.chairman" placeholder="请输入主席姓名" maxlength="10" v-if="!disabledTag"></el-input>
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
                                <el-form-item class="col-name" label="妇联建立时间">
                                    <el-date-picker type="date" placeholder="请选择时间" value-format="yyyy-MM-dd" v-model="formData.setup_time" style="width: 100%;" v-if="!disabledTag"></el-date-picker>
                                    <span class="sblock" :title="formData.setup_time" v-else>{{formData.setup_time || ""}}</span>
                                </el-form-item>
                            </el-col>
                            <el-col :span="8" class="calc-w-8">
                                <el-form-item class="col-name" label="妇联换届时间">
                                    <el-date-picker type="date" placeholder="请选择时间" value-format="yyyy-MM-dd" v-model="formData.change_time" style="width: 100%;" v-if="!disabledTag"></el-date-picker>
                                    <span class="sblock" :title="formData.change_time" v-else>{{formData.change_time || ""}}</span>
                                </el-form-item>
                            </el-col>
                            <el-col :span="10">
                                <el-form-item class="col-name" label="联系电话">
                                    <el-input v-model="formData.tel" placeholder="请输入联系电话" maxlength="20" v-if="!disabledTag"></el-input>
                                    <span class="sblock" :title="formData.tel" v-else>{{formData.tel || ""}}</span>
                                </el-form-item>
                            </el-col>
                            <el-col :span="8" class="calc-w-8">
                                <el-form-item class="col-name" label="地区人口总数">
                                    <el-input v-model="formData.user_num" placeholder="请输入地区人口总数" type="number" maxlength="10" :oninput="oninput(10,'user_num')" v-if="!disabledTag"></el-input>
                                    <span class="sblock" :title="formData.user_num" v-else>{{formData.user_num || ""}}</span>
                                </el-form-item>
                            </el-col>
                            <el-col :span="10">
                                <el-form-item class="col-name" label="妇女人口总数">
                                    <el-input v-model="formData.women_num" placeholder="请输入妇女人口总数" type="number" maxlength="10" :oninput="oninput(10,'women_num')" v-if="!disabledTag"></el-input>
                                    <span class="sblock" :title="formData.women_num" v-else>{{formData.women_num || ""}}</span>
                                </el-form-item>
                            </el-col>
                            <el-col :span="8" class="calc-w-8">
                                <el-form-item class="col-name" label="妇联党员数">
                                    <el-input v-model="formData.party_num" placeholder="请输入妇联党员数" type="number" maxlength="10" :oninput="oninput(10,'party_num')" v-if="!disabledTag"></el-input>
                                    <span class="sblock" :title="formData.party_num" v-else>{{formData.party_num || ""}}</span>
                                </el-form-item>
                            </el-col>
                            <uploadIcon :image="formData.legal_img_url" :lookTag="disabledTag" imgText="妇联主席照片" @on-Success="uploadSuccess" />
                        </el-row>
                    </el-row>
                    <el-col :span="24">
                        <el-form-item class="col-name" label="其他工作人员名单">
                            <el-input v-model="formData.other_woker" type="textarea" :rows="3" placeholder="请输入其他工作人员名单以”,“隔开" maxlength="300" v-if="!disabledTag"></el-input>
                            <span class="sblock" :title="formData.other_woker" v-else>{{formData.other_woker || ""}}</span>
                        </el-form-item>
                    </el-col>
                    <div class="detail-subtext">妇联编制情况</div>
                    <el-col :span="8">
                        <el-form-item class="col-name" label="行政事业编制(人)">
                            <el-input v-model="formData.temporary_num" placeholder="请输入人数" type="number" maxlength="10" :oninput="oninput(10,'temporary_num')" v-if="!disabledTag"></el-input>
                            <span class="sblock" :title="formData.temporary_num" v-else>{{formData.temporary_num || ""}}</span>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item class="col-name" label="无编聘用(人)">
                            <el-input v-model="formData.regular_num" placeholder="请输入人数" type="number" maxlength="10" :oninput="oninput(10,'regular_num')" v-if="!disabledTag"></el-input>
                            <span class="sblock" :title="formData.regular_num" v-else>{{formData.regular_num || ""}}</span>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item class="col-name" label="其他(人)">
                            <el-input v-model="formData.other_member_num" placeholder="请输入人数" type="number" maxlength="10" :oninput="oninput(10,'other_member_num')" v-if="!disabledTag"></el-input>
                            <span class="sblock" :title="formData.other_member_num" v-else>{{formData.other_member_num || ""}}</span>
                        </el-form-item>
                    </el-col>
                    <div class="detail-subtext">两代一委员情况</div>
                    <el-col :span="8">
                        <el-form-item class="col-name" label="女党员代表数">
                            <el-input v-model="formData.party_representative_num" placeholder="请输入人数" type="number" maxlength="10" :oninput="oninput(10,'party_representative_num')" v-if="!disabledTag"></el-input>
                            <span class="sblock" :title="formData.party_representative_num" v-else>{{formData.party_representative_num || ""}}</span>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item class="col-name" label="女人大代表数">
                            <el-input v-model="formData.npc_deputy_num" placeholder="请输入人数" type="number" maxlength="10" :oninput="oninput(10,'npc_deputy_num')" v-if="!disabledTag"></el-input>
                            <span class="sblock" :title="formData.npc_deputy_num" v-else>{{formData.npc_deputy_num || ""}}</span>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item class="col-name" label="女政协委员数">
                            <el-input v-model="formData.cppcc_member_num" placeholder="请输入人数" type="number" maxlength="10" :oninput="oninput(10,'cppcc_member_num')" v-if="!disabledTag"></el-input>
                            <span class="sblock" :title="formData.cppcc_member_num" v-else>{{formData.cppcc_member_num || ""}}</span>
                        </el-form-item>
                    </el-col>
                    <!-- <div class="detail-subtext">妇联工作经费</div>
                    <el-col :span="8">
                        <el-form-item class="col-name" label="2千元以下">
                            <el-input v-model="formData.working_expenses1" placeholder="请输入人数" type="number" maxlength="10" :oninput="oninput(10,'working_expenses1')" v-if="!disabledTag"></el-input>
                            <span class="sblock" :title="formData.working_expenses1" v-else>{{formData.working_expenses1 || ""}}</span>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item class="col-name" label="3-5千元">
                            <el-input v-model="formData.working_expenses2" placeholder="请输入人数" type="number" maxlength="10" :oninput="oninput(10,'working_expenses2')" v-if="!disabledTag"></el-input>
                            <span class="sblock" :title="formData.working_expenses2" v-else>{{formData.working_expenses2 || ""}}</span>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item class="col-name" label="5千元以上">
                            <el-input v-model="formData.working_expenses3" placeholder="请输入人数" type="number" maxlength="10" :oninput="oninput(10,'working_expenses3')" v-if="!disabledTag"></el-input>
                            <span class="sblock" :title="formData.working_expenses3" v-else>{{formData.working_expenses3 || ""}}</span>
                        </el-form-item>
                    </el-col> -->
                    <div class="detail-subtext">妇联活动场地情况</div>
                    <el-col :span="10">
                        <el-form-item class="col-name" label="有无活动场所">
                            <el-radio-group v-model="formData.avtivity_venue" v-if="!disabledTag">
                                <el-radio label="1">有</el-radio>
                                <el-radio label="0">无</el-radio>
                            </el-radio-group>
                            <span class="sblock" :title="(formData.avtivity_venue=='1'?'有':'无')" v-else>{{(formData.avtivity_venue=='1'?'有':'无') || ""}}</span>
                        </el-form-item>
                    </el-col>
                    <el-col :span="14">
                        <el-form-item class="col-name" label="活动场地面积(㎡)">
                            <el-input v-model="formData.avtivity_area" placeholder="请输入活动场地面积" type="text" maxlength="10" oninput="value=value.replace(/[^0-9.]/g,'')" v-if="!disabledTag"></el-input>
                            <span class="sblock" :title="formData.avtivity_area" v-else>{{formData.avtivity_area || ""}}</span>
                        </el-form-item>
                    </el-col>
                    <div class="detail-subtext">各类妇女工作阵地情况</div>
                    <el-col :span="10">
                        <el-form-item class="col-name" label="有无妇女之家">
                            <el-radio-group v-model="formData.women_house" v-if="!disabledTag">
                                <el-radio label="1">有</el-radio>
                                <el-radio label="0">无</el-radio>
                            </el-radio-group>
                            <span class="sblock" :title="(formData.women_house=='1'?'有':'无')" v-else>{{(formData.women_house=='1'?'有':'无') || ""}}</span>
                        </el-form-item>
                    </el-col>
                    <el-col :span="14">
                        <el-form-item class="col-name" label="有无妇女学校">
                            <el-radio-group v-model="formData.women_school" v-if="!disabledTag">
                                <el-radio label="1">有</el-radio>
                                <el-radio label="0">无</el-radio>
                            </el-radio-group>
                            <span class="sblock" :title="(formData.women_school=='1'?'有':'无')" v-else>{{(formData.women_school=='1'?'有':'无') || ""}}</span>
                        </el-form-item>
                    </el-col>
                    <el-col :span="10">
                        <el-form-item class="col-name" label="有无妇女就业指导中心">
                            <el-radio-group v-model="formData.employment_guidance_center" v-if="!disabledTag">
                                <el-radio label="1">有</el-radio>
                                <el-radio label="0">无</el-radio>
                            </el-radio-group>
                            <span class="sblock" :title="(formData.employment_guidance_center=='1'?'有':'无')" v-else>{{(formData.employment_guidance_center=='1'?'有':'无') || ""}}</span>
                        </el-form-item>
                    </el-col>
                    <el-col :span="14">
                        <el-form-item class="col-name" label="妇女群众协会数">
                            <el-input v-model="formData.mass_group_num" placeholder="请输入妇女群众协会数量" type="number" maxlength="10" :oninput="oninput(10,'mass_group_num')" v-if="!disabledTag"></el-input>
                            <span class="sblock" :title="formData.mass_group_num" v-else>{{formData.mass_group_num || ""}}</span>
                        </el-form-item>
                    </el-col>
                    <el-col :span="10">
                        <el-form-item class="col-name" label="妇女群众性文艺团体数">
                            <el-input v-model="formData.art_group_num" placeholder="请输入群众性文艺团体数" type="number" maxlength="10" :oninput="oninput(10,'art_group_num')" v-if="!disabledTag"></el-input>
                            <span class="sblock" :title="formData.art_group_num" v-else>{{formData.art_group_num || ""}}</span>
                        </el-form-item>
                    </el-col>
                    <el-col :span="14">
                        <el-form-item class="col-name" label="有无巾帼志愿者服务队及人数">
                            <span class="col-name slot-form-label" slot="label">
                                <span class="sblock">有无巾帼志愿者服务队及人数:</span>
                            </span>
                            <el-input v-model="formData.volunteer_team" placeholder="请输入有无巾帼志愿者服务队及人数" maxlength="50" v-if="!disabledTag"></el-input>
                            <span class="sblock" :title="formData.volunteer_team" v-else>{{formData.volunteer_team || ""}}</span>
                        </el-form-item>
                    </el-col>
                    <el-col :span="10">
                        <el-form-item class="col-name" label="有无妇女儿童公益岗位及数量">
                            <span class="col-name slot-form-label" slot="label">
                                <span class="sblock">有无妇女儿童公益岗位及数量:</span>
                            </span>
                            <el-input v-model="formData.public_posts" placeholder="请输入妇女儿童公益岗位及数量" maxlength="50" v-if="!disabledTag"></el-input>
                            <span class="sblock" :title="formData.public_posts" v-else>{{formData.public_posts || ""}}</span>
                        </el-form-item>
                    </el-col>
                    <el-col :span="14">
                        <el-form-item class="col-name" label="有无妇女维权站">
                            <el-radio-group v-model="formData.rights_protect_station" v-if="!disabledTag">
                                <el-radio label="1">有</el-radio>
                                <el-radio label="0">无</el-radio>
                            </el-radio-group>
                            <span class="sblock" :title="(formData.rights_protect_station=='1'?'有':'无')" v-else>{{(formData.rights_protect_station=='1'?'有':'无') || ""}}</span>
                        </el-form-item>
                    </el-col>
                    <el-col :span="24">
                        <el-form-item class="col-name" label="其他组织">
                            <el-input v-model="formData.other_groups" type="textarea" :rows="3" placeholder="请输入其他组织以”,“隔开" maxlength="200" v-if="!disabledTag"></el-input>
                            <span class="sblock" :title="formData.other_groups" v-else>{{formData.other_groups || ""}}</span>
                        </el-form-item>
                    </el-col>
                    <el-col :span="10">
                        <el-form-item class="col-name" label="妇联工作经费">
                            <!-- <el-select v-model="formData.cost" placeholder="请选择妇联工作经费" style="width:100%;" v-if="!disabledTag">
                                <el-option :label="item.name" :value="item.id" :key="index" v-for="(item, index) in costData"></el-option>
                            </el-select> -->
                            <selectOpt v-model="formData.cost" placeholder="请选择妇联工作经费" :option="costData" @input="formData.cost=$event" v-if="!disabledTag" />
                            <span class="sblock" :title="formData.cost_name" v-else>{{formData.cost_name || ""}}</span>
                        </el-form-item>
                    </el-col>
                    <el-col :span="14">
                        <el-form-item class="col-name" label="所属社区">
                            <el-select v-model="formData.community_id" placeholder="请选择所属社区" style="width:100%;" v-if="!disabledTag">
                                <el-option :label="item.name" :value="item.id" :key="index" v-for="(item, index) in communityData"></el-option>
                            </el-select>
                            <span class="sblock" :title="formData.community_name" v-else>{{formData.leader_name || ""}}</span>
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
import * as common from '../../api/common.js'
import * as datacenter from '../../api/datacenter.js'
import datadialog from './dialog.vue'
import inputUserId from '@/components/work/widgets/input_user_ids'
import unitDialog from '@/components/datacenter/widgets/unit_dialog'
import addInputText from '@/components/datacenter/widgets/add_input_text'
import uploadIcon from '@/components/datacenter/widgets/uploadIcon'
import selectOpt from '@/components/datacenter/common/selectOpt'
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
        selectOpt,
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
        formData: {
            company: '',
            addr: '',
            party_branch: '1',
            chairman: '',
            tenure: '',
            setup_time: '',
            change_time: '',
            tel: '',
            user_num: '',
            women_num: '',
            party_num: '',
            legal_img: '',
            legal_img_url: '',
            other_woker: '',
            temporary_num: '',
            regular_num: '',
            other_member_num: '',
            party_representative_num: '',
            npc_deputy_num: '',
            cppcc_member_num: '',
            working_expenses1: '',
            working_expenses2: '',
            working_expenses3: '',
            avtivity_venue: '1',
            avtivity_area: '',
            women_house: '1',
            women_school: '1',
            employment_guidance_center: '1',
            mass_group_num: '',
            art_group_num: '',
            volunteer_team: '',
            public_posts: '',
            rights_protect_station: '1',
            other_groups: '',
            community_id: '',
            leader_name: '',
            lat: "",
            lng: "",
            address: [],
            zuobiao: '',
        },
        formRule: {
            company: [ { required: true, trigger: 'blur' } ],
            name: [ { required: true, trigger: 'blur' }],
        },
        centerPoint: this.$root.mapcenter,
        btnTag: 0,          // 0添加 1编辑  2取消、保存
        communityData: [],
        costData: [],
        disabledTag: false,
        unitSDialog: false,
        addDialog: false,
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
                    datacenter.women_edit(this.formData).then( res => {
                        if(res.data.status  == '200') {
                            this.isSave = true;
                            this.$message({ message: res.data.statusCode, type: 'success' });
                            this.back()
                        }else {
                            this.$message({ message: res.data.statusCode, type: 'error' });
                        }
                    })
                } else {
                    this.$message({ message: '请完善单位！', type: 'error' });
                    return false;
                }
            });
        },
        back() {
            this.$router.push({name: '妇联', params: this.$route.query})
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
            // 妇联工作经费 
            common.getDictData_tree({id: 'cost'}).then( res => {
                this.costData = res.data.data
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
                    url = 'women_detail'
                }else if(this.btnTag == 2){
                    url = 'women_edit_info'
                }
                datacenter[url]({id: this.$route.query.id}).then( res => {
                    this.formData = res.data.data
                    if(this.formData.unit_id == '0') {
                        this.hand_addr = true;
                    }
                    this.formData.community_id == '0'? this.formData.community_id = '': this.formData.community_id
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