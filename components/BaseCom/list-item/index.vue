<template>
	<!-- //左侧缩略图大小五行plus大图 四行medium中等、三行small小型、两行mini超小  -->
	<view :style="itemstyle" class="main-module" :class="[thumbnail_layout,itemLayout]">
		<view class="item-header">
			<slot name="item-top"></slot>
		</view>
		<view :class="item_layout">
			<view class="item-icon" :style="thumbBox" @tap="itemTap(sonItemData)" v-if="thumbnail.pram">
				<slot name="thumbnail">
					<uni-icons v-if="thumbnail.type==='icon'" :type="eval(thumbnail.pram,sonItemData)" :color="thumbnail.color" :size="thumbnail.size" class="iconCenter" :style="thumbnail.style" />
					<uni-icons v-if="thumbnail.type==='customIcon'" custom-prefix="iconfont" :type="eval(thumbnail.pram,sonItemData)" :color="thumbnail.color" :size="thumbnail.size" class="iconCenter" />
					<image v-else :src="imageUrl" :style="thumbnail.style" class="thumbnail_img"></image>
				</slot>
			</view>
			<view class="item-content" :class="item_content_layout">
				<view v-for="(itemRow,i) in columns" :key="i">
					<view class="" v-if="i===0" @tap="itemTap(sonItemData)">
						<slot name="label1">
							<text v-if="itemRow.label" class="item-label" :style="itemRow.labelStyle">{{itemRow.label}}:</text>
						</slot>
						<slot name="value1">
							<item-content :itemColumns='itemRow' :contentData="sonItemData" class="item-value"></item-content>
						</slot>
					</view>
					<view class="flex-start" v-if="i===1">
						<slot name="label2">
							<text v-if="itemRow.label" class="item-label" :style="itemRow.labelStyle">{{itemRow.label}}:</text>
						</slot>
						<slot name="value2">
							<item-content :itemColumns='itemRow' :contentData="sonItemData" class="item-value"></item-content>
						</slot>
					</view>
					<view class="flex-start" v-if="i===2">
						<slot name="label3">
							<text v-if="itemRow.label" class="item-label" :style="itemRow.labelStyle">{{itemRow.label}}:</text>
						</slot>
						<slot name="value3">
							<item-content :itemColumns='itemRow' :contentData="sonItemData" class="item-value"></item-content>
						</slot>
					</view>
					<view class="flex-start" v-if="i===3">
						<slot name="label4">
							<text v-if="itemRow.label" class="item-label" :style="itemRow.labelStyle">{{itemRow.label}}:</text>
						</slot>
						<slot name="value4">
							<item-content :itemColumns='itemRow' :contentData="sonItemData" class="item-value"></item-content>
						</slot>
					</view>
					<view class="flex-start" v-if="i===4">
						<slot name="label5">
							<text v-if="itemRow.label" class="item-label" :style="itemRow.labelStyle">{{itemRow.label}}:</text>
						</slot>
						<slot name="value5">
							<item-content :itemColumns='itemRow' :contentData="sonItemData" class="item-value"></item-content>
						</slot>
					</view>
				</view>
			</view>
			<view v-if="operate.pram" class="item-operate">
				<slot name="operation" :row="item">
					<uni-icons v-if="operate.icon" @click.stop="customClick(sonItemData)" :type="eval(operate.pram,sonItemData)" :color="operate.color" :size="operate.size?operate.size:'mini'" :style="operate.style" />
					<uni-icons v-if="operate.customIcon" @click.stop="customClick(sonItemData)" :type="eval(operate.pram,sonItemData)" :color="operate.color" :size="operate.size" :style="operate.style" custom-prefix="iconfont" />
					<button v-else @click.stop="customClick(sonItemData)" class="mini-btn" :type="operate.btnType?operate.btnType:'primary'" :size="operate.size" :style="operate.style">{{operate.pram}}</button>
				</slot>
			</view>
		</view>
		<view class="item-header">
			<slot name="item-bottom"></slot>
		</view>
	</view>
</template>

<script>
	import props from './props.js'
	import itemContent from './item-content.vue'
	import { Interpreter } from "eval5";
	export default {
		options: {
			multipleSlots: true // 在组件定义时的选项中启用多slot支持
		},
		mixins: [props],
		components: {
			itemContent
		},
		props: {
			itemData: {
				type: Object,
				default: function() {
					return {}
				}
			},
			thumbnail: { //缩略图参数  thumbnail: {type:'类型[image|icon|customIcon]',pram:"[图片绑定参数|图标绑定的类名]", color:"图标颜色",size:"图标大小",style:"[图片样式|图标样式]"},
				type: Object,
				default: function() {
					return {}
				}
			},
			thumbSize: { //左侧缩略图大小plus大图 medium中等、small小型、mini超小
				type: String,
				default: function() {
					return 'plus'
				}
			},
			/* 操作 */
			operate: { //缩略图参数  thumbnail: {type:'类型[button|icon|customIcon]',pram:"[按钮名称|图标绑定的类名]", color:"图标颜色",size:"图标大小",style:"[图片样式|图标样式]"},
				type: Object,
				default: function() {
					return {}
				}
			},
			operatCustomIcon: {
				type: String,
				default: function() {
					return ''
				}
			},
			columns: {
				type: Array,
				default: function() {
					return []
				}
			},
			itemstyle: {
				type: String,
				default: function() {
					return ''
				}
			},

		},
		computed: {
			thumbnail_layout() { //缩略图样式
				return !this.thumbSize ? 'single-line-thumb' : this.thumbSize === 'mini' ? 'mini-thumb' : this.thumbSize === 'small' ? 'small-thumb' : this.thumbSize === 'medium' ? 'medium-thumb' : 'plus-thumb'
			},
			item_layout() { //list-item排版样式类名
				// return this.operatIcon || this.operatBtn || this.operatCustomIcon ? 'flex-between' : 'flex-start'
				return this.operate.pram ? 'flex-between' : 'flex-start'
			},
			item_content_layout() { //中部内容的样式
				return !(this.operate.pram) && !(this.thumbnail.pram) ? 'content-item-width1' : !(this.thumbnail.pram) ? 'content-item-width2' : !(this.operate.pram) ? 'content-item-width3' : ''
			},
			imageUrl() { //判断是否包含http
				if (this.thumbnail.pram && JSON.stringify(this.sonItemData) !== '{}') return this.sonItemData[this.thumbnail.pram].indexOf('/upload/') !== -1 ? this.$baseUrl + this.sonItemData[this.thumbnail.pram] : this.sonItemData[this.thumbnail.pram]
			},
			sonItemData() {
				return this.itemData
			},

		},
		data() {
			return {
				
			}
		},
		mounted() {},
		methods: {
			eval(condition, row) {
				if (row) {
					var pattern = new RegExp("[<>=+-]");
					const interpreter = new Interpreter(window);
					interpreter.evaluate("var sonItemData=" + JSON.stringify(row));
					return interpreter.evaluate(pattern.test(condition) ? condition : JSON.stringify(condition));
				}
			},
			itemTap(data) {
				this.$emit('itemTap', data)
			},
			customClick(data) {
				this.$emit('customClick', data)
			},
		}
	}
</script>

<style lang="scss" scoped>
	view {
		height: auto;
		line-height: 24.5rpx;
	}

	.thumbnail_img {
		//缩略图图片
		width: calc(100% - 30rpx);
		height: calc(100% - 30rpx);
		border-radius: 8px
	}

	.item-header {
		//单条头部和底部插槽
		margin: 0 15rpx;
		font-size: 28rpx;
	}

	.item-operate {
		//单条操作
		width: 148rpx;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.flex-start {
		//从左到右排列
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		align-items: center;
	}


	// 左侧缩略图大小样式
	.single-line-thumb {//缩略图一行
		.item-icon {
			width: 60rpx;
			height: 60rpx;
		}

		.item-content {
			height: 60rpx;
			width: calc(100% - 210rpx);
			max-height: 60rpx;
		}
	}

	.mini-thumb {//缩略图二行
		.item-icon {
			width: 100rpx;
			height: 100rpx;
		}

		.item-content {
			height: 80rpx;
			width: calc(100% - 250rpx);
			max-height: 80rpx;
		}
	}

	.small-thumb {//缩略图三行
		.item-icon {
			width: 130rpx;
			height: 130rpx;
		}

		.item-content {
			height: 130rpx;
			width: calc(100% - 280rpx);
			max-height: 130rpx;
		}
	}

	.medium-thumb {//缩略图四行
		.item-icon {
			width: 150rpx;
			height: 150rpx;
		}

		.item-content {
			height: 150rpx;
			width: calc(100% - 300rpx);
			max-height: 150rpx;
		}
	}

	.plus-thumb {//缩略图五行
		.item-icon {
			width: 170rpx;
			height: 170rpx;
		}

		.item-content {
			height: 170rpx;
			width: calc(100% - 308rpx);
			max-height: 170rpx;
		}
	}

	.content-item-width1 {
		width: auto;
	}

	.content-item-width2 {
		width: calc(100% - 148rpx) !important;
	}

	.content-item-width3 {
		width: calc(100% - 160rpx) !important;
	}

	.mini-btn {
		background-color: #3E8BF3;
		margin: 0;
		line-height: 25px;
		height: 25px;
		font-size: 12px;
		border-radius: 50px;
		padding: 0 15px;

	}

	.main-module {
		width: 100%;
		padding: 10rpx 0rpx;
		align-items: center;
		background: #FFF;
		border-radius: 32rpx;
		margin: 20rpx 0 20rpx 0;
		// padding: 0 2%;
	}

	.item-icon {
		width: 160rpx;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.item-content {
		display: flex;
		flex-direction: column;
		justify-content: space-evenly;
		.item-label {
			font-size: 26rpx;
			color: #666;
			margin-right: 10rpx;
		}

		.item-value {
			font-size: 26rpx;
			color: #666;
		}
	}

	.iconCenter {
		height: 100%;
		display: flex;
		align-items: center;
	}
</style>
