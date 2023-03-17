<template>
	<loading-page>
		<view class="" style="padding: 20rpx;">
			<view class="" @click="search()">
				<u--input customStyle="height: 18px;" placeholder="请输入内容" readonly prefixIcon="search" border="surround" shape='circle'></u--input>
			</view>
		</view>
	</loading-page>
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

		},
		onLoad() {

		},
		onReady() {


		},
		methods: {
			search(){
				uni.navigateTo({ url: '/pages/index/search' })
			}
		}
	}
</script>

<style>

</style>
