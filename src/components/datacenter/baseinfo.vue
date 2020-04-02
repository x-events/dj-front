<template>
    <div class="data-edit right-form flex-col h100" v-if="formData" :class="{'editStatus':!disabledTag}">
        <!-- <div class="dialog-info">
            <div class="dialog-table">
            <el-row class="flex-row">
                <el-col class="col-name el" :span="3">人员所在党支部</el-col>
                <el-col :title="dialogData.org_id" class="col-name el" :span="5">{{dialogData.org_id || "暂无"}}</el-col>
                <el-col class="col-name el" :span="3">姓名</el-col>
                <el-col :title="dialogData.realname" class="col-name el" :span="5">{{dialogData.realname || "暂无"}}</el-col>
                <el-col class="col-name el" :span="3">头像</el-col>
                <el-col class="col-name el" :span="5">
                <img @click="enlarge(dialogData.portrait)" :src="dialogData.portrait" alt="">
                </el-col>
            </el-row>
            <el-row>
                <el-col class="col-name el" :span="3">性别</el-col>
                <el-col class="col-name el" :span="5">{{dialogData.sex || "暂无"}}
                <span v-if="dialogData.sex == 0">男</span>
                <span v-else-if="dialogData.sex == 1">男</span>
                <span v-else-if="dialogData.sex == 2">保密</span>
                </el-col>
                <el-col class="col-name el" :span="3">民族</el-col>
                <el-col :title="dialogData.nation" class="col-name el" :span="5">{{dialogData.nation || "暂无"}}</el-col>
                <el-col class="col-name el" :span="3">身份证号</el-col>
                <el-col :title="dialogData.card" class="col-name el" :span="5">{{dialogData.card || "暂无"}}</el-col>
            </el-row>
            <el-row>
                <el-col class="col-name el" :span="3">健康状况</el-col>
                <el-col :title="dialogData.health" class="col-name el" :span="5">{{dialogData.health || "暂无"}}</el-col>
                <el-col class="col-name el" :span="3">出生日期</el-col>
                <el-col :title="dialogData.birth" class="col-name el" :span="5">{{dialogData.birth || "暂无"}}</el-col>
                <el-col class="col-name el" :span="3">政治面貌</el-col>
                <el-col :title="dialogData.politics" class="col-name el" :span="5">{{dialogData.politics || "暂无"}}</el-col>
            </el-row>
            <el-row>
                <el-col class="col-name el" :span="3">籍贯</el-col>
                <el-col :title="dialogData.native_place" class="col-name el" :span="5">{{dialogData.native_place || "暂无"}}</el-col>
                <el-col class="col-name el" :span="3">籍贯补充</el-col>
                <el-col :title="dialogData.native_supply" class="col-name el" :span="5">{{dialogData.native_supply || "暂无"}}</el-col>
                <el-col class="col-name el" :span="3">入党时间</el-col>
                <el-col :title="dialogData.join_time" class="col-name el" :span="5">{{dialogData.join_time || "暂无"}}</el-col>
            </el-row>
            <el-row>
                <el-col class="col-name el" :span="3">参加工作时间</el-col>
                <el-col :title="dialogData.work_time" class="col-name el" :span="5">{{dialogData.work_time || "暂无"}}</el-col>
                <el-col class="col-name el" :span="3">工作岗位</el-col>
                <el-col :title="dialogData.work_post" class="col-name el" :span="5">{{dialogData.work_post || "暂无"}}</el-col>
                <el-col class="col-name el" :span="3">本岗位开始工作时间</el-col>
                <el-col :title="dialogData.work_post_time" class="col-name el" :span="5">{{dialogData.work_post_time || "暂无"}}</el-col>
            </el-row>
            <el-row>
                <el-col class="col-name el" :span="3">新社会阶层情况</el-col>
                <el-col :title="dialogData.new_social" class="col-name el" :span="5">{{dialogData.new_social || "暂无"}}</el-col>
                <el-col class="col-name el" :span="3">婚姻状况</el-col>
                <el-col :title="dialogData.marital_status" class="col-name el" :span="5">{{dialogData.marital_status || "暂无"}}</el-col>
                <el-col class="col-name el" :span="3">户口性质</el-col>
                <el-col :title="dialogData.household" class="col-name el" :span="5">{{dialogData.household || "暂无"}}</el-col>
            </el-row>
            <el-row>
                <el-col class="col-name el" :span="3">职称</el-col>
                <el-col :title="dialogData.titles" class="col-name el" :span="5">{{dialogData.titles || "暂无"}}</el-col>
                <el-col class="col-name el" :span="3">缴纳党费工资基数	</el-col>
                <el-col :title="dialogData.wagebase" class="col-name el" :span="5">{{dialogData.wagebase || "暂无"}}</el-col>
                <el-col class="col-name el" :span="3">每月应缴纳党费	</el-col>
                <el-col :title="dialogData.dues" class="col-name el" :span="5">{{dialogData.dues || "暂无"}}</el-col>
            </el-row>
            <el-row>
                <el-col class="col-name el" :span="3">学历</el-col>
                <el-col :title="dialogData.education" class="col-name el" :span="5">{{dialogData.education || "暂无"}}</el-col>
                <el-col class="col-name el" :span="3">家庭住址	</el-col>
                <el-col :title="dialogData.address" class="col-name el" :span="5">{{dialogData.address || "暂无"}}</el-col>
                <el-col class="col-name el" :span="3">邮编	</el-col>
                <el-col :title="dialogData.zip_code" class="col-name el" :span="5">{{dialogData.zip_code || "暂无"}}</el-col>
            </el-row>
            <el-row>
                <el-col class="col-name el" :span="3">户口所在地</el-col>
                <el-col :title="dialogData.house_add" class="col-name el" :span="5">{{dialogData.house_add || "暂无"}}</el-col>
                <el-col class="col-name el" :span="3">农民工标识</el-col>
                <el-col :title="dialogData.farm_identify" class="col-name el" :span="5">{{dialogData.farm_identify || "暂无"}}</el-col>
                <el-col class="col-name el" :span="3">住宅电话</el-col>
                <el-col :title="dialogData.phone" class="col-name el" :span="5">{{dialogData.phone || "暂无"}}</el-col>
            </el-row>
            <el-row>
                <el-col class="col-name el" :span="3">手机号码</el-col>
                <el-col :title="dialogData.cellphone" class="col-name el" :span="5">{{dialogData.cellphone || "暂无"}}</el-col>
                <el-col class="col-name el" :span="3">办公电话	</el-col>
                <el-col :title="dialogData.office_phone" class="col-name el" :span="5">{{dialogData.office_phone || "暂无"}}</el-col>
                <el-col class="col-name el" :span="3">其他通讯号码	</el-col>
                <el-col :title="dialogData.other_phone" class="col-name el" :span="5">{{dialogData.other_phone || "暂无"}}</el-col>
            </el-row>
            <el-row>
                <el-col class="col-name el" :span="3">E_Mail</el-col>
                <el-col :title="dialogData.email" class="col-name el" :span="5">{{dialogData.email || "暂无"}}</el-col>
                <el-col class="col-name el" :span="3">工作在一线情况	</el-col>
                <el-col :title="dialogData.situation" class="col-name el" :span="5">{{dialogData.situation || "暂无"}}</el-col>
                <el-col class="col-name el" :span="3">曾用名	</el-col>
                <el-col :title="dialogData.nickname" class="col-name el" :span="5">{{dialogData.nickname || "暂无"}}</el-col>
            </el-row>
            <el-row>
                <el-col class="col-name el" :span="3">第二党派</el-col>
                <el-col :title="dialogData.second_org" class="col-name el" :span="5">{{dialogData.second_org || "暂无"}}</el-col>
                <el-col class="col-name el" :span="3">加入第二党派日期	</el-col>
                <el-col :title="dialogData.second_time" class="col-name el" :span="5">{{dialogData.second_time || "暂无"}}</el-col>
                <el-col class="col-name el" :span="3">港澳台属	</el-col>
                <el-col :title="dialogData.partygats" class="col-name el" :span="5">{{dialogData.partygats || "暂无"}}</el-col>
            </el-row>
            <el-row>
                <el-col class="col-name el" :span="4">专业特长</el-col>
                <el-col :title="dialogData.majorthey" class="col-name el" :span="8">{{dialogData.majorthey || "暂无"}}</el-col>
                <el-col class="col-name el" :span="4">参加党员志愿者队伍情况	</el-col>
                <el-col :title="dialogData.partyremark" class="col-name el" :span="8">{{dialogData.partyremark || "暂无"}}</el-col>
            </el-row>
            </div>

            <el-dialog
            width="40%"
            :visible.sync="imgVisible"
            append-to-body>
            <img :src="imgSrc" alt="">
            </el-dialog>
        </div> -->
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
            <el-row class="form-row" v-loading="loading">
                <el-row class="upload-row">
                    <el-row>
                        <el-col :span="10">
                            <el-form-item class="col-name" label="姓名" prop="realname">
                                <el-input v-model="formData.realname" placeholder="请输入党员姓名" maxlength="10" v-if="!disabledTag"></el-input>
                                <span class="sblock" :title="formData.realname" v-else>{{formData.realname || ""}}</span>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8" class="calc-w-8">
                            <el-form-item class="col-name" label="性别" prop="sex">
                                <el-select v-model="formData.sex" placeholder="请选择性别" style="width:100%;" v-if="!disabledTag">
                                    <el-option :label="item.value" :value="item.id" :key="index" v-for="(item, index) in sexData"></el-option>
                                </el-select>
                                <span class="sblock" :title="(formData.sex=='1'?'女':'男')" v-else>{{(formData.sex=='1'?'女':'男') || ""}}</span>
                            </el-form-item>
                        </el-col>
                        <el-col :span="10">
                            <el-form-item class="col-name" label="所在支部" prop="org_id">
                                <el-input v-model="formData.org_name" readonly placeholder="请选择所在支部" @focus="pickerDialog=true" v-if="!disabledTag"></el-input>
                                <span class="sblock" :title="formData.org_name" v-else>{{formData.org_name || ""}}</span>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8" class="calc-w-8">
                            <el-form-item class="col-name" label="民族" prop="nation">
                                <selectOpt v-model="formData.nation" placeholder="请选择民族" :option="nationData" @input="formData.nation=$event" v-if="!disabledTag" />
                                <span class="sblock" :title="formData.nation_name" v-else>{{formData.nation_name || ""}}</span>
                            </el-form-item>
                        </el-col>
                        <el-col :span="10">
                            <el-form-item class="col-name" label="身份证号" prop="card">
                                <el-input v-model="formData.card" placeholder="请输入身份证号" maxlength="18" v-if="!disabledTag"></el-input>
                                <span class="sblock" :title="formData.card" v-else>{{formData.card || ""}}</span>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8" class="calc-w-8">
                            <el-form-item class="col-name" label="出生日期" prop="birth">
                                <el-date-picker type="date" placeholder="请选择出生日期" value-format="yyyy-MM-dd" v-model="formData.birth" style="width: 100%;" v-if="!disabledTag"></el-date-picker>
                                <span class="sblock" :title="formData.birth" v-else>{{formData.birth || ""}}</span>
                            </el-form-item>
                        </el-col>
                        <el-col :span="10">
                            <el-form-item label="密码" prop="password">
                                <el-input v-model="formData.password" placeholder="默认为身份证后6位" maxlength="20" v-if="!disabledTag"></el-input>
                                <el-input v-model="formData.password" readonly type="password" placeholder="" v-else></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="14">
                            <el-form-item class="col-name" label="发展状态">
                                <selectOpt v-model="formData.develop_status" placeholder="请选择发展状态" :option="developStateData" @input="formData.develop_status=$event" v-if="!disabledTag" />
                                <span class="sblock" :title="formData.develop_status_name" v-else>{{formData.develop_status_name || ""}}</span>
                            </el-form-item>
                        </el-col>
                        <!-- <el-col :span="8" class="calc-w-8">
                            <el-form-item label="确认密码">
                                <el-input v-model="formData.repassword" placeholder="默认为身份证后6位" maxlength="20" v-if="!disabledTag"></el-input>
                                <el-input v-model="formData.repassword" readonly type="password" placeholder="" v-else></el-input>
                            </el-form-item>
                        </el-col> -->
                        <uploadIcon :image="formData.portrait_url" :lookTag="disabledTag" imgText="党员头像" tip="推荐160x160比例的照片" :defaultIcon="require('@/assets/img/dc160.png')" :isIntro="!disabledTag" tipTop="15px" @on-Success="uploadSuccess" />
                    </el-row>
                </el-row>
                <el-col :span="10">
                    <el-form-item class="col-name" label="是否为流动党员">
                        <el-radio-group v-model="formData.floating" v-if="!disabledTag">
                            <el-radio label="1">是</el-radio>
                            <el-radio label="0">否</el-radio>
                        </el-radio-group>
                        <span class="sblock" :title="(formData.floating=='1'?'是':'否')" v-else>{{(formData.floating=='1'?'是':'否') || ""}}</span>
                    </el-form-item>
                </el-col>
                <el-col :span="14">
                    <el-form-item class="col-name" label="入党日期" prop="join_time">
                        <el-date-picker type="date" placeholder="请选择入党日期" value-format="yyyy-MM-dd" v-model="formData.join_time" style="width: 100%;" v-if="!disabledTag"></el-date-picker>
                        <span class="sblock" :title="formData.join_time" v-else>{{formData.join_time || ""}}</span>
                    </el-form-item>
                </el-col>
                <!-- <el-col :span="14">
                    <el-form-item class="col-name" label="党员身份">
                        <el-select v-model="formData.un5" placeholder="请选择党员身份" style="width: 100%;" v-if="!disabledTag">
                        </el-select>
                        <span class="sblock" :title="formData.own_org" v-else>{{formData.own_org || "暂无"}}</span>
                    </el-form-item>
                </el-col> -->
                <el-col :span="10">
                    <el-form-item class="col-name" label="家庭住址">
                        <el-input v-model="formData.address" placeholder="请输入家庭住址" maxlength="50" v-if="!disabledTag"></el-input>
                        <span class="sblock" :title="formData.address" v-else>{{formData.address || ""}}</span>
                    </el-form-item>
                </el-col>
                <el-col :span="14">
                    <el-form-item class="col-name" label="联系电话">
                        <el-input v-model="formData.cellphone" placeholder="请输入联系电话" maxlength="20" v-if="!disabledTag"></el-input>
                        <span class="sblock" :title="formData.cellphone" v-else>{{formData.cellphone || ""}}</span>
                    </el-form-item>
                </el-col>
                <el-col :span="10">
                    <el-form-item class="col-name" label="专业特长">
                        <el-select v-model="formData.majortheyArr" multiple class="dc-mult-select" placeholder="请选择专业特长" @change="theyChange" style="width:100%;" v-if="!disabledTag">
                            <el-option :label="item.value" :value="item.id" :key="index" v-for="(item, index) in specialData" ></el-option>
                        </el-select>
                        <span class="sblock" :title="formData.majorthey_name" v-else>{{formData.majorthey_name || ""}}</span>
                    </el-form-item>
                </el-col>
                <el-col :span="14">
                    <el-form-item class="col-name" label="党务工作经验(年)">
                        <el-input v-model="formData.experience" placeholder="请输入党务工作经验" type="number" maxlength="5" :oninput="oninput(5,'experience')" v-if="!disabledTag"></el-input>
                        <span class="sblock" :title="formData.experience" v-else>{{formData.experience || ""}}</span>
                    </el-form-item>
                </el-col>
                <!-- <el-col :span="12">
                    <el-form-item class="col-name" label="是否困难">
                        <el-radio-group v-model="formData.unnnn" v-if="!disabledTag">
                            <el-radio label="1">是</el-radio>
                            <el-radio label="0">否</el-radio>
                        </el-radio-group>
                        <span class="sblock" :title="(formData.party_service_agency=='1'?'是':'否')" v-else>{{(formData.party_service_agency=='1'?'是':'否') || "暂无"}}</span>
                    </el-form-item>
                </el-col> -->
                <el-col :span="24" v-if="disabledTag">
                    <el-form-item class="col-name" label="所在支部党内职务">
                        <span class="sblock" :title="formData.duties_name">{{formData.duties_name || ""}}</span>
                    </el-form-item>
                </el-col>
                <el-col :span="10">
                    <el-form-item class="col-name" label="工作岗位">
                        <el-input v-model="formData.work_post_name" readonly placeholder="请选择工作岗位" 
                        @focus="treepickerDialog=true;treeType='work';treeTitle='工作岗位'" v-if="!disabledTag"></el-input>
                        <span class="sblock" :title="formData.work_post_name" v-else>{{formData.work_post_name || ""}}</span>
                    </el-form-item>
                </el-col>
                <el-col :span="14">
                    <el-form-item class="col-name" label="是否为企业高管">
                        <el-radio-group v-model="formData.high" v-if="!disabledTag">
                            <el-radio label="1">是</el-radio>
                            <el-radio label="0">否</el-radio>
                        </el-radio-group>
                        <span class="sblock" :title="(formData.high=='1'?'是':'否')" v-else>{{(formData.high=='1'?'是':'否') || ""}}</span>
                    </el-form-item>
                </el-col>
                <el-col :span="10">
                    <el-form-item class="col-name" label="健康状况">
                        <el-input v-model="formData.health_name" readonly placeholder="请选择健康状况" 
                        @focus="treepickerDialog=true;treeType='health';treeTitle='健康状况'" v-if="!disabledTag"></el-input>
                        <span class="sblock" :title="formData.health_name" v-else>{{formData.health_name || ""}}</span>
                    </el-form-item>
                </el-col>
                <el-col :span="14">
                    <el-form-item class="col-name" label="政治面貌">
                        <selectOpt v-model="formData.politics" placeholder="请选择政治面貌" :option="politicsData" @input="formData.politics=$event" v-if="!disabledTag" />
                        <span class="sblock" :title="formData.politics_name" v-else>{{formData.politics_name || ""}}</span>
                    </el-form-item>
                </el-col>
                <el-col :span="10">
                    <el-form-item class="col-name" label="籍贯">
                        <el-input v-model="formData.native_place_name" readonly placeholder="请选择籍贯" 
                        @focus="treepickerDialog=true;treeType='native';treeTitle='籍贯'" v-if="!disabledTag"></el-input>
                        <span class="sblock" :title="formData.native_place_name" v-else>{{formData.native_place_name || ""}}</span>
                    </el-form-item>
                </el-col>
                <el-col :span="14">
                    <el-form-item class="col-name" label="籍贯补充">
                        <el-input v-model="formData.native_supply" placeholder="请输入籍贯补充" maxlength="50" v-if="!disabledTag"></el-input>
                        <span class="sblock" :title="formData.native_supply" v-else>{{formData.native_supply || ""}}</span>
                    </el-form-item>
                </el-col>
                <el-col :span="10">
                    <el-form-item class="col-name" label="参加工作时间">
                        <el-date-picker type="date" placeholder="请选择日期" value-format="yyyy-MM-dd" v-model="formData.work_time" style="width: 100%;" v-if="!disabledTag"></el-date-picker>
                        <span class="sblock" :title="formData.work_time" v-else>{{formData.work_time || ""}}</span>
                    </el-form-item>
                </el-col>
                <el-col :span="14">
                    <el-form-item class="col-name" label="本岗位开始时间">
                        <el-date-picker type="date" placeholder="请选择日期" value-format="yyyy-MM-dd" v-model="formData.work_post_time" style="width: 100%;" v-if="!disabledTag"></el-date-picker>
                        <span class="sblock" :title="formData.work_post_time" v-else>{{formData.work_post_time || ""}}</span>
                    </el-form-item>
                </el-col>
                <el-col :span="10">
                    <el-form-item class="col-name" label="新社会阶层情况">
                        <el-input v-model="formData.new_social_name" readonly placeholder="请选择新社会阶层情况" 
                        @focus="treepickerDialog=true;treeType='newSocial';treeTitle='新社会阶层情况'" v-if="!disabledTag"></el-input>
                        <span class="sblock" :title="formData.new_social_name" v-else>{{formData.new_social_name || ""}}</span>
                    </el-form-item>
                </el-col>
                <el-col :span="14">
                    <el-form-item class="col-name" label="婚姻状况">
                        <selectOpt v-model="formData.marital_status" placeholder="请选择婚姻状况" :option="marriageStateData" @input="formData.marital_status=$event" v-if="!disabledTag" />
                        <span class="sblock" :title="formData.marital_status_name" v-else>{{formData.marital_status_name || ""}}</span>
                    </el-form-item>
                </el-col>
                <el-col :span="10">
                    <el-form-item class="col-name" label="户口性质">
                        <el-input v-model="formData.household" placeholder="请输入户口性质" maxlength="20" v-if="!disabledTag"></el-input>
                        <span class="sblock" :title="formData.household" v-else>{{formData.household || ""}}</span>
                    </el-form-item>
                </el-col>
                <el-col :span="14">
                    <el-form-item class="col-name" label="户口所在地">
                        <el-input v-model="formData.house_add" placeholder="请输入户口所在地" maxlength="50" v-if="!disabledTag"></el-input>
                        <span class="sblock" :title="formData.house_add" v-else>{{formData.house_add || ""}}</span>
                    </el-form-item>
                </el-col>
                <el-col :span="10">
                    <el-form-item class="col-name" label="职称">
                        <el-input v-model="formData.titles_name" readonly placeholder="请选择职称" 
                        @focus="treepickerDialog=true;treeType='titles';treeTitle='职称'" v-if="!disabledTag"></el-input>
                        <span class="sblock" :title="formData.titles_name" v-else>{{formData.titles_name || ""}}</span>
                    </el-form-item>
                </el-col>
                <el-col :span="14">
                    <el-form-item class="col-name" label="农民工标识">
                        <el-radio-group v-model="formData.farm_identify" v-if="!disabledTag">
                            <el-radio label="1">是</el-radio>
                            <el-radio label="0">否</el-radio>
                        </el-radio-group>
                        <span class="sblock" :title="(formData.farm_identify=='1'?'是':'否')" v-else>{{(formData.farm_identify=='1'?'是':'否') || ""}}</span>
                    </el-form-item>
                </el-col>
                <el-col :span="10">
                    <el-form-item class="col-name" label="缴纳党费工资基数">
                        <el-input v-model="formData.wagebase" placeholder="请输入缴纳党费工资基数" type="text" maxlength="10" oninput="value=value.replace(/[^0-9.]/g,'')" v-if="!disabledTag"></el-input>
                        <span class="sblock" :title="formData.wagebase" v-else>{{formData.wagebase || ""}}</span>
                    </el-form-item>
                </el-col>
                <el-col :span="14">
                    <el-form-item class="col-name" label="每月应缴纳党费">
                        <el-input v-model="formData.dues" placeholder="请输入每月应缴纳党费" type="text" maxlength="10" oninput="value=value.replace(/[^0-9.]/g,'')" v-if="!disabledTag"></el-input>
                        <span class="sblock" :title="formData.dues" v-else>{{formData.dues || ""}}</span>
                    </el-form-item>
                </el-col>
                <el-col :span="10">
                    <el-form-item class="col-name" label="学历">
                        <selectOpt v-model="formData.education" placeholder="请选择学历" :option="unvAcademic" @input="formData.education=$event" v-if="!disabledTag" />
                        <span class="sblock" :title="formData.education_name" v-else>{{formData.education_name || ""}}</span>
                    </el-form-item>
                </el-col>
                <el-col :span="14">
                    <el-form-item class="col-name" label="邮编">
                        <el-input v-model="formData.zip_code" placeholder="请输入邮编" type="number" maxlength="6" :oninput="oninput(6,'zip_code')" v-if="!disabledTag"></el-input>
                        <span class="sblock" :title="formData.zip_code" v-else>{{formData.zip_code || ""}}</span>
                    </el-form-item>
                </el-col>
                <el-col :span="10">
                    <el-form-item class="col-name" label="住宅电话">
                        <el-input v-model="formData.phone" placeholder="请输入住宅电话" maxlength="20" v-if="!disabledTag"></el-input>
                        <span class="sblock" :title="formData.phone" v-else>{{formData.phone || ""}}</span>
                    </el-form-item>
                </el-col>
                <el-col :span="14">
                    <el-form-item class="col-name" label="办公电话">
                        <el-input v-model="formData.office_phone" placeholder="请输入办公电话" maxlength="20" v-if="!disabledTag"></el-input>
                        <span class="sblock" :title="formData.office_phone" v-else>{{formData.office_phone || ""}}</span>
                    </el-form-item>
                </el-col>
                <el-col :span="10">
                    <el-form-item class="col-name" label="其他通讯号码">
                        <el-input v-model="formData.other_phone" placeholder="请输入其他通讯号码" maxlength="20" v-if="!disabledTag"></el-input>
                        <span class="sblock" :title="formData.other_phone" v-else>{{formData.other_phone || ""}}</span>
                    </el-form-item>
                </el-col>
                <el-col :span="14">
                    <el-form-item class="col-name" label="E-MAIL">
                        <el-input v-model="formData.email" placeholder="请输入邮箱" maxlength="50" v-if="!disabledTag"></el-input>
                        <span class="sblock" :title="formData.email" v-else>{{formData.email || ""}}</span>
                    </el-form-item>
                </el-col>
                <el-col :span="10">
                    <el-form-item class="col-name" label="工作在一线情况">
                        <selectOpt v-model="formData.situation" placeholder="请选择工作在一线情况" :option="frontLineState" @input="formData.situation=$event" v-if="!disabledTag" />
                        <span class="sblock" :title="formData.situation_name" v-else>{{formData.situation_name || ""}}</span>
                    </el-form-item>
                </el-col>
                <el-col :span="14">
                    <el-form-item class="col-name" label="曾用名">
                        <el-input v-model="formData.nickname" placeholder="请输入曾用名" maxlength="10" v-if="!disabledTag"></el-input>
                        <span class="sblock" :title="formData.nickname" v-else>{{formData.nickname || ""}}</span>
                    </el-form-item>
                </el-col>
                <el-col :span="10">
                    <el-form-item class="col-name" label="第二党派">
                        <selectOpt v-model="formData.second_org" placeholder="请选择第二党派" :option="secondOrgData" @input="formData.second_org=$event" v-if="!disabledTag" />
                        <span class="sblock" :title="formData.second_org_name" v-else>{{formData.second_org_name || ""}}</span>
                    </el-form-item>
                </el-col>
                <el-col :span="14">
                    <el-form-item class="col-name" label="加入第二党派日期">
                        <el-date-picker type="date" placeholder="请选择日期" value-format="yyyy-MM-dd" v-model="formData.second_time" style="width: 100%;" v-if="!disabledTag"></el-date-picker>
                        <span class="sblock" :title="formData.second_time" v-else>{{formData.second_time || ""}}</span>
                    </el-form-item>
                </el-col>
                <el-col :span="10">
                    <el-form-item class="col-name" label="港澳台属">
                        <selectOpt v-model="formData.partygats" placeholder="请选择港澳台属" :option="partygatsData" @input="formData.partygats=$event" v-if="!disabledTag" />
                        <span class="sblock" :title="formData.partygats_name" v-else>{{formData.partygats_name || ""}}</span>
                    </el-form-item>
                </el-col>
                <el-col :span="14">
                    <el-form-item class="col-name" label="参加党员志愿者队伍情况">
                        <el-select v-model="formData.partyremarkArr" multiple @change="parkChange" class="dc-mult-select" placeholder="请选择参加党员志愿者队伍情况" style="width:100%;" v-if="!disabledTag">
                            <el-option :label="item.value" :value="item.id" :key="index" v-for="(item, index) in partyremarkData" :disabled="item.status != '0'"></el-option>
                        </el-select>
                        <span class="sblock" :title="formData.partyremark_name" v-else>{{formData.partyremark_name || ""}}</span>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>
        <!-- <div class="submit-div">
            <el-button type="primary" @click="back">返回</el-button>
            <el-button type="primary" @click="submitForm('formForm')" v-if="!disabledTag">{{ Object.keys($route.query).length != 0 ? '保存':'添加' }}</el-button>
        </div> -->
        <org-picker :visible="pickerDialog" @close="pickerDialog=false" ableOpt="1" disableTip="无法选择!" @choosen="choosenPicker" />
        <treePicker :visible="treepickerDialog" @close="treepickerDialog=false" :typeId="treeType" :title="treeTitle" @choosen="treechoosenPicker" />
    </div>
</template>

<script>
import * as common from '../../api/common.js'
import * as datacenter from '@/api/datacenter.js'
import orgPicker from '@/components/orgPicker_power_for_datacenter'
import treePicker from '@/components/datacenter/widgets/treePicker'
import uploadIcon from '@/components/datacenter/widgets/uploadIcon'
import selectOpt from '@/components/datacenter/common/selectOpt'
export default {
    beforeRouteLeave (to, from, next) {
        if(this.disabledTag == false && this.isSave == null) {
            if(!this.confirmShow){
                this.confirmShow = true
                /* this.$confirm('当前页面数据未保存，确定要离开？', '提示', { confirmButtonText: '确定', cancelButtonText: '取消', type: 'warning' }).then(() => {
                    next()
                }).catch(() => {
                    this.confirmShow = false
                    history.pushState(null, null, document.URL);
                    next(false)
                }); */
                let sessionUid = sessionStorage.getItem('add_m_uid') || ''
                if(!this.$route.query.id && !sessionUid && this.isBack == null && this.$root.dcMemberMenu == '1') {
                    this.$alert('请先保存基本信息！', '提示', {
                    confirmButtonText: '确定', type: 'warning',
                        callback: action => {
                            this.confirmShow = false
                            history.pushState(null, null, document.URL);
                            this.$root.dcMemberMenu = null
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
        treePicker,
        selectOpt,
        orgPicker,
        uploadIcon
    },
    data() {
        return {
            loading: false,
            isSave: null,
            confirmShow:false,
            isBack: null,
            dialogData: null,
            imgVisible: false,
            imgSrc: '',
            disabledTag: false,
            pickerDialog: false,            // 党组织弹窗
            treepickerDialog: false,        // 树弹窗
            formData: {
                realname: '',
                sex:'',
                org_id:'',
                org_name:'',
                nation:'',
                card:'',
                birth:'',
                password:'',
                repassword:'',
                portrait:'',
                floating:'',
                join_time:'',
                develop_status:'1',
                address:'',
                cellphone:'',
                majorthey:'',
                majortheyArr: [],
                experience:'',
                duties:'',
                work_post:'',
                work_post_name:'',
                high:'1',
                health:'',
                health_name:'',
                politics:'',
                native_place:'',
                native_place_name:'',
                native_supply:'',
                work_time:'',
                work_post_time:'',
                new_social:'',
                new_social_name: '',
                marital_status:'',
                household:'',
                house_add:'',
                titles:'',
                titles_name:'',
                farm_identify:'1',
                wagebase:'',
                dues:'',
                education: '',
                zip_code:'',
                phone:'',
                office_phone:'',
                other_phone:'',
                email:'',
                situation:'',
                nickname:'',
                second_org:'',
                second_time:'',
                partygats:'',
                partyremark:'',
                partyremarkArr: []
            },
            formRule: {
                realname: [ { required: true, message:'请输入党员姓名！', trigger: 'blur' } ],
                sex: [ { required: true, message:'请选择性别！', trigger: 'blur' }],
                org_id: [ { required: true, message:'请选择所在支部！', trigger: 'blur' }],
                nation: [ { required: true, message:'请选择民族！', trigger: 'blur' }],
                card: [ { required: true, message:'请输入身份证号!', trigger: 'blur' }],
                birth: [ { required: true, message:'请选择出生日期！', trigger: 'blur' }],
                join_time: [ { required: true, message:'请选择入党日期！', trigger: 'blur' }],
                password: [ { required:false, min: 6, max: 20, message: '密码长度在 6-20 位！', trigger: 'blur' } ],
                // password: [ { required:false, validator: validatePass, trigger: 'blur' } ],
                // repassword: [ { validator: validatePass2, trigger: 'blur' } ],
            },
            sexData: [
                {
                    id: '0',
                    value: '男'
                },{
                    id: '1',
                    value: '女'
                }
            ],
            houseType: [
                {
                    name:'农业',
                    id: 1
                },{
                    name:'非农业',
                    id: 2
                }
            ],
            unvAcademic: [],    // 学历
            nationData: [],
            specialData: [],
            politicsData: [],   // 政治面貌
            marriageStateData: [],      // 婚姻状况
            frontLineState: [], // 工作在一线情况
            secondOrgData: [],  // 第二党派
            partygatsData: [],  // 港澳台属
            partyremarkData: [],// 参加党员志愿者队伍情况
            dutyData: [],       // 党内职务
            developStateData: [
                {
                    id:'1',
                    value: '党员'
                },{
                    id:'2',
                    value: '预备党员'
                },{
                    id:'3',
                    value: '积极分子'
                },{
                    id:'4',
                    value: '发展对象'
                }
            ],                  // 发展状态
            btnTag: 0,          // 0添加 1编辑  2取消、保存
            treeType: '',       // tree下拉框类型
            treeTitle: '',      // tree下拉框title
            dialogData: {
                org_id: ''
            }
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
            // this.$router.push('/datacenter/memberInfo')
            this.$router.push({name: '党员信息', params: this.$route.query})
        },
        submitForm(formName) {
            this.$refs[formName].validate((valid, vinfo) => {
                if (valid) {
                    if(this.$route.query.id) {// 修改
                        this.formData.uid = this.$route.query.id
                    }else {
                        let sessionUid = sessionStorage.getItem('add_m_uid') || ''
                        this.formData.uid = sessionUid
                    }
                    datacenter.member_edit(this.formData).then( res => {
                        if(res.data.status  == '200') {
                            this.isSave = true;
                            this.$message({ message: res.data.statusCode, type: 'success' });
                            this.btnTag = 1;
                            // this.disabledTag = true
                            if(!this.$route.query.id) {
                                sessionStorage.setItem('add_m_uid', res.data.data.uid)
                            }
                            this.getData();
                        }else {
                            this.$message({ message: res.data.statusCode, type: 'error' });
                        }
                    })
                } else {
                    if(vinfo.realname) {
                        this.$message({ message: vinfo.realname[0].message, type: 'error' });
                    }else if(vinfo.sex) {
                        this.$message({ message: vinfo.sex[0].message, type: 'error' });
                    }else if(vinfo.org_id) {
                        this.$message({ message: vinfo.org_id[0].message, type: 'error' });
                    }else if(vinfo.nation) {
                        this.$message({ message: vinfo.nation[0].message, type: 'error' });
                    }else if(vinfo.card) {
                        this.$message({ message: vinfo.card[0].message, type: 'error' });
                    }else if(vinfo.birth) {
                        this.$message({ message: vinfo.birth[0].message, type: 'error' });
                    }else if(vinfo.join_time) {
                        this.$message({ message: vinfo.join_time[0].message, type: 'error' });
                    }else if(vinfo.password) {
                        this.$message({ message: vinfo.password[0].message, type: 'error' });
                    }else if(vinfo.repassword) {
                        this.$message({ message: vinfo.repassword[0].message, type: 'error' });
                    }
                    return false;
                }
            });
        },
        // 党组织库选择 单选
        choosenPicker(obj) {
            console.log('org',obj);
            
            if(!obj) {
                this.formData.org_name = ''
                this.formData.org_id = ''
                return 
            }
            this.formData.org_name = obj.name
            this.formData.org_id = obj.id
        },
        // 树下拉列表
        treechoosenPicker(type, obj) {
            console.log('obj',obj);
            let field_id = '';
            let field_name = '';
            if(type == 'work') {
                field_id = 'work_post'
                field_name = 'work_post_name'
            } else if (type == 'health') {
                field_id = 'health'
                field_name = 'health_name'
            } else if (type == 'native') {
                field_id = 'native_place'
                field_name = 'native_place_name'
            } else if (type == 'newSocial') {
                field_id = 'new_social'
                field_name = 'new_social_name'
            } else if (type == 'titles') {
                field_id = 'titles'
                field_name = 'titles_name'
            }
            if(!obj) {
                this.formData[field_id] = ''
                this.formData[field_name] = ''
                return 
            }
            this.formData[field_id] = obj.id
            this.formData[field_name] = obj.value
        },
        // 上传成功
        uploadSuccess(res, file, fileList) {
            this.formData.portrait_url = res.data.url
            this.formData.portrait = res.data.id
        },
        theyChange(arr) {
            this.formData.majorthey = arr.join(',')
        },
        parkChange(arr) {
            this.formData.partyremark = arr.join(',')
        },
        getDicData() {
            // 民族
            common.getDictData_tree({id: 4}).then( res => {
                this.nationData = res.data.data
            })
            // 专业特长
            common.getDictData_tree({id: 15}).then( res => {
                this.specialData = res.data.data
            })
            // 政治面貌
            common.getDictData_tree({id: 6}).then( res => {
                this.politicsData = res.data.data
            })
            // 婚姻状况
            common.getDictData_tree({id: 9}).then( res => {
                this.marriageStateData = res.data.data
            })
            // 学历 
            common.getDictData_tree({id: 11}).then( res => {
                this.unvAcademic = res.data.data
            })
            // 工作在一线情况 
            common.getDictData_tree({id: 12}).then( res => {
                this.frontLineState = res.data.data
            })
            // 第二党派 
            common.getDictData_tree({id: 13}).then( res => {
                this.secondOrgData = res.data.data
            })
            // 港澳台属
            common.getDictData_tree({id: 14}).then( res => {
                this.partygatsData = res.data.data
            })
            // 参加党员志愿者队伍情况 
            common.getDictData_tree({id: 16}).then( res => {
                this.partyremarkData = res.data.data
            })
            // 所在支部党内职务 
            common.getDictData_tree({id: 'party_position'}).then( res => {
                this.dutyData = res.data.data
            })
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
            /* 
            datacenter['personDetail']({uid: this.personId}).then( res => {
                this.dialogData = res.data.data
                this.loading = false
            }) 
            return */
            /* if(this.$route.query.id) {
                let url = ''   
                let param = {} 
                if(this.btnTag == 1) {  // 编辑按钮（查看）
                    url = 'personDetail'
                    param = {uid: this.$route.query.id}
                }else if(this.btnTag == 2){
                    url = 'personDetail'
                    param = {uid: this.$route.query.id}
                }
                datacenter[url](param).then( res => {
                    this.formData = res.data.data
                    this.loading = false
                }) 
            } */
            let sessionUid = sessionStorage.getItem('add_m_uid') || ''
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
            datacenter['member_info']({id: uid}).then( res => {
                this.loading = false
                res.data.data.majortheyArr = res.data.data.majorthey != ''? res.data.data.majorthey.split(',') : []
                res.data.data.partyremarkArr = res.data.data.partyremark != ''? res.data.data.partyremark.split(',') : []
                this.formData = res.data.data
                this.set0Val(['develop_status','health','native_place','new_social','titles'])
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
