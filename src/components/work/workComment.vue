<template>
  <div class="instruction" v-loading="commentLoading">
    <template v-if="commentlist.length">
      <ul class="_list">
        <li v-for="(item,index) in commentlist" :key="'comment' + index">                                
          <el-row>
            <el-col :span="9" class="el">
              <span class="_tag">
                {{item.org_name}}
              </span>
            </el-col>
            <el-col :span="9" class="el">
              {{item.username}}
              <span class="_tag">
                {{item.duty}}
              </span>
            </el-col>
            <el-col :span="6">
              {{item.time}}
            </el-col>
          </el-row>
          <div class="_cont">
            {{item.content}}
          </div>
          <div class="_note" v-if="item.is_mine==1">
            <el-button size="small" @click="del(item.id)">删除</el-button>
          </div>
        </li>
      </ul>
    </template>
    <template v-else>
      <div class="placeholder"></div>
    </template>
    <div class="_input" v-if="can_submit">
      <el-input
        type="textarea"
        :rows="3"
        class="noborderInut"
        placeholder="请您对本项工作给出建议"
        v-model="instructionInput">
      </el-input>
      <div class="_action">
        <el-button size="small" :disabled="!instructionInput.length" @click="addComment">提交</el-button>
      </div>
    </div>
  </div>

</template>

<script>
import * as work from "@/api/work.js";

export default {
  props: {
    form_category_id: {
      type: [String, Number],
      required: true
    },
    id: {
      type: String,
      required: true
    },
    record_id: {
      type: String,
      required: true
    },
    process_step_log_id: {
      type: String,
      required: false,
      default: ''
    }
  },
  data() {
    return {
      instructionInput: '',
      commentLoading: false,
      commentlist: [],
      can_submit: false
    };
  },
  computed: {
    queryParam: function(){
      return {
        form_category_id: this.form_category_id,
        id: this.id
      }
    }
  },
  methods: {
    fetchComment: function(){
      this.commentLoading = true;

      work.commentlist({
        form_category_id: this.form_category_id,
        id: this.id
      }).then(res => {
        this.commentLoading = false
        this.commentlist = res.data.data
        this.can_submit = !!res.data.can_submit
      })
    },
    addComment: function(){
      if(!this.instructionInput){
        return null
      }
      this.commentLoading = true;
      work.addcomment({
        form_category_id: this.form_category_id,
        content: this.instructionInput,
        form_record_id: this.id
      }).then(res => {
        this.instructionInput = ''
        this.fetchComment()
      }).catch(err => {
        this.commentLoading = false;
      })
    },
    del: function(id){
      this.$confirm('确认操作?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.commentLoading = true;
          work.commentdel({id}).then(() => {
            this.commentLoading = false;
            this.fetchComment()
          })
        })
    }
  },
  created() {
    this.fetchComment()
  }
};
</script>

<style scoped>
/* 领导批示 */
.instruction{padding:25px;}
.instruction ._list{margin-bottom: 20px;}
.instruction ._list li{position: relative; margin-bottom: 15px;background:#fafdff;padding:10px 30px;}
.instruction ._list ._tag{color:#898989;margin:0 1em;}
.instruction ._list ._cont{margin-top:10px;}
.instruction ._list ._note{position: absolute;right:20px;top: 10px;}

.instruction ._input{border: 1px solid #dcdfe6;border-radius: 4px;}
.instruction ._input ._action{text-align: right;padding:10px;}

.placeholder{width:274px;height:160px;margin:15px auto;background:url(../../assets/img/work/placeholder.jpg) 0 0 no-repeat;}
.noborderInut>>>.el-textarea__inner, .noborderInut:hover >>> .el-textarea__inner{border:0;}

</style>

