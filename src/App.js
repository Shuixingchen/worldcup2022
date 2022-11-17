
// 路由配置
import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom'
import Layout from './Pages/Layout'
import NoFound from './Pages/404'
import Home from './Pages/Home'
import UseMox from './Components/Demo/UseMox'
import HookDemo from './Components/Demo/HookDemo'
import UseEffectDemo from './Components/Demo/UseEffectDemo'
import Deposit from './Pages/Deposit'
import UseParams from './Components/Demo/UseParams'
import UseHookForm from './Components/Demo/UseHookForm'
import UseContract from './Components/Demo/UseContract'


function App() {
  return (
      <Router>
        <Routes>
          <Route path='/' element={<Layout/>}>
            <Route index element={<Home/>}/>
            <Route path='mox' element={<UseMox/>}/>
            <Route path='hook' element={<HookDemo/>}/>
            <Route path='effect' element={<UseEffectDemo/>}/>
            <Route path='deposit' element={<Deposit/>}/>
            <Route path='params' element={<UseParams/>}/>
            <Route path='form' element={<UseHookForm/>}/>
            <Route path='contract' element={<UseContract/>}/>
          </Route>
          <Route path='*' element={<NoFound/>} />
        </Routes>
      </Router>
  )
}

export default App;
