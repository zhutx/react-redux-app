/**
 * 业务入口组件
 * 
 * 主要任务：
 * 1. 处理未预期的全局异常
 * 2. 获取会话信息
 * 3. 路由匹配规则
 */
import React from 'react'
import { Route, Switch } from 'react-router-dom'
import AuthRoute from './component/authroute/authroute'
import Login from './container/login'
import Register from './container/register'
import BossInfo from './container/bossinfo'
import GeniusInfo from './container/geniusinfo'
import Dashboard from './component/dashboard'
import Chat from './component/chat'

class App extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            hasError: false
        }
    }

    // React 16新增的生命周期函数, 处理非预期的异常，以自定义的错误页面显示给用户
    componentDidCatch(err, info) {
        console.log(err, info)
        this.setState({
            hasError: true
        })
    }

    render() {
        // 有异常则显示一个全局错误页
        return this.state.hasError 
            ? <img className='error-container' src={require('./error.png')} alt="error" /> 
            : (
            <div>
                {/* 用单独的AuthRoute去处理用户会话信息的共享 */}
                <AuthRoute></AuthRoute>
                {/* 
                    定义路由规则
                    如当用户使用history.push('/login')时，会按顺序去匹配路由规则，匹配成功，显示指定的组件Login。
                    Switch可以按for循环的break去理解，一旦匹配上，就不继续匹配下去了
                */}
                <Switch>
                    <Route path="/bossinfo" component={BossInfo}></Route>
                    <Route path="/geniusinfo" component={GeniusInfo}></Route>
                    <Route path="/login" component={Login}></Route>
                    <Route path="/register" component={Register}></Route>
                    <Route path="/chat/:user" component={Chat}></Route>
                    {/* 牛人/BOSS列表、消息列表、个人中心板块，因为需要都有NavBar头和TabBar尾的框架，可以定义一个Dashboard组件来负责 */}
                    <Route component={Dashboard}></Route>
                </Switch>
            </div>
        )
    }

}

export default App
