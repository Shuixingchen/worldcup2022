import { useEffect, useState } from "react"
import axios from "axios"

function UseEffectDemo() {
    const [list,setList] = useState([])

    useEffect(()=>{
        const fetchData = async ()=>{
            const res = await axios.get('http://geek.itheima.net/v1_0/channels')
            console.log(res.data.data.channels)
            setList(res.data.data.channels)
        }
        fetchData()
    },[])

    return (
        <ul>
          {list.map((item) => (
            <li key={item.id}>{item.name}</li>
          ))}
        </ul>
      )
}

export default UseEffectDemo