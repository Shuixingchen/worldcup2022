import React from 'react';

/*表单组件的常见写法
每个输入框添加name属性，并在state添加对应的属性值，来保存对应输入框的值
每个输入框绑定onChange事件
*/
class Form extends React.Component{
    state = {
        comments:[],         
        userName:"",
        content:""
    }
    constructor(props) {
        super(props)
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
    // 发表评论
    AddComment =()=>{
        const {comments,userName,content} = this.state;
        if (content.length === 0 ) {
            return
        }
        const newComments = [
            {
                id: Math.random(),
                name:userName,
                comment:content,
            },
            ...comments
        ]
        this.setState({
            comments:newComments,
            userName:"",
            content:""
        })
    }

    RenderList(){
        if (this.state.comments.length === 0) {
            return <div className='no-content'>暂无评论，快去评论吧~</div>
        }
        return (<ul>
            {this.state.comments.map(item=>(
                <li key={item.id}>
                    <h5>评论人:{item.name}</h5>
                    <p>评论内容：{item.comment}</p>
                </li>
            ))}
        </ul>)
    }
    
    render() {
        return (
            <div className='app'>
                <div>
                    {/* 文本框 */}
                    <input type="text" name="userName" placeholder='请输入评论人' value={this.state.userName} onChange={this.HandleChange} />
                    <textarea className='content' name='content' cols="30" rows="10" placeholder='请输入评论' 
                    value={this.state.content} onChange={this.HandleChange} />
                    <br />
                    <button onClick={this.AddComment}>提交评论</button>
                </div>
                {/* 通过条件渲染内容 */}
                {this.RenderList()}  
            </div>
        )
    }
}

export default Form;