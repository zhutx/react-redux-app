import React from 'react'
import Logo from '../../component/logo/logo'
import { List, InputItem, Radio, WingBlank, WhiteSpace, Button } from 'antd-mobile'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { register } from '../../redux/user.redux'
import imoocForm from '../../component/imooc-form'

// connect方法接受两个参数：mapStateToProps和mapDispatchToProps。它们定义了 UI 组件的业务逻辑。
// 前者负责输入逻辑，即将state映射到 UI 组件的参数（props），后者负责输出逻辑，即将用户操作映射成 Action
@connect(
    state => state.user, // mapStateToProps, 从状态树上引入组件所需的状态片段,绑定到组件的props属性
    { register } // mapDispatchToProps, 引入redux模块的函数，绑定到组件的props属性
)
// imoocForm高阶函数，接收一个组件，返回一个包装了handleChange函数的新组件
// imoocForm复用于各种表单场景，避免每个组件重复编写handleChange函数
@imoocForm
class Register extends React.Component {

    constructor(props) {
        super(props)
        this.handleRegister = this.handleRegister.bind(this)
    }

    componentDidMount() {
        // handleChange是imoocForm返回的新组件传递过来的，所以要用props去调用
        this.props.handleChange('type', 'genius')
    }

    // 注册函数
    handleRegister() {
        // 调用redux暴露的register进行注册并修改user共享状态
        this.props.register(this.props.state)
    }

    render() {
        const RadioItem = Radio.RadioItem;
        return (
            <div>
                {/* 
                    redux里注册成功后会返回携带redirectTo的新user状态,
                    而@connect里已经把user状态绑定到本组件的props上,
                    所以user状态变化会驱动本组件重新渲染，渲染时检测并跳转至redirectTo 
                */}
                {this.props.redirectTo ? <Redirect to={this.props.redirectTo}/> : null}
                <Logo></Logo>
                <WingBlank>
                <List>
                    {/* 
                        redux里注册失败后会返回携带msg的新user状态,
                        而@connect里已经把user状态绑定到本组件的props上,
                        所以user状态变化会驱动本组件重新渲染，渲染时显示注册失败信息 
                    */}
                    {this.props.msg? <p className="error-msg">{this.props.msg}</p> : null}
                    {/* 调用父组件定义的handleChange，驱动状态变化。下同 */}
                    <InputItem onChange={v=>this.props.handleChange('user',v)}>用户名</InputItem>
                    <WhiteSpace/>
                    <InputItem type="password" onChange={v=>this.props.handleChange('pwd',v)}>密码</InputItem>
                    <WhiteSpace/>
                    <InputItem type="password" onChange={v=>this.props.handleChange('repeatpwd',v)}>确认密码</InputItem>
                    <WhiteSpace/>
                    <RadioItem checked={this.props.state.type==='genius'} onChange={()=>this.props.handleChange('type', 'genius')}>
                        牛人
                    </RadioItem>
                    <RadioItem checked={this.props.state.type==='boss'} onChange={()=>this.props.handleChange('type', 'boss')}>
                        BOSS
                    </RadioItem>
                    <WhiteSpace/>
                    <Button type="primary" onClick={this.handleRegister}>注册</Button>
                </List>
                </WingBlank>
            </div>
        )
    }
}

export default Register
