<template>
    <el-dialog
        class="comDialog dc-tree-picker"
        :title="`选择${title}`"
        :append-to-body="true"
        :visible="visible"
        width="800px"
        @open="fetchData(true)"
        @close="handleClose">
        <div v-loading="loading">
            <el-tree v-show="islazy"
                node-key="id"
                :data="treeData" 
                :props="defaultProps"
                :show-checkbox="!radio"
                @check="handleNodeCheck"
                @node-click="handleNodeClick"
                :load="loadNode"
                :lazy="true"></el-tree>
            <el-tree v-show="!islazy"
                node-key="id"
                :data="treeData" 
                :props="defaultProps"
                :show-checkbox="!radio"
                :default-expand-all="true"
                @check="handleNodeCheck"
                @node-click="handleNodeClick"></el-tree>
        </div>
        
        <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
        </span>
    </el-dialog>
</template>

<script>
import * as common from '@/api/common'
import * as datacenter from '@/api/datacenter.js'

export default {
    props: {
        visible: {
            type: Boolean,
            required: true
        },
        currentSelection: {
            type: Array,
            required: false
        },
        radio: {
            type: Boolean,
            required: false,
            default: true
        },
        disableOpt: {
            type: [String, Number],
            default: ''
        },
        title: {
            type: String,
            required: true,
            default: ''
        },
        typeId: {
            type: [String, Number],
            required: true,
            default: ''
        }
    },
    data() {
        return {
            loading: false,
            selection: null,
            org: [],
            defaultProps: {
                children: '_child',
                label: 'value',
                isLeaf: 'no_child'
            },
            treeData: [],
            isExpand: true,
            islazy: false
        }
    },
    methods: {
        handleNodeClick: function(data,node){
            if(this.radio){
                /* if(data.status && data.status != '0') {
                    this.selection = null
                    this.$message({ message: '该选项不可选择！', type: 'error', duration: 800 });
                }else {
                    this.selection = data
                } */
                this.selection = data
            }
        },
        handleNodeCheck: function(node, list){
            if(!this.radio){
                this.selection = list.checkedNodes
            }
        },
        // 懒加载方法
        loadNode(node, resolve) {
            if (this.typeId == 'native'){        // 籍贯
                if (node.level != 0) {
                    datacenter.get_native_first({id: node.data.id}).then(res => {
                        if(res.data.status == '200') {
                            return resolve(res.data.data)
                        }
                    })
                }
            }else {
                let type = '';
                if(this.typeId == 'work') { type = 7 }
                else if (this.typeId == 'health') { type = 5 }
                else if (this.typeId == 'newSocial') { type = 8 }
                else if (this.typeId == 'titles') { type = 10 }
                else if (this.typeId == 'org_type') { type = 1 }
                else if (this.typeId == 'duty') { type = 'duties' }
                else if (this.typeId == 'org_relation') { type = 2 }
                else if (this.typeId == 'education_degree' || this.typeId == 'two_education_degree') { type = 'education_degree' }
                else if (this.typeId == 'profession_type' || this.typeId == 'two_profession_type') { type = 'profession_type' }
                else {
                    type = this.typeId
                }
                if (node.level != 0) {
                    common.get_dict({code: type,pid: node.data.data_id}).then(res => {
                        if(res.data.status == '200') {
                            return resolve(res.data.data)
                        }
                    })
                }
            }
        },
        handleClose: function(){
            this.$emit('close')
        },
        submit: function(){
            if(this.selection) {
                if(this.selection.status && this.selection.status != '0') {
                    this.$message({ message: '该选项不可选择！', type: 'error', duration: 800 });
                    return
                }
            }
            this.$emit('choosen', this.typeId, this.selection)
            this.handleClose()
        },
        fetchData: function(init){
            if(init){
                this.selection = null
            }
            this.treeData = []
            this.loading = true
            this.islazy = true;
            let p_id = ''
            if(this.typeId == 'work') {                 // 工作岗位
                p_id = 7
            } else if (this.typeId == 'health') {       // 健康状况
                p_id = 5
            } else if (this.typeId == 'native'){        // 籍贯
                datacenter.get_native_first().then(res => {
                    this.treeData = res.data.data
                    this.loading = false
                })
                return
            } else if (this.typeId == 'newSocial') {    // 新社会阶层情况
                p_id = 8
            } else if (this.typeId == 'titles') {       // 职称
                p_id = 10
            } else if (this.typeId == 'org_type') {     // 党组织类别
                p_id = 1
            } else if (this.typeId == 'duty') {         // 党员职务
                p_id = 'duties'
            } else if (this.typeId == 'org_relation') { // 党组织隶属关系
                p_id = 2
            } else if (this.typeId == 'education_degree' || this.typeId == 'two_education_degree') {                    // 学位
                p_id = 'education_degree'
            } else if (this.typeId == 'profession_type' || this.typeId == 'two_profession_type') {                      // 第二学位所学专业类别
                p_id = 'profession_type'
            }/* else if (this.typeId == 'org_rel_type') { // 中共组织的类别(加入)
                p_id = 'org_rel_type'
            }  else if (this.typeId == 'leave_rel_type') { // 中共组织的类别(离开)
                p_id = 'leave_rel_type'
            } else if (this.typeId == 'graduate_school_type') { // 毕业院校类型
                p_id = 'graduate_school_type'
            } else if (this.typeId == 'positive_status') { // 转正情况
                p_id = this.typeId
            } else if (this.typeId == 'job_title') {        // 行政职务
                p_id = this.typeId
            } else if (this.typeId == 'job_rank') {        // 职级
                p_id = this.typeId
            } else if (this.typeId == 'job_category') {    // 职级类别(职务类别)
                p_id = this.typeId
            } else if (this.typeId == 'org_change_category') {    // 进入该基层组织变动类别
                p_id = this.typeId
            } else if (this.typeId == 'leave_org_category') {    // 转离该基层党组织变动类别
                p_id = this.typeId
            } else if (this.typeId == 'abroad_intent') {    // 出国(境)目的
                p_id = this.typeId
            } else if (this.typeId == 'abroad_identity') {    // 出国(境)身份
                p_id = this.typeId
            } else if (this.typeId == 'commend_name') {    // 表彰名称
                p_id = this.typeId
            } else if (this.typeId == 'commend_reason') {    // 表彰原因
                p_id = this.typeId
            } else if (this.typeId == 'discipline_name') {    // 惩戒名称
                p_id = this.typeId
            } else if (this.typeId == '1') {                // 党组织类别
                p_id = this.typeId
            } else if (this.typeId == 'discipline__reason') {  // 惩戒原因
                p_id = this.typeId
            } else if (this.typeId == 'discipline__reason') {  // 离退前级别
                p_id = this.typeId
            } else if (this.typeId == 'agency_name') {          // 离退后现管理单位
                p_id = this.typeId
            } else if (this.typeId == 'helped_level') {          // 享受帮扶的级别
                p_id = this.typeId
            } else if (this.typeId == 'practice_way') {          // 参加实践锻炼服务人民群众的主要方式
                p_id = this.typeId
            } else if (this.typeId == 'leave_reason') {          // 出党原因
                p_id = this.typeId
            }  */ else {
                p_id = this.typeId
            }
            common.get_dict({code: p_id}).then(res => {
                this.treeData = res.data.data
                this.loading = false
            })
            return
            // common.getDictData_tree({id: p_id}).then(res => {
            //     this.treeData = res.data.data
            //     this.loading = false
            // })
        }
    },
    created: function(){
        if(this.$root.user){
            // this.fetchData()
        }
    }
};
</script>

<style scoped>
.dc-tree-picker /deep/ .el-dialog__body { max-height: 50vh; overflow: auto; }
</style>
