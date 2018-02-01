/**
 * 登录组件
 */
import React from 'react'
import Logo from '../../component/logo/logo'
import { List, InputItem, WingBlank, WhiteSpace, Button } from 'antd-mobile'
import { connect } from 'react-redux'
import { login } from '../../redux/user.redux'
import { Redirect } from 'react-router-dom'
import imoocForm from '../../component/imooc-form'

// connect方法接受两个参数：mapStateToProps和mapDispatchToProps。它们定义了 UI 组件的业务逻辑。
// 前者负责输入逻辑，即将state映射到 UI 组件的参数（props），后者负责输出逻辑，即将用户操作映射成 Action
@connect(
    state => state.user, // mapStateToProps, 从状态树上引入组件所需的状态片段,绑定到组件的props属性
    { login } // mapDispatchToProps, 引入redux模块的函数，绑定到组件的props属性
)
// imoocForm高阶函数，接收一个组件，返回一个包装了handleChange函数的新组件
// imoocForm复用于各种表单场景，避免每个组件重复编写handleChange函数
@imoocForm
class Login extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            user: '',
            pwd: ''
        }
        this.register = this.register.bind(this)
        this.handleLogin = this.handleLogin.bind(this)
    }

    // 登录函数
    handleLogin() {
        // 调用redux暴露的login进行登录并修改user共享状态
        this.props.login(this.props.state)
    }

    // 导航到注册页
    register() {
        this.props.history.push('/register')
    }

    render() {
        return (
            <div>
                {this.props.redirectTo && this.props.redirectTo !== '/login' ? <Redirect to={this.props.redirectTo}/> : null}
                <Logo></Logo>
                <WingBlank>
                    <List>
                        {this.props.msg? <p className="error-msg">{this.props.msg}</p> : null}
                        <InputItem onChange={v=>this.props.handleChange('user',v)}>用户</InputItem>
                        <WhiteSpace/>
                        <InputItem type="password" onChange={v=>this.props.handleChange('pwd',v)}>密码</InputItem>
                    </List>
                    <WhiteSpace/>
                    <Button onClick={this.handleLogin} type="primary">登录</Button>
                    <WhiteSpace/>
                    <Button onClick={this.register} type="primary">注册</Button>
                </WingBlank>
            </div>
        )
    }
}

export default Login
