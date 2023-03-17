import { addStyle } from "@/assets/js/common.js";
export default {
	props: {
		image: {
			/* 缩略图 */
			type: String,
			default: function() {
				return ''
			}
		},
		icon: {
			/* 缩略图标 */
			type: String,
			default: function() {
				return ''
			}
		},
		itemLayout: { //指定list-item的样式类，注意页面或组件的style中写了scoped时，需要在类名前写/deep/
			type: String,
			default: function() {
				return ''
			}
		},
		thumbBox: { //缩略图样式
			type: String,
			default: function() {
				return ''
			}
		},

	},
	methods: {
		addStyle(formStyle) {
			return addStyle(formStyle)
		}
	}
}
