import React from 'react'
import PropTypes from 'prop-types'
import { TabBar } from 'antd-mobile'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

// @withRouter可让非路由组件在内部像路由组件一样直接使用this.props.history.push()
// connect方法接受两个参数：mapStateToProps和mapDispatchToProps。它们定义了 UI 组件的业务逻辑。
// 前者负责输入逻辑，即将state映射到 UI 组件的参数（props），后者负责输出逻辑，即将用户操作映射成 Action
@withRouter
@connect(
    state => state.chat // mapStateToProps, 从状态树上引入组件所需的状态片段,绑定到组件的props属性
)
class NavLinkBar extends React.Component {

    // 传入属性校验，要求必传并且是个数组
    static propTypes = {
        data: PropTypes.array.isRequired
    }
    render() {

        // 从前面的菜单数组定义，可以看到共4项，牛人列表、BOSS列表、消息列表和个人中心
        // 牛人列表对牛人隐藏，BOSS列表对BOSS隐藏。所以这里要filter一下，根据每项的hide属性值过滤出要显示的菜单项
        const navList = this.props.data.filter(v => !v.hide)
        
        // 获取当前导航路径
        const { pathname } = this.props.location

        return (
            <TabBar >
                {navList.map(v=>(
                    <TabBar.Item
                        // 如果是消息列表菜单，要显示未读数
                        badge={v.path=='/msg' ? this.props.unread : 0}
                        key={v.path}
                        title={v.text}
                        icon={{uri: require(`./img/${v.icon}.png`)}}
                        selectedIcon={{uri: require(`./img/${v.icon}-active.png`)}}
                        // 匹配导航路径，让对应的菜单选中
                        selected={pathname===v.path}
                        // 点击菜单导航到对应的组件
                        onPress={()=>{
                            this.props.history.push(v.path)
                        }}
                    >
                    </TabBar.Item>
                ))}
            </TabBar>
        )
    }
}

export default NavLinkBar
