/**
 * React技术栈，尤其是React和Redux的相关知识。建议先从这了解下：https://segmentfault.com/a/1190000009879742，
 */

/**
 * redux模块组成要素
 * 
 * 1. 设定本模块初始状态
 * 2. 提供reducer函数：作用是根据当前状态和action，计算返回新状态。这个要export，供reducer组件合并所有模块的状态所需
 * 3. 提供action creator函数：作用是生成reducer函数所需的action对象（异步操作则返回接受dispatch参数的函数）
 * 4. 提供外部调用函数：这个要export，供业务组件操纵本模块的状态
 */
import axios from 'axios'

// action type
const USER_LIST = 'USER_LIST'

// init state
const initState = {
    userlist: []
}

// reducer
export function chatuser(state = initState, action) {
    switch(action.type) {
        case USER_LIST:
            return {...state, userlist: action.payload}
        default:
            return state
    }
}

// action creater
function userList(data) {
    return { type: USER_LIST, payload: data }
}

// 导出外部调用函数
export function getUserList(type) {
    return dispatch=>{
        axios.get('/user/list?type=' + type)
            .then(res=>{
                if (res.data.code==0) {
                    dispatch(userList(res.data.data))
                }
            })
    }
}

