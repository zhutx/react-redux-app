/**
 * 聊天组件
 */
import React from 'react'
import { List, InputItem, NavBar, Icon, Grid} from 'antd-mobile'
import { connect } from 'react-redux'
import { getMsgList, sendMsg, recvMsg, readMsg } from '../../redux/chat.redux'
import { getChatId } from '../../util'
import QueueAnim from 'rc-queue-anim'

// connect方法接受两个参数：mapStateToProps和mapDispatchToProps。它们定义了 UI 组件的业务逻辑。
// 前者负责输入逻辑，即将state映射到 UI 组件的参数（props），后者负责输出逻辑，即将用户操作映射成 Action
@connect(
    state => state, // mapStateToProps, 从状态树上引入组件所需的状态片段,绑定到组件的props属性
    { getMsgList, sendMsg, recvMsg, readMsg } // mapDispatchToProps, 引入redux模块的函数，绑定到组件的props属性
)
class Chat extends React.Component {

    constructor(props) {
        super(props)
        this.state = {text: '', msg: []}
    }

    componentDidMount() {
        if (!this.props.chat.chatmsg.length) {
            this.props.getMsgList()
            this.props.recvMsg()
        }
    }

    componentWillUnmount() {
        const to = this.props.match.params.user
        this.props.readMsg(to)
    }

    fixCarousel() {
        setTimeout(function() {
            window.dispatchEvent(new Event('resize'))
        }, 0)
    }

    handleSubmit() {
        // socket.emit('sendmsg', {text: this.state.text})
        const from = this.props.user._id
        const to = this.props.match.params.user
        const msg = this.state.text
        this.props.sendMsg({from, to, msg})
        this.setState({
            text: '',
            showImoji: false
        })
    }

    render () {
        const emoji = '😃 😃 😃 😃 😃 😃 😃 😃 😃 😃 😃 😃 😃 😃 😃 😃 😃 😃 😃 😃 😃 😃 😃 😃 😃 😃 😃 😃 😃 😃 😃 😃 😃 😃 😃 😃 😃 😃 😃 😃 😃 😃 😃 😃 😃 😃 😃 😃 😃 😃 😃 😃 😃 😃 😃 😃 😃 😃 😃 😃 😃 😃 😃 😃 😃 😃 😃 😃 😃 😃 😃 😃 😃 😃 😃 😃 😃 😃 😃 😃 😃 😃 😃 😃 😃 😃 😃 😃 😃 😃'
            .split(' ').filter(v=>v).map(v=>({text: v}))
        // console.log(emoji)
        const userid = this.props.match.params.user
        const Item = List.Item
        const users = this.props.chat.users
        if (!users[userid]) return null

        const chatid = getChatId(userid, this.props.user._id)
        const chatmsgs = this.props.chat.chatmsg.filter(v=>v.chatid==chatid)
        return (
            <div id='chat-page'>
                <NavBar 
                    mode='dark'
                    icon={<Icon type="left" />}
                    onLeftClick={()=>{
                        this.props.history.goBack()
                    }}>
                    {users[userid].name}
                </NavBar>
                <QueueAnim delay={100}>
                {chatmsgs.map(v=>{
                    const avatar = require(`../img/${users[v.from].avatar}.png`)
                    return v.from == userid ? (
                        <List key={v._id}>
                            <Item
                            thumb={avatar}
                            >{v.content}</Item>
                        </List>
                    ) : (
                        <List key={v._id}>
                            <Item
                                extra={<img alt='头像' src={avatar} />}
                                className='chat-me'
                                >{v.content}</Item>
                        </List>
                    )
                })}
                </QueueAnim>
                <div className='stick-footer'>
                    <List>
                        <InputItem
                            placeholder='请输入'
                            value={this.state.text}
                            onChange={v=>{this.setState({text:v})}}
                            extra={
                                <div>
                                    <span 
                                        style={{marginRight: 15}}
                                        onClick={()=>{
                                            this.setState({showImoji: !this.state.showImoji})
                                            this.fixCarousel()
                                        }}
                                    >😃</span>
                                    <span onClick={()=>this.handleSubmit()}>发送</span>
                                </div>
                            }
                        >信息</InputItem>
                    </List>
                    {this.state.showImoji ? <Grid 
                        data={emoji}
                        columnNum={9}
                        carouselMaxRow={4}
                        isCarousel={true}
                        onClick={el=>{
                            this.setState({
                                text: this.state.text + el.text
                            })
                        }}
                    /> : null}
                    
                </div>
            </div>
        )
    }
}

export default Chat
