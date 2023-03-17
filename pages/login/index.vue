<template>
	<view>
		<!-- <view class="flex-erect-center">
			<button class='bottom' type='primary' open-type="getUserInfo" withCredentials="true" lang="zh_CN"
				@getuserinfo="wxGetUserInfo">
				授权登录
			</button>
			<u-button type="success" text="微信一键登录" customStyle='width:50%;margin-bottom:20rpx' @tap="getUserInfo" />
			<u-button text="手机号验证登录" customStyle='width:50%' />
		</view> -->
		<customForm ref='forms' :formData="formData" :columns="columns">
		</customForm>
		111
	</view>
</template>

<script>
	import customForm from '@/components/BaseCom/custom-form/index'
	export default {
		components: {
			customForm
		},
		data() {
			return {
	columns: [
					{ pram: 'portrait', label: '头像', type: "textarea", effect: 'form', rules: { required: true, } },
					{ pram: 'username', label: '姓名', type: "textarea", effect: 'form', rules: { required: true, }, itemStyle: 'height: 34px' },
					{ pram: 'telephone', label: '联系电话', type: "textarea", effect: 'form', rules: { required: true, }, itemStyle: 'height: 34px' },
					{ pram: 'hospital', label: '所在医院', type: "textarea", effect: 'form', rules: { required: true, }, itemStyle: 'height: 34px' },
					{ pram: 'departments', label: '所在科室', type: "textarea", effect: 'form', rules: { required: true, }, itemStyle: 'height: 34px' },
					{ pram: 'title', label: '职称级别', type: "textarea", effect: 'form', rules: { required: true, }, itemStyle: 'height: 34px' },
					{ pram: 'occupation', label: '职业类型', type: "textarea", effect: 'form', rules: { required: true, }, itemStyle: 'height: 34px' },
					{ pram: 'businessLicense', label: '证件上传', type: "textarea", effect: 'form', rules: { required: true, } },
				],
			}
		},
		onLoad() {

		},
		methods: {
			wxGetUserInfo() {
				console.log('获取用户信息')
				let _this = this;
				// 获取用户信息
				uni.getUserInfo({
					provider: 'weixin',
					success: function(infoRes) {
						_this.encryptedData = infoRes.encryptedData
						_this.iv = infoRes.iv
						_this.nickName = infoRes.userInfo.nickName; //昵称
						_this.avatarUrl = infoRes.userInfo.avatarUrl; //头像
						uni.setStorageSync('isCanUse', false); //记录是否第一次授权 false:表示不是第一次授权
						_this.updateUserInfo();
					},
					fail: function(fail) {
						console.log("fail:", fail)
					}
				});
			},
		}
	}
</script>

<style>

</style>
