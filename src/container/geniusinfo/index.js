/**
 * 牛人信息完善组件
 */
import React from 'react'
import { NavBar, InputItem, TextareaItem, Button } from 'antd-mobile'
import AvatarSelector from '../../component/avatar-selector'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { update } from '../../redux/user.redux'
import imoocForm from '../../component/imooc-form'

// connect方法接受两个参数：mapStateToProps和mapDispatchToProps。它们定义了 UI 组件的业务逻辑。
// 前者负责输入逻辑，即将state映射到 UI 组件的参数（props），后者负责输出逻辑，即将用户操作映射成 Action
@connect(
    state => state.user, // mapStateToProps, 从状态树上引入组件所需的状态片段,绑定到组件的props属性
    { update } // mapDispatchToProps, 引入redux模块的函数，绑定到组件的props属性
)
// imoocForm高阶函数，接收一个组件，返回一个包装了handleChange函数的新组件
// imoocForm复用于各种表单场景，避免每个组件重复编写handleChange函数
@imoocForm
class GeniusInfo extends React.Component {

    render () {
        const path = this.props.location.pathname
        const redirect = this.props.redirectTo
        return (
            <div>
                {redirect &&  redirect!==path ? <Redirect to={this.props.redirectTo}/> : null}
                <NavBar mode="dark">牛人完善信息页</NavBar>
                <AvatarSelector selectAvatar={(v)=>this.props.handleChange('avatar', v)}></AvatarSelector>
                <InputItem onChange={(v)=>this.props.handleChange('title', v)}>
                    求职岗位
                </InputItem>
                <TextareaItem 
                    onChange={(v)=>this.props.handleChange('desc', v)}
                    title="个人简介"
                    rows={3}
                    autoHeight
                />
                <Button type="primary" onClick={()=>{
                    this.props.update(this.props.state)
                }}>保存</Button>
            </div>
        )
    }
}

export default GeniusInfo
