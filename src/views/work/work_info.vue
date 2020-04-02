<template>
  <div class="flex-col">
    <div class="flex-1 mainCont scrollbar">
      <div class="block_wrap_min infoLayout withTitle" v-loading="loading">
        <div class="channelBar">
          <div class="_title">
            <i class="ion">&#xe606;</i>
            <strong>设置</strong>
          </div>
        </div>
        <div class="flex-row">
          <div class="sidebar">
            <ul>
              <li class="cur" @click="$router.push({name: '个人信息'})">个人信息</li>
              <li @click="$router.push({name: '修改密码'})">修改密码</li>
            </ul>
          </div>
          <div class="flex-1">
            <el-form v-if="info" ref="form" :model="info" label-width="100px">
              <el-form-item label="姓名">
                {{info.realname}}
              </el-form-item>
              <el-form-item label="身份证号">
                {{info.card}}
              </el-form-item>
              <el-form-item label="性别">
                <el-radio v-model="info.sex" label="0">男</el-radio>
                <el-radio v-model="info.sex" label="1">女</el-radio>
              </el-form-item>
              <el-form-item label="政治面貌">
                <el-select v-if="politicsList.length" v-model="info.politics" placeholder="请选择" class="w100">
                  <el-option
                    v-for="item in politicsList"
                    :key="'zzmm'+item.id"
                    :label="item.value"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="入党时间">
                <el-date-picker
                  v-model="info.join_time"
                  type="date"
                  value-format="yyyy-MM-dd" class="w100">
                </el-date-picker>
              </el-form-item>
              <el-form-item label="籍贯">
                <el-cascader
                  :placeholder="info.native_place.title || '请选择'"
                  :options="areaList"
                  :props="{value:'id', label: 'name'}"
                  @change="handleAreaChange" 
                  class="w100"
                ></el-cascader>
              </el-form-item>
              
              <el-form-item label="家庭住址">
                <el-input v-model="info.address" ></el-input>
              </el-form-item>
              <!-- <el-form-item label="联系电话">
                <el-input v-model="info.cellphone" ></el-input>
              </el-form-item> -->
              <el-form-item label="户口所在地">
                <el-input v-model="info.house_add" ></el-input>
              </el-form-item>
              <el-form-item label="学历">
                <el-select v-if="xueliList.length" v-model="info.education" placeholder="请选择" class="w100">
                  <el-option
                    v-for="item in xueliList"
                    :key="'zzmm'+item.id"
                    :label="item.value"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="专业特长">
                <el-select v-if="techangList.length" v-model="info.majorthey" multiple placeholder="请选择" class="w100">
                  <el-option
                    v-for="item in techangList"
                    :key="'zzmm'+item.id"
                    :label="item.value"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="" class="actionBar">
                <el-button type="primary" size="small" plain @click="$router.replace({name: '工作记实'})">取 消</el-button>
                <el-button type="primary" size="small" @click="save">保 存</el-button>
              </el-form-item>

            </el-form>

          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as util from "@/assets/util";
import * as account from "@/api/account";

export default {
  data() {
    return {
      loading: false,
      info: null,
      queryParam: {},
      politicsList: [],
      areaList: require('@/assets/city.json'),
      xueliList: [],
      techangList: []
    };
  },
  watch: {
    info: {
      handler: function() {
        let result = util.deepcopy(this.info)
        result.native_place = result.native_place.id;
        
        let fixFunc = function(key){
          if(key && result[key]){
            if(Array.isArray(result[key])){
              result[key] = result[key].map(e => e.id || e);
            }
          }
        }
        let keys = ['education', 'majorthey', 'nation', 'politics', 'majorthey']
        keys.forEach(e => fixFunc(e))
        
        this.queryParam = result
      },
      deep: true
    }
  },
  methods: {
    handleAreaChange: function(item){
      if(Array.isArray(item) && item.length){
        this.info.native_place.id = [].concat(item).pop()
      }
    },
    fetchData: function() {
      this.loading = true;
      account.info().then(res => {
        this.loading = false;
        let result = res.data.data;

        let fixFunc = function(key){
          if(key && result[key]){
            if(Array.isArray(result[key])){
              if(key=='majorthey'){
                result[key] = result[key].map(e => e.id || e);
              }else{
                result[key] = result[key][0] ? result[key][0].id : ''
              }
              
            }
          }
        }
        let keys = ['education', 'majorthey', 'nation', 'politics', 'work_post']
        keys.forEach(e => fixFunc(e))
        this.info = result
      }).then(() => {
        this.fetchZZMM()
        this.fetchXueli()
        this.fetchTechang()
      });
      
    },
    fetchZZMM: function() {
      return account.kvp({ id: 6 }).then(res => {
        this.politicsList = res.data.data;
      });
    },
    fetchXueli: function(){
      return account.kvp({ id: 11 }).then(res => {
        this.xueliList = res.data.data
      })
    },
    fetchTechang: function(){
      return account.kvp({ id: 15 }).then(res => {
        this.techangList = res.data.data
      })
    },
    save: function(){
      this.loading = true;
      let param = util.deepcopy(this.queryParam);
      delete param.avatar;
      account.update(param).then(res => {
        this.fetchData()
        this.$message({
          message: res.data.statusCode,
          type: 'success'
        });
      })
    }
  },
  created: function() {
    this.fetchData();
  }
};
</script>

<style scoped>
.infoLayout {
  width: 900px;
  margin: 20px auto;
  padding: 60px 60px 60px 40px;
  box-sizing:border-box;
}
.infoLayout .channelBar {
  background: transparent;
  color: #000;
}
.infoLayout .channelBar .ion {
  color: #1244D2;
}

.sidebar {
  width: 174px;
  padding: 0 20px;
}
.sidebar li {
  cursor: pointer;
  text-align: center;
  font-size: 14px;
  height: 48px;
  line-height: 48px;
  background:#f3f5fa;
}
.sidebar .cur {
  background: #1244D2;
  color: #fff;
}
.w100 { width:100%;}
</style>
<style>
/* form */
.infoLayout .el-form-item__label{color:#838383}
.actionBar .el-button{min-width: 8em;}
</style>