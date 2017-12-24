import React from 'react'
import PropTypes from 'prop-types'
import { Grid, List } from 'antd-mobile'

class AvatarSelector extends React.Component {

    static propTypes = {
        selectAvatar: PropTypes.func.isRequired
    }

    constructor(props) {
        super(props)
        this.state = {
            text: '',
            icon: ''
        }
    }

    render () {

        const avatarList = 'boy,girl,man,woman,bull,chick,crab,hedgehog,hippopotamus,koala,lemur,pig,tiger,whale,zebra'
            .split(',')
            .map(v=>({
                icon: require(`../img/${v}.png`),
                text: v
            }))

        const gridHeader = this.state.text 
                            ? (<div>
                                <span>已选择头像</span>
                                <img style={{width: 20}} src={this.state.icon} alt="" />
                               </div>) : '请选择头像'

        return (
            <div>
                <List renderHeader={()=>gridHeader}>
                    <Grid 
                        data={avatarList} 
                        columnNum={5} 
                        onClick={ele=>{
                            this.setState(ele)
                            this.props.selectAvatar(ele.text)
                        }} />
                </List>
            </div>
        )
    }
}

export default AvatarSelector
