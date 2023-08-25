<template>
	<view class="container">
		<!--需要使用调试基础库2.23.4-->
		<button style="height: 60px;width: 60px;padding: 0;" open-type="chooseAvatar" @chooseavatar="onChooseAvatar">
			<image style="height: 60px;width: 60px;" :src="avatarUrl"></image>
		</button>
		<input type="nickname" class="weui-input" placeholder="请输入昵称" />
		<u-button open-type="getRealtimePhoneNumber" @getrealtimephonenumber="getrealtimephonenumber">一键登录获取手机号
		</u-button>
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
			uni.login({
				provider: 'weixin',
				success: (res) => {
					if (res.errMsg == 'login:ok') {
						this.code = res.code;
						uni.request({
							url: 'http://192.168.199.131:3000/api/tool/wechat/auth_code',
							method: 'POST',
							data: {
								code: res.code
							},
						}).then((res) => {
							// this.phone = res.data.phoneNumber
							console.log(res)

						});
					}
				},
			});
		},
		methods: {
			onChooseAvatar(e) {
				this.avatarUrl = e.detail.avatarUrl
			},
			getrealtimephonenumber(e) {
				uni.request({
					url: 'http://192.168.199.131:3000/api/tool/wechat/verify',
					method: 'POST',
					data: {
						code: e.detail.code
					},
				}).then((res) => {
					this.phone = res.data.phoneNumber
					console.log(res)

				});
				// console.log(e.detail.code) // 动态令牌
				// console.log(e.detail.errMsg) // 回调信息（成功失败都会返回）
				// console.log(e.detail.errno) // 错误码（失败时返回）
			},
		}
	}
</script>
<style lang="scss">
	.container {
		padding: 50px 10px 0 10px;
	}
</style>
