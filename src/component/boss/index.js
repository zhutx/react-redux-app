import React from 'react'
import axios from 'axios'
import { Card, WhiteSpace, WingBlank } from 'antd-mobile'
import { connect } from 'react-redux'
import { getUserList } from '../../redux/chatuser.redux'

@connect(
    state => state.chatuser,
    { getUserList }
)
class Boss extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            data: []
        }
    }
    componentDidMount() {
        this.props.getUserList('genius')
    }

    render() {
        return (
            <WingBlank>
                {this.props.userlist.map(v=>(
                    v.avatar ? (<Card key={v._id}>
                        <Card.Header 
                            title={v.user}
                            thumb={require(`../img/${v.avatar}.png`)}
                            extra={<span>{v.title}</span>}
                        ></Card.Header>
                        <Card.Body>
                            {v.desc.split('\n').map(v=>(
                                <div key={v}>{v}</div>
                            ))}
                        </Card.Body>
                    </Card>
                    ) : null
                ))}
            </WingBlank>
        )
    }
}

export default Boss
