/**
 * 使用方法
 * 1.在main.js中引入
 * import $validate from './assets/js/validate'
 * Vue.prototype.$validate = $validate
 * 2.页面使用 this.$validate.方法名(参数)
 */
export default {
	filter_rules(item) {
		/** @description element form表单验证
		 * @property {funtion} filter_rules   判断验证方法
		 * @property {Boolean} required = [true|false]    是否是必填项
		 * @property {String} type = [blank(判断不能为空或者空格)|money(验证两位小数金额)|mobile(验证手机号)|email(验证邮箱)|num(验证正整数)]
		 * @property {String} tips   提示词
		 * @property {Boolean} select = [true|false]    是否是必选项
		 * type的验证方式 :rules="$validate.filter_rules({required:true,type:'blank',value:patrolTask.patrolId,tips:'巡更任务'})"
		 * select的验证方式 :rules="$validate.filter_rules({select:true,tips:'巡更路线'})"
		 */
		const rules = [];
		if (item.required) {
			let types = ""
			rules.push({
				required: true,
				message: "请输入" + item.tips,
				trigger: ['change', 'blur'],
				validator: (rule, value, callback) => {
					return !uni.$u.test.isEmpty(value);
				},
			})
		}
		if (item.select) {
			rules.push({
				required: true,
				message: "请选择" + item.tips,
				trigger: ['change', 'blur'],
				type: "number"
			});
		}
		if (item.cascader) {
			rules.push({
				type: 'array',
				min: 1,
				required: true,
				message: "请选择" + item.tips,
				trigger: ['change']
			});
		}
		if (item.picker) {
			// rules.push({format: 'array'})
			rules.push({
				format: 'array',
				validateFunction: function(rule, value, data, callback) {
					if (!item.value || item.value.length < 1) {
						callback("请输入数字类型的" + item.tips);
					}
					return true
					//  	// 异步需要返回 Promise 对象
					//  							return new Promise((resolve, reject) => {
					// 						console(123456)
					//  								setTimeout(() => {
					//  									if (!item.value||item.value.length<1) {
					// 								reject(new Error('年龄必须大于十岁'))
					//  										// 通过返回 resolve
					//  										// resolve()
					//  									} else {
					// 								resolve()
					//  										// 不通过返回 reject(new Error('错误信息'))
					//  										// reject(new Error('年龄必须大于十岁'))
					//  									}
					//  								}, 2000)
					//  							})
				}
			});
			// format: 'array'
			// rules.push({ format: 'array', errorMessage: "请选择" + item.tips });
			// rules.push({ required: true, errorMessage: "请选择" + item.tips });
		}
		if (item.maxLength) {
			rules.push({
				min: 1,
				max: item.maxLength,
				message: "最多输入" + item.maxLength + "个字符!",
				trigger: "blur"
			});
		}
		if (item.min && item.max) {
			rules.push({
				min: item.min,
				max: item.max,
				message: item.tips + "长度在" + item.min + "位至" + item.max + "位之间!",
				trigger: "blur"
			});
		}
		if (item.type) {
			const type = item.type;
			switch (type) {
				case "num":
					rules.push({
						trigger: "blur",
						validator: function(rule, value, callback) {
							if (!/(^[0-9]\d*$)/.test(item.value)) {
								callback(new Error("请输入数字类型的" + item.tips));
							} else {
								callback();
							}
						}
					});
					break;
				case "email":
					rules.push({
						trigger: "blur",
						validator: function(rule, value, callback) {
							if (
								!/^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/.test(
									item.value
								)
							) {
								callback(new Error("请输入正确的邮箱"));
							} else {
								callback();
							}
						}
					});
					break;
				case "mobile": // 验证手机号
					rules.push({
						trigger: "blur",
						validator: function(rule, value, callback) {
							if (!/^1[3456789]\d{9}$/.test(value)) {
								callback(new Error("请输入正确的手机号"));
							} else {
								callback();
							}
						}
					});
					break;
				case "UDI": // 验证手机号
					rules.push({
						trigger: "blur",
						validator: function(rule, value, callback) {
							if (!/^[0-9()]{30}$/.test(item.value)) {
								callback(
									new Error("UDI只能由数字和英文格式的括号组成的30位字符")
								);
							} else {
								callback();
							}
						}
					});
					break;
				case "id": // 验证身份证号
					rules.push({
						validator: function(rule, value, callback) {
							if (
								!/^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/.test(
									item.value
								)
							) {
								callback(new Error("请输入正确的身份证号"));
							} else {
								callback();
							}
						},
						trigger: "blur,change"
					});
					break;
				case "chinese": // 验证汉字类型
					rules.push({
						trigger: ["blur", "change"],
						validator: function(rule, value, callback) {
							if (/[^\u4E00-\u9FA5]/g.test(item.value)) {
								callback(new Error("请输入汉字类型" + item.tips));
							} else {
								callback();
							}
						}
					});
					break;
				case "noChinese": // 验证汉字类型
					rules.push({
						trigger: ["blur", "change"],
						validator: function(rule, value, callback) {
							if (/[\u4E00-\u9FA5]/g.test(item.value)) {
								callback(new Error(item.tips + "不能包含汉字"));
							} else {
								callback();
							}
						}
					});
					break;
				case "money": // 验证两位小数金额
					rules.push({
						trigger: ["blur", "change"],
						validator: function(rule, value, callback) {
							if (
								!/(^(([1-9]([0-9]+)?)|(0{1}))(\.[0-9]{1,2})?$)/.test(item.value)
							) {
								callback(new Error("请输入两位小数的" + item.tips));
							} else {
								callback();
							}
						}
					});
					break;
				case "blank": // 验证空格为空
					rules.push({
						trigger: "blur",
						validator: function(rule, value, callback) {
							if (item.value !== undefined && item.value.trim() === "") {
								callback(new Error("请输入非空格数据"));
							} else {
								callback();
							}
						}
					});
					break;
				default:
					rules.push({});
					break;
			}
		}
		return rules;
	},
	timeverify(type, data) {
		/** @description 时间框验证
		 * @property {funtion} timeverify(type,data)   判断验证方法
		 *  type=0 只能选择大于等于当前时间
		 *  type=1 只能选择小于等于当前时间
		 *  type=3 data!="" 只能选择d等于当前时间
		 *  type=0 只能选择大于等于当前时间
		 */
		var validityPickerOptions = {};
		if (type === 0) {
			validityPickerOptions = {
				disabledDate: time => {
					return time.getTime() < Date.now() - 8.64e7;
				}
			};
		} else if (type === 1) {
			validityPickerOptions = {
				disabledDate: time => {
					return time.getTime() > Date.now();
				}
			};
		}
		return validityPickerOptions;
	},
	formatDate(fmt) {
		/** @description 格式化当前日期
		 * @property {funtion} formatDate(fmt)   判断验证方法
		 *  fmt="yyyy-MM-dd hh:mm:ss"
		 */
		var myDate = new Date();
		var o = {
			"M+": myDate.getMonth() + 1, // 月份
			"d+": myDate.getDate(), // 日
			"h+": myDate.getHours(), // 小时
			"m+": myDate.getMinutes(), // 分
			"s+": myDate.getSeconds(), // 秒
			"q+": Math.floor((myDate.getMonth() + 3) / 3), // 季度
			S: myDate.getMilliseconds() // 毫秒
		};
		if (/(y+)/.test(fmt)) {
			fmt = fmt.replace(
				RegExp.$1,
				(myDate.getFullYear() + "").substr(4 - RegExp.$1.length)
			);
		}
		for (var k in o) {
			if (new RegExp("(" + k + ")").test(fmt))
				fmt = fmt.replace(
					RegExp.$1,
					RegExp.$1.length === 1 ?
					o[k] :
					("00" + o[k]).substr(("" + o[k]).length)
				);
		}
		return fmt;
	},
};
