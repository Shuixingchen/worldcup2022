import { useEffect } from 'react'
import channlStore from '../../store/ChannelStore'
import { observer } from 'mobx-react-lite'

function UseMox() {
  // 1. 使用数据渲染组件
  // 2. 触发action函数发送异步请求
  useEffect(() => {
    channlStore.setChannelList()
    console.log(channlStore.channelList)
  }, [])
  return (
    <ul>
      {channlStore.channelList.map((item) => (
        <li key={item.id}>{item.name}</li>
      ))}
    </ul>
  )
}
// 让组件可以响应数据的变化[也就是数据一变组件重新渲染]
export default observer(UseMox)