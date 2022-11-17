
import { useEffect,useState } from "react";
import axios from "axios";
import { Link, useNavigate } from 'react-router-dom';
import {showDate} from '../../Components/Utils/time'

function Home(){
  const [list,setList] = useState([])

  useEffect(()=>{
    const fetchData = async ()=>{
      const res = await axios.get('http://localhost:8080/worldcup/getallgame')
      setList(res.data.data)
    }
    fetchData()
  },[])

  const navigate = useNavigate()
  const jumpToDeposit = (item)=>{
    navigate('/deposit', {state:{id:item.ID,
      playA:item.PlayA,
      playB:item.PlayB,
      playAID:item.PlayAID,
      playBID:item.PlayBID,
      playAIcon:item.PlayAIcon,
      playBIcon:item.PlayBIcon,
      startTime:showDate(item.StartTime)
    }})
  }

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
              <th scope="col"></th>
              <th scope="col">PlayB</th>
              <th scope="col">Deposit</th>
            </tr>
          </thead>
          <tbody>
              {list.map((item) => (
                <tr key={item.ID}>
                 <td scope="row">{showDate(item.StartTime)}</td>
                 <td><img src={item.PlayAIcon} alt="" />{item.PlayA}</td>
                 <td>VS</td>
                 <td><img src={item.PlayBIcon} alt="" />{item.PlayB}</td>
                 <td><button onClick={(e)=>{jumpToDeposit(item)}}>Deposit</button></td>
                 {/* <td><Link to="/deposit" state={{}}><button>Deposit</button></Link></td> */}
                </tr>
              ))}
          </tbody>
      </table>
    </div>
  )
}

export default Home;