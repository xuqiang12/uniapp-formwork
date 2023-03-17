// import validate from './validate.js'

/**
 * @description 防抖
 * @param {number} time 需要转换的目标
 * @example antiShake(防抖间隔时间)
 */
let debounce = null
export function antiShake(time = 500) { //防抖  // 默认0.2秒后执行事件
	return new Promise((resolve) => {
		if (debounce !== null) clearTimeout(debounce); // 每当用户输入的时候把前一个 setTimeout clear 掉
		debounce = setTimeout(() => { // 然后又创建一个新的 setTimeout, 这样就能保证用户输入的 时间间隔内如果还有字符输入的话，就不会执行事件函数
			resolve(true)
		}, time)
	})
};
/**
 * @description 
 * @param {number} time 需要转换的目标
 * @example antiShake(防抖间隔时间)
 */
// let debounce = null
// export function antiShake(time=500) { //防抖  // 默认0.2秒后执行事件
// 	return new Promise((resolve) => {
// 		if (debounce !== null) clearTimeout(debounce); // 每当用户输入的时候把前一个 setTimeout clear 掉
// 		debounce = setTimeout(() => { // 然后又创建一个新的 setTimeout, 这样就能保证用户输入的 时间间隔内如果还有字符输入的话，就不会执行事件函数
// 			resolve(true)
// 		}, time)
// 	})
// };
/**
 * @description 样式转换
 * 对象转字符串，或者字符串转对象
 * @param {object | string} customStyle 需要转换的目标
 * @param {String} target 转换的目的，object-转为对象，string-转为字符串
 * @returns {object|string}
 */
export function addStyle(customStyle, target = 'object') {
	// 字符串转字符串，对象转对象情形，直接返回
	if (empty(customStyle) || typeof(customStyle) === 'object' && target === 'object' || target === 'string' &&
		typeof(customStyle) === 'string') {
		return customStyle
	}
	// 字符串转对象
	if (target === 'object') {
		// 去除字符串样式中的两端空格(中间的空格不能去掉，比如padding: 20px 0如果去掉了就错了)，空格是无用的
		customStyle = trim(customStyle)
		// 根据";"将字符串转为数组形式
		const styleArray = customStyle.split(';')
		const style = {}
		// 历遍数组，拼接成对象
		for (let i = 0; i < styleArray.length; i++) {
			// 'font-size:20px;color:red;'，如此最后字符串有";"的话，会导致styleArray最后一个元素为空字符串，这里需要过滤
			if (styleArray[i]) {
				const item = styleArray[i].split(':')
				style[trim(item[0])] = trim(item[1])
			}
		}
		return style
	}
	// 这里为对象转字符串形式
	let string = ''
	for (const i in customStyle) {
		// 驼峰转为中划线的形式，否则css内联样式，无法识别驼峰样式属性名
		const key = i.replace(/([A-Z])/g, '-$1').toLowerCase()
		string += `${key}:${customStyle[i]};`
	}
	// 去除两端空格
	return trim(string)
};
/**
 * @description 去除空格
 * @param String str 需要去除空格的字符串
 * @param String pos both(左右)|left|right|all 默认both
 */
function trim(str, pos = 'both') {
	str = String(str)
	if (pos == 'both') {
		return str.replace(/^\s+|\s+$/g, '')
	}
	if (pos == 'left') {
		return str.replace(/^\s*/, '')
	}
	if (pos == 'right') {
		return str.replace(/(\s*$)/g, '')
	}
	if (pos == 'all') {
		return str.replace(/\s+/g, '')
	}
	return str
}
/**
 * 判断是否为空
 */
function empty(value) {
	switch (typeof value) {
		case 'undefined':
			return true
		case 'string':
			if (value.replace(/(^[ \t\n\r]*)|([ \t\n\r]*$)/g, '').length == 0) return true
			break
		case 'boolean':
			if (!value) return true
			break
		case 'number':
			if (value === 0 || isNaN(value)) return true
			break
		case 'object':
			if (value === null || value.length === 0) return true
			for (const i in value) {
				return false
			}
			return true
	}
	return false
}
