import {useLocation} from 'react-router-dom'


// 接受路由参数,可以传一个state对象过来
// <Link to='/params' state={{id:1}} />
function UseParams() {
    const location = useLocation()
    console.log(location.state.id)
    return (
        <div>UseParams</div>
    )
}
export default UseParams
