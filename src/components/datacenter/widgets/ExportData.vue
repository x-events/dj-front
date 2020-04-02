<template>
    <div class="export-data">
        <el-upload class="upload-demo" ref="upload" :action="action" :on-progress="uploading" 
        :on-success="uploadSuccess"
        :show-file-list="false" :headers="header" :disabled="uploadStatus" accept="application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet">
            <el-button slot="trigger" size="small" id="submit_btn">批量导入数据</el-button>
            <el-button class="download-btn" size="small" @click="downTemp">下载导入模板</el-button>
        </el-upload>
        <el-dialog
            class="unitSelectDialog comDialog"
            title="导入数据"
            :append-to-body="true"
            :visible="visible"
            :close-on-click-modal="false"
            width="1000px"
            @close="handleClose" >
            <div v-if="importStatus" class="resultBox">
                <div class="resultCount">导入结果：成功导入 <span class="red">{{importResult.importcount}}</span> 条数据，共有 <span class="red">{{importResult.errorcount}}</span> 条错误数据导入失败，请将错误数据单独整理重新导入！</div>
                <div class="dialog_sim_table flex-1" style="height:50vh;" v-if="importResult.errorlist.length > 0 && eType == 'org'">
                    <el-table :data="importResult.errorlist" height="100%" stripe class="mb15">
                        <el-table-column prop="A" label="序号" min-width="50" show-overflow-tooltip></el-table-column>
                        <el-table-column prop="B" label="党组织全称" min-width="90" show-overflow-tooltip></el-table-column>
                        <el-table-column prop="C" label="党组织简称" min-width="90" show-overflow-tooltip></el-table-column>
                        <el-table-column prop="D" label="党组织类别" width="90" show-overflow-tooltip></el-table-column>
                        <el-table-column prop="E" label="排序" width="50" show-overflow-tooltip></el-table-column>
                        <el-table-column prop="F" label="党组织编码" width="90" show-overflow-tooltip></el-table-column>
                        <el-table-column prop="G" label="上级党组织" width="90" show-overflow-tooltip></el-table-column>
                        <el-table-column prop="H" label="党组织隶属关系" width="120" show-overflow-tooltip></el-table-column>
                        <el-table-column prop="I" label="级别" width="50" show-overflow-tooltip></el-table-column>
                        <el-table-column prop="J" label="批准建立党组织日期" width="150" show-overflow-tooltip></el-table-column>
                        <el-table-column prop="K" label="换届时间" width="80" show-overflow-tooltip></el-table-column>
                        <el-table-column prop="L" label="所属社区" width="80" show-overflow-tooltip></el-table-column>
                        <el-table-column prop="M" label="工作地址" show-overflow-tooltip></el-table-column>
                        <el-table-column prop="N" label="联系方式" width="80" show-overflow-tooltip></el-table-column>
                        <el-table-column prop="O" label="联系人" width="70" show-overflow-tooltip></el-table-column>
                        <el-table-column label="错误信息" min-width="100" fixed="right">
                            <template slot-scope="scope">
                                <span class="red">{{scope.row.msg}}</span>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
                <div class="dialog_sim_table" style="height:50vh;" v-if="importResult.errorlist.length > 0 && eType == 'member'">
                    <el-table :data="importResult.errorlist" height="100%" stripe class="mb15">
                        <el-table-column prop="A" label="序号" min-width="50" show-overflow-tooltip></el-table-column>
                        <el-table-column prop="B" label="姓名" width="60" show-overflow-tooltip></el-table-column>
                        <el-table-column prop="C" label="性别" width="50" show-overflow-tooltip></el-table-column>
                        <el-table-column prop="D" label="所在支部" show-overflow-tooltip></el-table-column>
                        <el-table-column prop="E" label="民族" width="50" show-overflow-tooltip></el-table-column>
                        <el-table-column prop="F" label="身份证号" width="80" show-overflow-tooltip></el-table-column>
                        <el-table-column prop="G" label="出生日期" width="80" show-overflow-tooltip></el-table-column>
                        <el-table-column prop="H" label="入党时间" width="80"  show-overflow-tooltip></el-table-column>
                        <el-table-column prop="I" label="党务工作经验(年)" width="130" show-overflow-tooltip></el-table-column>
                        <el-table-column prop="J" label="联系电话" width="80" show-overflow-tooltip></el-table-column>
                        <el-table-column prop="K" label="发展状态" width="80" show-overflow-tooltip></el-table-column>
                        <el-table-column label="错误信息" min-width="100"  fixed="right">
                            <template slot-scope="scope">
                                <span class="red">{{scope.row.msg}}</span>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
                <div class="dialog_sim_table" style="height:50vh;" v-if="importResult.errorlist.length > 0 && eType == 'unit'">
                    <el-table :data="importResult.errorlist" height="100%" stripe class="mb15">
                        <el-table-column prop="A" label="序号" min-width="50" show-overflow-tooltip></el-table-column>
                        <el-table-column prop="B" label="单位名称" show-overflow-tooltip></el-table-column>
                        <el-table-column prop="C" label="单位性质类别" width="110" show-overflow-tooltip></el-table-column>
                        <el-table-column prop="D" label="单位地址" width="100" show-overflow-tooltip></el-table-column>
                        <el-table-column prop="E" label="建立党组织情况" width="130" show-overflow-tooltip></el-table-column>
                        <el-table-column prop="F" label="党组织名称" show-overflow-tooltip></el-table-column>
                        <el-table-column prop="G" label="单位规模" width="80" show-overflow-tooltip></el-table-column>
                        <el-table-column prop="H" label="联系人" width="80" show-overflow-tooltip></el-table-column>
                        <el-table-column prop="I" label="联系电话" show-overflow-tooltip></el-table-column>
                        <el-table-column prop="J" label="资源清单" show-overflow-tooltip></el-table-column>
                        <el-table-column label="错误信息" min-width="100"  fixed="right">
                            <template slot-scope="scope">
                                <span class="red">{{scope.row.msg}}</span>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
                <div class="dialog_sim_table" style="height:50vh;" v-if="importResult.errorlist.length > 0 && eType == 'party'">
                    <el-table :data="importResult.errorlist" height="100%" stripe class="mb15">
                        <el-table-column prop="A" label="序号" min-width="50" show-overflow-tooltip></el-table-column>
                        <el-table-column prop="B" label="名称" show-overflow-tooltip></el-table-column>
                        <el-table-column prop="C" label="类型" width="50" show-overflow-tooltip></el-table-column>
                        <el-table-column prop="D" label="地址" show-overflow-tooltip></el-table-column>
                        <el-table-column prop="E" label="面积(㎡)" width="80" show-overflow-tooltip></el-table-column>
                        <el-table-column prop="F" label="简介" show-overflow-tooltip></el-table-column>
                        <el-table-column prop="G" label="开放时间" show-overflow-tooltip></el-table-column>
                        <el-table-column prop="H" label="联系电话" show-overflow-tooltip></el-table-column>
                        <el-table-column prop="I" label="经度" width="80" show-overflow-tooltip></el-table-column>
                        <el-table-column prop="J" label="纬度" width="80" show-overflow-tooltip></el-table-column>
                        <el-table-column prop="K" label="所属社区" show-overflow-tooltip></el-table-column>
                        <el-table-column prop="L" label="所属党组织" width="100" show-overflow-tooltip></el-table-column>
                        <el-table-column label="错误信息" min-width="100"  fixed="right">
                            <template slot-scope="scope">
                                <span class="red">{{scope.row.msg}}</span>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
                <div class="dialog_sim_table" style="height:50vh;" v-if="importResult.errorlist.length > 0 && eType == 'union'">
                    <el-table :data="importResult.errorlist" height="100%" stripe class="mb15">
                        <el-table-column prop="A" label="序号" min-width="50" show-overflow-tooltip></el-table-column>
                        <el-table-column prop="B" label="单位名称" show-overflow-tooltip></el-table-column>
                        <el-table-column prop="C" label="单位地址" show-overflow-tooltip></el-table-column>
                        <el-table-column prop="D" label="工会主席" width="80" show-overflow-tooltip></el-table-column>
                        <el-table-column prop="E" label="任期（年）" width="90" show-overflow-tooltip></el-table-column>
                        <el-table-column prop="F" label="申请建会时间" width="110" show-overflow-tooltip></el-table-column>
                        <el-table-column prop="G" label="联系电话" show-overflow-tooltip></el-table-column>
                        <el-table-column prop="H" label="经度" width="60" show-overflow-tooltip></el-table-column>
                        <el-table-column prop="I" label="纬度" width="60" show-overflow-tooltip></el-table-column>
                        <el-table-column prop="J" label="职工数" show-overflow-tooltip></el-table-column>
                        <el-table-column prop="K" label="会员数" width="70" show-overflow-tooltip></el-table-column>
                        <el-table-column label="错误信息" min-width="100"  fixed="right">
                            <template slot-scope="scope">
                                <span class="red">{{scope.row.msg}}</span>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
                <div class="dialog_sim_table" style="height:50vh;" v-if="importResult.errorlist.length > 0 && eType == 'women'">
                    <el-table :data="importResult.errorlist" height="100%" stripe class="mb15">
                        <el-table-column prop="A" label="序号" min-width="50" show-overflow-tooltip></el-table-column>
                        <el-table-column prop="B" label="单位名称" show-overflow-tooltip></el-table-column>
                        <el-table-column prop="C" label="单位地址" show-overflow-tooltip></el-table-column>
                        <el-table-column prop="D" label="妇联主席" width="100" show-overflow-tooltip></el-table-column>
                        <el-table-column prop="E" label="任期(年)" width="50" show-overflow-tooltip></el-table-column>
                        <el-table-column prop="F" label="妇联建立（换届）时间" width="160" show-overflow-tooltip></el-table-column>
                        <el-table-column prop="G" label="联系电话" show-overflow-tooltip></el-table-column>
                        <el-table-column prop="H" label="经度" show-overflow-tooltip></el-table-column>
                        <el-table-column prop="I" label="纬度" show-overflow-tooltip></el-table-column>
                        <el-table-column prop="J" label="妇女人口数" show-overflow-tooltip></el-table-column>
                        <el-table-column prop="K" label="妇联党员数" show-overflow-tooltip></el-table-column>
                        <el-table-column label="错误信息" min-width="100"  fixed="right">
                            <template slot-scope="scope">
                                <span class="red">{{scope.row.msg}}</span>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
                <div class="dialog_sim_table" style="height:50vh;" v-if="importResult.errorlist.length > 0 && eType == 'youth'">
                    <el-table :data="importResult.errorlist" height="100%" stripe class="mb15">
                        <el-table-column prop="A" label="序号" min-width="50" show-overflow-tooltip></el-table-column>
                        <el-table-column prop="B" label="团组织名称" show-overflow-tooltip></el-table-column>
                        <el-table-column prop="C" label="单位名称" show-overflow-tooltip></el-table-column>
                        <el-table-column prop="D" label="地址" width="100" show-overflow-tooltip></el-table-column>
                        <el-table-column prop="E" label="所属社区" width="100" show-overflow-tooltip></el-table-column>
                        <el-table-column prop="F" label="团组织书记" width="120" show-overflow-tooltip></el-table-column>
                        <el-table-column prop="G" label="联系电话" show-overflow-tooltip></el-table-column>
                        <el-table-column prop="H" label="团组织建立时间" width="120"  show-overflow-tooltip></el-table-column>
                        <el-table-column prop="I" label="经度" show-overflow-tooltip></el-table-column>
                        <el-table-column prop="J" label="纬度" show-overflow-tooltip></el-table-column>
                        <el-table-column prop="K" label="团员总数" show-overflow-tooltip></el-table-column>
                        <el-table-column label="错误信息" min-width="100"  fixed="right">
                            <template slot-scope="scope">
                                <span class="red">{{scope.row.msg}}</span>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
                <div class="dialog_sim_table" style="height:50vh;" v-if="importResult.errorlist.length > 0 && eType == 'social'">
                    <el-table :data="importResult.errorlist" height="100%" stripe class="mb15">
                        <el-table-column prop="A" label="序号" min-width="50" show-overflow-tooltip></el-table-column>
                        <el-table-column prop="B" label="组织名称" show-overflow-tooltip></el-table-column>
                        <el-table-column prop="C" label="办公地址" show-overflow-tooltip></el-table-column>
                        <el-table-column prop="D" label="员工总数" width="100" show-overflow-tooltip></el-table-column>
                        <el-table-column prop="E" label="党员总数" width="100" show-overflow-tooltip></el-table-column>
                        <el-table-column prop="F" label="是否建立党组织" width="120" show-overflow-tooltip></el-table-column>
                        <el-table-column prop="G" label="党组织名称" show-overflow-tooltip></el-table-column>
                        <el-table-column label="错误信息" min-width="100"  fixed="right">
                            <template slot-scope="scope">
                                <span class="red">{{scope.row.msg}}</span>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
                <div class="dialog_sim_table" style="height:50vh;" v-if="importResult.errorlist.length > 0 && eType == 'building'">
                    <el-table :data="importResult.errorlist" height="100%" stripe class="mb15">
                        <el-table-column prop="A" label="序号" min-width="50" show-overflow-tooltip></el-table-column>
                        <el-table-column prop="B" label="楼宇全称" show-overflow-tooltip></el-table-column>
                        <el-table-column prop="C" label="所属党组织" show-overflow-tooltip></el-table-column>
                        <el-table-column prop="D" label="服务站地址" width="100" show-overflow-tooltip></el-table-column>
                        <el-table-column prop="E" label="建立时间" width="100" show-overflow-tooltip></el-table-column>
                        <el-table-column prop="F" label="联系人" width="120" show-overflow-tooltip></el-table-column>
                        <el-table-column prop="G" label="联系电话" width="120" show-overflow-tooltip></el-table-column>
                        <el-table-column prop="H" label="经度" show-overflow-tooltip></el-table-column>
                        <el-table-column prop="I" label="纬度" show-overflow-tooltip></el-table-column>
                        <el-table-column label="错误信息" min-width="100"  fixed="right">
                            <template slot-scope="scope">
                                <span class="red">{{scope.row.msg}}</span>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
                <div class="dialog_sim_table" style="height:50vh;" v-if="importResult.errorlist.length > 0 && eType == 'company'">
                    <el-table :data="importResult.errorlist" height="100%" stripe class="mb15">
                        <el-table-column prop="A" label="序号" min-width="50" show-overflow-tooltip></el-table-column>
                        <el-table-column prop="B" label="企业名称" show-overflow-tooltip></el-table-column>
                        <el-table-column prop="C" label="办公地址" show-overflow-tooltip></el-table-column>
                        <el-table-column prop="D" label="是否建立党组织" width="120" show-overflow-tooltip></el-table-column>
                        <el-table-column prop="E" label="党组织名称" show-overflow-tooltip></el-table-column>
                        <el-table-column prop="F" label="职工总数" width="100" show-overflow-tooltip></el-table-column>
                        <el-table-column prop="G" label="党员数" width="100" show-overflow-tooltip></el-table-column>
                        <el-table-column label="错误信息" min-width="100"  fixed="right">
                            <template slot-scope="scope">
                                <span class="red">{{scope.row.msg}}</span>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
                <div class="dialog_sim_table" style="height:50vh;" v-if="importResult.errorlist.length > 0 && eType == 'team'">
                    <el-table :data="importResult.errorlist" height="100%" stripe class="mb15">
                        <el-table-column prop="A" label="序号" min-width="50" show-overflow-tooltip></el-table-column>
                        <el-table-column prop="B" label="队伍名称" show-overflow-tooltip></el-table-column>
                        <el-table-column prop="C" label="隶属党组织" min-width="100" show-overflow-tooltip></el-table-column>
                        <el-table-column prop="D" label="成立时间" min-width="100" show-overflow-tooltip></el-table-column>
                        <el-table-column prop="E" label="服务范围" min-width="100" show-overflow-tooltip></el-table-column>
                        <el-table-column label="错误信息" min-width="100"  fixed="right">
                            <template slot-scope="scope">
                                <span class="red">{{scope.row.msg}}</span>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
                <div class="dialog_sim_table flex-1" style="height:50vh;" v-if="importResult.errorlist.length > 0 && eType == 'worker'">
                    <el-table :data="importResult.errorlist" height="100%" stripe class="mb15">
                        <el-table-column prop="A" label="序号" min-width="50" show-overflow-tooltip></el-table-column>
                        <el-table-column prop="B" label="党员姓名" show-overflow-tooltip></el-table-column>
                        <el-table-column prop="C" label="党务工作" show-overflow-tooltip></el-table-column>
                        <el-table-column prop="D" label="任职所在党组织（班子成员）" width="210" show-overflow-tooltip></el-table-column>
                        <el-table-column prop="E" label="任职职务（班子成员）" width="160" show-overflow-tooltip></el-table-column>
                        <el-table-column prop="F" label="派遣单位（党建指导员）" width="180" show-overflow-tooltip></el-table-column>
                        <el-table-column prop="G" label="派驻单位类别（党建指导员）" width="210" show-overflow-tooltip></el-table-column>
                        <el-table-column prop="H" label="派驻单位" show-overflow-tooltip></el-table-column>
                        <el-table-column prop="I" label="任职开始时间" width="110" show-overflow-tooltip></el-table-column>
                        <el-table-column prop="J" label="任职结束时间" width="110" show-overflow-tooltip></el-table-column>
                        <el-table-column label="错误信息" min-width="100"  fixed="right">
                            <template slot-scope="scope">
                                <span class="red">{{scope.row.msg}}</span>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button icon="el-icon-circle-close-outline" @click="handleClose">取消上传</el-button>
                <el-button icon="el-icon-circle-check-outline" type="primary" @click="submit">重新上传</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
// import { mapState } from 'vuex'
import * as datacenter from '@/api/datacenter.js'
export default {
    props:{
        'userType': {      // 身份类型
            type: String,
            default:()=>{}
        },
        eType: {      // 导类型
            type: String,
            default:()=>{}
        },
        // visible: {
        //     type: Boolean,
        //     // required: true
        // },
    },
    data() {
        return {
            importStatus:false,
            importResult:{
                importcount:0,
                errorlist:[]
            },
            queryParam:{
                id: this.$route.query.class_id || ''
            },
            fileList: [],
            action:this.adminDomain+'/index.php/web/user/stuimport',
            header:{
                'Authorization': this.$root.user.access_token
            },
            params: {
                type: this.eType
            },
            uploadStatus:false,
            visible: false,

            token: '',
            template_download_url: '',
            domain: '',
            adminDomain: '',
        }
    },
    computed: {
        // ...mapState([
        //     'token',
        //     'template_download_url',    
        //     'domain',    
        //     'adminDomain',    
        // ])
    },
    methods: {
        uploading(event, file, fileList) {
            this.importStatus = false;
            this.uploadStatus = true;
            this.$message.success('上传中，请稍后...');
        },
        uploadSuccess(res, file, fileList){
            console.log('suuccc',res );
            this.uploadStatus = false;  // 按钮禁用取消
            
            if(res.status == 401){
                // document.cookie = 'token =' + escape("") + ";expires=-1"
                // localStorage.removeItem("user");
                window.location.href="/"
            }
            if(res.data.errorlist.length == 0) {
                this.$alert(`导入成功:共导入 ${res.data.importcount} 条数据`, '提示', 
                    { confirmButtonText: '确定', callback: action => {
                        // this.$router.go(0)
                        this.$emit('reload')
                    }
                });
                return;
            }
            this.importStatus = true;
            this.visible = true;
            this.importResult = res.data
        },
        // 下载模板
        downTemp() {
            // party:党建阵地；unit:单位；women:妇联；social:社会组织；youth:团组织；org:党组织
            let type = ''
            if(this.eType == 'org') { type = 'DangZuZhi' } 
            else if(this.eType == 'unit') { type = 'DanWei' }
            else if(this.eType == 'party') { type = 'DangJianZhenDi' }
            else if(this.eType == 'youth') { type = 'TuanZuZhi' }
            else if(this.eType == 'women') { type = 'FuLian' }
            else if(this.eType == 'social') { type = 'SheHuiZuZhi' }
            else if(this.eType == 'member') { type = 'DangYuan' }
            else if(this.eType == 'worker') { type = 'DangWuGongZuoZhe' }
            else if(this.eType == 'company') { type = 'FeiGongQiYe' }
            else if(this.eType == 'union') { type = 'GongHui' }
            else if(this.eType == 'building') { type = 'LouYuFuWuZhan' }
            else if(this.eType == 'team') { type = 'TeSeDuiWu' }
            window.location.href = `${datacenter.datacenter_downtemplate}?type=${type}`
        },
        handleClose: function() {
            this.visible = false;   
            this.$emit('reload')
            // this.$router.go(0)         
        },
        submit() {
            this.visible = false;   
            document.getElementById("submit_btn").click();
        }
    },
    mounted() {
        this.action = `${datacenter.datacenter_import}?type=${this.eType}`
    },
}
</script>

<style scoped>
/* @import 'root.css'; */
.export-data {}
.export-data /deep/ .icon { margin-right: 10px; font-weight: bold;  }
/* .export-data .el-button { width: 140px; border-radius: 7px;} */
/* .export-data .el-button span { font-weight: normal; vertical-align: middle; } */
/* .export-data .download-btn:hover { background: #808080; } */
.export-data .submit-btn { width: 105px; }
.export-data /deep/ .el-upload__tip { display: block; background: #f8f8f8; line-height: 40px; margin-top: 15px; color: #999999;  font-size: 14px;}
.export-data /deep/ .el-upload__tip i { margin: 0 5px 0 15px; font-size: 20px; vertical-align: middle; }
.export-data /deep/ .el-upload-list { height: 40px; padding: 10px 0;}
.export-data /deep/ .el-upload-list li { margin: 0; }
.export-data .title { font-size: 16px; line-height: 50px; margin-top: 10px; color: #323232; }
.export-data /deep/ .el-step .el-step__main .el-step__title,
.export-data /deep/ .el-step .el-step__icon,
.export-data /deep/ .el-step .title{ color: #333; font-size: 14px; }
.export-data /deep/ .el-step .el-step__main { padding-left: 5px; }
.export-data /deep/ .el-step .el-step__icon { border-color: #d2d2d2; font-weight: normal; color: #ddd; }
.export-data /deep/ .el-step .el-step__line { background: #d2d2d2; width: 1px; }
.export-data /deep/ .el-step .el-step__head { font-style: oblique; }
/* .resultBox { border-top:#ddd 1px solid; } */
.resultBox .resultCount { padding:10px 0; font-size:16px; color:#333; }
.resultBox .red { color: red; }

/deep/ .el-table--scrollable-y .el-table__body-wrapper{overflow-x: auto;}
</style>