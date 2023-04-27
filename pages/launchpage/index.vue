<template>
  <!-- <loading-page> -->
  <view class="" style="padding: 20rpx;">
          <u-button @click="aaa">1111</u-button>
    <!-- <view class="" @click="search()">

      <u--input customStyle="height: 18px;" placeholder="请输入内容" readonly prefixIcon="search" border="surround" shape='circle'></u--input>
    </view> -->
  </view>
  <!-- </loading-page> -->
</template>

<script>
import adsorber from '@/components/BaseCom/adsorber/index.vue'
// import loadingPage from '@/components/BaseCom/loading-page/index.vue'
export default {
  components: {
    adsorber,
    // loadingPage
  },
  data() {
    return {
    }
  },
  onShow() {
    uni.showLoading({
      mask:true,
      title: '加载中',
      style:{background: '#fff !important',"uni-mask":{background: '#fff !important'}}
    });

    setTimeout(function () {
      uni.hideLoading();
    }, 500000);
  },
  onLoad() {

  },
  onReady() {


  },
  methods: {
    aaa() {
      console.log(' ', 1111111111)
    },
    search() {
      uni.navigateTo({ url: '/pages/index/search' })
    }
  }
}
</script>

<style lang="scss" scoped>
.requestLoading{
::v-deep .uni-mask{
  background: #fff !important;
}
}
</style>
