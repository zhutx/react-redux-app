import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom'

import registerServiceWorker from './registerServiceWorker';
import reducers from './reducer'
import './config'

import AuthRoute from './component/authroute/authroute'
import Login from './container/login'
import Register from './container/register'
import './config'
import './index.less'

registerServiceWorker()

const store = createStore(reducers, compose(
    applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : f => f
))

function Boss() {
    return <h2>BOSS页面</h2>
}

ReactDOM.render((
    <Provider store={store}>
        <BrowserRouter>
            <div>
                <AuthRoute></AuthRoute>
                <Route path="/boss" component={Boss}></Route>
                <Route path="/login" component={Login}></Route>
                <Route path="/register" component={Register}></Route>
            </div>
        </BrowserRouter>
    </Provider>
), document.getElementById('root'));
