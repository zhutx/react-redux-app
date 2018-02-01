/**
 * 如果你还没有React技术栈基础，尤其是React和Redux的相关基础。建议先从这了解下：https://segmentfault.com/a/1190000009879742，
 */

/**
 * 工程入口文件
 */
import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import App from './app'
import registerServiceWorker from './registerServiceWorker'
import reducers from './reducer'
import './config'
import './index.less'

registerServiceWorker()

// 创建一个集成了中间件的store
// store的dispatch()方法，正常情况下只接受action对象，thunk中间件可以让dispatch()接受函数，为异步操作（如ajax访问后端的场景）提供了一种可行途径
// reducers汇总了应用的所有状态为一颗状态树，我们的业务组件都对应着状态树中的某些个节点。节点状态的变更，自然就驱动了对应组件的重新渲染。
// 这里我们要获取一次初始状态树，让store往子组件传递下去
const store = createStore(reducers, compose(
    applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : f => f
))

// 渲染入口组件
ReactDOM.render((
    // 用react-redux提供的Provider作为顶层组件将store传递下去，任何子组件可直接拿到状态树
    <Provider store={store}>
        {/* 路由方式使用BrowserRouter方式, 还有一种是HashRouter方式，自己去了解 */}
        <BrowserRouter>
            {/* 再写下来就要涉及业务了，因此独立出APP组件。让我们的入口文件保持纯粹性，拿来主义 */}
            <App></App>
        </BrowserRouter>
    </Provider>
), document.getElementById('root'));
