/**
 * 如果你还没有React技术栈基础，尤其是React和Redux的相关基础。建议先从这了解下：https://segmentfault.com/a/1190000009879742，
 */
import { combineReducers } from 'redux'
import { user } from './redux/user.redux'
import { chatuser } from './redux/chatuser.redux'
import { chat } from './redux/chat.redux'

// 除非项目极微小，不然都是分多个redux模块进行共享状态的维护
// 然后用redux的combineReducers函数，把不同模块的状态汇总为一个总的状态对象（状态树），后续各模块相关组件各取所需即可
// 在redux模块的划分上，就是仁者见仁的事了，我们看到蜗牛老师分了user、chatuser和chat模块
// user模块：维护用户信息，处理用户的注册、登录、退出和信息更新等需求
// chatuser模块：维护着可聊天用户列表（牛人登录列表是boss，boss登录列表是牛人），处理获取聊天用户列表的需求
// chat模块：维护消息列表等信息，处理与聊天相关的需求，包括查看消息列表，消息的收发等
export default combineReducers({ user, chatuser, chat })
