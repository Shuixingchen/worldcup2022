import React from 'react';

/**
 * 组件通信，BrotherA to BrotherB
 * 借助父组件，把通信信息放在Parent.state
 * BrotherA传递数据给Parent
 * Parent传递数据给BrotherB
 */


class Parents extends React.Component{
    state = {
        msg:0
    }
    ReceiveMsg = (data)=>{
        this.setState({
            msg:data
        })
    }
    render(){
        return (
            <div>
                <BrotherA receiveMsg={this.ReceiveMsg} />
                <BrotherB msg={this.state.msg}/>
            </div>
        )
    }
    
}
class BrotherA extends React.Component{
    state = {
        content:""
    }
    // 所有的表单元素都绑定HandleChange事件, 必须是箭头函数，才能获取到this对象
    HandleChange = (e)=>{
        // 获取Dom对象
        const target = e.target;
        // 根据类型获取值
        let value = target.type === 'checkbox' ? target.checked : target.value;
        // 修改state对应的属性值
        let name = target.name;
        this.setState({
            [name] : value
        })
    }
    // 调用paraent函数，传递msg
    SendMsg = ()=>{
        this.props.receiveMsg(this.state.content)
    }
    render(){
        return(
            <div>
                <input type="text" name="content"  value={this.state.content} onChange={this.HandleChange} />
                <button onClick={this.SendMsg}>SendMsg</button>
            </div>
            
        )
    }
}

class BrotherB extends React.Component{
    render(){
        return(
            <div>
                <p>接收到的msg: {this.props.msg}</p>
            </div>
            
        )
    }
}

export default Parents;