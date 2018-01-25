/**
 * Dashboard组件: 统一的NavBar头和TabBar尾
 */
import React from 'react'
import { connect } from 'react-redux'
import { NavBar } from 'antd-mobile'
import { Route, Redirect } from 'react-router-dom'
import NavLinkBar from '../navlink'
import Boss from '../../component/boss'
import Genius from '../../component/genius'
import User from '../../component/user'
import Msg from '../../component/msg'
import { getMsgList, recvMsg } from '../../redux/chat.redux'
import QueueAnim from 'rc-queue-anim'

// connect方法接受两个参数：mapStateToProps和mapDispatchToProps。它们定义了 UI 组件的业务逻辑。
// 前者负责输入逻辑，即将state映射到 UI 组件的参数（props），后者负责输出逻辑，即将用户操作映射成 Action
@connect(
    state => state, // mapStateToProps, 从状态树上引入组件所需的状态片段,绑定到组件的props属性
    { getMsgList, recvMsg } // mapDispatchToProps, 引入redux模块的函数，绑定到组件的props属性
)
class Dashboard extends React.Component {

    // 这里是业务上的一种考虑，认为在渲染框架组件前取一次消息列表数据和发送给自己的消息，是比较合适的时机
    componentDidMount() {
        if (!this.props.chat.chatmsg.length) {
            this.props.getMsgList()
            this.props.recvMsg()
        }
    }

    render() {
        // 取出当前的导航路径
        const { pathname } = this.props.location
        // 获取登录用户信息
        const user = this.props.user
        // 把TabBar所需的4个菜单数据封装一下
        const navList = [
            {
                path:'/boss',
                text: '牛人',
                icon: 'boss',
                title: '牛人列表',
                component: Boss,
                hide: user.type==='genius' // 针对牛人的话，牛人列表应该隐藏
            },
            {
                path:'/genius',
                text: 'boss',
                icon: 'job',
                title: 'BOSS列表',
                component: Genius,
                hide: user.type==='boss' // 针对BOSS的话，BOSS列表应该隐藏
            },{
                path:'/msg',
                text: '消息',
                icon: 'msg',
                title: '消息列表',
                component: Msg
            },{
                path:'/me',
                text: '我',
                icon: 'user',
                title: '个人中心',
                component: User
            }
        ]

        // 根据当前导航路径，过滤出具体的那一项
        const page = navList.find(v => v.path == pathname)

        return page ? (
            <div>
                {/* 头NavBar装饰上去 */}
                <NavBar className='fixd-header' mode='dard'>{page.title}</NavBar>
                <div style={{marginTop:45}}>
                   {/* 包个QueueAnim，让导航切换时有个动画效果 */}
                    <QueueAnim type='scaleX' duration={800}>
                        {/* 定义动态路由规则, 根据当前导航渲染对应的组件去 */}
                        <Route key={page.path} path={page.path} component={page.component}></Route>
                    </QueueAnim>
                </div>
                {/* 尾TabBar装饰上去, 这里定义了专门的NavLinkBar组件去渲染，接收菜单项数组来 */}
                <NavLinkBar data={navList}></NavLinkBar>
            </div>
        ) : <Redirect to='/msg'></Redirect>
    }
}

export default Dashboard
