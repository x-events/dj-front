<template>
    <div class="flex-1 flex-col">
        <div class="data-edit flex-col flex-1">
            <div class="title-box"><i class="ion">&#xe77a;</i>{{ $route.meta.title }}</div>
            <el-form class="flex-1 scrollbar" :model="formData" :rules="formRule" ref="formForm" label-width="190px" :show-message="false" size="medium" label-suffix=":">
                <el-row class="form-row fix">
                    <el-col :span="24">
                        <el-form-item label="单位信息" prop="company">
                            <el-input v-model="formData.company" readonly placeholder="请选择单位">
                                <el-button slot="suffix" size="mini" @click="unitSDialog = true">单位库选择</el-button>
                                <el-button slot="suffix" size="mini" @click="addDialog = true">手动添加</el-button>
                            </el-input>
                        </el-form-item>
                    </el-col>
                    <!-- <el-col :span="24">
                        <el-form-item label="单位地址">
                            <el-input v-model="formData.un1" placeholder="请输入单位地址"></el-input>
                        </el-form-item>
                    </el-col> -->
                    <el-row class="upload-row" v-if="hand_addr">
                        <el-row>
                            <el-col :span="20">
                                <el-form-item label="经营地址">
                                    <el-input v-model="formData.addr" placeholder="请输入经营地址"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="20">
                                <el-form-item label="经营范围" class="hight-item">
                                    <el-input v-model="formData.business_scope" type="textarea" :rows="4" placeholder="请输入经营范围"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="20">
                                <el-form-item label="单位法人">
                                    <el-input v-model="formData.un4" placeholder="请输入单位法人姓名"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="4" class="upload-div">
                                <el-upload
                                    class="avatar-uploader"
                                    action="https://jsonplaceholder.typicode.com/posts/"
                                    :show-file-list="false">
                                    <img v-if="formData.imageUrl" :src="formData.imageUrl" class="avatar">
                                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                                    <div slot="tip" class="el-upload__tip" v-if="!formData.imageUrl">推荐240x320比例的照片</div>
                                </el-upload>
                                <div class="upload-text">单位法人照片</div>
                            </el-col>
                        </el-row>
                    </el-row>
                    <el-row class="upload-row">
                        <el-row>
                            <el-col :span="12">
                                <el-form-item label="申请建会时间">
                                    <el-date-picker type="date" placeholder="请选择建会时间" v-model="formData.change_time" style="width: 100%;"></el-date-picker>
                                </el-form-item>
                            </el-col>
                            <el-col :span="8">
                                <el-form-item label="联系电话">
                                    <el-input v-model="formData.tel" placeholder="请输入联系电话"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item label="工会主席">
                                    <el-input v-model="formData.chairman" placeholder="请输入团组织名称"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="8">
                                <el-form-item label="任期">
                                    <el-input v-model="formData.un2" placeholder="请输入任期"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item label="职工数">
                                    <el-input v-model="formData.employee_num" placeholder="请输入职工数"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="8">
                                <el-form-item label="是否建立党组织">
                                    <el-radio-group v-model="formData.un3">
                                        <el-radio label="1">是</el-radio>
                                        <el-radio label="0">否</el-radio>
                                    </el-radio-group>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item label="登记类型">
                                    <el-select v-model="formData.nature" placeholder="请选择登记类型" style="width: 100%;">
                                        <!-- <el-option label="区域一" value="shanghai"></el-option> -->
                                    </el-select>
                                </el-form-item>
                            </el-col>
                            <el-col :span="8">
                                <el-form-item label="使用劳务派遣人数">
                                    <el-input v-model="formData.labor_dispatch" placeholder="请输入劳务派遣人数"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="4" class="upload-div">
                                <el-upload
                                    class="avatar-uploader"
                                    action="https://jsonplaceholder.typicode.com/posts/"
                                    :show-file-list="false">
                                    <img v-if="formData.imageUrl" :src="formData.imageUrl" class="avatar">
                                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                                    <div slot="tip" class="el-upload__tip" v-if="!formData.imageUrl">推荐240x320比例的照片</div>
                                </el-upload>
                                <div class="upload-text">工会主席照片</div>
                            </el-col>
                        </el-row>
                    </el-row>
                    <el-col :span="12">
                        <el-form-item label="女职工数">
                            <el-input v-model="formData.women_employee_num" placeholder="请输入女职工数"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="职工代表数">
                            <el-input v-model="formData.employee_representative" placeholder="请输入职工代表数"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="会员数">
                            <el-input v-model="formData.member_num" placeholder="请输入会员数"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="劳务派遣会员数">
                            <el-input v-model="formData.labor_dispatch_member" placeholder="请输入劳务派遣会员数"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="女会员数">
                            <el-input v-model="formData.women_member_num" placeholder="请输入女会员数"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="会员代表数">
                            <el-input v-model="formData.member_representtive" placeholder="请输入会员代表数"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="是否签订集体合同">
                            <el-radio-group v-model="formData.collective_contract">
                                <el-radio label="1">是</el-radio>
                                <el-radio label="0">否</el-radio>
                            </el-radio-group>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="是否建立职代会制度">
                            <el-radio-group v-model="formData.workers_congress">
                                <el-radio label="1">是</el-radio>
                                <el-radio label="0">否</el-radio>
                            </el-radio-group>
                        </el-form-item>
                    </el-col>
                    <el-col :span="24" class="map-content">
                        <el-form-item label="位置">
                            <bdmap class="map" :data="formData.address"></bdmap>
                        </el-form-item>
                    </el-col>
                    <el-col :span="24">
                        <el-form-item label="坐标点">
                            <el-input v-model="formData.zuobiao" placeholder="请输入坐标点"></el-input>
                        </el-form-item>
                    </el-col>
                    <div class="detail-subtext">工会党员</div>
                    <div class="masking" v-if="disabledTag"></div>
                    <el-col :span="24" class="secretary">
                        <userIdsListInput labelname="党员数" :labelwidth="190" @change="numTableList" />
                    </el-col>
                </el-row>
                <div class="shadow-table">
                    <el-table :data="formData._list.data" style="width: 100%;">
                        <el-table-column prop="name" label="姓名"></el-table-column>
                        <el-table-column prop="sex" label="性别"></el-table-column>
                        <el-table-column prop="post" label="职务"></el-table-column>
                        <el-table-column prop="tel" label="联系电话"></el-table-column>
                    </el-table>
                    <el-row class="pagination-content" type="flex">
                        <!-- <span>共{{formData.totalPages || "0"}}页</span> -->
                        <el-pagination background @current-change="dialog_currentChange" layout="prev, pager, next" :total="formData._list.totalRows"
                            :current-page="params.p"
                            :page-size="params.pagesize"
                                class="pagination">
                        </el-pagination>
                    </el-row>
                </div>
            </el-form>
            <div class="submit-div">
                <el-button type="primary" @click="back">返回</el-button>
                <el-button type="primary" @click="submitForm('formForm')" v-if="!disabledTag">{{ Object.keys($route.query).length != 0 ? '保存':'添加' }}</el-button>
            </div>
        </div>
        <unitDialog :visible="unitSDialog" @close="unitSDialog=false" @choosen="unitSResult" />
        <addInputText :visible="addDialog" @close="addDialog=false" title="单位" @choosen="addResult" />
    </div>
</template>

<script>
//   import * as datacenter from '../../api/datacenter.js'
  import datadialog from './dialog.vue'
  import inputUserIdInput from '@/components/work/widgets/input_user_ids_input'
  import userIdsListInput from '@/components/datacenter/widgets/user_ids_list_input'
  import unitDialog from '@/components/datacenter/widgets/unit_dialog'
  import addInputText from '@/components/datacenter/widgets/add_input_text'
import router from '@/router'
import { truncate } from 'fs';
  export default {
    components: {
        inputUserIdInput,
        userIdsListInput,
        addInputText,
        unitDialog,
        datadialog,
        "member-picker": resolve => require(["@/components/memberPicker"], resolve)
    },
    data() {
      return {
        loading: false,
        unitSDialog: false,
        addDialog: false,
        hand_addr: false,
        params: {
            p: 1,
            pagesize: 8,
        },
        formData: {
            company_id: '', 
            company: '',
            un1: '',
            change_time: '',
            tel: '',
            chairman: '',
            un2: '',
            un3: '1',
            addr: '',
            business_scope: '',
            un4: '',
            employee_num: '',
            member_num: '',
            nature: '',
            labor_dispatch: '',
            imageUrl: '',
            women_employee_num: '',
            employee_representative: '',
            labor_dispatch_member: '',
            women_member_num: '',
            member_representtive: '',
            collective_contract: '1',
            workers_congress: '1',
            address: [{
                lat: "39.92474600",
                lng: "116.48578600"
            }],
            zuobiao: '',
            _list:{
                data: [],
                totalRows: 0
            }
        },
        formRule: {
            // short_name: [ { required: true, trigger: 'blur' } ],
            company: [ { required: true, trigger: 'blur' }],
        },
        disabledTag: false
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.back()
          } else {
            this.$message({ message: '请完善团组织名称！', type: 'error' });
            return false;
          }
        });
      },
      back() {
            this.$router.push('union')
      },
      focusPosiz() {
          let lat = this.formData.address[0].lat
          let lng = this.formData.address[0].lng
          let pos = `${lat},${lng}`
          this.formData.zuobiao = pos
      },
        dialog_currentChange() {
            this.params.p = value
            // this.getData()
        },
        // 单位库选择结果
        unitSResult(item) {
            this.formData.company = item.name
            this.formData.company_id = item.id
            this.hand_addr = false;
        },
        addResult(text) {
            console.log('text',text);
            this.formData.company = text
            this.formData.company_id = ''
            this.hand_addr = true;
        },
        // 党员数选择
        numTableList(list) {
            console.log('list',list);
            this.formData._list = list
        }
    },
    created() {
        this.focusPosiz()
        if(Object.keys(this.$route.query).length != 0) {
            this.formData = this.$route.query
            this.formData._list = {
                data: [],
                totalRows: 0
            }
            if(this.$route.query.tag == 'look' || this.$route.query.tag == 'slook') {
                this.disabledTag = true
            }   
        }
    }
  }
</script>

<style scoped>
* {
box-sizing: border-box;
}
/* .form-row { position: relative; }
.masking { position: absolute; left: 0;top: 0; width: 100%; height: 100%; cursor: not-allowed; } */
/* .avatar-uploader { height: 243px; line-height: 200px; } */
.secretary .el-form-item,
.secretary /deep/ .heightLayout,
.secretary /deep/ .heightLayout > div,
.secretary /deep/ .el-form-item__label { line-height: 60px!important; height: 60px!important;}
/* .secretary /deep/ .heightLayout > div { width: 50%; } */
.secretary /deep/ .heightLayout .scrollcont { display: none;}
</style>