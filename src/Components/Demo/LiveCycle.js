import React from 'react';

/**
 * 组件生命周期和钩子函数
 */
class LiveCycle extends React.Component{
    constructor(props){
        super(props)
        console.log("constructor")
    }
    componentDidMount() {

    }
    componentDidUpdate(){
        
    }
    componentWillUnmount(){

    }
    render(){
        return (<div>
            执行render
        </div>)
    }
}