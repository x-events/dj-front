<template>
  <div class="login-box">
      <h2 class="flex-row align-center">{{title}}</h2>
      <div class="content">
        <slot />
      </div>
  </div>  
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: ""
    }
  }
}
</script>

<style>
  .login-box {width: 470px;background-color: rgba(255, 255, 255, .2);border-radius: 10px;box-shadow:0 5px 3px rgba(0, 0, 0, 0.25);
  border:1px solid rgba(255,255,255,.1);}
  .login-box h2{padding: 8px 16px;color: #B4C9FC;font-weight: normal;background-color: #3F79FF;border-top-right-radius: 8px;border-top-left-radius: 8px;font-size: 18px;text-shadow: 2px 3px 5px rgba(0, 0, 0, 0.3);font-weight: bold;justify-content: center;}
  .login-box .content {padding:10px 15px 0px; display: flex;justify-content: center;align-items: center;flex-direction: column;}
  .login-box .content .form-item {margin-bottom: 20px;}
  .login-box .form-item  label {color: #fff;width: 100px;text-align: right;}
  .login-box .btn { height:45px; color:#fff; border-radius:5px; font-size:16px; border:none;}
  .login-box .submit-button { background:linear-gradient(to bottom, #f8461c, #ff851b); flex:4;}
  .login-box .cancel-button { background:linear-gradient(to bottom, #eaecf1, #f7f6f6); border:0; color:#666;flex:4; border:#e2e7eb 1px solid;}
</style>
