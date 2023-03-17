<template>
	<view class="page">
		<web-view :src="src" v-if="iOS"></web-view>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				src: '', // PDF地址
				iOS: true
			}
		},
		onLoad(data) {
			let src = data.src;
			// 判断操作系统
			uni.getSystemInfo({
				success: (res) => {
					if (res.system.includes('iOS')) { // iOS 可直接查看
						this.iOS = true;
						this.src = src;
					} else { // Android 需要下载后再打开
						this.iOS = false;
						uni.downloadFile({
							url: src,
							success: (res) => {
								const path = res.tempFilePath;
								uni.openDocument({
									filePath: path,
									fileType: 'pdf',
									success: (res) => {
										uni.navigateBack({
											delta: 1
										});
									},
									fail: (err) => {
										uni.showToast({
											title: '打开文件失败',
											icon: 'none',
											duration: 2000
										});
									}
								});
							},
							fail: (err) => {
								uni.showToast({
									title: '下载文件失败',
									icon: 'none',
									duration: 2000
								});
							}
						});
					}
				}
			});
		}
	}
</script>
