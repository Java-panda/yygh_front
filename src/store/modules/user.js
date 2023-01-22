// import { login, logout, getInfo } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
// import { resetRouter } from '@/router'

const getDefaultState = () => {
  return {
    token: getToken(),
    name: '',
    avatar: ''
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  }
}

const actions = {
  // user login
  login({ commit }) {
    const data = { 'token': 'admin' }
    setToken(data.token)// 将token存储在cookie中
    commit('SET_TOKEN', data.token)
  },

  getInfo({ commit }) {
    const data = { 'roles': ['admin'], 'name': 'admin', 'avatar': 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif' }
    // if (data.roles && data.roles.length > 0) { // 验证返回的roles是否是一个非空数组
    //   commit('SET_ROLES', data.roles)
    // }
    commit('SET_NAME', data.name)
    commit('SET_AVATAR', data.avatar)
  },

  // 登出
  logOut({ commit, state }) {
    return new Promise((resolve, reject) => {
      commit('SET_TOKEN', '')
      // commit('SET_ROLES', [])
      removeToken()
      resolve()
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      commit('RESET_STATE')
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

