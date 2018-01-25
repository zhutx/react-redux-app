/**
 * 主要工作：往store的state状态树上挂载用户信息，方便应用内组件的共享
 */
import React from 'react'
import axios from 'axios'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { loadData } from '../../redux/user.redux'

// @withRouter可让非路由组件在内部像路由组件一样直接使用this.props.history.push()
@withRouter
// 获取或操纵共享状态需要使用react-redux的connect
@connect(
    null, // 本组件无使用state的需求，传null就可以
    { loadData }
)
class AuthRoute extends React.Component {
    componentDidMount() {

        // 如果用户导航的是登录或注册页，则什么也不用做
        const publicList = ['/login', '/register']
        const pathname = this.props.location.pathname
        if (publicList.indexOf(pathname) > -1) {
            return null
        }
        // 否则，获取用户信息，并把信息挂到state树上，方便应用内的各组件拿去使用
        axios.get('/user/info')
            .then(res => {
                if (res.status === 200) {
                    if (res.data.code === 0) {
                        this.props.loadData(res.data.data)
                    } else {
                        this.props.history.push('/login')
                    }
                }
            })
    }

    render() {
        return null
    }
}

export default AuthRoute
