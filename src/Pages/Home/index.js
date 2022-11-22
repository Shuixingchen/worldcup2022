
import { useEffect,useState } from "react";
import { ethers } from "ethers";
import { observer } from 'mobx-react-lite'
import { useNavigate } from 'react-router-dom';
import {showDate} from '../../Components/Utils/time'
import walletStore from '../../store/WalletStore';
import teams from '../../json/teams.json'
import GameFactoryABI from '../../abi/GameFactory.json';

function Home(){
  const [list,setList] = useState([])
  const [isWallet, setIsWallet] = useState(false)
  const connectWallet = async()=> {
    await walletStore.setWallet()
    setIsWallet(true)
  }
  function getTeamMap(teams) {
    let res = new Map();
    for (let index = 0; index < teams.length; index++) {
      const element = teams[index];
      res.set(element.id, element)
    }
    return res
  }
  useEffect(()=>{
    const fetchData = async ()=>{
      if (walletStore.selectedAddress === "") {
        console.log("ddds")
        return
      }
      console.log(`worldcup: ${walletStore.chainInfo.worldcupaddr}`)
      const GameFactory = new ethers.Contract(walletStore.chainInfo.worldcupaddr, GameFactoryABI.abi, walletStore.provider);
      let allGames = await GameFactory.getAllGames()
      const teamMap = getTeamMap(teams)
      console.log(teamMap)
      console.log(allGames)
      let gameList = new Array()
      for (let index = 0; index < allGames.length; index++) {
        const game = allGames[index];
        const a = teamMap.get(game.play0)
        const b = teamMap.get(game.play1)
        var g = new Object();
        g.ID = index + 1;
        g.PlayAID = game.play0;
        g.PlayBID = game.play1;
        g.StartTime = game.startTime;
        g.ContractAddr = game.addr;
        g.PlayA = a.name;
        g.PlayAIcon = a.icon;
        g.PlayB = b.name;
        g.PlayBIcon = b.icon;
        gameList[index] = g
      }
      setList(gameList)
    }
    fetchData()
  },[walletStore,isWallet])

  // 路由跳转,带上参数
  const navigate = useNavigate()
  const jumpToDeposit = (item)=>{
    navigate('/deposit', {state:{id:item.ID,
      playA:item.PlayA,
      playB:item.PlayB,
      playAID:item.PlayAID,
      playBID:item.PlayBID,
      playAIcon:item.PlayAIcon,
      playBIcon:item.PlayBIcon,
      startTime:item.StartTime,
      contractAddr:item.ContractAddr
    }})
  }

  return (
      <div className="container">
      {walletStore.selectedAddress ==="" ? 
      <div >
        <div className="px-3 text-center" style={{"marginTop":"250px"}}>
          <h3>Decentralize the World Cup Competition</h3>
          <p className="lead">Decentralize the World Cup Competition is a fair and open competition platform based on contracts</p>
          <div className="lead">
            <div className="btn btn-lg btn-secondary fw-bold" onClick={connectWallet} >Connect Wallet</div>
          </div>
        </div>
      </div>
      :
      <div>
        <h3>Games</h3>
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
      }
    </div>
  )
}

export default observer(Home);