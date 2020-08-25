import Vue from 'vue'
import Vuex from 'vuex'
import createLogger from 'vuex/dist/logger'
import { request, getIn } from '@/utils'
import md5 from 'md5'

const debug = process.env.NODE_ENV !== 'production'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    userInfo: false,
    houseList: [],
    staffList: [],
    userStaff: [],
    showFilter: false,
    tipShow: false,
    activeIndex: 0,
    navBarHeight: 0
  },
  actions: {
    userLogin: async ({ state, commit }, payload) => {
      const { account, password } = payload
      if (!account || !password) {
        mpvue.showToast({
          title: "请输入账号和密码",
          icon: "none"
        });
        return;
      }
      const userInfo = await request("loginUser", {
        data: {
          username: account,
          password: md5(password)
        },
        successMsg: "登录成功",
        errorMsg: "用户名或密码错误"
      });
      if (userInfo) {
        commit('updateUser', userInfo)
      }
    },
    fetchUserInfo: async ({ state, commit }, payload) => {
      const { id } = payload;
      const userInfo = await request("fetchUserByUserId", {
        data: { id },
        hideLoading: true
      })
      if (userInfo) {
        if (userInfo.status === '关闭') {
          mpvue.showModal({
            title: '您的账户已被关闭',
            content: '感谢您一直以来的支持，很遗憾看到您离开澳睿服务，有可能我们还有做得不够好的地方，希望能有机会让您看到我们的进步',
            complete: () => {
              commit('userLogout', userInfo)
            }
          })
          return
        }
        commit('updateUser', userInfo)
      }
    },
    setNavbarHeight: async ({ state }) => {
      let systemInfo = wx.getSystemInfoSync()
      let platformReg = /ios/i;
      state.titleBarHeight = platformReg.test(systemInfo.platform) ? 44 : 48;
      state.statusBarHeight = systemInfo.statusBarHeight;
    },
    getUserHouse: async ({ state }, payload) => {
      const { id, callback } = payload
      const houseList = await request("fetchUserHouseById", {
        data: {
          id
        }
      })
      if (houseList) {
        state.houseList = houseList
        callback && callback()
      }
    },
    fetchAllStaff: async ({ state }) => {
      const staffList = await request("fetchstaffList", {
        data: {
        }
      })
      if (staffList) {
        state.staffList = staffList
      }
    },
    fetchUserStaff: async ({ state }) => {
      const userId = getIn(state, 'userInfo', 'id')
      if (!userId) {
        return
      }
      const staffList = await request("fetchstaffList", {
        data: {
          userId
        }
      })
      if (staffList) {
        state.userStaff = staffList
      }
    },
  },
  mutations: {
    retriveUser: (state) => {
      const userInfo = mpvue.getStorageSync('userInfo')
      if (userInfo) {
        state.userInfo = userInfo;
      }
    },
    updateUser: (state, newUser) => {
      state.userInfo = newUser;
      mpvue.setStorageSync('userInfo', newUser)
    },
    userLogout: state => {
      state.userInfo = false;
      mpvue.removeStorageSync('userInfo')
    },
    toggleFilterList: state => {
      state.showFilter = !state.showFilter
    },
    searchChange: (state, index) => {
      console.log(state)
      state.activeIndex = index
    },
    showTip: state => {
      state.tipShow = true
    }
  },
  plugins: debug ? [createLogger()] : []
})

export default store
