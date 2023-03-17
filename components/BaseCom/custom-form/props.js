import {  addStyle } from "@/assets/javascript/common.js";
export default {
	props: {
		formData: { //表单数据对象
			type: Object,
			default: function() {
				return {}
			}
		},
		columns: { //表单域提示的文字
			type: Array,
			default: function() {
				return []
			}
		},
		labelPosition: { //表单域提示文字的位置
			type: String,
			default: function() {
				return 'left'
			}
		},
		formStyle: { //表单最外层盒子样式
			type: [String, Object],
			default: function() {
				return ''
			}
		},
		// 图片地址，Array<String>|Array<Object>形式
		// urls: {
		//     type: Array,
		//     default: uni.$u.props.album.urls
		// },

	},
	methods: {
		addStyle(formStyle) {
			return addStyle(formStyle)
		},
		ternaryOperator(item,pram){
			
		},
	}
}
