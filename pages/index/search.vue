<template>
	<loading-page>
		<view class="" style="padding: 20rpx;">
			<!-- <view class="flex-level-left" @click="search()"> -->
			<u-input customStyle="height: 18px;" placeholder="请输入内容" prefixIcon="search" border="surround" shape='circle'>
				<template slot="suffix">
					<u-button @tap="search()" text="搜索" type="success" size="mini" shape="circle" customStyle="height: 50rpx;"></u-button>
				</template>
			</u-input>
			<view class="flex-level-between" style="margin: 25rpx 0;">
				<view class="test">历史搜索</view>
				<view class="test1">历史搜索</view>
				<view>历史搜索</view>
				<!-- <view class="test">历史搜索上海市</view> -->
				<u-icon name="trash" size='20'></u-icon>
			</view>
			<!-- </view> -->
		</view>
	</loading-page>
</template>

<script>
	export default {
		data() {
			return {
				title: 'Hello'
			}
		},
		onLoad() {

		},
		methods: {

		}
	}
</script>

<style>
    .test {
     /*   font-family: 思源黑体;
        margin-left: 20rpx; */
    }

</style>
