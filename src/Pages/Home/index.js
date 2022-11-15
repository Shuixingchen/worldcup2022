
import { useEffect,useState } from "react";
import axios from "axios";
import Items from "../Items"

function Home(){
  const [list,setList] = useState([])

  useEffect(()=>{
    const fetchData = async ()=>{
      const res = await axios.get('http://geek.itheima.net/v1_0/channels')
      setList(res.data.data.channels)
    }
    fetchData()
  },[])

  return (
      <div className="container">
      <div>
        <h3>Games</h3>
      </div>
      <table className="table table-dark table-striped">
          <thead>
            <tr>
              <th scope="col">StartTime</th>
              <th scope="col">PlayA</th>
              <th scope="col">PlayB</th>
              <th scope="col">Deposit</th>
            </tr>
          </thead>
          <tbody>
              {list.map((item) => (
                <Items key={item.id} name={item.name} />
              ))}
          </tbody>
      </table>
    </div>
  )
}

export default Home;