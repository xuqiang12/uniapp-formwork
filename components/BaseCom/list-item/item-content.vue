<template>
	<view class="">
		<text v-if="itemColumns.type==='splice'" class="item-value">
			<text v-for="(spac,z) in (itemColumns.pram).split(itemColumns.spliceType&&itemColumns.spliceType.length>0?(itemColumns.spliceType.split(','))[0]:'/')" :key="z" style="margin-right:5px">
				<text v-if="itemColumns.spliceType&&itemColumns.spliceType.length>2&&z>0">{{ itemColumns.spliceType.substring(2) }}</text>
				<text v-if="itemColumns.spliceType&&itemColumns.spliceType.length<=2&&z>0">/</text>
				<text v-if="!itemColumns.spliceType&&z>0">/</text>
				{{ contentData[spac] }}
			</text>
		</text>
		<text v-else class="item-value" :style="itemColumns.valueStyle">{{contentData[itemColumns.pram]}}</text>
	</view>
</template>

<script>
	// import { Interpreter } from "eval5";
	export default {
		options: {
			multipleSlots: true // 在组件定义时的选项中启用多slot支持
		},
		props: {
			itemColumns: {
				type: Object,
				default: function() {
					return {}
				}
			},
			contentData: {
				type: Object,
				default: function() {
					return {}
				}
			},
		},
		computed: {

		},
		data() {
			return {

			}
		},
		mounted() {},
		methods: {}
	}
</script>

<style lang="scss" scoped>

</style>
