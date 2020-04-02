<template>
  <section class="block">
    <el-row class="content" :gutter="10"> 
      <el-col class="item" :span="12">
        <div @click="$router.push({name: '新建工作'})">
          <img src="../../assets/img/work/work_1.png" alt="">
          <p>新建工作</p>
        </div>
      </el-col>
      <el-col class="item" :span="12">
        <div @click="$router.push({name: '我的工作'})">
          <img src="../../assets/img/work/work_2.png" alt="">
          <p>我的工作</p>
        </div>
      </el-col>
      <el-col class="item" :span="24" v-if="$root.user.org_type !== 3">
        <div class="flex-row tc" @click="$router.push({name: '综合评价'})">
          <img src="../../assets/img/work/work_5.png" alt="">
          <p class="flex-1">综合评价</p>
        </div>
      </el-col>
      <el-col class="item" :span="12">
        <div @click="$router.push({name: '文件接收箱'})" style="margin-bottom:0">
          <img src="../../assets/img/work/work_3.png" alt="">
          <p>收发文件</p>
        </div>
      </el-col>
      <el-col class="item" :span="12">
        <div @click="$router.push({name: '通知公告'})" style="margin-bottom:0">
          <img src="../../assets/img/work/work_4.png" alt="">
          <p>下发通知</p>
        </div>
      </el-col>
    </el-row>
  </section>  
</template>

<script>
export default {
  
}
</script>

<style scoped>
*{box-sizing: border-box;}
.block .item div{height:76px;margin-bottom: 10px;}
.content {flex-wrap: wrap;}
.block .item div {border-radius: 6px;box-shadow: 1px 1px 8px #ccc;
background-image: url('../../assets/img/dots.png');background-repeat: no-repeat;
background-position-x: 100px;background-position-y: 25px;
display: flex;justify-content: center;align-items: center;flex-direction: column;color: #fff;
cursor: pointer;}
.block .item div.flex-row { display:block; line-height:76px;}
.block .item div.flex-row img,.block .item div.flex-row p { display:inline-block; vertical-align:middle;}
.block .item div.flex-row img { vertical-align:-11px; margin-right:5px;}
.block .item:first-of-type  > div {background:linear-gradient(-135deg,#288ae3,#4abcf7);}
.block .item:nth-of-type(2) > div {background:linear-gradient(-135deg,#e74143,#ff7c4e);}
.block .item:nth-of-type(3) > div  {background:linear-gradient(-135deg,#ff8a00,#ffca10);}
.block .item:nth-of-type(4) > div  {background:linear-gradient(-135deg,#8143d6,#c66edf);}
.block .item:nth-of-type(5) > div  {background:linear-gradient(-135deg,#8bbd13,#a7df45);}
</style>
