<template>
  <el-row :gutter="20" :class="{'readOnly':disabled}">
    <template v-for="(comp,ci) in components">
      <template v-if="comp.is_row==1">
        <!-- 整行 -->
        <el-col :key="'comp'+ci" :span="24">
        <el-row :gutter="0">
          <el-col :span="getColumn(comp)">
            <component
              :is="'widget_'+comp.type"
              :labelname="comp.name"
              :labelwidth="200"
              :propvalue="applyValue(comp)"
              :propdata="comp.data"
              :requiredvalue="comp.required==='1'"
              :placeholder="comp.placeholder || ''"
              :disabled="disabled"
              :ext_props="ext_props"
              @change="widgetChange(comp,ci,$event)"
            ></component>
          </el-col>
        </el-row>
        </el-col>
      </template>
      <template v-else>
        <!-- 栅格 -->
        <el-col :key="'comp'+ci" :span="getColumn(comp)" style="min-height:63px">
          <component
            :is="'widget_'+comp.type"
            :labelname="comp.name"
            :labelwidth="200"
            :propvalue="applyValue(comp)"
            :propdata="comp.data"
            :requiredvalue="comp.required==='1'"
            :placeholder="comp.placeholder || ''"
            :disabled="disabled"
            :ext_props="ext_props"
            @change="widgetChange(comp,ci,$event)"
          ></component>
        </el-col>
      </template>
    </template>
  </el-row>
</template>

<script>
import * as componentsRepository from "@/components/work/widgets/componentsMap";

export default {
  props: {
    components: {
      type: Array,
      required: true
    },
    disabled: {
      type: Boolean,
      required: false,
      default: false
    },
    iscreated: {
      type: Boolean,
      required: false,
      default: false
    },
  },
  components: {
    ...componentsRepository
  },
  data() {
    return {
      party_member_should_number: 0,
      party_member_real_number: 0,
      ext_props: {},
      forceRow: [
        // 'party_member_real_user_ids',
        // 'input_user_ids_input',
        // 'input_user_ids'
      ]
    }
  },
  computed: {
    memberPercent: function(){
      const percent = (this.party_member_should_number && this.party_member_real_number) ? parseInt(this.party_member_real_number / this.party_member_should_number * 100) : 0;
      if(percent >= 80){
        this.$emit('validSuccess', 'memberPercent')
      }else{
        this.$emit('validFail', 'memberPercent')
      }
      return percent;
    }
  },
  methods: {
    getColumn: function(item){
      const col = parseInt(item.column);
      if(isNaN(col)){
        return 24
      } else if(this.forceRow.indexOf(item.type)!==-1){
        return 24
      } else {
        return col
      }
    },
    applyValue: function(comp){
      switch(comp.type){
        //实到党员
        case "party_member_real_number":
          return this.party_member_real_number || comp.value
        break;
        //实到党员
        case "party_member_real_number_input":
          return this.party_member_real_number || comp.value
        break;

        default:
          return comp.value
      }
    },
    widgetChange: function(comp,ci,$event){
      switch(comp.type){
        case "party_member_real_user_ids":
        //同步实到党员人数
          if(this.iscreated){
            this.party_member_real_number = $event.length
          }
        break;
        case "party_member_real_user_ids_no_input":
        //同步实到党员人数
          if(this.iscreated){
            this.party_member_real_number = $event.length
          }
        break;
        //输入实到党员列表
        case "party_member_real_number_input":
          this.party_member_real_number = $event
        break;

        //应到党员列表
        case "party_member_should_number":
          this.party_member_should_number = $event
        break;
        //应到党员列表
        case "party_member_should_number_input":
          this.party_member_should_number = $event
        break;
        // 撤销党组织(用于党员/党组织分流控件)
        case "input_organization_id_children":
          this.$set(this.ext_props, 'organization_id', $event)
          break;
        // 月份选择(用于缴纳党费人员列表)
        case "input_month":
          this.$set(this.ext_props, 'input_month', $event)
          break;
        // 单位名称校验
        case "input_unit":
          if(comp.required==='1'){
            if(!$event.short_name){
              return this.$emit('validFail', 'unitNameEmpty')
            }
            this.$emit('validSuccess', 'unitNameEmpty')
          }
          
          break;
        default:
         
      }
      this.$emit('change', {
        ci,
        value: $event
      })
    }
  }
}
</script>

<style scoped>


</style>
