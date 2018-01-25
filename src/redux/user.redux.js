/**
 * redux模块组成要素
 * 
 * 1. 设定本模块初始状态
 * 2. 提供reducer函数：作用是根据当前状态和action，计算返回新状态。这个要export，供reducer组件合并所有模块的状态所需
 * 3. 提供action creator函数：作用是生成reducer函数所需的action对象（异步操作则返回接受dispatch参数的函数）
 * 4. 提供外部调用函数：这个要export，供业务组件操纵本模块的状态
 */
import axios from 'axios'
import { getRedirectPath } from '../util'

const AUTH_SUCCESS = 'AUTH_SUCCESS'
const ERROR_MSG = 'ERROR_MSG'
const LOAD_DATA = 'LOAD_DATA'
const LOGOUT = 'LOGOUT'

// 初始状态
const initState = {
    redirectTo: '',
    msg: '',
    user: '',
    type: ''
}

// reducer函数
export function user(state = initState, action) {
    switch(action.type) {
        case AUTH_SUCCESS:
            return { ...state, msg: '', redirectTo: getRedirectPath(action.payload), ...action.payload }
        case LOAD_DATA:
            return { ...state, ...action.payload }
        case ERROR_MSG:
            return { ...state, isAuth: false, msg: action.msg }
        case LOGOUT:
            return { ...initState, redirectTo: '/login'}
        default:
            return state
    }
}

// action creator
function authSuccess(obj) {
    const { pwd, ...data } = obj
    return { type: AUTH_SUCCESS, payload: data }
}

function errorMsg(msg) {
    return { msg, type: ERROR_MSG }
}

export function loadData(userinfo) {
    return { type: LOAD_DATA, payload: userinfo}
}

export function register({user, pwd, repeatpwd, type}) {
    if (!user || !pwd || !type) {
        return errorMsg('用户名密码必须输入')
    }
    if (pwd !== repeatpwd) {
        return errorMsg('密码和确认密码不同')
    }
    return dispatch => {
        axios.post('/user/register', {user, pwd, type})
        .then(res => {
            if (res.status == 200 && res.data.code === 0) {
                dispatch(authSuccess({user, pwd, type}))
            } else {
                dispatch(errorMsg(res.data.msg))
            }
        })
    }
}

export function login({user, pwd}) {
    if (!user || !pwd) {
        return errorMsg('用户名密码必须输入')
    }
    return dispatch => {
        axios.post('/user/login', {user, pwd})
        .then(res => {
            if (res.status == 200 && res.data.code === 0) {
                dispatch(authSuccess(res.data.data))
            } else {
                dispatch(errorMsg(res.data.msg))
            }
        })
    }
}

export function update(data) {
    return dispatch => {
        axios.post('/user/update', data)
        .then(res => {
            if (res.status == 200 && res.data.code === 0) {
                dispatch(authSuccess(res.data.data))
            } else {
                dispatch(errorMsg(res.data.msg))
            }
        })
    }
}

export function logoutSubmit() {
    return { type : LOGOUT }
}
