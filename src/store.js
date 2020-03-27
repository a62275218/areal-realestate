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
    showFilter: false,
    tipShow:false,
    activeIndex:0
  },
  actions: {
    userLogin: async ({ state, commit }, payload) => {
      const { account, password } = payload
      if (!account || !password) {
        mpvue.showToast({
          title: "请输入用户名和密码",
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
    getUserHouse: async ({ state }, payload) => {
      const { id,callback } = payload
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
        data: {}
      })
      console.log(staffList)
      if (staffList) {
        state.staffList = staffList
      }
    }
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
    toggleFilterList:state=>{
      state.showFilter = !state.showFilter
    },
    searchChange:(state,index)=>{
     state.activeIndex = index
    },
    showTip:state=>{
      state.tipShow = true
    }
  },
  plugins: debug ? [createLogger()] : []
})

export default store
