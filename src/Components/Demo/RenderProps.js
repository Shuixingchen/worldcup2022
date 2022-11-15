import React from 'react';
import PropTypes from 'prop-types'

/**
 * 状态逻辑复用，state
 * Mouse组件的state和修改逻辑要在多个地方共用
 * Mouse的ui渲染逻辑由外界定义
 */

class Mouse extends React.Component{
    state={
        x:0,
        y:0
    }
    handMouseMove = (e)=>{
        this.setState({
            x:e.clientX,
            y:e.clientY
        })
    }
    componentDidMount() {
        window.addEventListener("mousemove", this.handMouseMove)
    }
    componentWillUnmount(){
        // window.removeEventListener("mousemove")
    }
    // 由于要共用state,所以渲染ui逻辑由外界props传入
    render() {
        return this.props.children(this.state)
    }
}

// 添加props校验
// Mouse.prototype = {
//     children: PropTypes.func.isRequired
// }

// 两种方式
export class RenderProps1 extends React.Component{
    render(){
        return (<div>
            <Mouse>
                {(state)=>{
                    return (<div>鼠标的坐标x:{state.x}, y:{state.y}</div>)
                }}
            </Mouse>
        </div>)
    }
}

export class RenderProps2 extends React.Component{
    render(){
        return (
            <div>
                <Mouse>
                    {(state)=>{
                        return (<div>
                        <p style={{position:'absolute', top:state.y, left:state.x, backgroundColor:'red'}}>dddd</p>
                    </div>)}}
                </Mouse>
            </div>
        )
    }
}
