<template>
  <div v-loading="loading">
    <el-dialog
      class="comDialog"
      title="党员信息"
      :append-to-body="true"
      :visible="visible"
      width="1000px"
      @open="fetchData"
      @close="handleClose"
    >
      <!-- 表单 -->
      <el-form ref="form" :model="form" :rules="rules" label-width="200px">
        <input-image
          v-if="visible"
          labelname="头像"
          onefile
          :labelwidth="200"
          :propvalue="{id: form.portrait, url: form.portrait_url}"
          @change="handleWidgetChange('portrait', $event.id);handleWidgetChange('portrait_url', $event.url)"
        />
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="form.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass">
          <el-input type="password" v-model="form.checkPass" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="姓名" prop="name">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <el-radio-group v-model="form.sex">
            <el-radio label="0">男</el-radio>
            <el-radio label="1">女</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="发展状态">
          <el-select v-model="form.develop_status">
            <el-option label="请选择" value="0"></el-option>
            <el-option label="党员" value="1"></el-option>
            <el-option label="预备党员" value="2"></el-option>
            <el-option label="积极分子" value="3"></el-option>
            <el-option label="发展对象" value="4"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="民族" prop="nation">
          <el-select v-model="form.nation">
            <el-option label="请选择" value="0"></el-option>
            <el-option
              v-for="item in nationList"
              :key="'nation'+item.id"
              :label="item.value"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="身份证号" prop="card">
          <el-input v-model="form.card"></el-input>
        </el-form-item>
        <el-form-item label="健康状况">
          <el-input v-model="form.health_name" readonly placeholder="请选择健康状况" 
                    @focus="treepickerDialog=true;treeType='health';treeTitle='健康状况'" ></el-input>
          
        </el-form-item>
        <input-date
          labelname="出生日期"
          :labelwidth="200"
          :propvalue="form.birth"
          :requiredvalue="true"
          @change="handleWidgetChange('birth', $event)"
        />
        <el-form-item label="政治面貌">
          <el-select v-model="form.politics">
            <el-option label="请选择" value="0"></el-option>
            <el-option
              v-for="item in politicsList"
              :key="'politics'+item.id"
              :label="item.value"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="籍贯">
          <el-input v-model="form.native_place_name" readonly placeholder="请选择籍贯" 
              @focus="treepickerDialog=true;treeType='native';treeTitle='籍贯'" ></el-input>
        </el-form-item>
        <el-form-item label="籍贯补充">
          <el-input v-model="form.native_supply"></el-input>
        </el-form-item>
        <input-date
          labelname="入党时间"
          :labelwidth="200"
          :propvalue="form.join_time"
          @change="handleWidgetChange('join_time', $event)"
        />
        <input-date
          labelname="参加工作时间"
          :labelwidth="200"
          :propvalue="form.work_time"
          @change="handleWidgetChange('work_time', $event)"
        />
        <el-form-item label="工作岗位">
          <el-input v-model="form.work_post_name" readonly placeholder="请选择工作岗位" 
            @focus="treepickerDialog=true;treeType='work';treeTitle='工作岗位'" ></el-input>
          
        </el-form-item>
        <input-date
          labelname="本岗位开始工作时间"
          :labelwidth="200"
          :propvalue="form.work_post_time"
          @change="handleWidgetChange('work_post_time', $event)"
        />
        <el-form-item label="新社会阶层情况">
          <el-input v-model="form.new_social_name" readonly placeholder="请选择新社会阶层情况" 
            @focus="treepickerDialog=true;treeType='newSocial';treeTitle='新社会阶层情况'" ></el-input>
          
        </el-form-item>
        <el-form-item label="婚姻状况">
          <el-select v-model="form.marital_status">
            <el-option label="请选择" value="0"></el-option>
            <el-option
              v-for="item in hunyinStatusList"
              :key="'social'+item.id"
              :label="item.value"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="户口性质">
          <el-input v-model="form.household"></el-input>
        </el-form-item>
        <el-form-item label="职称">
          <el-input v-model="form.titles_name" readonly placeholder="请选择职称" 
            @focus="treepickerDialog=true;treeType='titles';treeTitle='职称'" ></el-input>
          
        </el-form-item>
        <el-form-item label="缴纳党费工资基数">
          <el-input v-model="form.wagebase"></el-input>
        </el-form-item>
        <el-form-item label="每月应缴纳党费">
          <el-input v-model="form.dues"></el-input>
        </el-form-item>
        <el-form-item label="学历">
          <el-select v-model="form.education">
            <el-option label="请选择" value="0"></el-option>
            <el-option
              v-for="item in xueliList"
              :key="'zzmm'+item.id"
              :label="item.value"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="家庭住址">
          <el-input v-model="form.address"></el-input>
        </el-form-item>
        <el-form-item label="邮编">
          <el-input v-model="form.zip_code"></el-input>
        </el-form-item>
        <el-form-item label="户口所在地">
          <el-input v-model="form.house_add"></el-input>
        </el-form-item>
        <el-form-item label="农民工标识">
          <el-radio-group v-model="form.farm_identify">
            <el-radio label="0">否</el-radio>
            <el-radio label="1">是</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="流动党员标识">
          <el-radio-group v-model="form.floating">
            <el-radio label="0">否</el-radio>
            <el-radio label="1">是</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="住宅电话">
          <el-input v-model="form.phone"></el-input>
        </el-form-item>
        <el-form-item label="手机号码">
          <el-input v-model="form.cellphone"></el-input>
        </el-form-item>
        <el-form-item label="办公电话">
          <el-input v-model="form.office_phone"></el-input>
        </el-form-item>
        <el-form-item label="其他通讯号码">
          <el-input v-model="form.other_phone"></el-input>
        </el-form-item>
        <el-form-item label="E_Mail">
          <el-input v-model="form.email"></el-input>
        </el-form-item>
        <el-form-item label="工作在一线情况">
          <el-select v-model="form.situation">
            <el-option label="请选择" value="0"></el-option>
            <el-option
              v-for="item in yixianList"
              :key="'yixian'+item.id"
              :label="item.value"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="曾用名">
          <el-input v-model="form.nickname"></el-input>
        </el-form-item>
        <el-form-item label="第二党派">
          <el-select v-model="form.second_org">
            <el-option label="请选择" value="0"></el-option>
            <el-option
              v-for="item in secendPartyList"
              :key="'secendParty'+item.id"
              :label="item.value"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <input-date
          labelname="加入第二党派日期"
          :labelwidth="200"
          :propvalue="form.second_time"
          @change="handleWidgetChange('second_time', $event)"
        />
        <el-form-item label="港澳台属">
          <el-select v-model="form.partygats">
            <el-option label="请选择" value="0"></el-option>
            <el-option
              v-for="item in partygatsList"
              :key="'partygats'+item.id"
              :label="item.value"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="专业特长">
          <el-select v-model="form.majorthey">
            <el-option label="请选择" value="0"></el-option>
            <el-option
              v-for="item in techangList"
              :key="'majorthey'+item.id"
              :label="item.value"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="参加党员志愿者队伍情况">
          <el-select v-model="form.partyremark">
            <el-option label="请选择" value="0"></el-option>
            <el-option
              v-for="item in partyremarkList"
              :key="'partyremark'+item.id"
              :label="item.value"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button icon="el-icon-circle-check-outline" type="primary" @click="submit">确 定</el-button>
        <el-button icon="el-icon-circle-close-outline" @click="handleClose">取 消</el-button>
      </span>
    </el-dialog>
    <!-- 籍贯 -->
    <treePicker :visible="treepickerDialog" @close="treepickerDialog=false" :typeId="treeType" :title="treeTitle" @choosen="treechoosenPicker" />
  </div>
</template>

<script>
import * as util from "@/assets/util";
import * as account from "@/api/account";
import input_organization_id from "@/components/work/widgets/input_organization_id";
import input_image from "@/components/work/widgets/input_image";
import input_date from "@/components/work/widgets/input_date";
import treePicker from '@/components/datacenter/widgets/treePicker'

export default {
  props: {
    visible: {
      type: Boolean,
      required: true
    },
    propdata: {
      type: Object,
      required: false,
      default: function() {
        return {};
      }
    }
  },
  components: {
    "input-organization-id": input_organization_id,
    "input-image": input_image,
    "input-date": input_date,
    treePicker
  },
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.form.checkPass !== "") {
          this.$refs.form.validateField("checkPass");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.form.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };

    return {
      treepickerDialog: false,
      treeType: '',
      treeTitle: '',
      loading: false,
      nationList: [],
      politicsList: [],
      xueliList: [],
      healthList: [],
      techangList: [],
      work_postList: [],
      new_socialList: [],
      hunyinStatusList: [],
      titlesList: [],
      yixianList: [],
      secendPartyList: [],
      partygatsList: [],
      partyremarkList: [],
      casOption: {
        value:'id', 
        label: 'value',
        disabled: 'status'
      },
      form: {
        portrait: "",
        portrait_url: "",
        password: "",
        checkPass: "",
        name: "",
        sex: "",
        develop_status: "",
        nation: "",
        card: "",
        birth: "",
        politics: "",
        native_place: '',
        native_supply: "",
        join_time: "",
        work_time: "",
        work_post: [],
        work_post_time: "",
        new_social: [],
        marital_status: "",
        household: "",
        titles: [],
        wagebase: "",
        dues: "",
        education: "",
        address: "",
        zip_code: "",
        house_add: "",
        farm_identify: "",
        floating: "",
        phone: "",
        cellphone: "",
        office_phone: "",
        other_phone: "",
        email: "",
        situation: "",
        nickname: "",
        second_org: "",
        second_time: "",
        partygats: "",
        majorthey: "",
        partyremark: "",
        health: []
      },
      rules: {
        password: [
          { required: true, validator: validatePass, trigger: "blur" }
        ],
        checkPass: [
          { required: true, validator: validatePass2, trigger: "blur" }
        ],
        name: [{ required: true, message: "请填写姓名", trigger: "blur" }],
        sex: [{ required: true, message: "请选择性别", trigger: "change" }],
        nation: [{ required: true, message: "请填写民族", trigger: "blur" }],
        card: [{ required: true, message: "请填写身份证号", trigger: "blur" }]
      },
      native_obj: {}
    };
  },
  watch: {
    native_obj: function(native_obj){
      if(native_obj && native_obj.id){
        this.form.native_place = native_obj.id
      }
    },
    propdata: {
      handler: function(propdata) {
        if (!propdata.uid || propdata.uid=='0') {
          const keys = Object.keys(propdata);
          const isEdit = !!propdata.w_id;
          keys.forEach(key => {
            let value = propdata[key];
            if(isEdit){
              if(key==='password'){
                value = '';
                this.$set(this.form, 'checkPass', value);
              }
            }
            
            this.$set(this.form, key, value);
            
          });
        }
      },
      deep: true,
      immediate: true
    }
  },
  methods: {
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
            this.form[field_id] = ''
            this.form[field_name] = ''
            return 
        }
        this.form[field_id] = obj.id
        this.form[field_name] = obj.value
    },

    //自动填充组件数据
    handleWidgetChange: function(name, value) {
      this.$set(this.form, name, value || '');
    },
    submit: function() {
      //验证
      if (!this.form.birth) {
        return this.$message({
          message: "请填写出生日期",
          type: "warning"
        });
      }
      this.$refs.form.validate(valid => {
        if (valid) {
          let result = Object.assign({}, this.form);

          this.$emit("choosen", result);
          this.$nextTick(() => {
            this.handleClose();
          });
        } else {
          this.$message({
            message: "部分表单项未正确填写",
            type: "warning"
          });
        }
      });
    },
    reset: function() {
      const keys = Object.keys(this.form);
      keys.forEach(key => {
        this.$set(this.form, key, "");
      });
      this.$nextTick(() => {
        this.$refs.form && this.$refs.form.clearValidate();
      });
    },
    handleClose: function() {
      this.reset();
      this.$emit("close");
    },
    fetchData: function() {
      //数据字典请求队列
      const dataQueue = [
        {
          name: "nationList",
          id: 4
        },
        {
          name: "politicsList",
          id: 6
        },
        {
          name: "xueliList",
          id: 11
        },
        {
          name: "healthList",
          id: 5
        },
        {
          name: "techangList",
          id: 15
        },
        {
          name: "work_postList",
          id: 7
        },
        {
          name: "new_socialList",
          id: 8
        },
        {
          name: "hunyinStatusList",
          id: 9
        },
        {
          name: "titlesList",
          id: 10
        },
        {
          name: "yixianList",
          id: 12
        },
        {
          name: "secendPartyList",
          id: 13
        },
        {
          name: "partygatsList",
          id: 14
        },
        {
          name: "partyremarkList",
          id: 16
        }
      ];

      const ajaxQueue = dataQueue.map(p => {
        return account.kvp({
          id: p.id
        });
      });

      this.loading = true;
      Promise.all(ajaxQueue).then(res => {
        res.forEach((resBody, resIndex) => {
          if (dataQueue[resIndex].name) {
            let list = resBody.data.data;
            list = list.map(e => {
              e.status = (e.status=="1")
              return e
            })
            
            this[dataQueue[resIndex].name] = util.buildMenu(
              list,
              "pid"
            );
          } else {
            console.warn("请求队列参数错误", ajaxQueue[resIndex]);
          }
        });
        this.loading = false;
      });
    }
  },
  created: function() {
    
  }
};
</script>

<style scoped>
</style>
