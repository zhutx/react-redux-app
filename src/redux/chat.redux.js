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
import io from 'socket.io-client'
const socket = io('ws://localhost:9093')

// action type
// 获取聊天信息
const MSG_LIST = 'MSG_LIST'
// 读取信息
const MSG_RECV = 'MSG_RECV'
// 标识已读
const MSG_READ ='MSG_READ'

// init state
const initState = {
    chatmsg: [],
    users: {},
    unread: 0
}

// reducer，导出供reducer.js合并状态
export function chat(state = initState, action) {
    switch (action.type) {
        case MSG_LIST:
            return {...state, users: action.payload.users, chatmsg: action.payload.msgs, unread: action.payload.msgs.filter(v=>!v.read && v.to==action.payload.userid).length}
        case MSG_RECV:
            const n = action.payload.msg.to == action.payload.userid ? 1 : 0
            return {...state, chatmsg: [...state.chatmsg, action.payload.msg], unread: state.unread+n}
        case MSG_READ:
            const {from, num} = action.payload
            return {...state, chatmsg: state.chatmsg.map(v=>({...v, read: from == v.from ? true: v.read})), unread: state.unread - num}
        default:
            return state
    }
}

// action creator
function msgList(msgs, users, userid) {
    return { type: MSG_LIST, payload: { msgs, users, userid} }
}

function msgRecv(msg, userid) {
    return { type: MSG_RECV, payload: { msg, userid } }
}

function msgRead(from, userid, num) {
    return { type: MSG_READ, payload: { from, userid, num } }
}

// 导出外部调用函数
/* 
export function readMsg(from) {
    return (dispatch, getState) => {
        axios.post('/user/readmsg', {from})
            .then(res => {
                const userid = getState().user._id
                if (res.status == 200 && res.data.code == 0) {
                    dispatch(msgRead({userid, from, num: res.data.num}))
                }
            })
    }
}
 */

export function readMsg(from) {
    return async (dispatch, getState) => {
        const res = await axios.post('/user/readmsg', {from})
        const userid = getState().user._id
        if (res.status == 200 && res.data.code == 0) {
            dispatch(msgRead({userid, from, num: res.data.num}))
        }
    }
}

export function recvMsg() {
    return (dispatch, getState) => {
        socket.on('recvmsg', function(data) {
            console.log('recevmsg', data)
            const userid = getState().user._id
            dispatch(msgRecv(data, userid))
        })
    }
}

export function getMsgList () {
    return (dispatch, getState) => {
        axios.get('/user/getmsglist')
            .then(res => {
                if (res.status == 200 && res.data.code == 0) {
                    const userid = getState().user._id
                    dispatch(msgList(res.data.msgs, res.data.users, userid))
                }
            })
    }
}

export function sendMsg({from ,to, msg}) {
    return dispatch => {
        socket.emit('sendmsg', {from, to, msg})
    }
}