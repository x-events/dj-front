<template>
  <div>
    <el-dialog
        class="unitSelectDialog comDialog"
        :title="'选择'+title"
        :append-to-body="true"
        :visible="visible"
        width="1000px"
        @close="handleClose" >
        <!-- 表单 -->
        <el-form ref="form">
            <el-input placeholder="" v-model="searchVal"></el-input>
            <!-- <ul class="list-box">
                <li :class="{ act: actIdx == item.id}" v-for="(item, index) in list" :key="index" @click="handleClick(item)">{{ item.short_name }}</li>
            </ul> -->
            <el-tree v-loading="loading"
                class="filter-tree list-box"
                :data="list.data"
                :props="defaultProps"
                default-expand-all
                :filter-node-method="filterNode"
                @node-click="treeClick"
                ref="tree2">
            </el-tree>
            <div class="pagination-content" type="flex" v-if="visible">
                <el-pagination background @current-change="currentChange" layout="prev, pager, next" :total="list.totalRows"
                    :current-page="params.p"
                    :page-size="params.pagesize"
                        class="pagination">
                </el-pagination>
            </div>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button icon="el-icon-circle-close-outline" @click="handleClose">取 消</el-button>
            <el-button icon="el-icon-circle-check-outline" type="primary" @click="submit">确 定</el-button>
        </span>
    </el-dialog>
  </div>
</template>

<script>
import * as datacenter from '@/api/datacenter.js'

export default {
  props: {
    visible: {
        type: Boolean,
        required: true
    },
    title: {
        type: String,
        default() {
            return '单位'
        }
    },
    type: {
        type: String,
        default:()=> {
            return ''
        }
    }
  },
    data() {
        return {
            loading: false,
            realnames: '',
            searchVal: '',
            actIdx: '',
            actObj: {},
            list: [],
            params: {
                p: 1,
                pagesize: 10,
            },
            defaultProps: {
                children: 'children',
                label: 'short_name'
            }
        };
    },
    watch: {
        searchVal(val) {
            this.$refs.tree2.filter(val);
        },
        visible(val) {
            if(val) {
                this.params.p = 1;
                this.searchVal = ''
                this.list = []
                this.getData() 
            }
        }
    },
    methods: {
        filterNode(value, data) {
            if (!value) return true;
            return data[this.defaultProps.label].indexOf(value) !== -1;
        },
        treeClick(data) {
            this.actIdx = data.id;
            this.actObj = data;
        },
        submit: function() {
            //验证
            if(!this.actIdx){
                // return this.$message({
                //     message: '请选择'+this.title,
                //     type: 'warning'
                // });
                this.actObj = {};
            }
            this.$emit("choosen", this.actObj);
            this.handleClose();
        },
        handleClose: function() {
            this.actIdx = ''
            this.$emit("close");
        },
        handleClick(item) {
            this.actIdx = item.id;
            this.actObj = item;
        },
        currentChange(value) {
            this.params.p = value
            this.getData()
        },
        getData() {
            this.loading = true;
            let url = ''
            this.defaultProps.label = 'name'
            if(this.type == 'build') {                          // 商务楼宇服务站数据     
                url = 'get_building'
            } else if (this.type == 'social') {                 // 社会组织数据
                url = 'get_social'
            } else if (this.type == 'party') {                  // 党建阵地数据
                url = 'get_party'
            } else if (this.type == 'company') {                 // 非公企业信息
                url = 'get_company'
            } else {                                            // 单位库
                this.defaultProps.label = 'short_name'
                url = 'get_unit'
            }
            datacenter[url](this.params).then( res => {
                this.loading = false
                this.list = res.data
            })
        }
    },
    created() {
        this.getData() 
    },
};
</script>

<style scoped>
.unitSelectDialog .el-input{ padding: 0 10px; box-sizing: border-box; }
.unitSelectDialog /deep/ .el-dialog__body { padding: 20px 0; }
.unitSelectDialog .list-box { margin: 10px 0; height: 380px; overflow: auto; border-bottom: 1px solid #ddd; }
/* .unitSelectDialog .list-box li, */
.el-tree .el-tree-node__content { color: #7f8a92; padding-left: 20px; line-height: 40px; cursor: pointer; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
/* .unitSelectDialog .list-box li.act { background: #f2f5fa; color: #187cd6; } */
.el-tree .is-current .el-tree-node__content { background: #f2f5fa; color: #187cd6; }
</style>
