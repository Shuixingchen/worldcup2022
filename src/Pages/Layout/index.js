import {Outlet} from 'react-router-dom'

import Header from '../Header';

function Layout() {
    return (
        <div>
            <Header/>
            {/* 二级路由出口 */}
            <Outlet/>
        </div>
    )
}

export default Layout;