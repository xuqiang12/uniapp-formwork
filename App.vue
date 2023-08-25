<script>
	export default {
		globalData: {
			name: true
		},
		onLoad() {
			// console.log('App onLoad')
		},
		// onLaunch: function() {

		// 	// uni.loadFontFace({
		// 	// 	family: '思源黑体',
		// 	// 	global: true,
		// 	// 	source: 'url("https://vkceyugu.cdn.bspapp.com/VKCEYUGU-4ad7ad0d-671d-4e62-b708-7519aabab27d/5398630f-8b48-4e8f-bbf0-b605aa23de86.ttf")',
		// 	// })
		// 	console.log('App Launch11111111111111')
		// },

		onLaunch: function() {
			// console.log(this.isCode(), 11111111111)
			// if (this.isCode()) {
			// 	this.getUserInfo()
			// } else {
			// 	this.getCode()
			// }
		},
		onShow: function() {
			// console.log('App Show')
		},
		onHide: function() {
			// console.log('App Hide')
		}
	}
</script>
<style lang="scss">
	/* 注意要写在第一行，同时给style标签加入lang="scss"属性 */
	@import "@/uni_modules/uview-ui/index.scss";
	@import '@/assets/css/clear-uview.scss'; // 引入清除uniapp原始样式
	@import '@/assets/css/common.scss'; // 引入清除uniapp原始样式
</style>
<style>
	/*每个页面公共css */
</style>
