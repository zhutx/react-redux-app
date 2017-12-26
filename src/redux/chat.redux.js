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
    unread: 0
}

// reducer
export function chat(state = initState, action) {
    switch (action.type) {
        case MSG_LIST:
            return {...state, chatmsg: action.payload, unread: action.payload.filter(v=>!v.read).length}
        case MSG_RECV:
            return {...state, chatmsg: [...state.chatmsg, action.payload], unread: state.unread+1}
        case MSG_READ:
        default:
            return state
    }
}

// action creator
function msgList(msgs) {
    return { type: MSG_LIST, payload: msgs }
}

function msgRecv(msg) {
    return { type: MSG_RECV, payload: msg }
}

export function recvMsg() {
    return dispatch => {
        socket.on('recvmsg', function(data) {
            console.log('recevmsg', data)
            dispatch(msgRecv(data))
        })
    }
}

export function getMsgList () {
    return dispatch => {
        axios.get('/user/getmsglist')
            .then(res => {
                if (res.status == 200 && res.data.code == 0) {
                    dispatch(msgList(res.data.msgs))
                }
            })
    }
}

export function sendMsg({from ,to, msg}) {
    return dispatch => {
        socket.emit('sendmsg', {from, to, msg})
    }
}