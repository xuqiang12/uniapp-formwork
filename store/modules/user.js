import { login, getInfo } from '@/api/login.js'
const state = {
	token: uni.getStorageSync("token"),
}

const mutations = {
	SET_TOKEN: (state, token) => {
		state.token = token
	},
}

const actions = {
	login({ commit }, userInfo) {
		const { username, password } = userInfo
		return new Promise((resolve, reject) => {
			login({ username: username.trim(), password: password }).then(response => {
				commit('SET_TOKEN', response.token)
				uni.setStorageSync("token", response.token);
				resolve(response)
			}).catch(error => {
				reject(error)
			})
		})
	},
}

export default {
	namespaced: true,
	state,
	mutations,
	actions
}
