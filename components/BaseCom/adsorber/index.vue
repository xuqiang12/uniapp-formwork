<!--
 * @Description: 固定顶部/底部
 * @Author: 徐强
 * @Date: 2022-07-02 23:32
-->
<template>
	<view style="width: 100%;" :style="'background:'+bgColor+';'">
		<view v-if="preventCaveIn" :style="{height:$u.addUnit (height+'rpx')}"></view>
		<view class="fixed-sticky" :style="'height:'+height+'rpx;'+'line-height:'+height+'rpx;'+fixedBottom+fixedTop">
			<slot></slot>
		</view>
	</view>
</template>

<script>
	/**
	 * 固定顶部/底部
	 * @description 用于固定顶部(搜索)或者底部(按钮)  其他盒子需要有一个外边距
	 * @property {Boolean}						preventCaveIn			//是否设置安全高度 防止塌陷
	 * @property {String | Number}				height					固定盒子高度  默认80rpx
	 * @property {String | Number}	            bottom					固定距离底部高度
	 * @property {String | Number}	            top 					固定距离顶部高度(默认0)
	 * @example <adsorber :bottom='0' :height='80'></adsorber>
	 */
	export default {
		name: 'FixedSticky',
		props: {
			preventCaveIn: { //防止塌陷
				type: Boolean,
				default: true
			},
			height: {
				type: [String, Number],
				default: '80'
			},
			top: {
				type: [String, Number],
				default: 0
			},
			bottom: {
				type: [String, Number],
				default: ''
			},
			bgColor: {
				type: String,
				default: '#FFF'
			}
		},
		data() {
			return {}
		},
		mounted() {
			var { statusBarHeight } = uni.getSystemInfoSync();
		},
		computed: {
			safeAltitude() {
				var { statusBarHeight } = uni.getSystemInfoSync();
				return (statusBarHeight * 2)
			},
			fixedBottom() {
				return JSON.stringify(this.bottom) === '0' || this.bottom === '0' ||this.bottom ? `bottom:${this.bottom}rpx` : ''
			},
			fixedTop() {
				return JSON.stringify(this.top) === '0' || this.top === '0'|| this.top? `top:${this.top}rpx` : ''
			},
		},
		methods: {}
	}
</script>

<style lang="scss" scoped>
	.fixed-sticky {
		position: fixed;
		z-index: 99;
		width: 100%;
	}
</style>
