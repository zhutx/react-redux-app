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

    componentDidCatch(err, info) {
        console.log(err, info)
        this.setState({
            hasError: true
        })
    }

    render() {
        return this.state.hasError 
            ? <img className='error-container' src={require('./error.png')} alt="error" /> 
            : (
            <div>
                <AuthRoute></AuthRoute>
                <Switch>
                    <Route path="/bossinfo" component={BossInfo}></Route>
                    <Route path="/geniusinfo" component={GeniusInfo}></Route>
                    <Route path="/login" component={Login}></Route>
                    <Route path="/register" component={Register}></Route>
                    <Route path="/chat/:user" component={Chat}></Route>
                    <Route component={Dashboard}></Route>
                </Switch>
            </div>
        )
    }

}

export default App
