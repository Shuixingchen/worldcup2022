import React from 'react';
import {BrowserRouter as Router, Routes,Route, Link, useNavigate } from 'react-router-dom'



class Login extends React.Component{
    // navigate = useNavigate();
    // // 跳转去后台页面
    // doLogin() {
    //     this.navigate("/login")
    // }
    render(){
       return (<div>
            <p>这是登录页面</p>
            <button onClick={this.doLogin}>登录</button>
        </div>)
    }
}

const Admin = ()=>{
    const navigate = useNavigate();
    // 跳转到登录页面
    const logout = ()=>{
        navigate("/admin")
    }
    return (
        <div>
            <p>这是后台页面</p>
            <button onClick={logout}>退出登录</button>
        </div>
    )
}

const Home = ()=>{
    return (
        <div>
            <p>这是默认路由</p>
        </div>
    )
}

const APP = ()=>{
    return (
        <Router>
            <div>
                首页
                <Link to="/login">登录</Link>
            </div>
            <Routes>
                <Route path='/' element={<Home/>}></Route>
                <Route path="/login" element={<Login/>} />
                <Route path="/admin" element={<Admin/>} />
            </Routes>
        </Router>
    )
}


export default APP;