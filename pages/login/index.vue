<template>
	<view class="container">
		<u-button @click="getCode()">获取微信公众号用户信息</u-button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				avatarUrl: 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0',
				phone: "",
				code: ""
			}
		},
		mounted() {
			if (this.isCode()) {
				this.getUserInfo()
			}
		},
		methods: {
			getCode() {
				uni.request({
					url: 'http://192.168.199.131:3000/api/tool/wechat/official_code',
					method: "GET",
					success: (res) => {
						console.log(res)
						window.location.href = res.data.data
					}
				})
			},
			isCode() {
				return window.location.search.includes("code=")
			},
			getUserInfo() {
				const url_param = Object.fromEntries(window.location.search.slice(1).split("&").map(v => v.split("=")))
				uni.request({
					url: 'http://192.168.199.131:3000/api/tool/wechat/official_user',
					method: "POST",
					data: {
						code: url_param.code
					},
					success: (res) => {

					}
				})
			},
		},
	}
</script>
<style lang="scss">
	.container {
		padding: 50px 10px 0 10px;
	}
</style>
