<template>
  <view>
    <view class="" style="padding:100rpx 60rpx ">
      <view class="" style="font-size: 36rpx;color: #1F1F1F;font-weight: 600;">
        欢迎登录报台系统
      </view>
      <view class="" style="font-size: 15px;color: #1F1F1F;margin: 20rpx 0 70rpx 0;">
        珍惜每一次遇见
      </view>
      <text class="" style="color: #323232;font-size: 30rpx;">账号</text>
      <view class="" style="padding: 20rpx 0;border-bottom: 1px solid #BFBFBF;margin-bottom: 20rpx;">
        <input class="aaaaaaa" disabled type="value" border="none" placeholder="请输入你的手机号" />
      </view>
      <text class="" style="color: #323232;font-size: 30rpx;">验证码</text>
      <view class="" style="padding: 20rpx 0;border-bottom: 1px solid #BFBFBF;margin-bottom: 20rpx;">
        <input class="aaaaaaa" disabled type="value" border="none" placeholder="请输入你的手机号" />
      </view>
    </view>
    <view class="flex-level-center" >
      <u-button type="primary" text="登录" @click="loginWeixin" style="width:calc(100% - 40rpx);" shape="circle"></u-button>
    </view>
    <!-- <u-button type="primary" text="确定" @click="loginWeixin"></u-button> -->
  </view>
</template>

<script>
export default {
  components: {
  },
  data() {
    return {

    }
  },
  onLoad() {

  },
  methods: {


    loginWeixin() {
      // let local = 'https://www.baidu.com/'; //获取当前页面地址作为回调地址
      // let local = encodeURIComponent(window.location.href); //获取当前页面地址作为回调地址
      let appid = 'wxed59108fe8db851a'
      // https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx2b0891384028ece7&redirect_uri=http%3a%2f%2fbaidu.com&response_type=code&scope=snsapi_userinfo&state=1232#wechat_redirect

      //通过微信官方接口获取code之后，会重新刷新设置的回调地址【redirect_uri】
      // window.location.href =
      //   "https://open.weixin.qq.com/connect/oauth2/authorize?appid=" +
      //   appid +
      //   "&redirect_uri=" +
      //   local +
      //   "&response_type=code&scope=snsapi_userinfo&state=1232#wechat_redirect";
      let redirect_uri = 'https://www.baidu.com/index.html' // 你线上部署项目首页，或者其他页面，就是用户授权成功后去到的页面，如果不明白就直接index.html
      var url =
        `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appid}&redirect_uri=${redirect_uri}&response_type=code&scope=snsapi_userinfo&state=123&connect_redirect=1#wechat_redirect`
      window.location.href = url;
      // https://api.weixin.qq.com/sns/oauth2/access_token?appid=APPID&secret=SECRET&code=CODE&grant_type=authorization_code
    },
    wxGetUserInfo() {
      console.log('获取用户信息')
      let _this = this;
      // 获取用户信息
      uni.getUserInfo({
        provider: 'weixin',
        success: function (infoRes) {
          _this.encryptedData = infoRes.encryptedData
          _this.iv = infoRes.iv
          _this.nickName = infoRes.userInfo.nickName; //昵称
          _this.avatarUrl = infoRes.userInfo.avatarUrl; //头像
          uni.setStorageSync('isCanUse', false); //记录是否第一次授权 false:表示不是第一次授权
          _this.updateUserInfo();
        },
        fail: function (fail) {
          console.log("fail:", fail)
        }
      });
    },
  }
}
</script>

<style>
</style>
