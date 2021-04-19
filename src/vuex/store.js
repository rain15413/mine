import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as getters from './getters'

Vue.use(Vuex)

// 应用初始状态
const state = {
    count: 10,
    tag: JSON.parse(sessionStorage.getItem('tag')) || {},
    tagList: JSON.parse(sessionStorage.getItem('tagList')) || [],
    collapsed: false
}

// 定义所需的 mutations
const mutations = {
    COLLAPSE (state) {
        state.collapsed = !state.collapsed
    },
    INCREMENT(state) {
        state.count++
    },
    DECREMENT(state) {
        state.count--
    },
    ADD_TAG (state, params) {
        // console.log(params)
        // console.log(11,state.tagList)
        state.tag = params
        sessionStorage.setItem('tag', JSON.stringify(params))
        // sessionStorage.setItem('tag', JSON.stringify(params))
        var bool = state.tagList.some((item, index, array) => {
            return item.name == params.name
        })
        // console.log(bool)
        // console.log(state.tagList)
        if (bool) {
            return false
        } else {
            state.tagList.push(params)
            sessionStorage.setItem('tagList', JSON.stringify(state.tagList))
        }
    },
    CLOSE_TAG (state, params) {
        state.tagList = state.tagList.filter(item => item.name !== params.name)
        sessionStorage.setItem('tagList', JSON.stringify(state.tagList))
    },
    CLEAR_TAG (state) {
        state.tag = {}
        state.tagList = []
        sessionStorage.setItem('tag', JSON.stringify(state.tag))
        sessionStorage.setItem('tagList', JSON.stringify(state.tagList))
    }
}

// 创建 store 实例
export default new Vuex.Store({
    actions,
    getters,
    state,
    mutations
})