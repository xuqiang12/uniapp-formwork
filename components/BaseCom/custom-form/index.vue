<template>
	<view class="form-box" :style="[addStyle(formStyle)]">
		<u--form :labelPosition="labelPosition" :model="tempformData" ref="forms" labelWidth="80">
			<view class="custom-form-item" v-for="(item,i) in columns" :key="i">
				<!-- form表单 -->
				<template v-if="item.effect&&item.effect == 'form'?true:false">
					<u-form-item :required="item.rules.select||item.rules.required" :label="item.label" :prop="item.pram" :customStyle="item.itemStyle" :borderBottom="item.borderBottom!==undefined?item.borderBottom:true" :ref="item.pram">
						<view class="" v-if="item.type==='picker'" :style="item.valueStyle">
							<picker mode="selector" :range="item.data" :range-key="item.props&&item.props.label?item.props.label:'label'" @change="itemChange($event,item,tempformData)" :value="exhibitFormData['index'+item.pram]">
								<view class="flex-level-between">
									<input v-model="exhibitFormData['exhibit'+item.pram]" disabled disabledColor="#ffffff" :placeholder="'请选择'+item.label" border="none" :placeholder-style="item.placeholderStyle" placeholder-class="placeholder-class" :style="item.valueStyle?item.valueStyle:item.placeholderStyle" style="width: 100%;" />
									<u-icon slot="right" name="arrow-right"></u-icon>
								</view>
							</picker>
						</view>
						<!-- 日历 -->
						<view class="flex-level-between" v-else-if="item.type==='date'" :style="item.valueStyle" @click="showCalendar = true">
							<input v-model="tempformData[item.pram]" :placeholder="'请选择'+item.label" :placeholder-style="placeholderStyle" :style="item.valueStyle?item.valueStyle:item.placeholderStyle" placeholder-class="placeholder-class" disabled disabledColor="#ffffff" style="width: 100%;" border="none" />
							<u-icon slot="right" name="arrow-right"></u-icon>
							<u-calendar :show="showCalendar" @confirm="calendarConfirm($event,item.pram)" @close="showCalendar=false"></u-calendar>
						</view>
						<!-- uni原生 级联选择器 -->
						<view class="flex-level-between" v-else-if="item.type==='cascader'" :style="item.valueStyle">
							<uni-data-picker :value="tempformData[item.pram]" class="cascader" :border="false" :placeholder="'请选择'+item.label" :popup-title="'请选择'+item.label" :localdata="item.data" @change="itemChange($event,item,tempformData)" :map="item.props?item.props:cascadeProps" style="width: 100%;"></uni-data-picker>
							<u-icon slot="right" name="arrow-right"></u-icon>
						</view>
						<!-- 自定义 级联选择器  很垃圾 很多bug  能不用就不用-->
					<!-- 	<view class="flex-level-between" v-else-if="item.type==='tertiaryCascader'" :style="item.valueStyle" @click="getPickerData(tempformData[item.pram],item.pram)">
							<u--input v-model="pickerlabel" disabled disabledColor="#ffffff" :placeholder="'请选择'+item.label" border="none"></u--input>
							<u-icon slot="right" name="arrow-right"></u-icon>
							<x-uni-picker :ref="item.pram+'level'" :pickerValueDefault="pickerValueDefault" v-if="columns[i].data.length>0" :treeData="columns[i].data" @onConfirm="tertiaryConfirm($event,columns[i].pram)" themeColor='#007AFF'></x-uni-picker>
						</view> -->
						<!-- 文本框textarea 解决多个input切换时软键盘消失 -->
						<view class="" v-else-if="item.type==='textarea'" :style="item.valueStyle">
							<slot v-if="$slots[`content-${item['pram']}`]" name="content-{{item.$orig['pram']}}" />
							<textarea v-else :placeholder-style="placeholderStyle" v-model="tempformData[item.pram]" @input="itemChange(item.pram,tempformData)" auto-height border="none" :placeholder="'请输入'+item.label" show-confirm-bar="false" hold-keyboard style="width: 100%;"></textarea>
						</view>
						<view class="" v-else :style="item.valueStyle">
							<!-- #ifdef MP -->
							<!-- 小程序 -->
							<slot v-if="$slots[`content-${item['pram']}`]" name="content-{{item.$orig['pram']}}" />
							<!-- uview的u--input赋值后dom不更新，使用原input -->
							<input v-else-if="!$slots[`content-${item['pram']}`]&&item.type==='number'" type="number" :placeholder-style="placeholderStyle" v-model="tempformData[item.pram]" @input="itemChange(item.pram,tempformData)" border="none" :placeholder="'请输入'+item.label" />
							<input v-else-if="!$slots[`content-${item['pram']}`]&&item.type==='idcard'" type="idcard" :placeholder-style="placeholderStyle" v-model="tempformData[item.pram]" @input="itemChange(item.pram,tempformData)" border="none" :placeholder="'请输入'+item.label" />
							<input v-else-if="!$slots[`content-${item['pram']}`]&&item.type==='digit'" type="digit" :placeholder-style="placeholderStyle" v-model="tempformData[item.pram]" @input="itemChange(item.pram,tempformData)" border="none" :placeholder="'请输入'+item.label" />
							<input v-else type="text" :placeholder-style="placeholderStyle" v-model="tempformData[item.pram]" @input="itemChange(item.pram,tempformData)" border="none" :placeholder="'请输入'+item.label" />
							<!-- #endif -->
							<!-- #ifndef MP -->
							<!-- 非小程序 -->
							<slot :row="tempformData" :name="item.pram">
								<u--input v-model="tempformData[item.pram]" border="none" :placeholder="'请输入'+item.label"></u--input>
							</slot>
							<!-- #endif -->
						</view>
					</u-form-item>
				</template>
				<!-- 详情展示 -->
				<template v-else-if="item.effect&&item.effect == 'exhibit'?true:false">
					<!-- 插槽item -->
					<view class="exhibit-item flex-level-between" v-if="$slots[`item-${item['pram']}`]">
						<slot name="item-{{item.$orig['pram']}}" />
					</view>
					<view v-else :style="item.itemStyle" class="exhibit-item flex-level-between">
						<view class="formlabel" v-if="item.label" :style="item.labelStyle?'width:'+labelWidth+'rpx;min-width:'+labelWidth+'rpx;'+item.labelStyle:'width:'+labelWidth+'rpx;min-width:'+labelWidth+'rpx'">
							<slot v-if="$slots[`title-${item['pram']}`]" name="title-{{item.$orig['pram']}}" />
							<text v-else>{{ item.label }}:</text>
						</view>
						<view class="formcontent" :style="item.valueStyle?'width: calc(100% - '+labelWidth+'rpx);min-width: calc(100% - '+labelWidth+'rpx);'+item.valueStyle:'width: calc(100% - '+labelWidth+'rpx);min-width: calc(100% - '+labelWidth+'rpx);'">
							<slot v-if="$slots[`content-${item['pram']}`]" name="content-{{item.$orig['pram']}}" />
							<view class="" v-else>
								<!-- 如果是按钮 -->
								<view class="" v-if="item.type==='btn'">
									<text @click="handleButton(item.btnType,tempformData)" style="color: #3c9cff;">
										{{item.pram}}
									</text>
								</view>
								<!-- 使用过滤器 -->
								<view class="" v-else-if="item.funName">
									{{ getFileter(item.funName,tempformData[item.pram] ) }}
								</view>
								<!-- 使用分隔 -->
								<view class="" v-else-if="item.type==='splice'">
									<text v-for="(spac,z) in (item.pram).split(item.spliceType&&item.spliceType.length>0?(item.spliceType.split(','))[0]:'/')" :key="z" style="margin-right:5px">
										<text v-if="item.spliceType&&item.spliceType.length>2&&z>0">{{ item.spliceType.substring(2) }}</text>
										<text v-if="item.spliceType&&item.spliceType.length<=2&&z>0">/</text>
										<text v-if="!item.spliceType&&z>0">/</text>
										{{ tempformData[spac] }}
									</text>
								</view>
								<!-- 默认展示 -->
								<view class="" v-else>
									<text>
										{{ tempformData[item['pram']] === "null"||!tempformData[item['pram']] ? "": tempformData[item['pram']] }}
									</text>
								</view>
							</view>

						</view>
					</view>
				</template>
			</view>
		</u--form>
	</view>
</template>

<script>
	/**
	 * NavBar 六院二期详情页面
	 * @description 详情组件，主要用于详情展示
	 * @property {Boolean} tempData[i].interval= [true|false] 是否在页面添加灰色间隔
	 * @property {Boolean} tempData[i].spillOver= [true|false] 是否使用溢出样式（换行展示）
	 * @property {object} tempData[i].customStyle 自定义内容字体样式
	 */
	// import { addStyle } from "@/assets/js/common.js"
	import props from './props.js'
	import { antiShake } from "@/assets/javascript/common.js";
	// import xUniPicker from '@/components/BaseCom/x-uni-picker.vue'
	export default {
		name: 'Detail',
		mixins: [props],
		components: {
			// xUniPicker
		},
		props: {
			labelWidth: { // label宽度  单位px
				type: Number,
				default: function() {
					return 150
				}
			},

		},

		data() {
			return {
				placeholderStyle: "color: #c0c4cc;font-size: 15px;",
				showCalendar: false,
				pickerValueDefault: [0, 0, 0],
				tempformData: JSON.parse(JSON.stringify(this.formData)), //小程序无法直接用v-model绑定父组件传过来的数据  只能绑定data里的数据
				defaultRules: {}, //form的rules
				pickerlabel: '',
				exhibitFormData: {},
				// 默认值
				cascadeProps: { text: 'label', value: 'value' }
			}
		},
		options: { //小程序无法使用/deep/穿透样式 需要添加options
			styleIsolation: 'shared'
		},
		computed: {
			assignFormData() { //小程序无法在生命周期获取到props
				this.columns.forEach((element, i) => {
					if (this.formData[element.pram] === undefined) {
						if (element.type === 'checkbox') {
							this.$set(this.tempformData, element.pram, [])
						} else if (element.type === 'select' && element.multipl) {
							this.$set(this.tempformData, element.pram, [])
						} else if (element.type === 'btn') {
							// console.log()
						} else {
							this.$set(this.tempformData, element.pram, '')
						}
					} else {
						this.$set(this.tempformData, element.pram, this.formData[element.pram])
						if (element.effect === 'form') {
							this.$refs.forms.clearValidate(element.pram) //赋值的时候清空验证
						}
					}
				});
			},
		},
		onLoad() {},
		created() {},
		onReady() {
			this.$nextTick(() => { // form验证
				this.columns.forEach((element, i) => {
					this.$set(this.defaultRules, element.pram, this.$validate.filter_rules({ ...element.rules, tips: element.rules && element.rules && element.rules.tips ? element.rules && element.rules.tips : element.label, value: this.tempformData[element.pram] }))
					this.$refs.forms.setRules(this.defaultRules)
				})
			});
		},
		mounted() {
			this.columns.forEach((element, i) => {
				if (this.tempformData[element.pram]) {
					if (this.columns[i].type === 'picker') { //uniapp原生picker回显需要展示下标  下拉框
						this.$set(this.exhibitFormData, 'index' + element.pram, [element.data.findIndex(item => this.tempformData[element.pram] == item.value)])
						this.$set(this.exhibitFormData, 'exhibit' + element.pram, element.data.find(item => this.tempformData[element.pram] == item.value).label)
					}
					if (this.columns[i].type === 'tertiaryCascader' && this.tempformData[element.pram].length > 0) {
						const pickerArr = this.$refs[element.pram + 'level'][0].queryIndex(this.tempformData[element.pram], "children", 'value').data
						this.pickerlabel = pickerArr.oneleveltitle.label + (pickerArr.secondleveltitle ? '-' + pickerArr.secondleveltitle.label : "") + (pickerArr.tertiarytitle ? '-' + pickerArr.tertiarytitle.label : "")
					}
				}
			})
		},
		methods: {
			handleButton(type, data) {
				this.$emit('handleButton', { type: type, data: data })
			},
			async submitForm(data) { //提交验证
				const res = await this.$refs.forms.validate()
				if (res) {
					return new Promise((resolve, reject) => {
						resolve(this.tempformData)
					}).catch(err => {
						reject()
					})
				}
			},
			getFormData() {//父组件调用，获取表单数据
				return this.tempformData
			},
			calendarConfirm(date, pram) { //uview获取日期
				this.tempformData[pram] = date[0]
				this.$refs.forms.validateField(pram)
				this.showCalendar = false
			},
			tertiaryConfirm(e, pram) {
				this.pickerlabel = e.label
				let pcikerStr = e.firstPick.value
				if (e.secondPick.value) { pcikerStr = pcikerStr + '-' + e.secondPick.value }
				if (e.thirdPick.value) { pcikerStr = pcikerStr + '-' + e.thirdPick.value }
				this.tempformData[pram] = pcikerStr.split('-')
			},
			getPickerData(data, pram) { //打开自定义三级联动
				if (data.length > 0) {
					this.pickerValueDefault = this.$refs[pram + 'level'][0].queryIndex(data, "children", 'value').index
				}
				this.$refs[pram + 'level'][0].open();
			},
			getFileter(funName, code) {
				return this.$options.filters[funName](code)
			},
			itemChange(event, itemColumns, formData) { //原参数,每条的columns数据，form数据，
				const itemlabel = itemColumns.props && itemColumns.props.label ? itemColumns.props.label : 'label'
				const itemvalue = itemColumns.props && itemColumns.props.value ? itemColumns.props.value : 'value'
				if (itemColumns.type && itemColumns.type === 'picker') { //下拉框
					this.$set(this.exhibitFormData, 'index' + itemColumns.pram, event.detail.value)
					this.$set(this.exhibitFormData, 'exhibit' + itemColumns.pram, itemColumns.data[event.detail.value][itemlabel])
					this.$set(this.tempformData, itemColumns.pram, itemColumns.data[event.detail.value][itemvalue])
					this.$refs.forms.validateField(itemColumns.pram)
				} else if (itemColumns.type && itemColumns.type === 'cascader') {
					this.tempformData[itemColumns.pram] = event.detail.value.map(item => item.value)
				}
				if (element.effect === 'form') {
					this.$refs.forms.clearValidate(itemColumns.pram) //赋值的时候清空验证
				}
				antiShake().then(res => {
					this.$emit('itemChange', itemColumns.pram, formData)
				})
			},
			assign(data, pram) { //插槽验证
				this.$set(this.tempformData, pram, data)
			}
		}
	}
</script>

<style lang="scss" scoped>
	/deep/.placeholder-class {
		color: #c0c4cc;
		font-size: 15px;
	}

	.custom-form-item {}

	.form-box {
		width: auto;

		/deep/ .u-form {
			padding: 0 0 0 20rpx;

			.u-form-item .u-form-item__body .u-form-item__body__left {
				padding: 2rpx 0;
			}
		}
	}

	.cascader {
		/deep/ .uni-data-tree-input .input-value {
			padding: 0;
			height: 48rpx;

			.arrow-area {
				display: none;
			}

			.placeholder {
				color: rgb(192, 196, 204);
				font-size: 15px;
			}

			.selected-area .selected-list {
				padding: 0;
			}
		}

	}

	.formlabel {
		color: #303133;
		font-size: 15px;
	}

	.formcontent {
		padding-left: 10rpx;
		color: #333333;
		font-size: 14px;
	}

	// .flex-level-between {
	// 	width: 100%;
	// 	// border-bottom: 2rpx solid #f3f6fd;
	// 	display: flex;
	// 	justify-content: space-between;
	// 	align-items: flex-start;
	// }

	.flex-level-between {
		width: 100%;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
	}

	// 展示区item样式
	.exhibit-item {
		margin-bottom: 12rpx;
		width: 100%;
		padding-bottom: 6rpx;
		line-height: 44rpx;
		padding: 10rpx 0;
		word-wrap: break-word;
		font-size: 30rpx;
	}
</style>
