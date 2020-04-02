<template>
  <div class="el-form-item"
    :class="{'is-required': requiredvalue}">
    <div class="el-form-item__label" :style="{width: labelwidth+'px'}">{{labelname}}</div>
    <div class="el-form-item__content" :style="{marginLeft: labelwidth+'px'}">
      <div class="heightLayout flex-col">
        <div class="flex-1 scrollcont">
          <!-- <el-tag
            v-for="(user, i) in user_list"
            :key="'user'+i"
            size="medium"
            closable
            type="info"
            @close="remove(i)">
            {{user.name}}
          </el-tag> -->
          <span></span>
        </div>
        <span style="position:absolute;">{{ user_list.length }}</span>
        <div class="_actions">
          <el-button size="mini" @click="!disabled && (pickerDialog=true)">党员库选择</el-button>
          <el-button size="mini" @click="!disabled && (formDialog=true)">手动添加</el-button>
        </div>
      </div>
      
    </div>
    <!-- 选党员 -->
    <member-picker
      :visible="pickerDialog"
      @close="pickerDialog=false"
      @choosen="add"
    />
    <!-- 添党员 多添 -->
    <!-- <member-input-dialog
      :visible="formDialog"
      @close="formDialog=false"
      @choosen="user_list = user_list.concat($event)"
    /> -->
    <el-dialog class="comDialog" title="输入" :append-to-body="true" width="1000px"
        :visible="formDialog" @close="formDialog=false" >
        <!-- 表单 -->
        <!-- <el-form ref="myform" :model="form" :rules="rules" label-width="20px">
            <el-row>
                <el-col :span="5">党员姓名</el-col>
                <el-col :span="5">性别</el-col>
                <el-col :span="5">职务</el-col>
                <el-col :span="5">电话</el-col>
                <el-col :span="4">操作</el-col>
            </el-row>
            <el-row class="permiss-item" v-for="(item, index) in form.permissGroup" :key="index">
                <el-col :span="5">
                    <el-form-item label=" " :prop="'permissGroup.'+index+'.name'" :rules="permissGroupRules.name">
                        <el-input v-model="item.name" placeholder="" size="small" style="width:100%;"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="5">
                    <el-form-item label=" " :prop="'permissGroup.'+index+'.sex'" :rules="permissGroupRules.sex">
                        <el-select v-model="item.sex" placeholder="选择性别" style="width:100%;">
                            <el-option :label="item.name" :value="item.id" :key="index" v-for="(item, index) in sexData"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="5">
                    <el-form-item label=" " :prop="'permissGroup.'+index+'.duty'" :rules="permissGroupRules.duty">
                        <el-select v-model="item.duty" placeholder="选择职务" size="small" style="width:100%;">
                            <el-option :label="item.name" :value="item.id" :key="index" v-for="(item, index) in dutyData"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="5">
                    <el-form-item label=" " :prop="'permissGroup.'+index+'.tel'" :rules="permissGroupRules.tel">
                        <el-input v-model="item.tel" placeholder="请输入电话" size="small"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="3">
                    <span v-if="index == 0" @click="addItem('myform')">添加</span>
                    <span v-else @click="handleClose(form.permissGroup, item)">删除</span>
                </el-col>
            </el-row>
        </el-form> -->
        <el-form ref="myform" :model="form" :rules="rules" label-width="20px">
            <el-table :data="form.permissGroup" style="width: 100%">
                <!-- <div class="permiss-item" v-for="(item, index) in form.permissGroup" :key="index"> -->
                    <el-table-column label="党员姓名">
                        <template scope="scope">
                            <el-form-item label=" " :prop="'permissGroup.'+scope.$index+'.name'" :rules="permissGroupRules.name">
                                <el-input size="small" v-model="scope.row.name"></el-input>
                            </el-form-item>
                        </template>
                    </el-table-column>
                    <el-table-column label="性别">
                        <template scope="scope">
                            <el-form-item label=" " :prop="'permissGroup.'+index+'.sex'" :rules="permissGroupRules.sex">
                                <el-input size="small" v-model="item.sex"></el-input>
                            </el-form-item>
                        </template>
                    </el-table-column>
                    <el-table-column label="职务">
                        <el-form-item label=" " :prop="'permissGroup.'+index+'.duty'" :rules="permissGroupRules.duty">
                            <template scope="scope">
                                <el-input size="small" v-model="item.duty"></el-input>
                            </template>
                        </el-form-item>
                    </el-table-column>
                    <el-table-column label="电话">
                        <el-form-item label=" " :prop="'permissGroup.'+index+'.tel'" :rules="permissGroupRules.tel">
                            <template scope="scope">
                                <el-input size="small" v-model="item.tel"></el-input>
                            </template>
                        </el-form-item>
                    </el-table-column>
                    <el-table-column label="操作">
                        <template scope="scope">
                            <el-button v-if="scope.$index == 0" @click="addItem('myform')">添加</el-button>
                            <el-button v-else @click="handleClose(form.permissGroup, scope.row)">删除</el-button>
                        </template>
                    </el-table-column>
                <!-- </div> -->
            </el-table>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button icon="el-icon-circle-check-outline" type="primary" @click="submit('myform')">确 定</el-button>
            <el-button icon="el-icon-circle-close-outline" @click="formDialog=false">取 消</el-button>
        </span>
    </el-dialog>
  </div>
</template>

<script>
import * as util from "@/assets/util";

export default {
  props: {
    labelname: {
      type: String,
      required: true,
      default: "请输入"
    },
    labelwidth: {
      type: Number,
      required: false,
      default: 80
    },
    propvalue: {
      type: Array,
      required: false,
      default: function() {
        /*
        [{
          id: 1,
          name: "name1"
        }]
        */
        return [];
      }
    },
    propdata: {
      type: Array,
      required: false,
      default: function() {
        return [];
      }
    },
    requiredvalue: {
      type: Boolean,
      required: false,
      default: false
    },
    disabled: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  components: {
    "member-picker": resolve => require(["@/components/memberPicker"], resolve),
    "member-input-dialog": resolve => require(["@/components/memberInputDialog"], resolve)
  },
  data() {
    return {
        pickerDialog: false,
        formDialog: false,
        user_list: [],
        form: {                 // form model
            permissGroup: [
                {
                    name: '',
                    // sex: '',
                    // duty: '',
                    // tel: '',
                }
            ]
        },
        rules: {},              // form rule
        permissGroupRules: {    // form (循环)rule
            name: [{required: true, message: '请输入', trigger: 'blur'}],
            sex: [{required: true, message: '请选择性别', trigger: 'change'}],
            duty: [{required: true, message: '请选择职务', trigger: 'change'}],
            tel: [{required: true, message: '请输入', trigger: 'blur'}]
        },
        sexData: [
            {
                name:'男',
                id: 1
            },{
                name:'女',
                id: 2
            }
        ],
        dutyData: [
            {
                name:'职务1',
                id: 1
            },{
                name:'职务2',
                id: 2
            }
        ],
    };
  },
  watch: {
    propvalue: {
      handler: function(){
        if (Array.isArray(this.propvalue)) {
          if(this.propvalue.length && this.propvalue[0].name){
            this.user_list = [].concat(this.propvalue);
          }else{
            this.user_list = []
          }
        }
      },
      deep: true
    },
    user_list: {
      handler: function(user_list) {
        this.$emit("change", user_list.map(e => {
          return {
            uid: e.uid,
            name: e.realname || e.name
          }
        }));
      },
      deep: true
    },
    formDialog: {
        handler: function(formDialog) {
            this.form.permissGroup = [{}]
        }
    }
  },
  methods: {
    add: function(members){
      // 去重
      const oList = this.user_list;
      this.user_list = oList.concat(members.filter(m => {
        return oList.map(e => e.uid).indexOf(m.uid)===-1
      }));
    },
    remove: function(index){
      this.user_list.splice(index,1)
    },
    submit(formName) {
        this.$refs[formName].validate((valid) => {
            if (valid) {
                console.log('form',this.form);
                this.user_list = this.user_list.concat(this.form.permissGroup)
                this.formDialog=false
            } else {
                return false;
            }
        });
    },
    handleClose(data, tag) {
        data.splice(data.indexOf(tag), 1);
    },
    // 添加
    addItem(formName){
        this.$refs[formName].validate((valid) => {
            if (valid) {
                this.form.permissGroup.push({});
                console.log('formg',this.form.permissGroup);
                
            } else {
                return false;
            }
        });
    },
  },
  created: function() {
    if (Array.isArray(this.propvalue)) {
      if(this.propvalue.length && this.propvalue[0].name){
        this.user_list = [].concat(this.propvalue);
      }else{
        this.user_list = []
      }
    }
    // 重置事件
    util.on('resetWidgets', () => {
      this.user_list = []
    })
  }
};
</script>

<style scoped>
.heightLayout{
  height: 110px;
  border: 1px solid rgba(220,226,231,1);
  border-radius: 6px;
}
.heightLayout .scrollcont{overflow: auto;padding:10px ;}
.heightLayout ._actions{
  padding: 0 10px;
  text-align:right;
}
.heightLayout .el-tag{margin:0 6px 6px 0;}


</style>
