/**
 * imoocFrom高阶组件
 * 
 * 接收一个子组件，返回一个扩展了功能的新组件
 * imoocForm复用于各种表单场景，避免每个组件重复编写handleChange函数
 */
import React from 'react'

export default function imoocForm(Comp) {
    return class WrapperComp extends React.Component {

        constructor(props) {
            super(props)
            this.state = {}
            this.handleChange = this.handleChange.bind(this)
        }

        // 扩展了handleChange函数
        handleChange(key, val) {
            this.setState({
                [key]: val
            })
        }

        render () {
            // 将扩展函数、状态和原属性，全部传递给子组件
            return <Comp handleChange={this.handleChange} state={this.state} {...this.props}></Comp>
        }
    }
}