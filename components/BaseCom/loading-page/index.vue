<template>
	<view class="main-content">
		<u-loading-page :loading="loading" loading-text="加载中...."></u-loading-page>
		<!-- {{loadings}} -->
		<view class="" v-if="!loading" class="main-content" :style="[addStyle(customStyle)]">
			<slot></slot>
		</view>
	</view>

</template>

<script>
	import { addStyle } from "@/assets/javascript/common.js";
	export default {
		name: 'Loading',
		props: {
			customStyle: { //自定义颜色
				type: [String, Object],
				default: function() {
					return ''
				}
			},
		},
		data() {
			return {
				loading: true
			}
		},
		onShow() {
			// console.log('子组件onshow')
		},
		onLoad() {
			// console.log('子组件onLoad')
		},
		onReady() {
			var that=this
			uni.loadFontFace({
				family: '思源黑体',
				global: true,
				source: 'url("https://vkceyugu.cdn.bspapp.com/VKCEYUGU-4ad7ad0d-671d-4e62-b708-7519aabab27d/5398630f-8b48-4e8f-bbf0-b605aa23de86.ttf")',
				complete(res) {
					that.loading = false
				},
			})
		},
		beforeCreate() {
			// console.log('子组件beforeCreate')
		},
		created() {
			// console.log('子组件created')
		},
		beforeMount() {
			// console.log('子组件beforeMount')
		},
		mounted() {
			// console.log('子组件mounted')
			// this.$nextTick(function() {
			//               this.loading = false
			//             });
			
			var { statusBarHeight } = uni.getSystemInfoSync();
		},
		methods: {
			addStyle(formStyle) {
				return addStyle(formStyle)
			},
		}
	}
</script>
</script>

<style lang="scss" scoped>
	.main-content {
		height: 100vh;
		width: 100%;
	}
</style>
