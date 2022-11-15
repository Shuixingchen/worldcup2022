import React from 'react';

/**
 * 组件通信，Child to Parents
 */

class Parents extends React.Component{
    state = {
        childMsg:""
    }
    // 设置回调函数，接收数据
    receiveMsg =(data)=>{
        this.setState({
            childMsg:data
        })
    }
    render(){
        // 把函数传递给Child
        return (
        <div>
            <p>接收msg from child: {this.state.childMsg}</p>
            <Child receiveMsg={this.receiveMsg} />
        </div>
        )
    }
}

class Child extends React.Component{
    state={
        msg:"hello world"
    }
    handleClick = ()=>{
        this.props.receiveMsg(this.state.msg)
    }
    render(){
        return (<button onClick={this.handleClick}>发送数据给父组件</button>)
    }
}

export default Parents;